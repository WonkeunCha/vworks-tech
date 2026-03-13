'use client';

export default function WxVizPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: '#0f1729',
        borderBottom: '1px solid rgba(0,201,177,0.2)',
      }}>
        <a href="/ko/" style={{ color: '#00C9B1', fontSize: 14, fontFamily: "'Noto Sans KR', sans-serif", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          ← 메인으로
        </a>
        <span style={{ color: '#8899bb', fontSize: 12, fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.05em' }}>
          기상해양 가시화 플랫폼
        </span>
        <a href="/ko/dev/cubrid/" style={{ color: '#8899bb', fontSize: 12, fontFamily: "'Noto Sans KR', sans-serif", textDecoration: 'none' }}>
          CUBRID →
        </a>
      </div>
      <iframe
        src="/dev/wx-viz/embed.html"
        style={{ display: 'block', width: '100%', height: 'var(--wx-h)', border: 'none' }}
        title="기상해양 수치모델 가시화 플랫폼"
      />
      <style>{`
        :root { --wx-h: 60vh; }
        @media (orientation: landscape) { :root { --wx-h: calc(100vh - 80px); } }
        @media (min-width: 768px) and (orientation: portrait) { :root { --wx-h: 70vh; } }
        @media (min-width: 1024px) { :root { --wx-h: calc(100vh - 80px); } }
      `}</style>
    </div>
  );
}