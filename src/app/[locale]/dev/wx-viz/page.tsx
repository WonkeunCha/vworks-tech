'use client';

export default function WxVizPage() {
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#050c18' }}>
      {/* 안내 헤더 */}
      <div style={{
        textAlign: 'center',
        padding: '32px 16px 24px',
        background: 'linear-gradient(180deg, #0a1628 0%, #050c18 100%)',
      }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.3em', color: 'rgba(0,201,177,0.6)', marginBottom: 8 }}>
          LIVE PLATFORM
        </div>
        <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 'clamp(20px, 3vw, 32px)', color: '#fff', fontWeight: 600, marginBottom: 8 }}>
          기상해양 수치모델 가시화 플랫폼
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(136,153,187,0.8)', fontWeight: 300 }}>
          바탕화면을 클릭하면 이 페이지로 돌아옵니다
        </p>
      </div>

      {/* 바탕 + iframe 카드 */}
      <div
        onClick={() => { window.location.href = '/ko/dev/wx-viz/'; }}
        style={{
          cursor: 'pointer',
          background: 'radial-gradient(ellipse at center, #0a1628 0%, #050c18 100%)',
          padding: '24px 16px 40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 1200,
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(0,201,177,0.15), 0 0 0 1px rgba(0,201,177,0.2)',
          }}
        >
          <iframe
            src="/dev/wx-viz/embed.html"
            style={{
              display: 'block',
              width: '100%',
              height: 'clamp(400px, 70vh, 800px)',
              border: 'none',
            }}
            title="기상해양 수치모델 가시화 플랫폼"
          />
        </div>
      </div>
    </div>
  );
}
