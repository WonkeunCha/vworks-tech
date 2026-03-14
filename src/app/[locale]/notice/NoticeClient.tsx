'use client';
import { useState } from 'react';

function getProp(page: any, key: string) {
  const p = page.properties?.[key];
  if (!p) return '';
  switch (p.type) {
    case 'title':     return p.title?.[0]?.plain_text ?? '';
    case 'rich_text': return p.rich_text?.[0]?.plain_text ?? '';
    case 'select':    return p.select?.name ?? '';
    case 'date':      return p.date?.start ?? '';
    case 'checkbox':  return p.checkbox ?? false;
    default:          return '';
  }
}

function renderBlock(block: any) {
  const { type, id } = block;
  const val = block[type];
  const text = val?.rich_text?.map((t: any) => t.plain_text).join('') ?? '';
  const s: React.CSSProperties = { fontSize: 14, color: 'rgba(200,220,255,.76)', fontWeight: 300, lineHeight: 1.9, marginBottom: 16 };
  switch (type) {
    case 'paragraph':          return <p key={id} style={s}>{text || <br />}</p>;
    case 'heading_1':          return <h1 key={id} style={{ fontSize: 26, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>{text}</h1>;
    case 'heading_2':          return <h2 key={id} style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>{text}</h2>;
    case 'heading_3':          return <h3 key={id} style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>{text}</h3>;
    case 'bulleted_list_item': return <li key={id} style={{ ...s, marginLeft: 20, listStyleType: 'disc' }}>{text}</li>;
    case 'numbered_list_item': return <li key={id} style={{ ...s, marginLeft: 20, listStyleType: 'decimal' }}>{text}</li>;
    case 'quote':              return <blockquote key={id} style={{ borderLeft: '2px solid #2dd4bf', paddingLeft: 16, margin: '16px 0', color: '#5a7a9a', fontStyle: 'italic', fontSize: 14 }}>{text}</blockquote>;
    case 'divider':            return <hr key={id} style={{ border: 'none', borderTop: '1px solid rgba(31,74,117,.5)', margin: '24px 0' }} />;
    case 'image': {
      const url = val?.file?.url ?? val?.external?.url ?? '';
      return url ? <div key={id} style={{ margin: '20px 0' }}><img src={url} alt="" style={{ width: '100%', borderRadius: 4 }} /></div> : null;
    }
    case 'code':
      return <pre key={id} style={{ background: '#0e1e35', border: '1px solid rgba(31,74,117,.5)', borderRadius: 4, padding: 16, overflowX: 'auto', margin: '16px 0' }}><code style={{ fontFamily: 'monospace', fontSize: 12, color: '#2dd4bf' }}>{text}</code></pre>;
    default:
      return text ? <p key={id} style={s}>{text}</p> : null;
  }
}

export default function NoticeClient({ posts }: { posts: any[] }) {
  const [selected, setSelected] = useState<any | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const openPost = async (post: any) => {
    setSelected(post);
    setLoading(true);
    setBlocks([]);
    try {
      const res = await fetch(`https://api.notion.com/v1/blocks/${post.id}/children?page_size=100`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
        },
      });
      const data = await res.json();
      setBlocks(data.results ?? []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#050d1a', color: '#e8f1ff', paddingTop: 96, paddingBottom: 80, paddingLeft: 'clamp(16px,4vw,48px)', paddingRight: 'clamp(16px,4vw,48px)', fontFamily: "'Pretendard', sans-serif" }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', color: '#2dd4bf', marginBottom: 12 }}>NOTICE</p>
        <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, marginBottom: 48, lineHeight: 1 }}>공지사항</h1>
        {posts.length === 0 ? (
          <p style={{ color: '#5a7a9a', fontSize: 14 }}>등록된 공지사항이 없습니다.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {posts.map((post) => {
              const title    = getProp(post, '제목');
              const date     = getProp(post, '게시일');
              const category = getProp(post, '카테고리');
              const summary  = getProp(post, '요약');
              const isPinned = getProp(post, '중요공지');
              return (
                <div key={post.id} onClick={() => openPost(post)} style={{ cursor: 'pointer', background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', padding: '20px 24px', position: 'relative' }}>
                  {isPinned && <span style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'monospace', fontSize: 8, padding: '2px 6px', background: 'rgba(45,212,191,.1)', border: '1px solid rgba(45,212,191,.3)', color: '#2dd4bf' }}>중요</span>}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    {category && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: '#0e1e35', color: '#5a7a9a' }}>{category}</span>}
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#5a7a9a' }}>{date}</span>
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{title}</h2>
                  {summary && <p style={{ fontSize: 13, color: '#5a7a9a', fontWeight: 300 }}>{summary}</p>}
                  <p style={{ fontSize: 11, color: '#2dd4bf', marginTop: 8, fontFamily: 'monospace' }}>클릭하여 전체 내용 보기 →</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 모달 */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', borderRadius: 8, width: '100%', maxWidth: 720, padding: 'clamp(24px,4vw,48px)', position: 'relative' }}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#5a7a9a', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>✕</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              {getProp(selected, '카테고리') && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: '#0e1e35', color: '#5a7a9a' }}>{getProp(selected, '카테고리')}</span>}
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#5a7a9a' }}>{getProp(selected, '게시일')}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(18px,3vw,26px)', fontWeight: 700, lineHeight: 1.4, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid rgba(31,74,117,.5)' }}>
              {getProp(selected, '제목')}
            </h1>
            {loading ? (
              <p style={{ color: '#5a7a9a', fontSize: 14 }}>불러오는 중...</p>
            ) : (
              <article>{blocks.map(renderBlock)}</article>
            )}
          </div>
        </div>
      )}
    </main>
  );
}