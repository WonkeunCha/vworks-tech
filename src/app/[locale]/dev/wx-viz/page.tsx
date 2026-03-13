'use client';

export default function WxVizPage() {
  return (
    <>
      <style>{`
        footer { display: none !important; }

        /* 바탕 — 클릭 시 뒤로가기 */
        .wx-bg {
          position: fixed;
          inset: 64px 0 0 0;
          background: radial-gradient(ellipse at center, #0a1628 0%, #050c18 100%);
          z-index: 0;
          cursor: pointer;
        }
        .wx-hint {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(0,201,177,0.4);
          font-size: 11px;
          font-family: 'Noto Sans KR', sans-serif;
          letter-spacing: 0.05em;
          white-space: nowrap;
          pointer-events: none;
        }

        /* iframe 카드 */
        .wx-wrap {
          position: fixed;
          z-index: 10;
          top: calc(64px + 50%);
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 60px rgba(0,201,177,0.15), 0 0 0 1px rgba(0,201,177,0.2);
          border-radius: 8px;
          overflow: hidden;
          /* 세로 모바일 기본 */
          width: 92vw;
          height: 52vh;
        }

        /* 가로모드 */
        @media (orientation: landscape) {
          .wx-wrap { width: 86vw; height: 78vh; }
          .wx-hint { display: none; }
        }
        /* 태블릿 세로 */
        @media (min-width: 768px) and (orientation: portrait) {
          .wx-wrap { width: 86vw; height: 62vh; }
        }
        /* PC */
        @media (min-width: 1024px) {
          .wx-wrap { width: 90vw; height: 84vh; }
          .wx-hint { display: none; }
        }
      `}</style>

      {/* 바탕 — 클릭 시 뒤로가기 */}
      <div
        className="wx-bg"
        onClick={() => window.history.back()}
        role="button"
        aria-label="뒤로가기"
      >
        <span className="wx-hint">← 화면 바깥을 누르면 빠져나갑니다</span>
      </div>

      {/* iframe 카드 */}
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
