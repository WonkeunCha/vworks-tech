import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{
      position: "relative",
      zIndex: 1,
      borderTop: "1px solid var(--border)",
      background: "linear-gradient(180deg, transparent 0%, rgba(5,13,26,0.95) 100%)",
      padding: "clamp(48px,6vw,80px) clamp(20px,4vw,48px) clamp(24px,4vw,40px)",
      marginTop: 120,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* TOP GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "clamp(32px,4vw,56px)",
          marginBottom: 48,
        }}>

          {/* BRAND */}
          <div>
            <Image
              src="/vworks-tech/logo-wide.png"
              alt="VWorks Technologies"
              width={160}
              height={28}
              style={{ objectFit: "contain", height: "auto", marginBottom: 20 }}
            />
            <p style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "var(--teal)",
              marginBottom: 10,
            }}>
              BEYOND BOUNDARIES, BUILT TO SCALE
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300, lineHeight: 1.9 }}>
              브이웍스테크놀로지스 주식회사<br />
              국방·공공·연구기관 특화<br />
              HPC·AI·스토리지 인프라 전문 기업
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.25em",
              color: "var(--teal)",
              marginBottom: 20,
            }}>QUICK LINKS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/ko/solutions/", label: "솔루션" },
                { href: "/ko/solutions/vast-data/", label: "VAST Data 스토리지" },
                { href: "/ko/solutions/hpe-cray/", label: "HPE Cray 슈퍼컴퓨팅" },
                { href: "/ko/solutions/dell-server/", label: "Dell PowerEdge 서버" },
                { href: "/ko/solutions/network-security/", label: "보안 솔루션" },
                { href: "/ko/contact/", label: "문의하기" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.25em",
              color: "var(--teal)",
              marginBottom: 20,
            }}>CONTACT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--muted)", lineHeight: 1.5, alignItems: "flex-start" }}>
                <span style={{ minWidth: 16 }}>📞</span>
                <span style={{ fontWeight: 300 }}>051-747-6428</span>
              </div>
              <div style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--muted)", lineHeight: 1.5, alignItems: "flex-start" }}>
                <span style={{ minWidth: 16 }}>✉️</span>
                <a href="mailto:aiden@vworks.tech" style={{ color: "var(--teal)", textDecoration: "none", fontWeight: 300 }}>aiden@vworks.tech</a>
              </div>
              <div style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--muted)", lineHeight: 1.6, alignItems: "flex-start" }}>
                <span style={{ minWidth: 16 }}>🏢</span>
                <span style={{ fontWeight: 300 }}>부산광역시 해운대구<br />구남로 21번길 33, 3층</span>
              </div>
              <div style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--muted)", lineHeight: 1.6, alignItems: "flex-start" }}>
                <span style={{ minWidth: 16 }}>🔬</span>
                <span style={{ fontWeight: 300 }}>대구광역시 달서구<br />달구벌대로 1130, 203호<br />(기술연구소)</span>
              </div>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

        {/* BOTTOM */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 300, lineHeight: 2 }}>
            <span>사업자등록번호 184-87-01929</span>
            <span style={{ margin: "0 10px", opacity: 0.4 }}>|</span>
            <span>대표이사 차원근</span>
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.05em" }}>
            © 2025 VWorks Technologies. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
