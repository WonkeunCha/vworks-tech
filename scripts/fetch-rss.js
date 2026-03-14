const Parser = require('rss-parser');
const fs = require('fs');

const RSS_FEEDS = [
  { url: 'https://investors.hpe.com/rss/news', source: 'HPE', category: 'HPC·서버' },
  { url: 'https://www.dell.com/en-us/blog/feed/', source: 'Dell', category: '서버' },
  // VAST Data — 공식 블로그 RSS 미제공, PR Newswire 통해 수집
  { url: 'https://www.prnewswire.com/rss/news-releases-list.rss?company=vast-data', source: 'VAST Data', category: '스토리지' },
];

const DATA_FILE = 'src/data/news-auto.json';
const FILTER_FROM = new Date('2026-01-01T00:00:00Z');

// XML 파싱 오류 허용 옵션
const parserOptions = {
  timeout: 15000,
  customFields: { item: ['description', 'summary'] },
  xml2js: { strict: false, trim: true },
};

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

async function tryParseRSS(parser, url) {
  try {
    return await parser.parseURL(url);
  } catch (e) {
    console.log(`  기본 파싱 실패, 관대한 모드로 재시도: ${e.message}`);
    // 관대한 파서로 재시도
    const lenientParser = new Parser({
      timeout: 15000,
      xml2js: { strict: false, trim: true, normalize: true },
    });
    return await lenientParser.parseURL(url);
  }
}

async function main() {
  if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data', { recursive: true });
  }

  const existing = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : { items: [], fetchedUrls: [] };

  const fetchedUrls = new Set(existing.fetchedUrls ?? []);
  const newItems = [];
  const parser = new Parser(parserOptions);

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`📡 RSS 수집: ${feed.source} (${feed.url})`);
      const parsed = await tryParseRSS(parser, feed.url);

      const filtered = (parsed.items ?? [])
        .slice(0, 50)
        .filter(item => {
          if (!item.pubDate && !item.isoDate) return false;
          const date = new Date(item.pubDate ?? item.isoDate);
          return date >= FILTER_FROM;
        });

      console.log(`  → 2026년 이후 게시글: ${filtered.length}개`);

      for (const item of filtered) {
        const link = item.link ?? item.guid;
        if (!link || fetchedUrls.has(link)) continue;

        const rawSummary = item.contentSnippet ?? item.summary ?? item.description ?? item.title ?? '';
        console.log(`  번역 중: ${item.title}`);
        try {
          const translated = await translateWithClaude(item.title ?? '', rawSummary);
          newItems.push({
            id: Buffer.from(link).toString('base64').slice(0, 16),
            title: translated.title,
            summary: translated.summary,
            category: feed.category,
            source: feed.source,
            sourceUrl: link,
            date: new Date(item.pubDate ?? item.isoDate).toISOString().slice(0, 10),
          });
          fetchedUrls.add(link);
          console.log(`  ✅ ${translated.title}`);
          await new Promise(r => setTimeout(r, 500));
        } catch (e) {
          console.error(`  ❌ 번역 실패: ${e.message}`);
          fetchedUrls.add(link);
        }
      }
    } catch (e) {
      console.error(`RSS 수집 실패: ${feed.source} — ${e.message}`);
    }
  }

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