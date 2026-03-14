const Parser = require('rss-parser');
const fs = require('fs');

const RSS_FEEDS = [
  { url: 'https://vastdata.com/blog/feed', source: 'VAST Data', category: '스토리지' },
  { url: 'https://www.hpe.com/h41271/rss.aspx?section=pressreleases&cc=us&ll=en', source: 'HPE', category: 'HPC·서버' },
  { url: 'https://www.dell.com/en-us/blog/feed/', source: 'Dell', category: '서버' },
];

const DATA_FILE = 'src/data/news-auto.json';

async function translateWithClaude(title, summary) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `다음 IT 뉴스를 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요.

제목: ${title}
내용: ${summary}

응답 형식:
{"title": "한글 제목", "summary": "한글 요약 2~3문장"}`,
      }],
    }),
  });
  const data = await res.json();
  const text = data.content[0].text.trim();
  return JSON.parse(text);
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

      for (const item of parsed.items.slice(0, 5)) {
        if (!item.link || fetchedUrls.has(item.link)) continue;

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
            date: item.pubDate
              ? new Date(item.pubDate).toISOString().slice(0, 10)
              : new Date().toISOString().slice(0, 10),
          });
          fetchedUrls.add(item.link);

          // API 과부하 방지
          await new Promise(r => setTimeout(r, 1000));
        } catch (e) {
          console.error(`  번역 실패: ${item.title}`, e.message);
        }
      }
    } catch (e) {
      console.error(`RSS 수집 실패: ${feed.source}`, e.message);
    }
  }

  if (newItems.length > 0) {
    const result = {
      fetchedUrls: [...fetchedUrls],
      items: [...newItems, ...(existing.items ?? [])].slice(0, 100),
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`✅ ${newItems.length}개 새 뉴스 추가됨`);
  } else {
    console.log('새 뉴스 없음');
  }
}

main().catch(console.error);