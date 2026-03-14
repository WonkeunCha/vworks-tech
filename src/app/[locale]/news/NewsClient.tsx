'use client';
import { useState } from 'react';

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

export default function NewsClient({ posts }: { posts: any[] }) {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <main style={{ minHeight: '100vh', background: '#050d1a', color: '#e8f1ff', paddingTop: 96, paddingBottom: 80, paddingLeft: 'clamp(16px,4vw,48px)', paddingRight: 'clamp(16px,4vw,48px)', fontFamily: "'Pretendard', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', color: '#2dd4bf', marginBottom: 12 }}>NEWS</p>
        <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, marginBottom: 48, lineHeight: 1 }}>뉴스 / 소식</h1>
        {posts.length === 0 ? (
          <p style={{ color: '#5a7a9a', fontSize: 14 }}>등록된 뉴스가 없습니다.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {posts.map((post) => {
              const title    = getProp(post, '제목');
              const date     = getProp(post, '게시일');
              const category = getProp(post, '카테고리');
              const summary  = getProp(post, '요약');
              const thumb    = getProp(post, '썸네일URL');
              return (
                <div key={post.id} onClick={() => setSelected(post)}
                  style={{ cursor: 'pointer', background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '16/9', background: '#0e1e35', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {thumb
                      ? <img src={thumb as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#1f4a75' }}>{post.source ?? 'VWORKS'}</span>
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

            {/* RSS 자동수집 뉴스는 요약 + 원문 링크 */}
            {selected.isAuto ? (
              <div>
                <p style={{ fontSize: 15, color: 'rgba(200,220,255,.82)', lineHeight: 1.9, marginBottom: 32 }}>{selected.summary}</p>
                <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: 'rgba(45,212,191,.1)', border: '1px solid rgba(45,212,191,.4)', borderRadius: 6, color: '#2dd4bf', fontSize: 13, textDecoration: 'none' }}>
                  원문 보기 ({selected.source}) →
                </a>
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