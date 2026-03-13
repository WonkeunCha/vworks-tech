'use client';

export default function WxVizPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a' }}>
      {/* 모바일 안내 바 — 항상 표시, 뒤로가기 보장 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: '#0f1729',
        borderBottom: '1px solid rgba(0,201,177,0.2)',
      }}>
        <a
          href="/ko/"
          style={{
            color: '#00C9B1',
            fontSize: 14,
            fontFamily: "'Noto Sans KR', sans-serif",
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ← 메인으로
        </a>
        <span style={{
          color: '#8899bb',
          fontSize: 12,
          fontFamily: "'Share Tech Mono', monospace",
          letterSpacing: '0.05em',
        }}>
          기상해양 가시화 플랫폼
        </span>
        <a
          href="/ko/dev/cubrid/"
          style={{
            color: '#8899bb',
            fontSize: 12,
            fontFamily: "'Noto Sans KR', sans-serif",
            textDecoration: 'none',
          }}
        >
          CUBRID →
        </a>
      </div>

      {/* iframe 래퍼 */}
      <div style={{ padding: '0' }}>
        <iframe
          src="/dev/wx-viz/embed.html"
          style={{
            display: 'block',
            width: '100%',
            // 세로모드: 60vh / 가로모드: calc(100vh - 80px) — CSS로 분기
            height: 'var(--wx-iframe-h, 60vh)',
            border: 'none',
          }}
          title="기상해양 수치모델 가시화 플랫폼"
        />
      </div>

      {/* 반응형 높이 CSS */}
      <style>{`
        :root {
          --wx-iframe-h: 60vh;
        }
        /* 가로모드 (landscape) */
        @media (orientation: landscape) {
          :root {
            --wx-iframe-h: calc(100vh - 80px);
          }
        }
        /* 태블릿 이상 세로모드도 넉넉하게 */
        @media (min-width: 768px) and (orientation: portrait) {
          :root {
            --wx-iframe-h: 70vh;
          }
        }
        /* PC */
        @media (min-width: 1024px) {
          :root {
            --wx-iframe-h: calc(100vh - 80px);
          }
        }
      `}</style>
    </div>
  );
}
