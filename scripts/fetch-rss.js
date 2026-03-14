const Parser = require('rss-parser');
const fs = require('fs');
const https = require('https');

const DATA_FILE = 'src/data/news-auto.json';
const FILTER_FROM = new Date('2026-01-01T00:00:00Z');

// VAST Data — Contentful API (소스코드에서 발견된 키 사용)
const CONTENTFUL_SPACE = '2f3meiv6rg5s';
const CONTENTFUL_TOKEN = 'tJVsuAvJJ1F2q4EHxUdXq-D9CWsUkTtPHmATM-swZzY';

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('JSON parse error')); }
      });
    }).on('error', reject).setTimeout(15000, () => reject(new Error('timeout')));
  });
}

// Dell — strict:false 파서
async function fetchDell() {
  const parser = new Parser({
    timeout: 15000,
    xml2js: { strict: false, normalize: true, normalizeWhitespace: true },
  });
  const parsed = await parser.parseURL('https://www.dell.com/en-us/blog/feed/');
  return (parsed.items ?? []).map(item => ({
    title: item.title ?? '',
    link: item.link ?? item.guid ?? '',
    pubDate: item.pubDate ?? item.isoDate ?? '',
    contentSnippet: item.contentsnippet ?? item.description ?? '',
  }));
}

// HPE — 정규식 직접 파싱
async function fetchHPE() {
  return new Promise((resolve, reject) => {
    https.get('https://investors.hpe.com/rss/news',
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
      (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const items = [];
          const regex = /<item>([\s\S]*?)<\/item>/g;
          let match;
          while ((match = regex.exec(data)) !== null) {
            const b = match[1];
            const title = (b.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/))?.[1]?.trim() ?? '';
            const link  = (b.match(/<link>(.*?)<\/link>/) || b.match(/<guid[^>]*>(.*?)<\/guid>/))?.[1]?.trim() ?? '';
            const pubDate = b.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim() ?? '';
            const desc = (b.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/))?.[1]?.trim() ?? '';
            if (title && link) items.push({ title, link, pubDate, contentSnippet: desc });
          }
          resolve(items);
        });
      }).on('error', reject).setTimeout(15000, () => reject(new Error('timeout')));
  });
}

// VAST Data — Contentful API
async function fetchVAST() {
  try {
    const url = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE}/entries?content_type=blogPost&order=-fields.publishedAt&limit=20&access_token=${CONTENTFUL_TOKEN}`;
    const data = await fetchJSON(url);
    return (data.items ?? []).map(item => ({
      title: item.fields?.title ?? '',
      link: `https://www.vastdata.com/blog/${item.fields?.slug ?? ''}`,
      pubDate: item.fields?.publishedAt ?? item.sys?.createdAt ?? '',
      contentSnippet: item.fields?.excerpt ?? item.fields?.description ?? '',
    }));
  } catch (e) {
    console.error(`VAST Contentful 실패: ${e.message}`);
    return [];
  }
}

async function translateWithClaude(title, summary) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `Translate this IT news to Korean. Reply ONLY with valid JSON, no markdown.

Title: ${title}
Summary: ${String(summary).replace(/<[^>]*>/g, '').slice(0, 300)}

Format: {"title":"한글제목","summary":"한글요약 2문장"}`,
      }],
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const text = data.content[0].text.trim();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('JSON not found');
  return JSON.parse(match[0]);
}

async function processItems(items, source, category, fetchedUrls, newItems) {
  const filtered = items.filter(item => {
    const dateStr = item.pubDate ?? '';
    if (!dateStr) return false;
    return new Date(dateStr) >= FILTER_FROM;
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
      console.error(`  ❌ 번역 실패: ${e.message}`);
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

  // 1. Dell
  try {
    console.log('📡 Dell RSS 수집');
    const items = await fetchDell();
    await processItems(items, 'Dell', '서버', fetchedUrls, newItems);
  } catch (e) { console.error(`Dell 실패: ${e.message}`); }

  // 2. HPE
  try {
    console.log('📡 HPE RSS 수집');
    const items = await fetchHPE();
    await processItems(items, 'HPE', 'HPC·서버', fetchedUrls, newItems);
  } catch (e) { console.error(`HPE 실패: ${e.message}`); }

  // 3. VAST Data
  try {
    console.log('📡 VAST Data Contentful 수집');
    const items = await fetchVAST();
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