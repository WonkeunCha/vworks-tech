/**
 * VAST Data 블로그 전체 번역 스크립트
 * 사용법: node scripts/translate-insight.js <blog-url>
 * 예: node scripts/translate-insight.js https://www.vastdata.com/blog/vast-fwd-2026-the-data-layer-behind-continuous-ai
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'insights.json');
const API_KEY = process.env.ANTHROPIC_API_KEY;

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml,*/*',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(Buffer.from(chunk)));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    }).on('error', reject);
  });
}

function extractArticle(html) {
  // script/style 제거
  let text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');

  // HTML 태그 제거하되 구조 유지
  text = text
    .replace(/<\/h[1-6][^>]*>/gi, '\n\n')
    .replace(/<h[1-6][^>]*>/gi, '\n## ')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/li>/gi, '')
    .replace(/<blockquote[^>]*>/gi, '\n> ')
    .replace(/<\/blockquote>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-zA-Z]+;/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // 본문 시작점 찾기
  const startMarkers = ['Authored by', 'Written by', 'By ', 'Perspectives', 'The ', 'In ', 'At ', 'As '];
  const endMarkers = ['More from this topic', 'Learn what VAST', 'Sign up for our newsletter', 'Contact Sales', 'Share this post', 'Related Posts'];

  let startIdx = 0;
  for (const marker of startMarkers) {
    const idx = text.indexOf(marker);
    if (idx !== -1 && idx < 500) { startIdx = idx; break; }
  }

  let endIdx = text.length;
  for (const marker of endMarkers) {
    const idx = text.indexOf(marker, startIdx + 200);
    if (idx !== -1 && idx < endIdx) endIdx = idx;
  }

  return text.slice(startIdx, endIdx).trim();
}

function extractMeta(html, articleText) {
  // 제목
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  let title = titleMatch ? titleMatch[1].replace(/\s*[-|].*$/, '').trim() : '';

  // 날짜
  const dateMatch = html.match(/"datePublished"\s*:\s*"([^"]+)"/) ||
    html.match(/article:published_time.*?content="([^"]+)"/i) ||
    articleText.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/i) ||
    articleText.match(/(\w{3}\s+\d{1,2},?\s+\d{4})/);
  let date = '';
  if (dateMatch) {
    try {
      const d = new Date(dateMatch[1] || dateMatch[0]);
      if (!isNaN(d.getTime())) date = d.toISOString().slice(0, 10);
    } catch {}
  }

  // 저자
  const authorMatch = articleText.match(/Authored by\s+([^\n]+)/i) ||
    articleText.match(/Written by\s+([^\n]+)/i);
  const author = authorMatch ? authorMatch[1].trim().replace(/,.*$/, '') : '';

  // OG 이미지
  const ogMatch = html.match(/property=["']og:image["'][^>]+content=["']([^"']+)/i) ||
    html.match(/og:image.*?content="([^"]+)"/i);
  const image = ogMatch ? ogMatch[1] : '';

  // 본문 이미지 추출 (heading 위치 기반 매핑)
  const headingPositions = [];
  const headingRe = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  let hm;
  while ((hm = headingRe.exec(html)) !== null) {
    const text = hm[1].replace(/<[^>]+>/g, '').trim();
    if (text.length > 3) headingPositions.push({ pos: hm.index, text });
  }

  const contentImages = [];
  const imgRe = /<img[^>]+src=["']([^"']+ctfassets[^"']+)["'][^>]*>/gi;
  let im;
  while ((im = imgRe.exec(html)) !== null) {
    const src = im[1].replace(/&amp;/g, '&');
    // 관련글 영역의 이미지 제외 (More from this topic 이후)
    const moreIdx = html.indexOf('More from this topic');
    if (moreIdx > 0 && im.index > moreIdx) continue;
    // 이 이미지 직전의 heading 찾기
    let afterHeading = '';
    for (const h of headingPositions) {
      if (h.pos < im.index) afterHeading = h.text;
    }
    contentImages.push({ src, afterHeading, pos: im.index });
  }

  return { title, date, author, image, contentImages };
}

async function translateWithClaude(title, content) {
  if (!API_KEY) throw new Error('ANTHROPIC_API_KEY 환경변수가 필요합니다');

  const prompt = `다음은 VAST Data 블로그의 영문 기술 기사입니다. 전체 내용을 한국어로 번역해주세요.

요구사항:
1. 기술 용어는 영문 그대로 유지 (예: GPU, QoS, multi-tenancy, inference, pipeline 등)
2. 고유명사는 원문 유지 (예: VAST, CoreWeave, Azure, NVIDIA 등)
3. 문장은 자연스러운 한국어로 번역
4. 원문의 구조(섹션, 단락)를 유지

JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요.

원문 제목: ${title}
원문 내용:
${content}

응답 형식:
{
  "title": "한글 제목",
  "sections": [
    {
      "heading": "섹션 제목 (있는 경우, 없으면 빈 문자열)",
      "paragraphs": ["단락1", "단락2", ...]
    }
  ],
  "keyPoints": ["핵심 포인트 1", "핵심 포인트 2", ...],
  "summary": "3-4문장의 전체 요약"
}`;

  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    });

    const req = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
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
          if (!match) return reject(new Error('JSON not found in response'));
          resolve(JSON.parse(match[0]));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(120000, () => { req.destroy(); reject(new Error('API timeout')); });
    req.write(body);
    req.end();
  });
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error('사용법: node scripts/translate-insight.js <blog-url>');
    console.error('예: node scripts/translate-insight.js https://www.vastdata.com/blog/vast-fwd-2026-the-data-layer-behind-continuous-ai');
    process.exit(1);
  }

  console.log(`📥 원문 가져오기: ${url}`);
  const html = await httpGet(url);
  const articleText = extractArticle(html);
  const meta = extractMeta(html, articleText);

  console.log(`📝 제목: ${meta.title}`);
  console.log(`📅 날짜: ${meta.date}`);
  console.log(`✍️  저자: ${meta.author}`);
  console.log(`📄 본문: ${articleText.length}자`);
  console.log(`🖼️  이미지: ${meta.contentImages.length}개 (본문), OG: ${meta.image ? 'Y' : 'N'}`);

  if (articleText.length < 200) {
    console.error('❌ 본문이 너무 짧습니다. JS SPA 페이지일 수 있습니다.');
    process.exit(1);
  }

  console.log(`\n🌐 Claude API로 번역 중...`);
  const translated = await translateWithClaude(meta.title, articleText);
  console.log(`✅ 번역 완료: ${translated.title}`);

  // 기존 데이터 로드
  let data = { articles: [] };
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }

  // 중복 확인
  const existingIdx = data.articles.findIndex(a => a.sourceUrl === url);

  // 섹션에 이미지 매핑 (heading 기준)
  if (meta.contentImages.length > 0 && translated.sections) {
    // 번역된 섹션의 원문 heading과 이미지의 afterHeading을 매핑
    // 첫 번째 이미지 → 첫 번째 섹션 (보통 인트로)
    // 나머지는 순서대로 이미지가 없는 섹션에 배치
    let imgIdx = 0;
    for (const section of translated.sections) {
      if (imgIdx < meta.contentImages.length) {
        section.image = meta.contentImages[imgIdx].src;
        imgIdx++;
        console.log(`  🖼️  섹션 "${section.heading || '인트로'}" ← 이미지 ${imgIdx}`);
      }
    }
  }

  const slug = url.split('/blog/')[1] || url.split('/').pop();
  const article = {
    id: slug,
    title: translated.title,
    originalTitle: meta.title,
    summary: translated.summary,
    keyPoints: translated.keyPoints,
    sections: translated.sections,
    source: 'VAST Data',
    sourceUrl: url,
    author: meta.author,
    date: meta.date,
    image: meta.image,
    translatedAt: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    data.articles[existingIdx] = article;
    console.log(`🔄 기존 글 업데이트: ${slug}`);
  } else {
    data.articles.unshift(article);
    console.log(`➕ 새 글 추가: ${slug}`);
  }

  // 날짜순 정렬
  data.articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  // 저장
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
  fs.writeFileSync(DATA_FILE, jsonStr, 'utf-8');
  console.log(`\n💾 저장 완료: ${DATA_FILE}`);
  console.log(`📊 전체 인사이트: ${data.articles.length}편`);
}

main().catch(e => {
  console.error(`❌ 오류: ${e.message}`);
  process.exit(1);
});
