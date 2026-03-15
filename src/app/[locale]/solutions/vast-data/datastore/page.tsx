"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ───── fade-in 훅 ───── */
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

/* ───── 프로토콜 데이터 ───── */
const PROTOCOLS = [
  { name: "NFS", desc: "유닉스/리눅스 파일 공유", color: "#2dd4bf" },
  { name: "SMB", desc: "윈도우 파일 공유", color: "#06b6d4" },
  { name: "S3", desc: "오브젝트 스토리지", color: "#3b82f6" },
  { name: "Block", desc: "블록 스토리지 (iSCSI)", color: "#8b5cf6" },
  { name: "CSI", desc: "쿠버네티스 네이티브", color: "#14b8a6" },
  { name: "GPUDirect", desc: "GPU 직접 접근", color: "#f59e0b" },
];

/* ───── 핵심 기능 ───── */
const FEATURES = [
  {
    title: "올플래시 경제성",
    desc: "혁신적인 데이터 축소 기술, 유사성 기반 중복 제거, QLC 플래시 관리를 통해 HDD와 동등한 비용으로 올플래시 성능을 제공합니다.",
    icon: "💰",
  },
  {
    title: "엑사바이트급 확장",
    desc: "단일 네임스페이스에서 엑사바이트까지 선형적으로 확장되며, 수조 개의 파일과 오브젝트를 밀리초 지연 시간으로 관리합니다.",
    icon: "📈",
  },
  {
    title: "Six Nines 가용성",
    desc: "99.9999% 가용성으로 미션 크리티컬 워크로드를 보호합니다. 고급 이레이저 코딩과 자가 복구 기능을 내장합니다.",
    icon: "🛡️",
  },
  {
    title: "AI 최적화 인프라",
    desc: "GPU Direct Storage를 통해 GPU가 스토리지에 직접 접근하여 데이터 로딩 병목을 해소하고, AI 학습 파이프라인을 가속합니다.",
    icon: "🚀",
  },
  {
    title: "유니버셜 데이터 스토어",
    desc: "프로토콜 기반 사일로를 제거합니다. 사용자와 애플리케이션이 데이터 복사 없이 익숙한 프로토콜로 모든 데이터에 접근합니다.",
    icon: "🔗",
  },
  {
    title: "Snap-to-Object",
    desc: "스냅샷을 S3 호환 오브젝트로 캡처하여 아카이브, 복제, 즉시 복구를 수행합니다. 스토리지 오버헤드를 줄이고 데이터 보호를 가속합니다.",
    icon: "📸",
  },
];

/* ───── 레거시 vs DataStore ───── */
const PAIN_POINTS = [
  {
    problem: "고지연 (High Latency)",
    legacy: "HDD와 캐싱 레이어에 의존하여 지연 시간이 불안정하고 예측 불가능합니다.",
    solution: "올플래시 데이터 플랫폼으로 일관되게 높은 성능을 제공합니다.",
  },
  {
    problem: "파편화된 데이터 파이프라인",
    legacy: "데이터가 여러 사일로에 분산되어 AI 워크플로우를 지연시킵니다.",
    solution: "단일 데이터 접근 포인트로 파이프라인을 빠르고 효율적으로 유지합니다.",
  },
  {
    problem: "운영 복잡성",
    legacy: "계층형 시스템이 서로 다른 관리 도구에 의존하여 정책이 분산됩니다.",
    solution: "하나의 통합 플랫폼으로 운영을 획기적으로 단순화합니다.",
  },
];

/* ───── 적용 분야 ───── */
const USE_CASES = [
  { title: "AI / 딥러닝", desc: "GPU 활용률 극대화, 학습 데이터 파이프라인 가속" },
  { title: "HPC / 연구", desc: "시뮬레이션, 유전체학, 기후 모델링" },
  { title: "미디어 / 방송", desc: "4K/8K 프로덕션, 렌더링, 아카이브 통합" },
  { title: "금융 서비스", desc: "SEC/FINRA/CFTC 규정 준수, 감사 추적" },
  { title: "헬스케어", desc: "의료 영상, 바이오인포매틱스" },
  { title: "GPU 클라우드 (CSP)", desc: "멀티테넌시, QoS, 엑사바이트급 서비스" },
];

export default function VastDataStorePage() {
  return (
    <div style={{ background: "#020a1a", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          background: "linear-gradient(180deg, #020a1a 0%, #061428 50%, #020a1a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 text-center" style={{ maxWidth: 780 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            <Link
              href="/ko/solutions/vast-data/ai-os"
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              VAST AI OS
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ fontSize: 12, color: "#2dd4bf", fontWeight: 500 }}>DataStore</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 20,
              background: "rgba(45,212,191,0.08)",
              border: "1px solid rgba(45,212,191,0.2)",
              marginBottom: 24,
              fontSize: 12,
              color: "#2dd4bf",
              fontWeight: 500,
            }}
          >
            VAST AI OS 내장 기능
          </div>

          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            VAST <span style={{ color: "#2dd4bf" }}>DataStore</span>
          </h1>

          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", fontWeight: 500 }}>
            AI의 무한한 메모리
          </p>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 32px",
            }}
          >
            엑사바이트급 블록, 파일, 오브젝트 데이터를 올플래시 성능과 
            아카이브 수준의 경제성으로 저장합니다.
          </p>

          <Link
            href="/ko/contact?from=vast-datastore"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #0d9488, #06b6d4)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            DataStore 도입 상담
          </Link>
        </div>
      </section>

      {/* ── 멀티프로토콜 ── */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#06b6d4", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              유니버셜 액세스
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>
              6가지 프로토콜, 하나의 플랫폼
            </h2>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
          {PROTOCOLS.map((p, i) => (
            <FadeSection key={p.name} delay={i * 0.08}>
              <div
                style={{
                  textAlign: "center",
                  padding: "24px 12px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = p.color + "40"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: p.color, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{p.desc}</div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── 핵심 기능 ── */}
      <section style={{ padding: "64px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#06b6d4", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              핵심 기능
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>
              DataStore가 특별한 이유
            </h2>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <FadeSection key={i} delay={i * 0.08}>
              <div
                style={{
                  padding: "28px 24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  height: "100%",
                }}
              >
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{f.icon}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── 문제 해결 ── */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#06b6d4", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              문제 해결
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>
              레거시 스토리지의 한계를 극복
            </h2>
          </div>
        </FadeSection>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {PAIN_POINTS.map((p, i) => (
            <FadeSection key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: "28px 24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", margin: "0 0 16px" }}>{p.problem}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(239,68,68,0.6)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>레거시</div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>{p.legacy}</p>
                  </div>
                  <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(45,212,191,0.05)", border: "1px solid rgba(45,212,191,0.1)" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#2dd4bf", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>VAST DataStore</div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{p.solution}</p>
                  </div>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── 적용 분야 ── */}
      <section style={{ padding: "64px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#06b6d4", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              적용 분야
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>
              다양한 산업에서 활용
            </h2>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14 }}>
          {USE_CASES.map((u, i) => (
            <FadeSection key={i} delay={i * 0.06}>
              <div
                style={{
                  padding: "20px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h4 style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: "0 0 4px" }}>{u.title}</h4>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>{u.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── 관련 컴포넌트 ── */}
      <section style={{ padding: "0 24px 64px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>함께 사용하면 더 강력한</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { name: "DataBase", desc: "AI 네이티브 데이터베이스", href: "/ko/solutions/vast-data/database", color: "#06b6d4" },
              { name: "DataSpace", desc: "글로벌 데이터 패브릭", href: "/ko/solutions/vast-data/dataspace", color: "#3b82f6" },
              { name: "DataEngine", desc: "서버리스 컴퓨트", href: "/ko/solutions/vast-data/dataengine", color: "#f59e0b" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: "block",
                  padding: "20px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = item.color + "40"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: item.color }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{item.desc}</div>
              </Link>
            ))}
          </div>
        </FadeSection>
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
              DataStore 도입을 검토하고 계신가요?
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>
              워크로드 분석부터 PoC, 구축까지 — VWorks가 함께합니다.
            </p>
            <Link
              href="/ko/contact?from=vast-datastore"
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
