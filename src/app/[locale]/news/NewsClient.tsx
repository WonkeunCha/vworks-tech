'use client';
import { useState, useMemo } from 'react';

function getProp(page: any, key: string) {
  if (page.isAuto) {
    if (key === '제목') return page.title ?? '';
    if (key === '카테고리') return page.category ?? '';
    if (key === '게시일') return page.date ?? '';
    if (key === '요약') return page.summary ?? '';
    if (key === '썸네일URL') return '';
    return '';
  }
  const p = page.properties?.[key];
  if (!p) return '';
  switch (p.type) {
    case 'title':     return p.title?.[0]?.plain_text ?? '';
    case 'rich_text': return p.rich_text?.[0]?.plain_text ?? '';
    case 'select':    return p.select?.name ?? '';
    case 'date':      return p.date?.start ?? '';
    case 'url':       return p.url ?? '';
    default:          return '';
  }
}

function renderBlock(block: any) {
  const { type, id } = block;
  const val = block[type];
  const text = val?.rich_text?.map((t: any) => t.plain_text).join('') ?? '';
  const s: React.CSSProperties = { fontSize: 15, color: 'rgba(200,220,255,.82)', fontWeight: 300, lineHeight: 1.9, marginBottom: 16 };
  switch (type) {
    case 'paragraph':          return <p key={id} style={s}>{text || <br />}</p>;
    case 'heading_1':          return <h1 key={id} style={{ fontSize: 26, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#e8f1ff' }}>{text}</h1>;
    case 'heading_2':          return <h2 key={id} style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10, color: '#e8f1ff' }}>{text}</h2>;
    case 'heading_3':          return <h3 key={id} style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8, color: '#e8f1ff' }}>{text}</h3>;
    case 'bulleted_list_item': return <li key={id} style={{ ...s, marginLeft: 20, listStyleType: 'disc' }}>{text}</li>;
    case 'numbered_list_item': return <li key={id} style={{ ...s, marginLeft: 20, listStyleType: 'decimal' }}>{text}</li>;
    case 'quote':              return <blockquote key={id} style={{ borderLeft: '2px solid #2dd4bf', paddingLeft: 16, margin: '16px 0', color: '#5a7a9a', fontStyle: 'italic' }}>{text}</blockquote>;
    case 'divider':            return <hr key={id} style={{ border: 'none', borderTop: '1px solid rgba(31,74,117,.5)', margin: '24px 0' }} />;
    case 'image': {
      const url = val?.file?.url ?? val?.external?.url ?? '';
      return url ? <div key={id} style={{ margin: '20px 0' }}><img src={url} alt="" style={{ width: '100%', borderRadius: 4 }} /></div> : null;
    }
    default:
      return text ? <p key={id} style={s}>{text}</p> : null;
  }
}

/* 소스별 색상 매핑 */
const SOURCE_COLORS: Record<string, string> = {
  'Dell': '#0076CE',
  'HPE': '#01A982',
  'VAST Data': '#00C9B1',
  'SecurityWeek': '#e87040',
  'BleepingComputer': '#4a90d9',
  '보안뉴스': '#ff6b6b',
};
const DEFAULT_COLOR = '#5a7a9a';

/* 포스트의 필터 키 추출 (소스 또는 카테고리) */
function getFilterKey(post: any): string {
  // RSS 자동수집: source 필드 사용
  if (post.isAuto && post.source) return post.source;
  // Notion 수동등록: 카테고리 필드 사용
  const cat = getProp(post, '카테고리');
  if (cat) return cat;
  return '';
}

export default function NewsClient({ posts }: { posts: any[] }) {
  const [selected, setSelected] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  /* 카테고리 동적 생성 — 실제 데이터에서 추출 */
  const { categories, categoryCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      const key = getFilterKey(post);
      if (key) counts[key] = (counts[key] || 0) + 1;
    });

    // 소스 우선순위 정렬 (알려진 소스 먼저, 나머지 가나다순)
    const knownOrder = ['Dell', 'HPE', 'VAST Data', 'SecurityWeek', 'BleepingComputer', '보안뉴스'];
    const sortedKeys = Object.keys(counts).sort((a, b) => {
      const ai = knownOrder.indexOf(a);
      const bi = knownOrder.indexOf(b);
      if (ai >= 0 && bi >= 0) return ai - bi;
      if (ai >= 0) return -1;
      if (bi >= 0) return 1;
      return a.localeCompare(b, 'ko');
    });

    const cats = [
      { id: 'all', label: '전체', color: '#2dd4bf', count: posts.length },
      ...sortedKeys.map(key => ({
        id: key,
        label: key,
        color: SOURCE_COLORS[key] || DEFAULT_COLOR,
        count: counts[key],
      })),
    ];

    const countsWithAll = { all: posts.length, ...counts };
    return { categories: cats, categoryCounts: countsWithAll };
  }, [posts]);

  /* 필터링된 포스트 */
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // 카테고리 필터
    if (activeCategory !== 'all') {
      result = result.filter(post => getFilterKey(post) === activeCategory);
    }

    // 검색 필터
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(post => {
        const title = (getProp(post, '제목') ?? '').toLowerCase();
        const summary = (getProp(post, '요약') ?? '').toLowerCase();
        const source = (post.source ?? '').toLowerCase();
        const category = (getProp(post, '카테고리') ?? '').toLowerCase();
        return title.includes(q) || summary.includes(q) || source.includes(q) || category.includes(q);
      });
    }

    return result;
  }, [posts, activeCategory, searchQuery]);

  return (
    <main style={{ minHeight: '100vh', background: '#050d1a', color: '#e8f1ff', paddingTop: 96, paddingBottom: 80, paddingLeft: 'clamp(16px,4vw,48px)', paddingRight: 'clamp(16px,4vw,48px)', fontFamily: "'Pretendard', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', color: '#2dd4bf', marginBottom: 12 }}>NEWS</p>
        <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, marginBottom: 16, lineHeight: 1 }}>뉴스 / 소식</h1>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24, padding: '14px 18px', background: 'rgba(45,212,191,.05)', border: '1px solid rgba(45,212,191,.15)', borderRadius: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="12" cy="12" r="10" stroke="#2dd4bf" strokeWidth="1.5"/>
            <path d="M12 7v6l4 2" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p style={{ fontSize: 12, color: '#5a7a9a', fontWeight: 300, lineHeight: 1.8, margin: 0 }}>
            이 페이지의 뉴스는 <span style={{ color: '#2dd4bf', fontWeight: 500 }}>AI</span>가 Dell · HPE · VAST Data · SecurityWeek · BleepingComputer · 보안뉴스 등 주요 채널에서 자동 수집·번역하여 매일 자정 갱신됩니다.
            <span style={{ color: 'rgba(200,220,255,.6)' }}> 자주 방문하셔서 최신 IT·보안 동향을 확인해보세요. 😊</span>
          </p>
        </div>

        {/* 검색 + 카테고리 필터 */}
        <div style={{ marginBottom: 32 }}>
          {/* 검색바 */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="7" stroke="#5a7a9a" strokeWidth="1.5"/>
              <path d="M16 16l4 4" stroke="#5a7a9a" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="뉴스 검색... (제목, 내용, 소스)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', maxWidth: 400, padding: '10px 14px 10px 40px',
                background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', borderRadius: 8,
                color: '#e8f1ff', fontSize: 13, outline: 'none',
                fontFamily: "'Pretendard', sans-serif",
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#5a7a9a', cursor: 'pointer', fontSize: 14, padding: 4 }}>
                ✕
              </button>
            )}
          </div>

          {/* 카테고리 탭 — 데이터에서 동적 생성 */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(isActive && cat.id !== 'all' ? 'all' : cat.id)}
                  style={{
                    padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
                    border: `1px solid ${isActive ? cat.color + '50' : 'rgba(31,74,117,.4)'}`,
                    background: isActive ? cat.color + '15' : 'rgba(255,255,255,.02)',
                    color: isActive ? cat.color : '#5a7a9a',
                    fontSize: 12, fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s',
                    fontFamily: "'Pretendard', sans-serif",
                  }}>
                  {cat.label}
                  <span style={{ marginLeft: 5, fontSize: 10, opacity: 0.6 }}>{cat.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 검색/필터 결과 안내 */}
        {(searchQuery || activeCategory !== 'all') && (
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#5a7a9a' }}>
              {filteredPosts.length}건
              {searchQuery && <> · &quot;{searchQuery}&quot; 검색결과</>}
              {activeCategory !== 'all' && <> · {activeCategory}</>}
            </span>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              style={{ fontSize: 11, color: '#2dd4bf', background: 'rgba(45,212,191,.1)', border: '1px solid rgba(45,212,191,.2)', borderRadius: 4, padding: '3px 10px', cursor: 'pointer' }}>
              필터 초기화
            </button>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: '#5a7a9a', fontSize: 14, marginBottom: 8 }}>
              {searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다.` : '해당 카테고리에 등록된 뉴스가 없습니다.'}
            </p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              style={{ fontSize: 12, color: '#2dd4bf', background: 'none', border: '1px solid rgba(45,212,191,.3)', borderRadius: 6, padding: '8px 20px', cursor: 'pointer' }}>
              전체 뉴스 보기
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filteredPosts.map((post) => {
              const title    = getProp(post, '제목');
              const date     = getProp(post, '게시일');
              const category = getProp(post, '카테고리');
              const summary  = getProp(post, '요약');
              const thumb    = getProp(post, '썸네일URL');
              return (
                <div key={post.id} onClick={() => setSelected(post)}
                  style={{ cursor: 'pointer', background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', borderRadius: 4, overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(45,212,191,.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(31,74,117,.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ aspectRatio: '16/9', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 24 }}>
                    {thumb
                      ? <img src={thumb as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : post.source === 'HPE'
                        ? <svg viewBox="0 0 140 50" style={{ width: '65%', maxWidth: 160 }} xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="138" height="48" rx="3" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5"/>
                            <text x="70" y="33" textAnchor="middle" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="26" fill="rgba(255,255,255,0.9)" letterSpacing="2">HPE</text>
                          </svg>
                        : post.source === '보안뉴스'
                          ? <svg viewBox="0 0 160 50" style={{ width: '70%', maxWidth: 180 }} xmlns="http://www.w3.org/2000/svg">
                              <rect x="1" y="1" width="158" height="48" rx="4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                              <text x="80" y="22" textAnchor="middle" fontFamily="'Malgun Gothic', sans-serif" fontSize="13" fill="rgba(255,255,255,0.9)" fontWeight="700">보안뉴스</text>
                              <text x="80" y="38" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="rgba(255,255,255,0.5)" letterSpacing="1">SECURITY NEWS</text>
                            </svg>
                          : post.source === 'SecurityWeek'
                          ? <svg viewBox="0 0 200 50" style={{ width: '75%', maxWidth: 200 }} xmlns="http://www.w3.org/2000/svg">
                              <text x="100" y="33" textAnchor="middle" fontFamily="'Arial Black', Arial, sans-serif" fontSize="18" fill="rgba(255,255,255,0.9)" fontWeight="900" letterSpacing="-0.5">SecurityWeek</text>
                            </svg>
                          : <img
                              src={
                                post.source === 'Dell' ? 'https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png' :
                                post.source === 'VAST Data' ? 'https://www.vastdata.com/favicon.ico' :
                                post.source === 'BleepingComputer' ? 'https://www.bleepstatic.com/images/site/logo.png' :
                                '/logo-wide.png'
                              }
                              alt={post.source ?? 'VWorks'}
                              style={{ width: '70%', maxWidth: 180, maxHeight: 80, objectFit: 'contain', opacity: 0.9, filter: 'brightness(0) invert(1)' }}
                            />
                    }
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                      {category && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: '#0e1e35', color: '#5a7a9a' }}>{category}</span>}
                      {post.isAuto && post.source && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: 'rgba(45,212,191,.1)', border: '1px solid rgba(45,212,191,.2)', color: '#2dd4bf' }}>{post.source}</span>}
                      <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#5a7a9a' }}>{date}</span>
                    </div>
                    <h2 style={{ fontSize: 15, fontWeight: 500, marginBottom: 6, lineHeight: 1.4 }}>{title}</h2>
                    {summary && <p style={{ fontSize: 12, color: '#5a7a9a', fontWeight: 300, lineHeight: 1.6 }}>{summary}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 모달 */}
      {selected && (
        <div onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', borderRadius: 8, width: '100%', maxWidth: 720, padding: 'clamp(24px,4vw,48px)', position: 'relative', marginBottom: 60 }}>
            <button onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#5a7a9a', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>✕</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              {getProp(selected, '카테고리') && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: '#0e1e35', color: '#5a7a9a' }}>{getProp(selected, '카테고리')}</span>}
              {selected.isAuto && selected.source && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: 'rgba(45,212,191,.1)', border: '1px solid rgba(45,212,191,.2)', color: '#2dd4bf' }}>{selected.source}</span>}
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#5a7a9a' }}>{getProp(selected, '게시일')}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(18px,3vw,26px)', fontWeight: 700, lineHeight: 1.4, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(31,74,117,.5)' }}>
              {getProp(selected, '제목')}
            </h1>

            {selected.isAuto ? (
              <div>
                <div style={{ background: 'rgba(45,212,191,.05)', border: '1px solid rgba(45,212,191,.15)', borderRadius: 8, padding: '24px 28px', marginBottom: 32 }}>
                  <p style={{ fontSize: 16, color: 'rgba(220,235,255,.9)', lineHeight: 2, margin: 0, fontWeight: 300 }}>
                    {selected.summary}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: '#0e1e35', borderRadius: 8, border: '1px solid rgba(31,74,117,.4)' }}>
                  <span style={{ fontSize: 13, color: '#5a7a9a', flex: 1 }}>
                    {selected.source === '보안뉴스'
                      ? <>이 뉴스는 <strong style={{ color: '#2dd4bf' }}>{selected.source}</strong>에서 자동으로 수집된 콘텐츠입니다.</>
                      : <>이 뉴스는 <strong style={{ color: '#2dd4bf' }}>{selected.source}</strong> 공식 블로그에서 자동으로 수집·번역된 콘텐츠입니다.</>
                    }
                  </span>
                  <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: 'rgba(45,212,191,.15)', border: '1px solid rgba(45,212,191,.4)', borderRadius: 6, color: '#2dd4bf', fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 500 }}>
                    {selected.source === '보안뉴스' ? '원문 기사 보기 →' : '영문 원문 보기 →'}
                  </a>
                </div>
              </div>
            ) : (
              <article>{(selected.blocks ?? []).map(renderBlock)}</article>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
