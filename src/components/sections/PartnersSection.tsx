

const PARTNERS = [
  {
    name: "VAST Data",
    role: "CORE PARTNER",
    desc: "올플래시 스토리지 / AI 데이터 플랫폼",
    color: "var(--teal)",
  },
  {
    name: "Dell Technologies",
    role: "OFFICIAL PARTNER",
    desc: "PowerEdge 서버 / 엔터프라이즈 솔루션",
    color: "var(--cyan)",
  },
  {
    name: "휴네시온",
    role: "SOLUTION PARTNER",
    desc: "망분리 / 망연계 보안 솔루션",
    color: "var(--green)",
  },
  {
    name: "NVIDIA",
    role: "TECHNOLOGY",
    desc: "GPU / AI 컴퓨팅 플랫폼",
    color: "var(--green)",
  },
];

export default function PartnersSection() {
  

  return (
    <section style={{ padding: "120px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "var(--teal)",
            marginBottom: 12,
          }}>
            {"파트너"}
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 5vw, 64px)",
            letterSpacing: "0.02em",
            lineHeight: 1,
            marginBottom: 16,
          }}>
            {"공식 파트너십"}
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", fontWeight: 300, maxWidth: 600, margin: "0 auto" }}>
            {"글로벌 기술 파트너사와의 공식 파트너십을 기반으로 최고의 솔루션을 제공합니다."}
          </p>
        </div>

        {/* PARTNER CARDS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
        }}>
          {PARTNERS.map((p, i) => (
            <div
              key={i}
              style={{
                padding: "32px 24px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
              }} />

              <div style={{
                width: 56,
                height: 56,
                margin: "0 auto 16px",
                borderRadius: "50%",
                background: `${p.color}15`,
                border: `1px solid ${p.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}>
                {i === 0 ? "⚡" : i === 1 ? "🖥️" : i === 2 ? "🔒" : "🎮"}
              </div>

              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20,
                letterSpacing: "0.03em",
                color: "var(--white)",
                marginBottom: 4,
              }}>
                {p.name}
              </div>

              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.15em",
                color: p.color,
                marginBottom: 8,
              }}>
                {p.role}
              </div>

              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300, lineHeight: 1.6 }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>

        {/* TRUST INDICATORS */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 48,
          marginTop: 64,
          flexWrap: "wrap",
        }}>
          {[
            { icon: "🛡️", label: "방위사업청 등록" },
            { icon: "📋", label: "나라장터(G2B) 등록" },
            { icon: "🔬", label: "기업부설연구소 보유" },
            { icon: "✅", label: "ISO 품질 관리" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                color: "var(--muted)",
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div > div[style*="repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
