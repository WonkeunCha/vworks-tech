'use client';

export default function WxVizPage() {
  return (
    <>
      {/* 네비게이션 바(64px) 아래부터 뷰포트 전체를 iframe으로 꽉 채움 */}
      <div style={{
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        background: '#050c18',
      }}>
        <iframe
          src="/dev/wx-viz/embed.html"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="기상해양 수치모델 가시화 플랫폼"
        />
      </div>

      {/* 푸터가 iframe 뒤로 가도록 본문 높이 확보 */}
      <div style={{ height: 'calc(100vh - 64px)', marginTop: 64 }} />

      <style>{`
        /* wx-viz 페이지에서 푸터 숨김 (iframe과 겹치지 않도록) */
        footer { display: none !important; }
      `}</style>
    </>
  );
}
