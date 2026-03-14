import { getNotionDB, getProp } from '@/lib/notion';

export const revalidate = 3600;

export default async function FaqPage() {
  let faqs: any[] = [];
  try {
    faqs = await getNotionDB(process.env.NOTION_FAQ_DB_ID!);
  } catch (e) { console.error(e); }

  const categories = ['전체', ...Array.from(new Set(faqs.map(f => getProp(f, '카테고리')).filter(Boolean)))];

  return (
    <main style={{ minHeight: '100vh', background: '#050d1a', color: '#e8f1ff', paddingTop: 96, paddingBottom: 80, paddingLeft: 'clamp(16px,4vw,48px)', paddingRight: 'clamp(16px,4vw,48px)', fontFamily: "'Pretendard', sans-serif" }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', color: '#2dd4bf', marginBottom: 12 }}>FAQ</p>
        <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, marginBottom: 16, lineHeight: 1 }}>자주 묻는 질문</h1>
        <p style={{ fontSize: 14, color: '#5a7a9a', fontWeight: 300, marginBottom: 48 }}>궁금하신 점을 빠르게 확인하세요.</p>

        {faqs.length === 0 ? (
          <p style={{ color: '#5a7a9a', fontSize: 14 }}>등록된 FAQ가 없습니다.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {faqs.map((faq) => {
              const question = getProp(faq, '질문');
              const answer   = getProp(faq, '답변');
              const category = getProp(faq, '카테고리');
              const isPinned = getProp(faq, '중요FAQ');
              return (
                <details key={faq.id} style={{ background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', padding: '20px 24px' }}>
                  <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                      {isPinned && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: 'rgba(45,212,191,.1)', border: '1px solid rgba(45,212,191,.3)', color: '#2dd4bf', flexShrink: 0 }}>중요</span>}
                      {category && <span style={{ fontFamily: 'monospace', fontSize: 8, padding: '1px 6px', background: '#0e1e35', color: '#5a7a9a', flexShrink: 0 }}>{category}</span>}
                      <span style={{ fontSize: 15, fontWeight: 500 }}>{question}</span>
                    </div>
                    <span style={{ color: '#2dd4bf', fontSize: 18, flexShrink: 0 }}>+</span>
                  </summary>
                  {answer && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(31,74,117,.3)' }}>
                      <div style={{ fontSize: 14, color: 'rgba(200,220,255,.76)', fontWeight: 300, lineHeight: 1.9 }}>
                  {answer.split('\n').map((line: string, i: number) =>
                    line.trim() === ''
                      ? <br key={i} />
                      : line.startsWith('•') || line.startsWith('-')
                        ? <div key={i} style={{ paddingLeft: 16, marginBottom: 4 }}>{line}</div>
                        : line.match(/^[①-⑳]|^\d+\./)
                          ? <div key={i} style={{ paddingLeft: 16, marginBottom: 6, color: '#2dd4bf', fontWeight: 500 }}>{line}</div>
                          : <div key={i} style={{ marginBottom: line === '' ? 0 : 4 }}>{line}</div>
                  )}
                </div>
                    </div>
                  )}
                </details>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}