const Parser = require('rss-parser');
const fs = require('fs');

const RSS_FEEDS = [
  { url: 'https://vastdata.com/blog/feed', source: 'VAST Data', category: '스토리지' },
  { url: 'https://www.hpe.com/h41271/rss.aspx?section=pressreleases&cc=us&ll=en', source: 'HPE', category: 'HPC·서버' },
  { url: 'https://www.dell.com/en-us/blog/feed/', source: 'Dell', category: '서버' },
];

const DATA_FILE = 'src/data/news-auto.json';
const FILTER_FROM = new Date('2026-01-01T00:00:00Z');

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
        content: `Translate this IT news to Korean. Reply ONLY with valid JSON, no markdown, no explanation.

Title: ${title}
Summary: ${summary.slice(0, 300)}

Required format: {"title":"한글제목","summary":"한글요약 2문장"}`,
      }],
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const text = data.content[0].text.trim();
  // JSON만 추출
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('JSON not found in response');
  return JSON.parse(match[0]);
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
  const parser = new Parser({ timeout: 10000 });

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`📡 RSS 수집: ${feed.source}`);
      const parsed = await parser.parseURL(feed.url);

      const filtered = parsed.items
        .slice(0, 50)
        .filter(item => {
          if (!item.pubDate) return false;
          return new Date(item.pubDate) >= FILTER_FROM;
        });

      console.log(`  → 2026년 이후 게시글: ${filtered.length}개`);

      for (const item of filtered) {
        if (!item.link || fetchedUrls.has(item.link)) {
          console.log(`  건너뜀 (중복): ${item.title}`);
          continue;
        }

        console.log(`  번역 중: ${item.title}`);
        try {
          const translated = await translateWithClaude(
            item.title ?? '',
            item.contentSnippet ?? item.summary ?? item.title ?? ''
          );

          newItems.push({
            id: Buffer.from(item.link).toString('base64').slice(0, 16),
            title: translated.title,
            summary: translated.summary,
            category: feed.category,
            source: feed.source,
            sourceUrl: item.link,
            date: new Date(item.pubDate).toISOString().slice(0, 10),
          });
          fetchedUrls.add(item.link);
          console.log(`  ✅ 완료: ${translated.title}`);
          await new Promise(r => setTimeout(r, 500));
        } catch (e) {
          console.error(`  ❌ 번역 실패: ${item.title} — ${e.message}`);
          // 실패해도 URL은 기록해서 재시도 방지
          fetchedUrls.add(item.link);
        }
      }
    } catch (e) {
      console.error(`RSS 수집 실패: ${feed.source} — ${e.message}`);
    }
  }

  console.log(`\n총 ${newItems.length}개 새 뉴스 추가`);

  const allItems = [...newItems, ...(existing.items ?? [])]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 100);

  const result = {
    fetchedUrls: [...fetchedUrls],
    items: allItems,
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(result, null, 2), 'utf-8');
}

main().catch(console.error);