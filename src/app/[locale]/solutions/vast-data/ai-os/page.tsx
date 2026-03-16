"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ───── 메타데이터는 서버 컴포넌트에서 처리 (layout.tsx 또는 generateMetadata) ───── */

/* ───── 7대 핵심 컴포넌트 데이터 ───── */
const COMPONENTS = [
  {
    id: "datastore",
    name: "DataStore",
    tagline: "AI의 무한한 메모리",
    desc: "엑사바이트급 블록·파일·오브젝트 데이터를 올플래시 성능과 아카이브 경제성으로 저장합니다. GPU Direct Storage를 통한 직접 GPU 접근을 지원합니다.",
    icon: "💾",
    color: "#2dd4bf",
    href: "/ko/solutions/vast-data/datastore",
  },
  {
    id: "database",
    name: "DataBase",
    tagline: "AI의 지식 베이스",
    desc: "구조화 데이터, 벡터, 스트림, 카탈로그, 로그, 비정형 데이터의 문맥 메타데이터를 실시간으로 인덱싱하는 트랜잭셔널 데이터 웨어하우스입니다.",
    icon: "🗄️",
    color: "#06b6d4",
    href: "/ko/solutions/vast-data/database",
  },
  {
    id: "dataspace",
    name: "DataSpace",
    tagline: "AI의 글로벌 패브릭",
    desc: "온프레미스, 클라우드, 엣지를 아우르는 글로벌 분산 네임스페이스로, 엑사바이트급 데이터와 수조 개의 파일·오브젝트까지 확장됩니다.",
    icon: "🌐",
    color: "#3b82f6",
    href: "/ko/solutions/vast-data/dataspace",
  },
  {
    id: "dataengine",
    name: "DataEngine",
    tagline: "AI의 신경계",
    desc: "이벤트 트리거, Python 함수, 네이티브 Kafka 호환 브로커를 사용하여 데이터에 가까운 컴퓨트를 이동시키는 서버리스 실행 및 오케스트레이션 엔진입니다.",
    icon: "⚡",
    color: "#f59e0b",
    href: "/ko/solutions/vast-data/dataengine",
  },
  {
    id: "syncengine",
    name: "SyncEngine",
    tagline: "AI의 데이터 동기화",
    desc: "외부 소스를 인덱싱하고 DataSpace로 동기화하는 확장 가능한 데이터 디스커버리 및 마이그레이션 서비스입니다. 인제스트 시 자동 인리치먼트 파이프라인을 트리거합니다.",
    icon: "🔄",
    color: "#8b5cf6",
    href: "/ko/solutions/vast-data/syncengine",
  },
  {
    id: "insightengine",
    name: "InsightEngine",
    tagline: "AI의 인사이트 엔진",
    desc: "RAG 및 에이전틱 워크플로우를 위한 모델 오케스트레이션, 도구 서비스, 파이프라인 옵저버빌리티를 제공하는 실시간 벡터 임베딩 및 검색 엔진입니다.",
    icon: "🔍",
    color: "#ec4899",
    href: "/ko/solutions/vast-data/insightengine",
  },
  {
    id: "agentengine",
    name: "AgentEngine",
    tagline: "AI의 에이전트 플랫폼",
    desc: "컨테이너화된 런타임, 라이프사이클 관리, MCP 통합, 멀티 에이전트 스택 전반의 감사 추적을 제공하는 프로덕션급 AI 에이전트 배포 레이어입니다.",
    icon: "🤖",
    color: "#14b8a6",
    badge: "2026",
    href: "/ko/solutions/vast-data/agentengine",
  },
];

/* ───── DASE 아키텍처 4대 원칙 ───── */
const DASE_PILLARS = [
  {
    letter: "D",
    title: "Disaggregated",
    titleKo: "분리형",
    desc: "컴퓨트와 스토리지를 분리하여 각각 독립적으로 확장할 수 있습니다. 병목 현상을 제거하고 선형적 확장을 실현합니다.",
  },
  {
    letter: "A",
    title: "And",
    titleKo: "그리고",
    desc: "스토리지, 데이터베이스, 컴퓨트를 하나의 통합된 소프트웨어 플랫폼으로 결합합니다.",
  },
  {
    letter: "S",
    title: "Shared",
    titleKo: "공유형",
    desc: "모든 노드가 전체 글로벌 데이터셋에 접근합니다. 데이터 이동 없이 어디서든 처리가 가능합니다.",
  },
  {
    letter: "E",
    title: "Everything",
    titleKo: "전체",
    desc: "파일, 오브젝트, 테이블, 벡터, 스트림, 메타데이터를 단일 글로벌 네임스페이스로 통합합니다.",
  },
];

/* ───── 핵심 수치 ───── */
const STATS = [
  { value: "6×9", label: "가용성", sub: "99.9999%" },
  { value: "60%", label: "TCO 절감", sub: "vs. 레거시" },
  { value: "11×", label: "벡터 검색 속도", sub: "vs. 전용 DB" },
  { value: "91%", label: "비용 절감", sub: "벡터 워크로드" },
];

/* ───── IntersectionObserver 기반 fade-in 훅 ───── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ───── 메인 페이지 컴포넌트 ───── */
export default function VastAiOsPage() {
  return (
    <div style={{ background: "#020a1a", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          background: "linear-gradient(180deg, #020a1a 0%, #061428 50%, #020a1a 100%)",
        }}
      >
        {/* 배경 그라데이션 오브 */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 text-center" style={{ maxWidth: 800 }}>
          {/* 뱃지 */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 20,
              background: "rgba(45,212,191,0.08)",
              border: "1px solid rgba(45,212,191,0.2)",
              marginBottom: 28,
              fontSize: 13,
              color: "#2dd4bf",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            VAST DATA · AI OPERATING SYSTEM
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#fff",
              margin: "0 0 20px",
            }}
          >
            하나의 플랫폼,
            <br />
            <span style={{ color: "#2dd4bf" }}>무한한 가능성</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              maxWidth: 640,
              margin: "0 auto 36px",
            }}
          >
            VAST AI Operating System은 스토리지, 데이터베이스, 컴퓨트를 네이티브로 통합하여 
            에이전틱 컴퓨팅과 데이터 집약적 애플리케이션의 진정한 힘을 발휘합니다.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            
          </div>
        </div>
      </section>

      {/* ── 핵심 수치 ── */}
      <section style={{ padding: "0 24px 64px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
          }}
        >
          {STATS.map((s, i) => (
            <FadeSection key={i} delay={i * 0.1}>
              <div
                style={{
                  textAlign: "center",
                  padding: "28px 16px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 700, color: "#2dd4bf" }}>{s.value}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", marginTop: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.sub}</div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── DASE 아키텍처 ── */}
      <section style={{ padding: "64px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 600,
                color: "#06b6d4",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              아키텍처
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, color: "#fff", margin: "0 0 16px" }}>
              DASE 아키텍처
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
              Disaggregated And Shared Everything — 레거시 인프라의 근본적 한계를 극복하는
              새로운 아키텍처 패러다임입니다.
            </p>
          </div>
        </FadeSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {DASE_PILLARS.map((p, i) => (
            <FadeSection key={i} delay={i * 0.12}>
              <div
                style={{
                  padding: "32px 24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  height: "100%",
                  transition: "border-color 0.3s, background 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(45,212,191,0.3)";
                  e.currentTarget.style.background = "rgba(45,212,191,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(13,148,136,0.15), rgba(6,182,212,0.1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#2dd4bf",
                    marginBottom: 16,
                  }}
                >
                  {p.letter}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: "0 0 4px" }}>
                  {p.title}
                </h3>
                <div style={{ fontSize: 13, color: "#2dd4bf", marginBottom: 10 }}>{p.titleKo}</div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── 통합 메시지 ── */}
      <section style={{ padding: "48px 24px 64px" }}>
        <FadeSection>
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "40px 32px",
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(13,148,136,0.08) 0%, rgba(6,182,212,0.05) 100%)",
              border: "1px solid rgba(45,212,191,0.15)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
              별도 제품이 아닌, 하나의 통합 플랫폼
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              아래의 모든 기능은 VAST AI Operating System에 내장되어 있습니다.
              별도의 라이선스나 복잡한 통합 작업 없이, 하나의 플랫폼에서 모든 데이터 워크로드를 처리합니다.
            </p>
          </div>
        </FadeSection>
      </section>

      {/* ── 7대 핵심 컴포넌트 ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 600,
                color: "#06b6d4",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              핵심 컴포넌트
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#fff", margin: 0 }}>
              VAST AI OS의 7가지 핵심 엔진
            </h2>
          </div>
        </FadeSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {COMPONENTS.map((c, i) => (
            <FadeSection key={c.id} delay={i * 0.08}>
              <Link
                href={c.href}
                style={{
                  display: "block",
                  padding: "28px 24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  height: "100%",
                  transition: "border-color 0.3s, transform 0.2s, background 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.color + "40";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.background = c.color + "08";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{c.icon}</span>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", margin: 0 }}>{c.name}</h3>
                      {c.badge && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 10,
                            background: "rgba(245,158,11,0.15)",
                            color: "#f59e0b",
                          }}
                        >
                          {c.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: c.color, marginTop: 2 }}>{c.tagline}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>
                  {c.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 16,
                    fontSize: 13,
                    fontWeight: 500,
                    color: c.color,
                  }}
                >
                  자세히 보기 →
                </div>
              </Link>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── 레거시 vs VAST 비교 ── */}
      <section style={{ padding: "64px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 600,
                color: "#06b6d4",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              왜 VAST인가?
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#fff", margin: 0 }}>
              레거시 인프라의 한계를 넘어서
            </h2>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { legacy: "사일로화된 스토리지·DB·컴퓨트", vast: "단일 AI OS로 통합" },
            { legacy: "노드 추가 시 성능 저하", vast: "선형적 확장 (DASE)" },
            { legacy: "HDD 기반 계층형 스토리지", vast: "올플래시, HDD보다 낮은 TCO" },
            { legacy: "별도 벡터 DB 필요", vast: "내장 벡터 스토어 (DataBase)" },
            { legacy: "복잡한 ETL 파이프라인", vast: "서버리스 이벤트 기반 처리" },
            { legacy: "멀티테넌시 미지원", vast: "네이티브 멀티테넌시·QoS" },
          ].map((row, i) => (
            <FadeSection key={i} delay={i * 0.06}>
              <div
                style={{
                  display: "contents",
                }}
              >
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: 10,
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.12)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "rgba(239,68,68,0.6)", marginRight: 6 }}>✕</span>
                  {row.legacy}
                </div>
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: 10,
                    background: "rgba(45,212,191,0.06)",
                    border: "1px solid rgba(45,212,191,0.12)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#2dd4bf", marginRight: 6 }}>✓</span>
                  {row.vast}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 24px 100px" }}>
        <FadeSection>
          <div
            style={{
              maxWidth: 700,
              margin: "0 auto",
              padding: "48px 32px",
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(59,130,246,0.06) 100%)",
              border: "1px solid rgba(45,212,191,0.15)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
              VAST Data 도입을 검토하고 계신가요?
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>
              VWorks Technologies는 VAST Data 공인 파트너로서<br />
              컨설팅부터 구축, 운영까지 전 과정을 지원합니다.
            </p>
            <Link
              href="/ko/contact?from=vast-ai-os"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #0d9488, #06b6d4)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              무료 상담 신청하기
            </Link>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}
