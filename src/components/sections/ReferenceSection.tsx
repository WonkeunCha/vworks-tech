"use client";
import Link from "next/link";

const CASES = [
  { client: "대한민국 해군", title: "해양수치모델 HPC 클러스터 구축", tags: ["HPC", "국방"], slug: "navy-ocean-hpc" },
  { client: "대한민국 해군", title: "NAIMS-II HPC 클러스터 구축", tags: ["HPC", "국방"], slug: "navy-naims-hpc" },
  { client: "한국수력원자력", title: "망연계 솔루션 통합 유지보수", tags: ["보안", "망연계"], slug: "khnp-network" },
  { client: "STX엔진", title: "AI 서버 인프라 구축", tags: ["AI", "GPU"], slug: "stx-ai-server" },
];

const TAG_COLORS: Record<string, string> = {
  HPC: "var(--amber)", 국방: "var(--teal)", 보안: "var(--green)", 망연계: "var(--teal)", AI: "var(--purple)", GPU: "var(--cyan)",
};

export default function ReferenceSection() {
  return (
    <section style={{ padding: "120px 32px", background: "linear-gradient(180deg, transparent, rgba(15,42,74,0.2), transparent)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.3em", color: "var(--teal)", marginBottom: 12 }}>REFERENCE</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 12 }}>구축 레퍼런스</h2>
            <p style={{ fontSize: 15, color: "var(--muted)", fontWeight: 300 }}>국방·공공·민간 분야 실제 구축 사례</p>
          </div>
          <Link href="/ko/reference" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.1em", color: "var(--teal)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--border-t)", padding: "10px 20px", borderRadius: 2 }}>
            전체 레퍼런스 보기 →
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {CASES.map((c, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "64px 180px 1fr auto", alignItems: "center", gap: 24, padding: "24px 28px", background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "rgba(0,201,177,0.25)", lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--muted)", marginBottom: 4 }}>CLIENT</div>
                <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 400 }}>{c.client}</div>
              </div>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: "var(--white)", fontWeight: 400 }}>{c.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {c.tags.map((tag, ti) => (
                    <span key={ti} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.1em", padding: "3px 8px", borderRadius: 1, color: TAG_COLORS[tag] ?? "var(--muted)", border: "1px solid var(--border)", background: "transparent" }}>{tag}</span>
                  ))}
                </div>
                <span style={{ color: "var(--teal)", fontSize: 18, marginLeft: 8 }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
