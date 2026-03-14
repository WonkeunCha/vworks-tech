const fs = require('fs');
const https = require('https');

const DATA_FILE = 'src/data/news-auto.json';
const FILTER_FROM = new Date('2026-01-01T00:00:00Z');

// 범용 HTTP GET (텍스트 반환)
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      // 리다이렉트 처리
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// XML 태그 추출 헬퍼
function extractTag(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
  return xml.match(re)?.[1]?.trim() ?? '';
}

// RSS/Atom XML → items 파싱
function parseXML(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];
    const title = extractTag(block, 'title');
    const link  = extractTag(block, 'link') || extractTag(block, 'guid');
    const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'date');
    const desc = extractTag(block, 'description') || extractTag(block, 'summary') || extractTag(block, 'content:encoded');
    if (title && link) items.push({ title, link, pubDate, contentSnippet: desc.replace(/<[^>]*>/g, '').slice(0, 400) });
  }
  return items;
}

// Dell
async function fetchDell() {
  const xml = await httpGet('https://www.dell.com/en-us/blog/feed/');
  return parseXML(xml);
}

// HPE
async function fetchHPE() {
  const xml = await httpGet('https://investors.hpe.com/rss/news');
  return parseXML(xml);
}

// VAST Data — Contentful API (날짜 필드 확인)
async function fetchVAST() {
  try {
    const space = '2f3meiv6rg5s';
    const token = 'tJVsuAvJJ1F2q4EHxUdXq-D9CWsUkTtPHmATM-swZzY';
    const url = `https://cdn.contentful.com/spaces/${space}/entries?content_type=blogPost&limit=5&access_token=${token}`;
    const raw = await httpGet(url);
    const data = JSON.parse(raw);

    // 첫 아이템 필드 확인
    if (data.items && data.items.length > 0) {
      const fields = Object.keys(data.items[0].fields ?? {});
      const sys = Object.keys(data.items[0].sys ?? {});
      console.log('  VAST Contentful 필드:', fields.join(', '));
      console.log('  VAST Contentful sys:', sys.join(', '));
    }

    return (data.items ?? []).map(item => {
      const f = item.fields ?? {};
      // 날짜 필드 순서대로 시도
      const dateStr = f.publishedAt ?? f.date ?? f.publicationDate ?? f.createdAt ?? item.sys?.createdAt ?? '';
      return {
        title: f.title ?? f.name ?? '',
        link: `https://www.vastdata.com/blog/${f.slug ?? ''}`,
        pubDate: dateStr,
        contentSnippet: (f.excerpt ?? f.summary ?? f.body ?? '').replace(/<[^>]*>/g, '').slice(0, 400),
      };
    });
  } catch (e) {
    console.error(`VAST Contentful 실패: ${e.message}`);
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
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
    req.write(body);
    req.end();
  });
}

async function processItems(items, source, category, fetchedUrls, newItems) {
  const filtered = items.filter(item => {
    if (!item.pubDate) return false;
    return new Date(item.pubDate) >= FILTER_FROM;
  }).slice(0, 20);

  console.log(`  → 2026년 이후: ${filtered.length}개`);

  for (const item of filtered) {
    const link = item.link ?? '';
    if (!link || fetchedUrls.has(link)) continue;

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
      fetchedUrls.add(link);
    }
  }
}

async function main() {
  if (!fs.existsSync('src/data')) fs.mkdirSync('src/data', { recursive: true });

  const existing = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : { items: [], fetchedUrls: [] };

  const fetchedUrls = new Set(existing.fetchedUrls ?? []);
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