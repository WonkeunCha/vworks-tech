const fs = require('fs');
const https = require('https');
const http = require('http');

const DATA_FILE = 'src/data/news-auto.json';
const FILTER_FROM = new Date('2026-01-01T00:00:00Z');

// 범용 HTTP GET
function httpGet(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
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

// HTML 태그 및 엔티티 제거
function stripHTML(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8209;/g, '-')          // non-breaking hyphen → 일반 하이픈
    .replace(/&#8211;/g, '-')          // en dash
    .replace(/&#8212;/g, '-')          // em dash
    .replace(/&#\d+;/g, '')            // 나머지 숫자 엔티티
    .replace(/&[a-zA-Z]+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// XML 태그 추출
function extractTag(xml, tag) {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'),
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'),
  ];
  for (const re of patterns) {
    const m = xml.match(re);
    if (m) return stripHTML(m[1]).trim();
  }
  return '';
}

// RSS XML 파싱
function parseXML(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const b = m[1];
    const title = extractTag(b, 'title');
    const link = extractTag(b, 'link') || extractTag(b, 'guid');
    const pubDate = extractTag(b, 'pubDate') || extractTag(b, 'dc:date');
    const desc = extractTag(b, 'description') || extractTag(b, 'summary');
    if (title && link) items.push({ title, link, pubDate, description: desc });
  }
  return items;
}

// Dell — Key takeaways 추출
async function fetchDellContent(url) {
  try {
    const html = await httpGet(url);
    const text = stripHTML(html);
    // "Key takeaways:" 이후 내용 추출
    const keyIdx = text.indexOf('Key takeaways:');
    if (keyIdx !== -1) {
      // Key takeaways 부터 "About the Author" 또는 "You may also like" 전까지
      const endMarkers = ['About the Author', 'You may also like', 'Topics in this article'];
      let endIdx = text.length;
      for (const marker of endMarkers) {
        const idx = text.indexOf(marker, keyIdx + 100);
        if (idx !== -1 && idx < endIdx) endIdx = idx;
      }
      return text.slice(keyIdx, endIdx).slice(0, 2000);
    }
    // Key takeaways 없으면 본문 앞부분
    const bodyIdx = text.indexOf('By ');
    return text.slice(bodyIdx > -1 ? bodyIdx : 0, 2000);
  } catch (e) {
    console.error(`  Dell 본문 fetch 실패: ${e.message}`);
    return '';
  }
}

// VAST Data — 전체 블로그 본문 추출
async function fetchVASTContent(url) {
  try {
    const html = await httpGet(url);
    const text = stripHTML(html);
    // "Perspectives" 또는 날짜 이후 본문 시작, 푸터 전까지
    const startMarkers = ['Perspectives', 'For the last', 'For years', 'The '];
    const endMarkers = ['More from this topic', 'Learn what VAST', 'Sign up for our newsletter', 'Contact Sales'];
    let startIdx = 0;
    for (const marker of startMarkers) {
      const idx = text.indexOf(marker);
      if (idx !== -1) { startIdx = idx; break; }
    }
    let endIdx = text.length;
    for (const marker of endMarkers) {
      const idx = text.indexOf(marker, startIdx + 200);
      if (idx !== -1 && idx < endIdx) endIdx = idx;
    }
    return text.slice(startIdx, endIdx).slice(0, 5000);
  } catch (e) {
    console.error(`  VAST 본문 fetch 실패: ${e.message}`);
    return '';
  }
}

// HPE — 실제 보도자료 URL 찾아서 본문 추출
async function fetchHPEContent(rssLink) {
  try {
    // investors.hpe.com RSS 페이지에서 실제 기사 링크 찾기
    const html = await httpGet(rssLink);
    const text = stripHTML(html);
    // 보도자료 본문: "HOUSTON" 또는 회사명으로 시작
    const startMarkers = ['HOUSTON', 'SAN JOSE', 'PALO ALTO', 'PR Newswire', 'Business Wire', 'Hewlett Packard Enterprise'];
    const endMarkers = ['About Hewlett Packard Enterprise', 'Forward-Looking Statements', 'CONTACT:', '###'];
    let startIdx = 0;
    for (const marker of startMarkers) {
      const idx = text.indexOf(marker);
      if (idx !== -1) { startIdx = idx; break; }
    }
    let endIdx = text.length;
    for (const marker of endMarkers) {
      const idx = text.indexOf(marker, startIdx + 100);
      if (idx !== -1 && idx < endIdx) endIdx = idx;
    }
    const content = text.slice(startIdx, endIdx).slice(0, 2000);
    return content || text.slice(0, 1500);
  } catch (e) {
    console.error(`  HPE 본문 fetch 실패: ${e.message}`);
    return '';
  }
}

async function translateWithClaude(title, content, source) {
  let prompt = '';

  if (source === 'Dell') {
    prompt = `다음은 Dell Technologies 블로그의 영문 기사입니다. "Key takeaways" 항목을 중심으로 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 없이 순수 JSON만 출력하세요.

제목: ${title}
내용: ${content.slice(0, 2000)}

형식: {"title":"한글 제목","summary":"Key takeaways 내용을 한국어로 번역한 주요 포인트 (4~6문장)"}`;
  } else if (source === 'VAST Data') {
    prompt = `다음은 VAST Data 블로그의 영문 기사입니다. 전체 내용을 핵심 위주로 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 없이 순수 JSON만 출력하세요.

제목: ${title}
내용: ${content.slice(0, 2500)}

형식: {"title":"한글 제목","summary":"블로그 전체 핵심 내용을 한국어로 상세하게 번역 (6~8문장)"}`;
  } else {
    prompt = `다음은 HPE(Hewlett Packard Enterprise)의 영문 보도자료입니다. 주요 내용을 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 없이 순수 JSON만 출력하세요.

제목: ${title}
내용: ${content.slice(0, 2000)}

형식: {"title":"한글 제목","summary":"보도자료 주요 내용을 한국어로 번역 (4~6문장)"}`;
  }

  const body = JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 800,
    messages: [{ role: 'user', content: prompt }],
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
    if (!link || fetchedUrls.has(link)) continue;

    console.log(`  원문 fetch: ${item.title}`);
    let content = '';
    try {
      if (source === 'Dell') content = await fetchDellContent(link);
      else if (source === 'VAST Data') content = await fetchVASTContent(link);
      else content = await fetchHPEContent(link);
    } catch (e) {
      content = item.description ?? '';
    }

    console.log(`  번역: ${item.title} (${content.length}자)`);
    try {
      const translated = await translateWithClaude(item.title, content || item.description || '', source);
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
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`  ❌ ${e.message}`);
    }
  }
}

async function main() {
  if (!fs.existsSync('src/data')) fs.mkdirSync('src/data', { recursive: true });

  const existing = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : { items: [], fetchedUrls: [] };

  // HPE, Dell 한글 깨짐 수정을 위해 재번역, VAST는 유지
  const fetchedUrls = new Set(
    (existing.fetchedUrls ?? []).filter(url =>
      !url.includes('investors.hpe.com') &&
      !url.includes('dell.com')
    )
  );
  // HPE, Dell 기존 아이템 제거 (재번역)
  existing.items = (existing.items ?? []).filter(i =>
    i.source !== 'HPE' && i.source !== 'Dell'
  );
  const newItems = [];

  try {
    console.log('📡 Dell RSS 수집');
    const xml = await httpGet('https://www.dell.com/en-us/blog/feed/');
    const items = parseXML(xml);
    console.log(`  수집: ${items.length}개`);
    await processItems(items, 'Dell', '서버', fetchedUrls, newItems);
  } catch (e) { console.error(`Dell 실패: ${e.message}`); }

  try {
    console.log('📡 HPE RSS 수집');
    const xml = await httpGet('https://investors.hpe.com/rss/news');
    const items = parseXML(xml);
    console.log(`  수집: ${items.length}개`);
    await processItems(items, 'HPE', 'HPC·서버', fetchedUrls, newItems);
  } catch (e) { console.error(`HPE 실패: ${e.message}`); }

  try {
    console.log('📡 VAST Data 블로그 RSS 수집');
    // Contentful API 대신 VAST 블로그 sitemap에서 최신 글 직접 수집
    const sitemapXml = await httpGet('https://www.vastdata.com/sitemap.xml');
    const urlRe = /<loc>(https:\/\/www\.vastdata\.com\/blog\/[^<]+)<\/loc>/g;
    const lastmodRe = /<lastmod>([^<]+)<\/lastmod>/g;
    const urls = []; let m;
    while ((m = urlRe.exec(sitemapXml)) !== null) urls.push(m[1]);
    const dates = []; let d;
    while ((d = lastmodRe.exec(sitemapXml)) !== null) dates.push(d[1]);

    const items = urls.map((url, i) => ({
      title: url.split('/blog/')[1]?.replace(/-/g, ' ') ?? '',
      link: url,
      pubDate: dates[i] ?? '',
      description: '',
    })).filter(i => i.link && i.pubDate);

    console.log(`  수집: ${items.length}개`);
    await processItems(items, 'VAST Data', '스토리지', fetchedUrls, newItems);
  } catch (e) { console.error(`VAST 실패: ${e.message}`); }

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