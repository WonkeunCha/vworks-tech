'use client';

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

export default function NoticeClient({ posts }: { posts: any[] }) {
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
                <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer', background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', padding: '20px 24px', position: 'relative' }}>
                  {isPinned && <span style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'monospace', fontSize: 8, padding: '2px 6px', background: 'rgba(45,212,191,.1)', border: '1px solid rgba(45,212,191,.3)', color: '#2dd4bf' }}>중요</span>}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    {category && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: '#0e1e35', color: '#5a7a9a' }}>{category}</span>}
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#5a7a9a' }}>{date}</span>
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{title}</h2>
                  {summary && <p style={{ fontSize: 13, color: '#5a7a9a', fontWeight: 300 }}>{summary}</p>}
                  <p style={{ fontSize: 11, color: '#2dd4bf', marginTop: 8, fontFamily: 'monospace' }}>전체 내용 보기 →</p>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}