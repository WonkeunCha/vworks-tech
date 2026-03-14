const Parser = require('rss-parser');
const fs = require('fs');
const https = require('https');

const DATA_FILE = 'src/data/news-auto.json';
const FILTER_FROM = new Date('2026-01-01T00:00:00Z');

// Dell — media:content type 속성 무시하도록 커스텀 파서
const dellParser = new Parser({
  timeout: 15000,
  customFields: {
    item: [
      ['media:content', 'media', { keepArray: false }],
      ['content:encoded', 'contentEncoded'],
    ]
  },
  xml2js: { strict: false },
});

// HPE — 커스텀 XML 직접 fetch
async function fetchHPE() {
  return new Promise((resolve, reject) => {
    https.get('https://investors.hpe.com/rss/news', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const items = [];
        const regex = /<item>([\s\S]*?)<\/item>/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
          const block = match[1];
          const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                         block.match(/<title>(.*?)<\/title>/))?.[1]?.trim() ?? '';
          const link  = (block.match(/<link>(.*?)<\/link>/) ||
                         block.match(/<guid[^>]*>(.*?)<\/guid>/))?.[1]?.trim() ?? '';
          const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim() ?? '';
          const description = (block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                               block.match(/<description>([\s\S]*?)<\/description>/))?.[1]?.trim() ?? '';
          if (title && link) items.push({ title, link, pubDate, contentSnippet: description });
        }
        resolve(items);
      });
    }).on('error', reject).setTimeout(15000, () => reject(new Error('timeout')));
  });
}

// VAST Data — 공식 블로그 직접 fetch (WordPress JSON API)
async function fetchVAST() {
  return new Promise((resolve, reject) => {
    https.get('https://www.vastdata.com/wp-json/wp/v2/posts?per_page=20&orderby=date&order=desc', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const posts = JSON.parse(data);
          const items = posts.map(p => ({
            title: p.title?.rendered?.replace(/<[^>]*>/g, '') ?? '',
            link: p.link ?? '',
            pubDate: p.date ?? '',
            contentSnippet: p.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() ?? '',
          }));
          resolve(items);
        } catch (e) {
          resolve([]); // JSON 실패 시 빈 배열
        }
      });
    }).on('error', () => resolve([])).setTimeout(15000, () => resolve([]));
  });
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
    const dateStr = item.pubDate ?? item.isoDate ?? item.date ?? '';
    if (!dateStr) return false;
    return new Date(dateStr) >= FILTER_FROM;
  }).slice(0, 20);

  console.log(`  → 2026년 이후: ${filtered.length}개`);

  for (const item of filtered) {
    const link = item.link ?? item.guid ?? '';
    if (!link || fetchedUrls.has(link)) continue;

    console.log(`  번역: ${item.title}`);
    try {
      const translated = await translateWithClaude(
        item.title ?? '',
        item.contentSnippet ?? item.summary ?? item.description ?? ''
      );
      const dateStr = item.pubDate ?? item.isoDate ?? item.date ?? new Date().toISOString();
      newItems.push({
        id: Buffer.from(link).toString('base64').slice(0, 16),
        title: translated.title,
        summary: translated.summary,
        category,
        source,
        sourceUrl: link,
        date: new Date(dateStr).toISOString().slice(0, 10),
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

  // 1. Dell RSS
  try {
    console.log('📡 RSS 수집: Dell');
    const parsed = await dellParser.parseURL('https://www.dell.com/en-us/blog/feed/');
    await processItems(parsed.items ?? [], 'Dell', '서버', fetchedUrls, newItems);
  } catch (e) { console.error(`Dell 실패: ${e.message}`); }

  // 2. HPE 커스텀 XML
  try {
    console.log('📡 RSS 수집: HPE');
    const items = await fetchHPE();
    await processItems(items, 'HPE', 'HPC·서버', fetchedUrls, newItems);
  } catch (e) { console.error(`HPE 실패: ${e.message}`); }

  // 3. VAST Data WordPress API
  try {
    console.log('📡 RSS 수집: VAST Data');
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