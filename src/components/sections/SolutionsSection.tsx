"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const TAG_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  CORE: { color: "var(--teal)", bg: "var(--teal-dim)", border: "var(--border-t)" },
  HPC: { color: "var(--amber)", bg: "rgba(251,191,36,.08)", border: "rgba(251,191,36,.2)" },
  AI: { color: "var(--purple)", bg: "rgba(167,139,250,.08)", border: "rgba(167,139,250,.2)" },
  HARDWARE: { color: "var(--cyan)", bg: "rgba(56,217,245,.08)", border: "rgba(56,217,245,.2)" },
  SECURITY: { color: "var(--green)", bg: "rgba(74,222,128,.08)", border: "rgba(74,222,128,.2)" },
  SUPPORT: { color: "var(--muted)", bg: "rgba(90,122,154,.08)", border: "rgba(90,122,154,.2)" },
};

const CARDS = [
  { category: "STORAGE · CORE PARTNER", title: "VAST Data 스토리지", tag: "CORE", summary: "페타바이트 규모 비정형 데이터를 단일 플랫폼으로 통합 관리하는 차세대 올플래시 스토리지 솔루션.", href: "/ko/solutions/vast-data" },
  { category: "INFRASTRUCTURE · HPC", title: "HPE Cray 슈퍼컴퓨팅", tag: "HPC", summary: "국방·연구기관 특화 고성능 컴퓨팅 클러스터 설계·구축·운영 전 과정을 책임집니다.", href: "/ko/solutions/hpe-cray" },
  { category: "AI · ML · GPU CLUSTER", title: "AI 컴퓨팅", tag: "AI", summary: "GPU 클러스터 기반 AI 학습·추론 인프라 구축부터 MLOps 파이프라인 환경 설정까지 엔드투엔드로 제공합니다.", href: "/ko/solutions" },
  { category: "HARDWARE · OFFICIAL PARTNER", title: "Dell PowerEdge 서버", tag: "HARDWARE", summary: "Dell Technologies 공식 파트너로서 PowerEdge 전 라인업을 공공조달·기업 맞춤 구성으로 공급합니다.", href: "/ko/solutions/dell-server" },
  { category: "SECURITY · DEFENSE SPECIALIZED", title: "보안 아키텍처", tag: "SECURITY", summary: "방위사업청 ISMS 기준 망분리·망연계 보안 아키텍처 설계 및 구현 전문 서비스.", href: "/ko/solutions/network-security" },
  { category: "TECHNICAL SUPPORT · MAINTENANCE", title: "기술지원 서비스", tag: "SUPPORT", summary: "구축 완료 후에도 끝나지 않는 책임 — 부울경 기반 신속한 현장 대응과 24×7 원격 모니터링.", href: "/ko/contact" },
];

export default function SolutionsSection() {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(1);
      else if (w < 1024) setCols(2);
      else setCols(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.3em", color: "var(--teal)", marginBottom: 12 }}>SOLUTIONS</div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 64px)", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 16 }}>솔루션</h2>
        <p style={{ fontSize: 14, color: "var(--muted)", fontWeight: 300 }}>AI·HPC·스토리지 전 영역을 아우르는 통합 인프라 서비스</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2 }}>
        {CARDS.map((card) => {
          const tc = TAG_COLORS[card.tag] ?? TAG_COLORS.SUPPORT;
          return (
            <Link
              key={card.href}
              href={card.href}
              style={{
                display: "block",
                border: "1px solid var(--border)",
                padding: "28px 24px",
                textDecoration: "none",
                color: "inherit",
                transition: "border-color 0.2s, background 0.2s",
                minHeight: cols === 1 ? "auto" : 280,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = tc.color; (e.currentTarget as HTMLElement).style.background = tc.bg; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 8 }}>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.15em", lineHeight: 1.4 }}>{card.category}</span>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: tc.color, border: `1px solid ${tc.border}`, background: tc.bg, padding: "2px 8px", whiteSpace: "nowrap" }}>{card.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px, 3vw, 36px)", letterSpacing: "0.02em", lineHeight: 1.1, color: "var(--text)", marginBottom: 12 }}>{card.title}</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, fontWeight: 300, marginBottom: 20 }}>{card.summary}</p>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: tc.color, letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 6 }}>
                LEARN MORE <span style={{ fontSize: 14 }}>→</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
