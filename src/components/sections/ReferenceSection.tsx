
import Link from "next/link";

export default function ReferenceSection() {
  
  
  const cases = t.raw("cases") as Array<{
    client: string;
    title: string;
    tags: string[];
    slug: string;
  }>;

  const TAG_COLORS: Record<string, string> = {
    HPC: "var(--amber)",
    국방: "var(--red)",
    Defense: "var(--red)",
    보안: "var(--green)",
    Security: "var(--green)",
    망연계: "var(--teal)",
    Network: "var(--teal)",
    AI: "var(--purple)",
    GPU: "var(--cyan)",
    SW개발: "var(--cyan)",
  };

  return (
    <section style={{
      padding: "120px 32px",
      background: "linear-gradient(180deg, transparent, rgba(15,42,74,0.2), transparent)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "var(--teal)",
              marginBottom: 12,
            }}>
              {"레퍼런스"}
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(40px, 5vw, 64px)",
              letterSpacing: "0.02em",
              lineHeight: 1,
              marginBottom: 12,
            }}>
              {"구축 레퍼런스"}
            </h2>
            <p style={{ fontSize: 15, color: "var(--muted)", fontWeight: 300 }}>
              {"국방·공공·민간 분야 핵심 인프라 구축 경험"}
            </p>
          </div>
          <Link
            href={'/reference'}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.1em",
              color: "var(--teal)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid var(--border-t)",
              padding: "10px 20px",
              borderRadius: 2,
              transition: "background 0.2s",
            }}
          >
            {"전체 레퍼런스 보기"} →
          </Link>
        </div>

        {/* CASE LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cases.map((c, i) => (
            <Link
              key={i}
              href={'/reference/${c.slug}'}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 180px 1fr auto",
                alignItems: "center",
                gap: 24,
                padding: "24px 28px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-t)";
                el.style.background = "rgba(0,201,177,0.03)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.background = "var(--surface)";
              }}
            >
              {/* INDEX */}
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 32,
                color: "rgba(0,201,177,0.25)",
                lineHeight: 1,
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* CLIENT */}
              <div>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: "var(--muted)",
                  marginBottom: 4,
                }}>
                  CLIENT
                </div>
                <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 400 }}>
                  {c.client}
                </div>
              </div>

              {/* TITLE */}
              <div style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 16,
                color: "var(--white)",
                fontWeight: 400,
              }}>
                {c.title}
              </div>

              {/* TAGS + ARROW */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {c.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        padding: "3px 8px",
                        borderRadius: 1,
                        color: TAG_COLORS[tag] ?? "var(--muted)",
                        border: `1px solid ${TAG_COLORS[tag] ? TAG_COLORS[tag].replace(")", ",0.25)").replace("var(", "color-mix(in srgb,") : "var(--border)"}`,
                        background: `${TAG_COLORS[tag] ?? "transparent"}1a`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span style={{ color: "var(--teal)", fontSize: 18, marginLeft: 8 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          a[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
