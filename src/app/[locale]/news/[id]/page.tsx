import Link from 'next/link';
import { getNotionPageMeta, getNotionBlocks, getProp } from '@/lib/notion';

export const revalidate = 3600;
export async function generateStaticParams() {
  return [];
}

function renderBlock(block: any) {
  const { type, id } = block;
  const val = block[type];
  const text = val?.rich_text?.map((t: any) => t.plain_text).join('') ?? '';
  const s = { fontSize: 14, color: 'rgba(200,220,255,.76)', fontWeight: 300, lineHeight: 1.9, marginBottom: 16 };

  switch (type) {
    case 'paragraph':          return <p key={id} style={s}>{text || <br />}</p>;
    case 'heading_1':          return <h1 key={id} style={{ fontSize: 28, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{text}</h1>;
    case 'heading_2':          return <h2 key={id} style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>{text}</h2>;
    case 'heading_3':          return <h3 key={id} style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{text}</h3>;
    case 'bulleted_list_item': return <li key={id} style={{ ...s, marginLeft: 20, listStyleType: 'disc' }}>{text}</li>;
    case 'numbered_list_item': return <li key={id} style={{ ...s, marginLeft: 20, listStyleType: 'decimal' }}>{text}</li>;
    case 'quote':              return <blockquote key={id} style={{ borderLeft: '2px solid #2dd4bf', paddingLeft: 16, margin: '16px 0', color: '#5a7a9a', fontStyle: 'italic', fontSize: 14 }}>{text}</blockquote>;
    case 'divider':            return <hr key={id} style={{ border: 'none', borderTop: '1px solid rgba(31,74,117,.5)', margin: '32px 0' }} />;
    case 'image': {
      const url = val?.file?.url ?? val?.external?.url ?? '';
      return url ? <div key={id} style={{ margin: '24px 0', borderRadius: 4, overflow: 'hidden' }}><img src={url} alt="" style={{ width: '100%', display: 'block' }} /></div> : null;
    }
    case 'code':
      return <pre key={id} style={{ background: '#0e1e35', border: '1px solid rgba(31,74,117,.5)', borderRadius: 4, padding: 16, margin: '16px 0', overflowX: 'auto' }}><code style={{ fontFamily: 'monospace', fontSize: 12, color: '#2dd4bf' }}>{text}</code></pre>;
    default:
      return text ? <p key={id} style={s}>{text}</p> : null;
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [page, blocks] = await Promise.all([
    getNotionPageMeta(id),
    getNotionBlocks(id),
  ]);

  const title    = getProp(page, '제목');
  const date     = getProp(page, '게시일');
  const category = getProp(page, '카테고리');
  const thumb    = getProp(page, '썸네일URL');

  return (
    <main style={{ minHeight: '100vh', background: '#050d1a', color: '#e8f1ff', paddingTop: 96, paddingBottom: 80, paddingLeft: 'clamp(16px,4vw,48px)', paddingRight: 'clamp(16px,4vw,48px)', fontFamily: "'Pretendard', sans-serif" }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link href="/ko/news/" style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.15em', color: '#5a7a9a', textDecoration: 'none', display: 'block', marginBottom: 32 }}>← 뉴스 목록</Link>
        {thumb && (
          <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: 4, marginBottom: 32 }}>
            <img src={thumb as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          {category && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: '#0e1e35', color: '#5a7a9a' }}>{category}</span>}
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#5a7a9a' }}>{date}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, lineHeight: 1.3, marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid rgba(31,74,117,.5)' }}>{title}</h1>
        <article>{blocks.map(renderBlock)}</article>
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid rgba(31,74,117,.5)' }}>
          <Link href="/ko/news/" style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.15em', color: '#5a7a9a', textDecoration: 'none' }}>← 목록으로 돌아가기</Link>
        </div>
      </div>
    </main>
  );
}