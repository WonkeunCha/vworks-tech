const fs = require('fs');
const https = require('https');
const http = require('http');
const iconv = require('iconv-lite');
const path = require('path');



const DATA_FILE = 'src/data/news-auto.json';
const ARCHIVE_DIR = 'public/data';
const MANIFEST_FILE = 'public/data/news-manifest.json';
const FILTER_FROM = new Date('2025-01-01T00:00:00Z');
const MAX_RECENT = 200;        // SSR 빌드용 최근 기사 수
const VAST_CHECK_LIMIT = 30;   // VAST Data 블로그 페이지 체크 수 (1년치 누적)
const VAST_YEAR_BACK = 365;    // VAST Data 수집 범위 (일)

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

// 분기 키 생성 (예: "2026-Q1")
function getQuarterKey(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const quarter = Math.ceil((d.getMonth() + 1) / 3);
    return `${year}-Q${quarter}`;
  } catch {
    return null;
  }
}

// ============================================================
// 벤더별 본문 추출
// ============================================================

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

function extractVASTDate(html) {
  const jsonLdMatch = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  if (jsonLdMatch) return jsonLdMatch[1];
  const metaMatch = html.match(/article:published_time.*?content="([^"]+)"/i) ||
                    html.match(/datePublished.*?content="([^"]+)"/i);
  if (metaMatch) return metaMatch[1];
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

// ============================================================
// Claude 번역
// ============================================================

async function translateWithClaude(title, content, source) {
  let prompt = '';
  if (source === 'Dell') {
    prompt = `다음은 Dell Technologies 블로그의 영문 기사입니다. "Key takeaways" 항목을 중심으로 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 없이 순수 JSON만 출력하세요.\n\n제목: ${title}\n내용: ${content.slice(0, 2000)}\n\n형식: {"title":"한글 제목","summary":"Key takeaways 내용을 한국어로 번역한 주요 포인트 (4~6문장)"}`;
  } else if (source === 'VAST Data') {
    prompt = `다음은 VAST Data 블로그의 영문 기사입니다. 전체 내용을 핵심 위주로 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 없이 순수 JSON만 출력하세요.\n\n제목: ${title}\n내용: ${content.slice(0, 2500)}\n\n형식: {"title":"한글 제목","summary":"블로그 전체 핵심 내용을 한국어로 상세하게 번역 (6~8문장)"}`;
  } else if (source === 'SecurityWeek' || source === 'BleepingComputer') {
    prompt = `다음은 글로벌 사이버보안 뉴스입니다. 핵심 내용을 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 없이 순수 JSON만 출력하세요.\n\n제목: ${title}\n내용: ${content.slice(0, 2000)}\n\n형식: {"title":"한글 제목","summary":"보안 위협/취약점/사건의 핵심 내용을 한국어로 번역 (4~6문장)"}`;
  } else {
    prompt = `다음은 HPE(Hewlett Packard Enterprise)의 영문 기사입니다. 주요 내용을 자연스러운 한국어로 번역해주세요. JSON 형식으로만 응답하세요. 마크다운 없이 순수 JSON만 출력하세요.\n\n제목: ${title}\n내용: ${content.slice(0, 2000)}\n\n형식: {"title":"한글 제목","summary":"주요 내용을 한국어로 번역 (4~6문장)"}`;
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

// ============================================================
// RSS 처리 (Dell, HPE, SecurityWeek, BleepingComputer)
// ============================================================

async function processItems(items, source, category, fetchedUrls, newItems) {
  const filtered = items.filter(item => {
    if (!item.pubDate) return false;
    try { return new Date(item.pubDate) >= FILTER_FROM; } catch { return false; }
  }).slice(0, 20);

  console.log(`  → 필터 통과: ${filtered.length}개`);

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

// ============================================================
// VAST Data — 블로그 리스팅 + sitemap 결합 (최근 1년)
// ============================================================

async function fetchVASTBlogList(fetchedUrls) {
  const items = [];
  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - VAST_YEAR_BACK);

  // 1단계: 블로그 리스팅 페이지에서 슬러그 추출
  let slugsFromListing = [];
  try {
    console.log('  블로그 리스팅 페이지 fetch...');
    const html = await httpGet('https://www.vastdata.com/blog');
    const urlMatches = html.match(/href="\/blog\/([a-z0-9-]+)"/gi) || [];
    slugsFromListing = [...new Set(urlMatches.map(m => {
      const slug = m.match(/\/blog\/([a-z0-9-]+)/i)?.[1];
      return slug;
    }).filter(Boolean))];
    console.log(`  리스팅에서 ${slugsFromListing.length}개 슬러그 발견`);
  } catch (e) {
    console.error(`  리스팅 실패: ${e.message}`);
  }

  // 2단계: sitemap에서 추가 슬러그 수집
  let slugsFromSitemap = [];
  try {
    console.log('  sitemap.xml fetch...');
    const sitemapXml = await httpGet('https://www.vastdata.com/sitemap.xml');
    const urlRe = /<loc>(https:\/\/www\.vastdata\.com\/blog\/([^<]+))<\/loc>/g;
    let m;
    while ((m = urlRe.exec(sitemapXml)) !== null) {
      const slug = m[2];
      if (slug && !slug.includes('/')) slugsFromSitemap.push(slug);
    }
    console.log(`  sitemap에서 ${slugsFromSitemap.length}개 슬러그 발견`);
  } catch (e) {
    console.error(`  sitemap 실패: ${e.message}`);
  }

  // 리스팅 우선 + sitemap 보충 (중복 제거)
  const allSlugs = [...new Set([...slugsFromListing, ...slugsFromSitemap])];
  console.log(`  총 고유 슬러그: ${allSlugs.length}개, 체크 한도: ${VAST_CHECK_LIMIT}개`);

  // 3단계: 각 블로그 페이지에서 날짜 추출 (최대 VAST_CHECK_LIMIT개)
  let checked = 0;
  for (const slug of allSlugs) {
    if (checked >= VAST_CHECK_LIMIT) break;
    const blogUrl = `https://www.vastdata.com/blog/${slug}`;
    if (fetchedUrls.has(blogUrl)) continue;

    try {
      const blogHtml = await httpGet(blogUrl);
      const dateStr = extractVASTDate(blogHtml);
      if (dateStr) {
        const pubDate = new Date(dateStr);
        if (!isNaN(pubDate.getTime()) && pubDate >= oneYearAgo) {
          const title = slug.replace(/-/g, ' ');
          items.push({
            title,
            link: blogUrl,
            pubDate: pubDate.toISOString(),
            description: '',
            _html: blogHtml,
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
  return items;
}

async function processVASTItems(items, fetchedUrls, newItems) {
  console.log(`  → VAST Data 처리 대상: ${items.length}개`);

  for (const item of items) {
    const link = item.link ?? '';
    if (!link || fetchedUrls.has(link)) continue;

    console.log(`  원문 fetch: ${item.title}`);
    let content = '';
    try {
      if (item._html) {
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

// ============================================================
// 분기별 아카이브 저장
// ============================================================

function loadAllArchiveItems() {
  const allItems = [];
  if (!fs.existsSync(ARCHIVE_DIR)) return allItems;

  const files = fs.readdirSync(ARCHIVE_DIR).filter(f => f.startsWith('news-') && f.endsWith('.json') && f !== 'news-manifest.json');
  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(ARCHIVE_DIR, file), 'utf-8'));
      if (Array.isArray(data.items)) {
        allItems.push(...data.items);
      }
    } catch (e) {
      console.error(`  아카이브 읽기 실패: ${file} — ${e.message}`);
    }
  }
  return allItems;
}

function saveQuarterlyArchives(allItems) {
  if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

  // 분기별 그룹화
  const quarters = {};
  allItems.forEach(item => {
    const qKey = getQuarterKey(item.date);
    if (!qKey) return;
    if (!quarters[qKey]) quarters[qKey] = [];
    quarters[qKey].push(item);
  });

  // 각 분기 파일 저장
  const manifest = { quarters: [], totalItems: allItems.length, lastUpdated: new Date().toISOString() };

  for (const [qKey, items] of Object.entries(quarters)) {
    const sorted = items.sort((a, b) => b.date.localeCompare(a.date));
    const filename = `news-${qKey}.json`;
    const filepath = path.join(ARCHIVE_DIR, filename);

    const sourceCounts = {};
    sorted.forEach(i => { sourceCounts[i.source] = (sourceCounts[i.source] || 0) + 1; });

    const data = { quarter: qKey, items: sorted, sources: sourceCounts };
    const jsonStr = JSON.stringify(data, null, 2)
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
        const code = parseInt(hex, 16);
        if ((code >= 0xAC00 && code <= 0xD7A3) ||
            (code >= 0x1100 && code <= 0x11FF) ||
            (code >= 0x3130 && code <= 0x318F)) {
          return String.fromCharCode(code);
        }
        return `\\u${hex}`;
      });
    fs.writeFileSync(filepath, jsonStr, 'utf-8');
    console.log(`  📁 ${filename}: ${sorted.length}건 (${JSON.stringify(sourceCounts)})`);

    manifest.quarters.push({
      key: qKey,
      file: filename,
      count: sorted.length,
      sources: sourceCounts,
      dateRange: { from: sorted[sorted.length - 1]?.date, to: sorted[0]?.date },
    });
  }

  // 분기 정렬 (최신순)
  manifest.quarters.sort((a, b) => b.key.localeCompare(a.key));

  // 매니페스트 저장
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`  📋 매니페스트: ${manifest.quarters.length}개 분기, 총 ${manifest.totalItems}건`);
}

// ============================================================
// 메인
// ============================================================

async function main() {
  if (!fs.existsSync('src/data')) fs.mkdirSync('src/data', { recursive: true });
  if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

  // 기존 데이터 로드 (최근 JSON + 모든 아카이브)
  const existingRecent = fs.existsSync(DATA_FILE)
    ? JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    : { items: [], fetchedUrls: [] };

  const archiveItems = loadAllArchiveItems();

  // 모든 기존 아이템 합치기 (중복 제거)
  const allExistingMap = new Map();
  [...(existingRecent.items ?? []), ...archiveItems].forEach(item => {
    if (item.sourceUrl) allExistingMap.set(item.sourceUrl, item);
    else if (item.id) allExistingMap.set(item.id, item);
  });
  const allExistingItems = [...allExistingMap.values()];
  console.log(`📦 기존 전체: ${allExistingItems.length}건 (최근 ${existingRecent.items?.length ?? 0} + 아카이브 ${archiveItems.length})`);

  // fetchedUrls: 실제 존재하는 아이템의 URL만 유지 (유령 URL 방지)
  const existingItemUrls = new Set(allExistingItems.map(i => i.sourceUrl).filter(Boolean));
  const fetchedUrls = new Set(
    (existingRecent.fetchedUrls ?? []).filter(url => existingItemUrls.has(url))
  );
  console.log(`📦 fetchedUrls: ${fetchedUrls.size}개 (정리됨, 이전 ${existingRecent.fetchedUrls?.length ?? 0}개)`);

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

  // VAST Data 블로그 (최근 1년)
  try {
    console.log('📡 VAST Data 블로그 수집 (최근 1년)');
    const vastItems = await fetchVASTBlogList(fetchedUrls);
    console.log(`  수집: ${vastItems.length}개`);
    await processVASTItems(vastItems, fetchedUrls, newItems);
  } catch (e) { console.error(`VAST 실패: ${e.message}`); }

  // 보안 뉴스 — 글로벌
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

  // 보안뉴스 — 한국어
  try {
    console.log('📡 보안뉴스 RSS 수집');
    const xml = await httpGetWithEncoding('https://www.boannews.com/media/news_rss.xml');
    const rawItems = parseXML(xml);
    console.log(`  수집: ${rawItems.length}개`);
    const filtered = rawItems.filter(item => {
      if (!item.pubDate) return false;
      try { return new Date(item.pubDate) >= FILTER_FROM; } catch { return false; }
    }).slice(0, 10);
    console.log(`  → 필터 통과: ${filtered.length}개`);
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

  // 전체 아이템 합치기 (새 + 기존, 중복 제거)
  const finalMap = new Map();
  [...newItems, ...allExistingItems].forEach(item => {
    const key = item.sourceUrl || item.id;
    if (key && !finalMap.has(key)) finalMap.set(key, item);
  });
  const allFinalItems = [...finalMap.values()]
    .sort((a, b) => b.date.localeCompare(a.date));

  console.log(`📊 전체 누적: ${allFinalItems.length}건`);

  // 소스별 통계
  const sourceCounts = {};
  allFinalItems.forEach(i => { sourceCounts[i.source] = (sourceCounts[i.source] || 0) + 1; });
  console.log(`📊 소스별:`, JSON.stringify(sourceCounts));

  // 1. 분기별 아카이브 저장 (public/data/)
  console.log('\n📁 분기별 아카이브 저장...');
  saveQuarterlyArchives(allFinalItems);

  // 2. 최근 항목 저장 (src/data/news-auto.json) — SSR 빌드용
  const recentItems = allFinalItems.slice(0, MAX_RECENT);
  const recentItemUrls = new Set(recentItems.map(i => i.sourceUrl).filter(Boolean));
  // fetchedUrls는 전체 아이템 기준으로 동기화
  const allFinalUrls = new Set(allFinalItems.map(i => i.sourceUrl).filter(Boolean));
  const syncedFetchedUrls = [...fetchedUrls].filter(url => allFinalUrls.has(url));

  const recentData = {
    fetchedUrls: syncedFetchedUrls,
    items: recentItems,
    totalItems: allFinalItems.length,
    hasArchive: allFinalItems.length > MAX_RECENT,
  };

  const jsonStr = JSON.stringify(recentData, null, 2)
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
  console.log(`\n✅ 완료: 최근 ${recentItems.length}건 (SSR), 전체 ${allFinalItems.length}건 (아카이브)`);
}

main().catch(console.error);