const fs = require('fs');
const https = require('https');
const http = require('http');
const iconv = require('iconv-lite');



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
      const chunks = [];
      res.on('data', chunk => chunks.push(Buffer.from(chunk)));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// Content-Type 헤더 + XML 선언 + 도메인 기반 인코딩 자동 감지 후 디코딩
function httpGetWithEncoding(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Accept': '*/*',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGetWithEncoding(res.headers.location, redirects + 1).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(Buffer.from(chunk)));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        const contentType = res.headers['content-type'] || '';
        const charsetMatch = contentType.match(/charset=([^\s;]+)/i);
        let charset = charsetMatch?.[1]?.toLowerCase() || '';
        if (!charset) {
          const head = buf.slice(0, 200).toString('binary');
          const xmlEnc = head.match(/encoding\s*=\s*["']([^"']+)["']/i);
          if (xmlEnc) charset = xmlEnc[1].toLowerCase();
        }
        if (!charset) {
          const isKoreanLegacySite = /boannews\.com|etnews\.com|zdnet\.co\.kr|dt\.co\.kr/i.test(url);
          charset = isKoreanLegacySite ? 'euc-kr' : 'utf-8';
        }
        if (charset.includes('euc-kr') || charset.includes('cp949') || charset.includes('euc_kr') || charset.includes('ks_c_5601')) {
          resolve(iconv.decode(buf, 'euc-kr'));
        } else {
          resolve(buf.toString('utf-8'));
        }
      });
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
    .replace(/&#8209;/g, '-')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '-')
    .replace(/&#([0-9]+);/g, (_, code) => {
      const n = parseInt(code, 10);
      if ((n >= 0xAC00 && n <= 0xD7A3) ||
          (n >= 0x1100 && n <= 0x11FF) ||
          (n >= 0x3130 && n <= 0x318F)) {
        return String.fromCharCode(n);
      }
      return '';
    })
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
    const pubDate = extractTag(b, 'pubDate') ||
      (b.match(/<dc:date>([\s\S]*?)<\/dc:date>/i)?.[1]?.trim() ?? '');
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
    const keyIdx = text.indexOf('Key takeaways:');
    if (keyIdx !== -1) {
      const endMarkers = ['About the Author', 'You may also like', 'Topics in this article'];
      let endIdx = text.length;
      for (const marker of endMarkers) {
        const idx = text.indexOf(marker, keyIdx + 100);
        if (idx !== -1 && idx < endIdx) endIdx = idx;
      }
      return text.slice(keyIdx, endIdx).slice(0, 2000);
    }
    const bodyIdx = text.indexOf('By ');
    return text.slice(bodyIdx > -1 ? bodyIdx : 0, 2000);
  } catch (e) {
    console.error(`  Dell 본문 fetch 실패: ${e.message}`);
    return '';
  }
}

// VAST Data — 블로그 본문 추출 + 날짜 추출
async function fetchVASTContent(url) {
  try {
    const html = await httpGet(url);
    const text = stripHTML(html);

    const startMarkers = ['Perspectives', 'For the last', 'For years', 'The ', 'In ', 'At ', 'As '];
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

// VAST Data — 블로그 페이지에서 실제 게시일 추출
function extractVASTDate(html) {
  // JSON-LD에서 datePublished 추출
  const jsonLdMatch = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  if (jsonLdMatch) return jsonLdMatch[1];

  // meta 태그에서 날짜 추출
  const metaMatch = html.match(/article:published_time.*?content="([^"]+)"/i) ||
                    html.match(/datePublished.*?content="([^"]+)"/i);
  if (metaMatch) return metaMatch[1];

  // 본문에서 날짜 패턴 추출 (e.g., "March 15, 2026" or "2026-03-15")
  const datePatterns = [
    /(\d{4}-\d{2}-\d{2})/,
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/i,
  ];
  const text = stripHTML(html).slice(0, 3000);
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      try {
        const d = new Date(match[0]);
        if (!isNaN(d.getTime())) return d.toISOString();
      } catch {}
    }
  }
  return '';
}

// HPE — 뉴스룸 블로그 및 보도자료 본문 추출
async function fetchHPEContent(url) {
  try {
    const html = await httpGet(url);
    const text = stripHTML(html);
    const startMarkers = ['Blog Post', 'March ', 'February ', 'January ', 'April ', 'In this article', 'HOUSTON', 'SAN JOSE', 'Hewlett Packard Enterprise'];
    const endMarkers = ['Share this article', 'Related news', 'About Hewlett Packard Enterprise', 'Forward-Looking Statements', 'CONTACT:', '###'];
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
    return text.slice(startIdx, endIdx).slice(0, 2000) || text.slice(0, 1500);
  } catch (e) {
    console.error(`  HPE 본문 fetch 실패: ${e.message}`);
    return '';
  }
}

// 보안 뉴스 본문 추출 (SecurityWeek, BleepingComputer)
async function fetchSecurityContent(url) {
  try {
    const html = await httpGet(url);
    const text = stripHTML(html);
    const endMarkers = ['Related Articles', 'Tags:', 'About the Author', 'Subscribe to', 'Filed Under'];
    let endIdx = text.length;
    for (const marker of endMarkers) {
      const idx = text.indexOf(marker, 300);
      if (idx !== -1 && idx < endIdx) endIdx = idx;
    }
    return text.slice(0, endIdx).slice(0, 2000);
  } catch (e) {
    console.error(`  보안 본문 fetch 실패: ${e.message}`);
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

  } else if (source === 'SecurityWeek' || source === 'BleepingComputer') {
    prompt = `다음은 글로벌 사이버보안 뉴스입니다. 핵심 내용을 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 없이 순수 JSON만 출력하세요.

제목: ${title}
내용: ${content.slice(0, 2000)}

형식: {"title":"한글 제목","summary":"보안 위협/취약점/사건의 핵심 내용을 한국어로 번역 (4~6문장)"}`;

  } else {
    prompt = `다음은 HPE(Hewlett Packard Enterprise)의 영문 기사입니다. 주요 내용을 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 없이 순수 JSON만 출력하세요.

제목: ${title}
내용: ${content.slice(0, 2000)}

형식: {"title":"한글 제목","summary":"주요 내용을 한국어로 번역 (4~6문장)"}`;
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
      const chunks = [];
      res.on('data', chunk => chunks.push(Buffer.from(chunk)));
      res.on('end', () => {
        try {
          const json = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
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
      else if (source === 'HPE') content = await fetchHPEContent(link);
      else if (source === 'SecurityWeek' || source === 'BleepingComputer') content = await fetchSecurityContent(link);
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

// VAST Data — 블로그 리스팅 페이지에서 최신 글 추출
async function fetchVASTBlogList(fetchedUrls) {
  const items = [];
  try {
    console.log('  블로그 리스팅 페이지 fetch...');
    const html = await httpGet('https://www.vastdata.com/blog');

    // 블로그 URL 추출 (/blog/xxx 패턴)
    const urlMatches = html.match(/href="\/blog\/([a-z0-9-]+)"/gi) || [];
    const uniqueSlugs = [...new Set(urlMatches.map(m => {
      const slug = m.match(/\/blog\/([a-z0-9-]+)/i)?.[1];
      return slug;
    }).filter(Boolean))];

    console.log(`  블로그 슬러그 ${uniqueSlugs.length}개 발견`);

    // 각 블로그 페이지에서 실제 게시일 추출 (최대 10개만)
    let checked = 0;
    for (const slug of uniqueSlugs) {
      if (checked >= 10) break;
      const blogUrl = `https://www.vastdata.com/blog/${slug}`;
      if (fetchedUrls.has(blogUrl)) continue;

      try {
        const blogHtml = await httpGet(blogUrl);
        const dateStr = extractVASTDate(blogHtml);
        if (dateStr) {
          const pubDate = new Date(dateStr);
          if (!isNaN(pubDate.getTime()) && pubDate >= FILTER_FROM) {
            const title = slug.replace(/-/g, ' ');
            items.push({
              title,
              link: blogUrl,
              pubDate: pubDate.toISOString(),
              description: '',
              _html: blogHtml, // 본문 재사용을 위해 보존
            });
            console.log(`  📅 ${slug} → ${pubDate.toISOString().slice(0, 10)}`);
          }
        }
        checked++;
        await new Promise(r => setTimeout(r, 500));
      } catch (e) {
        console.error(`  ⚠️ ${slug} 접근 실패: ${e.message}`);
        checked++;
      }
    }
  } catch (e) {
    console.error(`  블로그 리스팅 실패: ${e.message}`);
    // 폴백: sitemap에서 랜덤 선택
    console.log('  폴백: sitemap.xml에서 수집 시도...');
    try {
      const sitemapXml = await httpGet('https://www.vastdata.com/sitemap.xml');
      const urlRe = /<loc>(https:\/\/www\.vastdata\.com\/blog\/[^<]+)<\/loc>/g;
      const urls = [];
      let m;
      while ((m = urlRe.exec(sitemapXml)) !== null) urls.push(m[1]);
      // fetchedUrls에 없는 URL만 선택, 랜덤 셔플
      const unfetched = urls.filter(u => !fetchedUrls.has(u));
      const shuffled = unfetched.sort(() => Math.random() - 0.5).slice(0, 5);
      for (const url of shuffled) {
        items.push({
          title: url.split('/blog/')[1]?.replace(/-/g, ' ') ?? '',
          link: url,
          pubDate: new Date().toISOString(), // 오늘 날짜 사용
          description: '',
        });
      }
    } catch (e2) {
      console.error(`  sitemap 폴백도 실패: ${e2.message}`);
    }
  }
  return items;
}

// VAST Data 전용 처리 — 본문 재사용 + 번역
async function processVASTItems(items, fetchedUrls, newItems) {
  console.log(`  → VAST Data 처리 대상: ${items.length}개`);

  for (const item of items) {
    const link = item.link ?? '';
    if (!link || fetchedUrls.has(link)) continue;

    console.log(`  원문 fetch: ${item.title}`);
    let content = '';
    try {
      if (item._html) {
        // 리스팅에서 이미 fetch한 HTML 재사용
        content = stripHTML(item._html).slice(0, 5000);
        const startMarkers = ['Perspectives', 'For the last', 'For years', 'The ', 'In ', 'At ', 'As '];
        const endMarkers = ['More from this topic', 'Learn what VAST', 'Sign up for our newsletter', 'Contact Sales'];
        let startIdx = 0;
        for (const marker of startMarkers) {
          const idx = content.indexOf(marker);
          if (idx !== -1) { startIdx = idx; break; }
        }
        let endIdx = content.length;
        for (const marker of endMarkers) {
          const idx = content.indexOf(marker, startIdx + 200);
          if (idx !== -1 && idx < endIdx) endIdx = idx;
        }
        content = content.slice(startIdx, endIdx).slice(0, 5000);
      } else {
        content = await fetchVASTContent(link);
      }
    } catch (e) {
      content = item.description ?? '';
    }

    if (!content || content.length < 100) {
      console.log(`  ⏩ 본문 부족, 스킵: ${item.title}`);
      continue;
    }

    console.log(`  번역: ${item.title} (${content.length}자)`);
    try {
      const translated = await translateWithClaude(item.title, content, 'VAST Data');
      newItems.push({
        id: Buffer.from(link).toString('base64').slice(0, 16),
        title: translated.title,
        summary: translated.summary,
        category: '스토리지',
        source: 'VAST Data',
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

  // ✅ 기존 수집된 URL 유지 — 새 기사만 수집 (크레딧 절약)
  const fetchedUrls = new Set(existing.fetchedUrls ?? []);
  const newItems = [];

  // Dell RSS
  try {
    console.log('📡 Dell RSS 수집');
    const xml = await httpGet('https://www.dell.com/en-us/blog/feed/');
    const items = parseXML(xml);
    console.log(`  수집: ${items.length}개`);
    await processItems(items, 'Dell', '서버', fetchedUrls, newItems);
  } catch (e) { console.error(`Dell 실패: ${e.message}`); }

  // HPE 뉴스룸 공식 RSS
  try {
    console.log('📡 HPE 뉴스룸 RSS 수집');
    const xml = await httpGet('https://www.hpe.com/us/en/newsroom/rss.xml');
    const items = parseXML(xml);
    console.log(`  수집: ${items.length}개`);
    await processItems(items, 'HPE', 'HPC·서버', fetchedUrls, newItems);
  } catch (e) { console.error(`HPE 뉴스룸 실패: ${e.message}`); }

  // ★ VAST Data 블로그 — 리스팅 페이지 스크래핑 방식 (sitemap lastmod 버그 수정)
  try {
    console.log('📡 VAST Data 블로그 수집');
    const vastItems = await fetchVASTBlogList(fetchedUrls);
    console.log(`  수집: ${vastItems.length}개`);
    await processVASTItems(vastItems, fetchedUrls, newItems);
  } catch (e) { console.error(`VAST 실패: ${e.message}`); }

  // 보안 뉴스 — 글로벌 (영문 번역)
  for (const feed of [
    { url: 'https://feeds.feedburner.com/Securityweek', source: 'SecurityWeek', category: '보안' },
    { url: 'https://www.bleepingcomputer.com/feed/', source: 'BleepingComputer', category: '보안' },
  ]) {
    try {
      console.log(`📡 ${feed.source} RSS 수집`);
      const xml = await httpGet(feed.url);
      const items = parseXML(xml);
      console.log(`  수집: ${items.length}개`);
      await processItems(items, feed.source, feed.category, fetchedUrls, newItems);
    } catch (e) { console.error(`${feed.source} 실패: ${e.message}`); }
  }

  // 보안뉴스 — 한국어 (번역 없이 바로 저장)
  try {
    console.log('📡 보안뉴스 RSS 수집');
    const xml = await httpGetWithEncoding('https://www.boannews.com/media/news_rss.xml');
    const rawItems = parseXML(xml);
    console.log(`  수집: ${rawItems.length}개`);
    const filtered = rawItems.filter(item => {
      if (!item.pubDate) return false;
      try { return new Date(item.pubDate) >= FILTER_FROM; } catch { return false; }
    }).slice(0, 10);
    console.log(`  → 2026년 이후: ${filtered.length}개`);
    for (const item of filtered) {
      const link = item.link ?? '';
      if (!link || fetchedUrls.has(link)) continue;
      newItems.push({
        id: Buffer.from(link).toString('base64').slice(0, 16),
        title: item.title,
        summary: item.description || item.title,
        category: '보안',
        source: '보안뉴스',
        sourceUrl: link,
        date: new Date(item.pubDate).toISOString().slice(0, 10),
      });
      fetchedUrls.add(link);
      console.log(`  ✅ ${item.title}`);
    }
  } catch (e) { console.error(`보안뉴스 실패: ${e.message}`); }

  console.log(`\n총 ${newItems.length}개 새 뉴스 추가`);
  const result = {
    fetchedUrls: [...fetchedUrls],
    items: [...newItems, ...(existing.items ?? [])]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 100),
  };
  const jsonStr = JSON.stringify(result, null, 2)
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
      const code = parseInt(hex, 16);
      if ((code >= 0xAC00 && code <= 0xD7A3) ||
          (code >= 0x1100 && code <= 0x11FF) ||
          (code >= 0x3130 && code <= 0x318F)) {
        return String.fromCharCode(code);
      }
      return `\\u${hex}`;
    });
  fs.writeFileSync(DATA_FILE, jsonStr, 'utf-8');
}

main().catch(console.error);