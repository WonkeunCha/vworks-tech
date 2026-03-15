"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const DATA_TYPES = [
  { name: "구조화 데이터", desc: "테이블, 트랜잭션", icon: "📊", color: "#2dd4bf" },
  { name: "벡터", desc: "임베딩, 유사도 검색", icon: "🧬", color: "#06b6d4" },
  { name: "스트림", desc: "Kafka 호환 실시간", icon: "🌊", color: "#3b82f6" },
  { name: "카탈로그", desc: "메타데이터 인덱싱", icon: "📁", color: "#8b5cf6" },
  { name: "로그", desc: "감사 추적, 관측성", icon: "📝", color: "#f59e0b" },
  { name: "비정형 메타데이터", desc: "문맥 정보 자동 추출", icon: "🔗", color: "#ec4899" },
];

const FEATURES = [
  {
    title: "통합 트랜잭셔널 + 분석",
    desc: "행 단위 쓰기(트랜잭션)와 열 단위 저장(분석)을 동시에 지원합니다. 완전한 ACID 호환으로 효율성, 확장성, 신뢰성을 보장합니다.",
  },
  {
    title: "내장 벡터 스토어",
    desc: "별도의 벡터 DB 없이, 수조 개의 벡터를 실시간으로 저장하고 검색합니다. 시맨틱 데이터와 구조화 데이터를 결합한 하이브리드 쿼리를 지원합니다.",
  },
  {
    title: "Co-Located Joins",
    desc: "데이터 셔플과 복잡한 파티셔닝 없이 대규모 테이블 조인을 아키텍처 내부에서 로컬로 실행하여 극적으로 빠른 쿼리 응답을 제공합니다.",
  },
  {
    title: "Kafka 토픽 → 쿼리 테이블",
    desc: "VAST Event Broker에서 Kafka 토픽을 직접 인제스트하여 쿼리 가능한 테이블로 변환합니다. ETL 파이프라인 없이 실시간+히스토리컬 데이터를 즉시 분석합니다.",
  },
  {
    title: "통합 보안 및 거버넌스",
    desc: "역할 기반 및 세분화된 액세스 제어를 단일 플랫폼에서 제공합니다. 원시 데이터부터 벡터까지 단일 보안 모델을 보장합니다.",
  },
  {
    title: "DASE 기반 선형 확장",
    desc: "컴퓨트와 스토리지를 분리하여 모든 노드가 전체 글로벌 데이터셋에 접근합니다. 엑사바이트 규모에서도 밀리초 지연 시간을 유지합니다.",
  },
];

const STATS = [
  { value: "11×", label: "벡터 검색 속도", sub: "전용 벡터 DB 대비" },
  { value: "91%", label: "비용 절감", sub: "벡터 워크로드" },
  { value: "수조", label: "벡터 확장", sub: "선형 확장" },
  { value: "ACID", label: "트랜잭션 보장", sub: "완전 호환" },
];

export default function VastDataBasePage() {
  return (
    <div style={{ background: "#020a1a", minHeight: "100vh" }}>
      <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 70px", background: "linear-gradient(180deg, #020a1a 0%, #061428 50%, #020a1a 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "25%", right: "15%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="relative z-10 text-center" style={{ maxWidth: 780 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/ko/solutions/vast-data/ai-os" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>VAST AI OS</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ fontSize: 12, color: "#06b6d4", fontWeight: 500 }}>DataBase</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", marginBottom: 24, fontSize: 12, color: "#06b6d4", fontWeight: 500 }}>
            VAST AI OS 내장 기능
          </div>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.2, color: "#fff", margin: "0 0 16px" }}>
            VAST <span style={{ color: "#06b6d4" }}>DataBase</span>
          </h1>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", fontWeight: 500 }}>AI의 지식 베이스</p>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 32px" }}>
            구조화 데이터, 벡터, 스트림, 카탈로그, 로그를 하나의 AI 네이티브 데이터베이스에서 실시간으로 인덱싱하고 쿼리합니다.
          </p>
          <Link href="/ko/contact?from=vast-database" style={{ display: "inline-block", padding: "12px 28px", borderRadius: 8, background: "linear-gradient(135deg, #0891b2, #06b6d4)", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            DataBase 도입 상담
          </Link>
        </div>
      </section>

      {/* 핵심 수치 */}
      <section style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {STATS.map((s, i) => (
            <FadeSection key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center", padding: "24px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#06b6d4" }}>{s.value}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", marginTop: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.sub}</div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* 6가지 데이터 유형 */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#06b6d4", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>통합 데이터 모델</div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>6가지 데이터 유형, 하나의 데이터베이스</h2>
          </div>
        </FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
          {DATA_TYPES.map((d, i) => (
            <FadeSection key={d.name} delay={i * 0.08}>
              <div style={{ textAlign: "center", padding: "24px 12px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = d.color + "40"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
                <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{d.icon}</span>
                <div style={{ fontSize: 14, fontWeight: 600, color: d.color, marginBottom: 2 }}>{d.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{d.desc}</div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* 핵심 기능 */}
      <section style={{ padding: "64px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection><div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#06b6d4", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>핵심 기능</div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>레거시 DB의 한계를 넘어서</h2>
        </div></FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <FadeSection key={i} delay={i * 0.08}>
              <div style={{ padding: "28px 24px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", height: "100%" }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 24px 100px" }}>
        <FadeSection>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 32px", borderRadius: 20, background: "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.06) 100%)", border: "1px solid rgba(6,182,212,0.15)", textAlign: "center" }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>DataBase 도입을 검토하고 계신가요?</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>벡터 검색, 실시간 분석, 스트림 처리 — VWorks가 최적의 구성을 제안합니다.</p>
            <Link href="/ko/contact?from=vast-database" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 8, background: "linear-gradient(135deg, #0891b2, #06b6d4)", color: "#fff", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>무료 상담 신청하기</Link>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}
