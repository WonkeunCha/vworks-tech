'use client';

export default function WxVizPage() {
  return (
    <>
      {/* 바탕 전체 — 클릭하면 이 페이지(wx-viz)로 이동 (이미 여기 있으므로 새로고침 없이 그냥 링크) */}
      {/* 실제로는 바탕을 클릭해도 현재 페이지이므로, 의미상 embed.html의 전체화면 링크로 처리 */}
      <a
        href="/dev/wx-viz/embed.html"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="기상해양 가시화 플랫폼 전체화면으로 보기"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(ellipse at center, #0a1628 0%, #050c18 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        {/* 바탕 힌트 텍스트 — 세로모드에서만 보임 */}
        <span className="bg-hint">
          ▶ 탭하면 전체화면으로 열립니다
        </span>
      </a>

      {/* iframe 컨테이너 — 바탕 위에 떠 있음 */}
      <div
        className="wx-wrap"
        style={{
          position: 'fixed',
          zIndex: 10,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 60px rgba(0,201,177,0.15), 0 0 0 1px rgba(0,201,177,0.2)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
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

      <style>{`
        /* 세로모드 (기본 모바일) — 작게 */
        .wx-wrap {
          width: 92vw;
          height: 55vh;
        }
        .bg-hint {
          display: block;
          color: rgba(0,201,177,0.5);
          font-size: 12px;
          font-family: 'Noto Sans KR', sans-serif;
          letter-spacing: 0.05em;
          margin-top: 62vh;
        }

        /* 가로모드 — 바탕 여백 남기고 크게 */
        @media (orientation: landscape) {
          .wx-wrap {
            width: 88vw;
            height: 82vh;
          }
          .bg-hint {
            display: none;
          }
        }

        /* 태블릿 세로 */
        @media (min-width: 768px) and (orientation: portrait) {
          .wx-wrap {
            width: 88vw;
            height: 65vh;
          }
        }

        /* PC — 거의 전체화면, 살짝 여백 */
        @media (min-width: 1024px) {
          .wx-wrap {
            width: 92vw;
            height: 88vh;
          }
          .bg-hint {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
