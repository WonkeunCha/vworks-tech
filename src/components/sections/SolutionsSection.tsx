"use client";
import Link from "next/link";

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
  { category: "INFRASTRUCTURE · HPC", title: "HPC 인프라", tag: "HPC", summary: "국방·연구기관 특화 고성능 컴퓨팅 클러스터 설계·구축·운영 전 과정을 책임집니다.", href: "/ko/solutions/hpe-cray" },
  { category: "AI · ML · GPU CLUSTER", title: "AI 컴퓨팅", tag: "AI", summary: "GPU 클러스터 기반 AI 학습·추론 인프라 구축부터 MLOps 파이프라인 환경 설정까지 엔드투엔드로 제공합니다.", href: "/ko/solutions" },
  { category: "HARDWARE · OFFICIAL PARTNER", title: "Dell 서버 공급", tag: "HARDWARE", summary: "Dell Technologies 공식 파트너로서 PowerEdge 전 라인업을 공공조달·기업 맞춤 구성으로 공급합니다.", href: "/ko/solutions/dell-server" },
  { category: "SECURITY · DEFENSE SPECIALIZED", title: "보안 아키텍처", tag: "SECURITY", summary: "방위사업청 ISMS 기준 망분리·망연계 보안 아키텍처 설계 및 구현 전문 서비스.", href: "/ko/solutions/network-security" },
  { category: "TECHNICAL SUPPORT · MAINTENANCE", title: "기술지원 서비스", tag: "SUPPORT", summary: "구축 완료 후에도 끝나지 않는 책임 — 부울경 기반 신속한 현장 대응과 24×7 원격 모니터링.", href: "/ko/contact" },
];

export default function SolutionsSection() {
  return (
    <section style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 64 }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.3em", color: "var(--teal)", marginBottom: 12 }}>SOLUTIONS</div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 16 }}>솔루션</h2>
        <p style={{ fontSize: 15, color: "var(--muted)", fontWeight: 300 }}>AI·HPC·스토리지 전 영역을 아우르는 통합 인프라 서비스</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {CARDS.map((card, i) => {
          const tagStyle = TAG_COLORS[card.tag] ?? TAG_COLORS.SUPPORT;
          const isCoreCard = card.tag === "CORE";
          return (
            <Link key={i} href={card.href} style={{ display: "block", textDecoration: "none", background: isCoreCard ? "linear-gradient(135deg, rgba(0,201,177,0.06), rgba(0,10,20,0.8))" : "var(--surface)", border: isCoreCard ? "1px solid var(--border-t)" : "1px solid var(--border)", padding: "32px 28px", position: "relative", overflow: "hidden" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = tagStyle.border; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = isCoreCard ? "var(--border-t)" : "var(--border)"; el.style.transform = "translateY(0)"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${tagStyle.color}, transparent)`, opacity: isCoreCard ? 1 : 0.4 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--muted)", lineHeight: 1.4 }}>{card.category}</div>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: 1, background: tagStyle.bg, border: `1px solid ${tagStyle.border}`, color: tagStyle.color, flexShrink: 0, marginLeft: 8 }}>{card.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: "0.03em", color: "var(--white)", marginBottom: 12, lineHeight: 1.1 }}>{card.title}</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 300, lineHeight: 1.8, marginBottom: 24 }}>{card.summary}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: tagStyle.color }}>
                <span>LEARN MORE</span><span style={{ fontSize: 14 }}>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
