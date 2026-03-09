
import Link from "next/link";

const TAG_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  CORE: { color: "var(--teal)", bg: "var(--teal-dim)", border: "var(--border-t)" },
  HPC: { color: "var(--amber)", bg: "rgba(251,191,36,.08)", border: "rgba(251,191,36,.2)" },
  AI: { color: "var(--purple)", bg: "rgba(167,139,250,.08)", border: "rgba(167,139,250,.2)" },
  HARDWARE: { color: "var(--cyan)", bg: "rgba(56,217,245,.08)", border: "rgba(56,217,245,.2)" },
  SECURITY: { color: "var(--green)", bg: "rgba(74,222,128,.08)", border: "rgba(74,222,128,.2)" },
  SUPPORT: { color: "var(--muted)", bg: "rgba(90,122,154,.08)", border: "rgba(90,122,154,.2)" },
};

export default function SolutionsSection() {
  
  
  const cards = t.raw("cards") as Array<{
    category: string;
    title: string;
    tag: string;
    summary: string;
    href: string;
  }>;

  return (
    <section style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto" }}>
      {/* SECTION HEADER */}
      <div style={{ marginBottom: 64 }}>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: "var(--teal)",
          marginBottom: 12,
        }}>
          {"솔루션"}
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(40px, 5vw, 64px)",
          letterSpacing: "0.02em",
          lineHeight: 1,
          marginBottom: 16,
        }}>
          {"핵심 솔루션 포트폴리오"}
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", fontWeight: 300 }}>
          {"데이터 인프라부터 보안까지, VWorks가 공급·구축·유지보수합니다."}
        </p>
      </div>

      {/* CARD GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2,
      }}>
        {cards.map((card, i) => {
          const tagStyle = TAG_COLORS[card.tag] ?? TAG_COLORS.SUPPORT;
          const isCoreCard = card.tag === "CORE";

          return (
            <Link
              key={i}
              href={`/${locale}${card.href}`}
              style={{
                display: "block",
                textDecoration: "none",
                background: isCoreCard
                  ? "linear-gradient(135deg, rgba(0,201,177,0.06), rgba(0,10,20,0.8))"
                  : "var(--surface)",
                border: isCoreCard ? "1px solid var(--border-t)" : "1px solid var(--border)",
                padding: "32px 28px",
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = tagStyle.border;
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = isCoreCard ? "var(--border-t)" : "var(--border)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* TOP ACCENT */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${tagStyle.color}, transparent)`,
                opacity: isCoreCard ? 1 : 0.4,
              }} />

              {/* CATEGORY + TAG */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  color: "var(--muted)",
                  lineHeight: 1.4,
                }}>
                  {card.category}
                </div>
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  padding: "3px 10px",
                  borderRadius: 1,
                  background: tagStyle.bg,
                  border: `1px solid ${tagStyle.border}`,
                  color: tagStyle.color,
                  flexShrink: 0,
                  marginLeft: 8,
                }}>
                  {card.tag}
                </span>
              </div>

              {/* TITLE */}
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 26,
                letterSpacing: "0.03em",
                color: "var(--white)",
                marginBottom: 12,
                lineHeight: 1.1,
              }}>
                {card.title}
              </h3>

              {/* SUMMARY */}
              <p style={{
                fontSize: 13,
                color: "var(--muted)",
                fontWeight: 300,
                lineHeight: 1.8,
                marginBottom: 24,
              }}>
                {card.summary}
              </p>

              {/* ARROW */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: tagStyle.color,
              }}>
                <span>LEARN MORE</span>
                <span style={{ fontSize: 14 }}>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
