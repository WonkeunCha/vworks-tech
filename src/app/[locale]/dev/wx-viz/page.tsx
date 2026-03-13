'use client';

export default function WxVizPage() {
  return (
    <>
      {/* 이 페이지에서는 푸터 숨김 — fixed iframe과 겹침 방지 */}
      <style>{`
        footer { display: none !important; }

        /* 세로모드 (모바일) */
        .wx-bg {
          position: fixed;
          inset: 64px 0 0 0; /* Navbar 높이 아래부터 */
          background: radial-gradient(ellipse at center, #0a1628 0%, #050c18 100%);
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-decoration: none;
        }
        .wx-hint {
          color: rgba(0,201,177,0.5);
          font-size: 12px;
          font-family: 'Noto Sans KR', sans-serif;
          letter-spacing: 0.05em;
          position: absolute;
          bottom: 12%;
        }
        .wx-wrap {
          position: fixed;
          z-index: 10;
          top: calc(64px + 50%);
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 60px rgba(0,201,177,0.15), 0 0 0 1px rgba(0,201,177,0.2);
          border-radius: 8px;
          overflow: hidden;
          width: 92vw;
          height: 55vh;
        }

        /* 가로모드 */
        @media (orientation: landscape) {
          .wx-wrap {
            width: 88vw;
            height: 80vh;
            top: calc(64px + 50%);
          }
          .wx-hint { display: none; }
        }

        /* 태블릿 세로 */
        @media (min-width: 768px) and (orientation: portrait) {
          .wx-wrap {
            width: 86vw;
            height: 65vh;
          }
        }

        /* PC */
        @media (min-width: 1024px) {
          .wx-wrap {
            width: 90vw;
            height: 86vh;
            top: calc(64px + 50%);
          }
          .wx-hint { display: none; }
        }
      `}</style>

      {/* 바탕 — 클릭 시 embed.html 새탭 */}
      <a
        href="/dev/wx-viz/embed.html"
        target="_blank"
        rel="noopener noreferrer"
        className="wx-bg"
        aria-label="전체화면으로 보기"
      >
        <span className="wx-hint">▶ 탭하면 전체화면으로 열립니다</span>
      </a>

      {/* iframe */}
      <div className="wx-wrap">
        <iframe
          src="/dev/wx-viz/embed.html"
          style={{ display: 'block', width: '100%', height: '100%', border: 'none' }}
          title="기상해양 수치모델 가시화 플랫폼"
        />
      </div>
    </>
  );
}
