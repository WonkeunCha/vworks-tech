"use client";

import { useState, useEffect } from "react";

export default function KakaoChannelFloat() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  // 스크롤 300px 이후 버튼 등장
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 툴팁 3초 후 자동 숨김
  useEffect(() => {
    if (visible && tooltip) {
      const timer = setTimeout(() => setTooltip(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, tooltip]);

  const handleClick = () => {
    window.open("http://pf.kakao.com/_bxlxkxhn/chat", "_blank");
  };

  return (
    <>
      <style>{`
        @keyframes kakao-bounce-in {
          0% { opacity: 0; transform: scale(0.5) translateY(20px); }
          70% { transform: scale(1.1) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes kakao-fade-out {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.5) translateY(20px); pointer-events: none; }
        }
        @keyframes tooltip-slide {
          0% { opacity: 0; transform: translateX(10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes kakao-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(254, 229, 0, 0.5); }
          50% { box-shadow: 0 0 0 12px rgba(254, 229, 0, 0); }
        }
        .kakao-float-btn {
          animation: kakao-bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                     kakao-pulse 2.5s ease-in-out 0.5s infinite;
        }
        .kakao-float-btn.hidden {
          animation: kakao-fade-out 0.3s ease forwards;
        }
        .kakao-float-btn:hover {
          transform: scale(1.08) !important;
          transition: transform 0.2s ease;
        }
        .kakao-tooltip {
          animation: tooltip-slide 0.4s ease 0.3s both;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "110px",
          right: "32px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {/* 툴팁 */}
        {visible && tooltip && (
          <div
            className="kakao-tooltip"
            style={{
              background: "rgba(20, 20, 20, 0.92)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 500,
              padding: "8px 14px",
              borderRadius: "20px",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              lineHeight: 1.4,
            }}
          >
            💬 카카오톡으로 문의하기
          </div>
        )}

        {/* 버튼 */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setTooltip(true)}
          className={`kakao-float-btn${visible ? "" : " hidden"}`}
          aria-label="카카오톡 채널 채팅 상담"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#FEE500",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(254, 229, 0, 0.45), 0 2px 8px rgba(0,0,0,0.15)",
            padding: 0,
            flexShrink: 0,
          }}
        >
          {/* 카카오톡 공식 아이콘 SVG */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C7.029 3 3 6.358 3 10.5c0 2.674 1.676 5.02 4.2 6.39L6.3 20.1a.3.3 0 0 0 .432.326L11.1 17.97c.296.02.596.03.9.03 4.971 0 9-3.358 9-7.5S16.971 3 12 3z"
              fill="#3A1D1D"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
