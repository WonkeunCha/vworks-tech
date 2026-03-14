import Link from 'next/link';
import { getNotionDB, getProp } from '@/lib/notion';

export const revalidate = 3600;

export default async function NewsPage() {
  let posts: any[] = [];
  try {
    posts = await getNotionDB(process.env.NOTION_NEWS_DB_ID!);
  } catch (e) { console.error(e); }

  return (
    <main style={{ minHeight: '100vh', background: '#050d1a', color: '#e8f1ff', paddingTop: 96, paddingBottom: 80, paddingLeft: 'clamp(16px,4vw,48px)', paddingRight: 'clamp(16px,4vw,48px)', fontFamily: "'Pretendard', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', color: '#2dd4bf', marginBottom: 12 }}>NEWS</p>
        <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, marginBottom: 48, lineHeight: 1 }}>뉴스 / 소식</h1>

        {posts.length === 0 ? (
          <p style={{ color: '#5a7a9a', fontSize: 14 }}>등록된 소식이 없습니다.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {posts.map((post) => {
              const title    = getProp(post, '제목');
              const date     = getProp(post, '게시일');
              const category = getProp(post, '카테고리');
              const summary  = getProp(post, '요약');
              const thumb    = getProp(post, '썸네일URL');
              return (
                <Link key={post.id} href={`/ko/news/${post.id}/`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', transition: 'border-color .2s', overflow: 'hidden' }}>
                  {thumb ? (
                    <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                      <img src={thumb as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '16/9', background: '#0e1e35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em', color: '#2a3a50' }}>VWORKS</span>
                    </div>
                  )}
                  <div style={{ padding: '20px 20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      {category && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: '#0e1e35', color: '#5a7a9a' }}>{category}</span>}
                      <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#5a7a9a' }}>{date}</span>
                    </div>
                    <h2 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5, marginBottom: 8 }}>{title}</h2>
                    {summary && <p style={{ fontSize: 12, color: '#5a7a9a', fontWeight: 300, lineHeight: 1.7 }}>{summary}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}