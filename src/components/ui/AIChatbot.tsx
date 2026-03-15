"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ============================================================
// ⚠️  Cloudflare Worker URL을 여기에 입력하세요
// ============================================================
const PROXY_URL = "https://vworks-ai-proxy.aiden-199.workers.dev";
// 예: "https://vworks-ai-proxy.aiden-vworks.workers.dev"

const SYSTEM_PROMPT = `당신은 브이웍스테크놀로지스(VWorks Technologies)의 AI 솔루션 상담 어시스턴트입니다.

## 회사 소개
- HPC · AI · 스토리지 전문 인프라 기업 (부산 본사)
- VAST Data 공인 파트너, Dell Technologies 파트너, HPE 파트너
- 기상·해양 수치모델링 전문 역량 보유

## 취급 솔루션

### 스토리지
- **VAST Data**: 차세대 올플래시 통합 데이터 플랫폼. NFS/SMB/S3/GPU Direct Storage 통합. AI/HPC 워크로드에 최적. 단일 네임스페이스로 PB급 확장.
- **Dell PowerScale (Isilon)**: 스케일아웃 NAS. OneFS 운영체제. 미디어/엔터프라이즈에 강점.
- **Dell PowerStore**: 블록+파일 통합 미드레인지 스토리지. VMware 연동 강점.

### 서버
- **Dell PowerEdge**: R760xa (GPU 서버), R760 (범용 2U), R660 (1U 고밀도)
- **HPE ProLiant Gen11/Gen12**: DL380a (H200 NVL ×8), DL384 (GH200 NVL2 슈퍼칩), DL380/DL360 (범용), DL325/DL385 (AMD EPYC)
- **HPE Cray EX**: 엑사스케일 슈퍼컴퓨터. Slingshot 인터커넥트.

### 네트워크/보안
- Fortinet FortiGate: 차세대 방화벽 (NGFW)
- Aruba/HPE 네트워크: 스위치, 무선 AP

## 상담 가이드라인
1. 고객의 워크로드와 요구사항을 먼저 파악하세요.
2. 구체적인 솔루션 추천 시 이유와 장점을 설명하세요.
3. 정확한 가격은 영업팀 상담을 안내하세요.
4. 불확실한 내용은 솔직히 말하세요.
5. 경쟁사를 비난하지 말고 VWorks 솔루션의 강점 중심으로 설명하세요.

## 솔루션 추천 모드
고객이 요구사항을 말하면 워크로드 유형, 예산, GPU 필요 여부, 스토리지 요구사항을 파악하고 최적의 서버+스토리지+네트워크 조합을 제안하세요.

## 인프라 사이징 모드
AI/HPC 사이징 요청 시 모델 크기, 데이터셋, 학습/추론 목적, 동시 사용자 수를 기반으로 GPU 수, 메모리, 스토리지, 네트워크 대역폭을 추정하세요.

## 톤앤매너
- 전문적이면서 친근한 톤, 한국어 (기술 용어 영문 병기), 간결하게 핵심 위주
- 상담 마무리 시 "더 자세한 상담은 문의하기 페이지를 이용해주세요" 안내`;

const QUICK_ACTIONS = [
  { label: "AI 서버 추천", prompt: "AI 학습용 서버를 구축하려고 합니다. 어떤 구성을 추천하시나요?" },
  { label: "스토리지 비교", prompt: "VAST Data와 Dell PowerScale의 차이점을 알려주세요." },
  { label: "인프라 사이징", prompt: "LLM 파인튜닝용 GPU 클러스터 사이징을 도와주세요." },
  { label: "HPC 구축 상담", prompt: "HPC 클러스터 구축을 검토 중인데 상담 가능한가요?" },
];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 py-2 items-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: "rgba(45,212,191,0.6)",
            animation: `vw-typing 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}
      style={{ animation: "vw-fadeIn 0.3s ease-out" }}
    >
      {!isUser && (
        <div
          className="w-8 h-8 rounded-[10px] flex-shrink-0 flex items-center justify-center mr-2 mt-0.5 text-sm font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #0d9488, #06b6d4)",
            boxShadow: "0 2px 8px rgba(13,148,136,0.3)",
          }}
        >
          V
        </div>
      )}
      <div
        className="max-w-[78%] px-4 py-3 whitespace-pre-wrap break-words"
        style={{
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser
            ? "linear-gradient(135deg, #0d9488, #0891b2)"
            : "rgba(255,255,255,0.06)",
          color: isUser ? "#fff" : "rgba(255,255,255,0.9)",
          fontSize: 14,
          lineHeight: 1.65,
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
          backdropFilter: isUser ? "none" : "blur(8px)",
        }}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ESC로 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setHasInteracted(true);

      const userMsg: ChatMessage = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const response = await fetch(PROXY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const assistantText =
          data.content
            ?.filter((b: any) => b.type === "text")
            .map((b: any) => b.text)
            .join("\n") ||
          "죄송합니다. 응답을 생성하지 못했습니다.";

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistantText },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.\n직접 상담은 문의하기 페이지를 이용해주세요.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Animations */}
      <style>{`
        @keyframes vw-fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes vw-typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes vw-slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes vw-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(13,148,136,0.3); }
          50% { box-shadow: 0 4px 30px rgba(13,148,136,0.5), 0 0 40px rgba(6,182,212,0.15); }
        }
        @keyframes vw-fabPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .vw-scrollbar::-webkit-scrollbar { width: 5px; }
        .vw-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .vw-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }
      `}</style>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed z-[9998] inset-0 pointer-events-none"
          style={{ fontFamily: "'Pretendard', sans-serif" }}
        >
          {/* Backdrop — 모바일에서 배경 터치로 닫기 */}
          <div
            className="absolute inset-0 pointer-events-auto md:pointer-events-none"
            style={{ background: "rgba(0,0,0,0.3)" }}
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Panel */}
          <div
            className="pointer-events-auto absolute bottom-[90px] right-4 sm:right-5"
            style={{
              width: "min(420px, calc(100vw - 32px))",
              height: "min(640px, calc(100vh - 120px))",
              borderRadius: 20,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              background: "linear-gradient(180deg, #020a1a 0%, #0a1628 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1)",
              animation: "vw-slideUp 0.35s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #06b6d4)",
                    boxShadow: "0 2px 10px rgba(13,148,136,0.3)",
                  }}
                >
                  V
                </div>
                <div>
                  <div
                    className="text-[15px] font-semibold"
                    style={{ color: "rgba(255,255,255,0.95)" }}
                  >
                    VWorks AI 상담
                  </div>
                  <div
                    className="text-[11px] flex items-center gap-1"
                    style={{ color: "rgba(45,212,191,0.7)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{
                        background: "#2dd4bf",
                        boxShadow: "0 0 6px rgba(45,212,191,0.5)",
                      }}
                    />
                    HPC · AI · 스토리지 솔루션 상담
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-[10px] flex items-center justify-center text-base transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto vw-scrollbar"
              style={{ padding: "16px 16px 8px" }}
            >
              {/* Welcome */}
              {!hasInteracted && (
                <div style={{ animation: "vw-fadeIn 0.4s ease-out" }}>
                  <div className="text-center" style={{ padding: "20px 12px 24px" }}>
                    <div
                      className="w-14 h-14 rounded-[18px] mx-auto mb-3.5 flex items-center justify-center text-2xl font-bold text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #0d9488 0%, #06b6d4 50%, #3b82f6 100%)",
                        boxShadow: "0 4px 20px rgba(13,148,136,0.3)",
                        animation: "vw-pulse 3s ease-in-out infinite",
                      }}
                    >
                      V
                    </div>
                    <h3
                      className="text-[17px] font-bold mb-1.5"
                      style={{ color: "rgba(255,255,255,0.95)" }}
                    >
                      안녕하세요!
                    </h3>
                    <p
                      className="text-[13.5px] leading-relaxed m-0"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      VWorks AI 솔루션 상담 어시스턴트입니다.
                      <br />
                      HPC · AI · 스토리지 인프라에 대해 무엇이든 물어보세요.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center px-1 pb-3">
                    {QUICK_ACTIONS.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(action.prompt)}
                        className="text-[13px] px-3.5 py-2 rounded-full transition-all whitespace-nowrap"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.75)",
                          fontFamily: "'Pretendard', sans-serif",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(13,148,136,0.15)";
                          e.currentTarget.style.borderColor =
                            "rgba(13,148,136,0.4)";
                          e.currentTarget.style.color = "#5eead4";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.05)";
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                          e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                        }}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}

              {loading && (
                <div className="flex items-start gap-2">
                  <div
                    className="w-8 h-8 rounded-[10px] flex-shrink-0 flex items-center justify-center text-sm font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #0d9488, #06b6d4)",
                    }}
                  >
                    V
                  </div>
                  <div
                    className="px-4 py-2"
                    style={{
                      borderRadius: "18px 18px 18px 4px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px 16px 16px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="메시지를 입력하세요..."
                  rows={1}
                  className="flex-1 outline-none resize-none"
                  style={{
                    padding: "10px 14px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 14,
                    fontFamily: "'Pretendard', sans-serif",
                    lineHeight: 1.5,
                    maxHeight: 100,
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(13,148,136,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="w-[38px] h-[38px] rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    border: "none",
                    background: "linear-gradient(135deg, #0d9488, #0891b2)",
                    color: "#fff",
                    cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-8 z-[9999] w-[60px] h-[60px] rounded-[18px] flex items-center justify-center text-white transition-all"
        style={{
          border: "none",
          background: "linear-gradient(135deg, #0d9488, #0891b2)",
          boxShadow: "0 4px 24px rgba(13,148,136,0.4)",
          animation: isOpen ? "none" : "vw-fabPulse 3s ease-in-out infinite",
          cursor: "pointer",
        }}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="10" r="0.5" fill="currentColor" stroke="none" />
            <circle cx="8" cy="10" r="0.5" fill="currentColor" stroke="none" />
            <circle cx="16" cy="10" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        )}
      </button>
    </>
  );
}
