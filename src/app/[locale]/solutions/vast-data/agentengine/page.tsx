"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>{children}</div>;
}

const FEATURES = [
  { title: "컨테이너화된 에이전트 런타임", desc: "각 AI 에이전트가 격리된 컨테이너 환경에서 실행됩니다. 보안과 리소스 관리를 보장하면서 유연한 배포가 가능합니다.", icon: "📦" },
  { title: "라이프사이클 관리", desc: "에이전트의 배포, 스케일링, 업데이트, 롤백을 자동으로 관리합니다. 프로덕션급 안정성을 제공합니다.", icon: "🔄" },
  { title: "MCP 통합", desc: "Model Context Protocol을 네이티브로 지원하여 에이전트가 도구, 데이터 소스, 외부 서비스에 표준화된 방식으로 접근합니다.", icon: "🔗" },
  { title: "멀티 에이전트 스택", desc: "여러 에이전트를 조합하여 복잡한 워크플로우를 구성합니다. 에이전트 간 통신과 협업을 플랫폼 수준에서 지원합니다.", icon: "🤝" },
  { title: "완전한 감사 추적", desc: "모든 에이전트 행동, 의사결정, 데이터 접근을 기록합니다. 규제 준수와 디버깅을 위한 완전한 감사 가능성을 보장합니다.", icon: "📋" },
  { title: "엔터프라이즈 보안", desc: "역할 기반 접근 제어, 데이터 거버넌스, 에이전트별 권한 관리를 통해 엔터프라이즈 수준의 보안을 제공합니다.", icon: "🛡️" },
];

export default function VastAgentEnginePage() {
  return (
    <div style={{ background: "#020a1a", minHeight: "100vh" }}>
      <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 70px", background: "linear-gradient(180deg, #020a1a 0%, #061428 50%, #020a1a 100%)" }}>
        <div className="relative z-10 text-center" style={{ maxWidth: 780 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/ko/solutions/vast-data/ai-os" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>VAST AI OS</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ fontSize: 12, color: "#14b8a6", fontWeight: 500 }}>AgentEngine</span>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <span style={{ padding: "6px 16px", borderRadius: 20, background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.2)", fontSize: 12, color: "#14b8a6", fontWeight: 500 }}>VAST AI OS 내장 기능</span>
            <span style={{ padding: "4px 10px", borderRadius: 10, background: "rgba(245,158,11,0.15)", fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>2026 출시 예정</span>
          </div>

          <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.2, color: "#fff", margin: "0 0 16px" }}>
            VAST <span style={{ color: "#14b8a6" }}>AgentEngine</span>
          </h1>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", fontWeight: 500 }}>AI의 에이전트 플랫폼</p>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 32px" }}>
            프로덕션급 AI 에이전트 배포를 위한 컨테이너화된 런타임, 라이프사이클 관리, MCP 통합, 완전한 감사 추적을 제공합니다.
          </p>
          <Link href="/ko/contact?from=vast-agentengine" style={{ display: "inline-block", padding: "12px 28px", borderRadius: 8, background: "linear-gradient(135deg, #0d9488, #14b8a6)", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>AgentEngine 사전 상담</Link>
        </div>
      </section>

      {/* 에이전틱 AI 시대 */}
      <section style={{ padding: "40px 24px 64px", maxWidth: 800, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ padding: "32px 28px", borderRadius: 20, background: "linear-gradient(135deg, rgba(20,184,166,0.06) 0%, rgba(13,148,136,0.04) 100%)", border: "1px solid rgba(20,184,166,0.12)", textAlign: "center" }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>에이전틱 AI 시대의 인프라</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              AI 에이전트가 자율적으로 데이터를 분석하고, 의사결정을 내리고, 행동을 수행하는 시대가 다가오고 있습니다.
              AgentEngine은 이러한 에이전트를 안전하고 신뢰할 수 있게 배포하기 위한 프로덕션급 인프라입니다.
            </p>
          </div>
        </FadeSection>
      </section>

      {/* 핵심 기능 */}
      <section style={{ padding: "64px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection><div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#14b8a6", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>예정 기능</div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>프로덕션급 AI 에이전트 인프라</h2>
        </div></FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <FadeSection key={i} delay={i * 0.08}>
              <div style={{ padding: "28px 24px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", height: "100%" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{f.icon}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* VAST AI OS 연동 */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection><div style={{ textAlign: "center", marginBottom: 32 }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>VAST AI OS와의 시너지</h3>
        </div></FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {[
            { name: "DataStore", desc: "에이전트가 접근하는 데이터 저장소", href: "/ko/solutions/vast-data/datastore", color: "#2dd4bf" },
            { name: "DataBase", desc: "벡터 검색 및 구조화 쿼리", href: "/ko/solutions/vast-data/database", color: "#06b6d4" },
            { name: "InsightEngine", desc: "RAG 파이프라인 연동", href: "/ko/solutions/vast-data/insightengine", color: "#ec4899" },
            { name: "DataEngine", desc: "서버리스 함수 실행", href: "/ko/solutions/vast-data/dataengine", color: "#f59e0b" },
          ].map((item) => (
            <FadeSection key={item.name}>
              <Link href={item.href} style={{ display: "block", padding: "20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", transition: "border-color 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = item.color + "40"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
                <div style={{ fontSize: 15, fontWeight: 600, color: item.color }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{item.desc}</div>
              </Link>
            </FadeSection>
          ))}
        </div>
      </section>

      <section style={{ padding: "64px 24px 100px" }}>
        <FadeSection>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 32px", borderRadius: 20, background: "linear-gradient(135deg, rgba(20,184,166,0.1) 0%, rgba(13,148,136,0.06) 100%)", border: "1px solid rgba(20,184,166,0.15)", textAlign: "center" }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>에이전틱 AI를 준비하고 계신가요?</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>AgentEngine 출시에 앞서 VAST AI OS 기반 인프라를 먼저 구축하세요. VWorks가 로드맵을 함께 설계합니다.</p>
            <Link href="/ko/contact?from=vast-agentengine" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 8, background: "linear-gradient(135deg, #0d9488, #14b8a6)", color: "#fff", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>사전 상담 신청하기</Link>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}
