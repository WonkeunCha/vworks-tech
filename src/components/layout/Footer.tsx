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
              src="/logo-wide.png"
              alt="VWorks Technologies"
              width={160}
              height={28}
              style={{ objectFit: "contain", height: "auto", marginBottom: 20 }}
            />
            <p style={{
              fontFamily: "'Pretendard', sans-serif",
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

          {/* QUICK LINKS — 솔루션 */}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--teal)", marginBottom: 16, fontWeight: 600 }}>
              SOLUTIONS
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/ko/solutions/vast-data/", label: "VAST Data 스토리지" },
                { href: "/ko/solutions/hpe-cray/", label: "HPE Cray 슈퍼컴퓨팅" },
                { href: "/ko/solutions/dell-server/", label: "Dell PowerEdge 서버" },
                { href: "/ko/solutions/hpe-server/", label: "HPE ProLiant 서버" },
                { href: "/ko/solutions/network-security/", label: "보안 솔루션" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS — 회사 */}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--teal)", marginBottom: 16, fontWeight: 600 }}>
              COMPANY
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/ko/about/", label: "회사소개" },
                { href: "/ko/partners/", label: "파트너" },
                { href: "/ko/reference/", label: "레퍼런스" },
                { href: "/ko/contact/", label: "문의하기" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS — Development */}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--teal)", marginBottom: 16, fontWeight: 600 }}>
              DEVELOPMENT
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <li>
                <Link href="/ko/dev/cubrid/" style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
                  CUBRID DB
                </Link>
              </li>
              <li>
                <Link href="/ko/dev/wx-viz/" style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
                  기상해양 가시화
                </Link>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: "var(--muted)", opacity: 0.4 }}>HPC 모니터링</span>
                <span style={{ fontSize: 10, color: "#4a6080", border: "1px solid #2a3a50", borderRadius: 4, padding: "1px 5px" }}>개발중</span>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--teal)", marginBottom: 16, fontWeight: 600 }}>
              CONTACT
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>📞</span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>051-747-6428</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>✉️</span>
                <a href="mailto:aiden@vworks.tech" style={{ fontSize: 13, color: "var(--teal)", textDecoration: "none" }}>
                  aiden@vworks.tech
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ fontSize: 14, marginTop: 1 }}>📍</span>
                <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
                  부산광역시 해운대구<br />
                  구남로 21번길 33, 3층
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ fontSize: 14, marginTop: 1 }}>🏢</span>
                <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
                  대구광역시 달서구<br />
                  달구벌대로 1130, 203호<br />
                  (기술연구소)
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 24,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}>
          <p style={{ fontSize: 12, color: "var(--muted)", opacity: 0.6 }}>
            사업자등록번호 184-87-01929 &nbsp;|&nbsp; 대표이사 차원근
          </p>
          <p style={{ fontSize: 12, color: "var(--muted)", opacity: 0.6 }}>
            © 2025 VWorks Technologies. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
