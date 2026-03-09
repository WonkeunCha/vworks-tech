import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--border)", background: "linear-gradient(180deg, transparent 0%, rgba(5,13,26,0.8) 100%)", padding: "64px 32px 32px", marginTop: 120 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* BRAND */}
          <div>
            <Image src="/logo-white.png" alt="VWorks Technologies" width={100} height={40} style={{ objectFit: "contain", marginBottom: 16 }} />
            <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 12 }}>
              Beyond Boundaries, Built to Scale
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300, lineHeight: 1.8 }}>
              브이웍스테크놀로지스 주식회사
            </p>
          </div>

          {/* LINKS */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--teal)", marginBottom: 16 }}>
              QUICK LINKS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { href: "/ko/solutions", label: "솔루션" },
                { href: "/ko/partners", label: "파트너십" },
                { href: "/ko/reference", label: "구축 레퍼런스" },
                { href: "/ko/about", label: "회사 소개" },
                { href: "/ko/contact", label: "문의하기" },
                { href: "/ko/privacy", label: "개인정보처리방침" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--teal)", marginBottom: 16 }}>
              CONTACT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📞", val: "051-747-6428" },
                { icon: "✉️", val: "aiden@vworks.tech" },
                { icon: "🏢", val: "부산 해운대구 센텀3로 26, 3604호" },
                { icon: "🔬", val: "기술연구소: 대구 달서구 달구벌대로 1130, 203호" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                  <span>{item.icon}</span>
                  <span style={{ fontWeight: 300 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 300, lineHeight: 1.8 }}>
            <span>사업자등록번호: 184-87-01929</span>
            <span style={{ margin: "0 12px", opacity: 0.4 }}>|</span>
            <span>대표: 차원근</span>
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.05em" }}>
            © 2025 VWorks Technologies. All rights reserved.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
