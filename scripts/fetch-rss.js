const fs = require('fs');
const https = require('https');
const http = require('http');

const DATA_FILE = 'src/data/news-auto.json';
const FILTER_FROM = new Date('2026-01-01T00:00:00Z');

function httpGet(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Accept': 'text/html,application/xhtml+xml,application/xml,*/*',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location, redirects + 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function extractTag(xml, tag) {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'),
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'),
  ];
  for (const re of patterns) {
    const m = xml.match(re);
    if (m) return m[1].replace(/<[^>]*>/g, '').trim();
  }
  return '';
}

function parseXML(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const b = m[1];
    const title = extractTag(b, 'title');
    const link = extractTag(b, 'link') || extractTag(b, 'guid');
    const pubDate = extractTag(b, 'pubDate') || extractTag(b, 'dc:date') || extractTag(b, 'date');
    const desc = extractTag(b, 'description') || extractTag(b, 'summary');
    if (title && link) items.push({ title, link, pubDate, contentSnippet: desc.slice(0, 400) });
  }
  return items;
}

// Dell — curl 방식 직접 fetch
async function fetchDell() {
  const xml = await httpGet('https://www.dell.com/en-us/blog/feed/');
  const items = parseXML(xml);
  console.log(`  XML 길이: ${xml.length}, 파싱된 아이템: ${items.length}`);
  return items;
}

// HPE — investors RSS
async function fetchHPE() {
  const xml = await httpGet('https://investors.hpe.com/rss/news');
  const items = parseXML(xml);
  console.log(`  XML 길이: ${xml.length}, 파싱된 아이템: ${items.length}`);
  return items;
}

// VAST Data — Contentful (content_type 탐색)
async function fetchVAST() {
  const space = '2f3meiv6rg5s';
  const token = 'tJVsuAvJJ1F2q4EHxUdXq-D9CWsUkTtPHmATM-swZzY';

  // content_type 목록 먼저 확인
  try {
    const typesRaw = await httpGet(`https://cdn.contentful.com/spaces/${space}/content_types?access_token=${token}`);
    const types = JSON.parse(typesRaw);
    const typeIds = (types.items ?? []).map(t => t.sys.id);
    console.log(`  Contentful content types: ${typeIds.join(', ')}`);

    // 블로그 관련 type 찾기
    const blogType = typeIds.find(t => t.toLowerCase().includes('blog') || t.toLowerCase().includes('post') || t.toLowerCase().includes('article'));
    if (!blogType) {
      console.log('  블로그 타입 없음, 첫 번째 타입 시도:', typeIds[0]);
    }
    const useType = blogType ?? typeIds[0];
    if (!useType) return [];

    const raw = await httpGet(`https://cdn.contentful.com/spaces/${space}/entries?content_type=${useType}&limit=20&order=-sys.createdAt&access_token=${token}`);
    const data = JSON.parse(raw);
    console.log(`  ${useType} 타입 아이템: ${data.items?.length ?? 0}개`);
    if (data.items?.length > 0) {
      console.log('  필드:', Object.keys(data.items[0].fields ?? {}).join(', '));
    }

    return (data.items ?? []).map(item => {
      const f = item.fields ?? {};
      const dateStr = f.publishedAt ?? f.date ?? f.publicationDate ?? f.publishDate ?? item.sys?.createdAt ?? '';
      const slug = f.slug ?? f.url ?? '';
      return {
        title: f.title ?? f.name ?? f.heading ?? '',
        link: slug ? `https://www.vastdata.com/blog/${slug}` : '',
        pubDate: dateStr,
        contentSnippet: (f.excerpt ?? f.summary ?? f.description ?? f.body ?? '').toString().replace(/<[^>]*>/g, '').slice(0, 400),
      };
    }).filter(i => i.title && i.link);
  } catch (e) {
    console.error(`  VAST Contentful 오류: ${e.message}`);
    return [];
  }
}

async function translateWithClaude(title, summary) {
  const body = JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: `Translate this IT news to Korean. Reply ONLY with valid JSON, no markdown.
Title: ${title}
Summary: ${summary.slice(0, 300)}
Format: {"title":"한글제목","summary":"한글요약 2문장"}`,
    }],
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return reject(new Error(json.error.message));
          const text = json.content[0].text.trim();
          const match = text.match(/\{[\s\S]*\}/);
          if (!match) return reject(new Error('JSON not found'));
          resolve(JSON.parse(match[0]));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('API timeout')); });
    req.write(body);
    req.end();
  });
}

async function processItems(items, source, category, fetchedUrls, newItems) {
  const filtered = items.filter(item => {
    if (!item.pubDate) return false;
    try { return new Date(item.pubDate) >= FILTER_FROM; } catch { return false; }
  }).slice(0, 20);

  console.log(`  → 2026년 이후: ${filtered.length}개`);

  for (const item of filtered) {
    const link = item.link ?? '';
    if (!link || fetchedUrls.has(link)) {
      if (link) console.log(`  건너뜀(중복): ${item.title}`);
      continue;
    }

    console.log(`  번역: ${item.title}`);
    try {
      const translated = await translateWithClaude(item.title, item.contentSnippet ?? '');
      newItems.push({
        id: Buffer.from(link).toString('base64').slice(0, 16),
        title: translated.title,
        summary: translated.summary,
        category,
        source,
        sourceUrl: link,
        date: new Date(item.pubDate).toISOString().slice(0, 10),
      });
      fetchedUrls.add(link);
      console.log(`  ✅ ${translated.title}`);
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`  ❌ ${e.message}`);
      // 번역 실패 시 URL 등록 안 함 → 다음에 재시도
    }
  }
}

async function main() {
  if (!fs.existsSync('src/data')) fs.mkdirSync('src/data', { recursive: true });

  const existing = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : { items: [], fetchedUrls: [] };

  // HPE 이전 실패 URL 초기화 (크레딧 부족으로 등록된 것)
  const fetchedUrls = new Set(
    (existing.fetchedUrls ?? []).filter(url => !url.includes('investors.hpe.com'))
  );
  const newItems = [];

  try {
    console.log('📡 Dell RSS 수집');
    const items = await fetchDell();
    console.log(`  수집된 전체: ${items.length}개`);
    await processItems(items, 'Dell', '서버', fetchedUrls, newItems);
  } catch (e) { console.error(`Dell 실패: ${e.message}`); }

  try {
    console.log('📡 HPE RSS 수집');
    const items = await fetchHPE();
    console.log(`  수집된 전체: ${items.length}개`);
    await processItems(items, 'HPE', 'HPC·서버', fetchedUrls, newItems);
  } catch (e) { console.error(`HPE 실패: ${e.message}`); }

  try {
    console.log('📡 VAST Data Contentful 수집');
    const items = await fetchVAST();
    console.log(`  수집된 전체: ${items.length}개`);
    await processItems(items, 'VAST Data', '스토리지', fetchedUrls, newItems);
  } catch (e) { console.error(`VAST Data 실패: ${e.message}`); }

  console.log(`\n총 ${newItems.length}개 새 뉴스 추가`);
  const result = {
    fetchedUrls: [...fetchedUrls],
    items: [...newItems, ...(existing.items ?? [])]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 100),
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(result, null, 2), 'utf-8');
}

main().catch(console.error);