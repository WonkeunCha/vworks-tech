import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer style={{
      position: "relative",
      zIndex: 1,
      borderTop: "1px solid var(--border)",
      background: "linear-gradient(180deg, transparent 0%, rgba(5,13,26,0.8) 100%)",
      padding: "64px 32px 32px",
      marginTop: 120,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* TOP ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* BRAND */}
          <div>
            <Image
              src="/logo-white.png"
              alt="VWorks Technologies"
              width={100}
              height={40}
              style={{ objectFit: "contain", marginBottom: 16 }}
            />
            <p style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "var(--teal)",
              marginBottom: 12,
            }}>
              {t("tagline")}
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300, lineHeight: 1.8 }}>
              {t("company")}
            </p>
          </div>

          {/* LINKS */}
          <div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "var(--teal)",
              marginBottom: 16,
            }}>
              QUICK LINKS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { href: `/${locale}/solutions`, label: "Solutions" },
                { href: `/${locale}/partners`, label: "Partners" },
                { href: `/${locale}/reference`, label: "References" },
                { href: `/${locale}/about`, label: "About" },
                { href: `/${locale}/contact`, label: "Contact" },
                { href: `/${locale}/privacy`, label: t("privacy") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
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
              letterSpacing: "0.2em",
              color: "var(--teal)",
              marginBottom: 16,
            }}>
              CONTACT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📞", val: t("tel") },
                { icon: "✉️", val: t("email") },
                { icon: "🏢", val: t("hq") },
                { icon: "🔬", val: t("lab") },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                  <span>{item.icon}</span>
                  <span style={{ fontWeight: 300 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

        {/* BOTTOM ROW */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 300, lineHeight: 1.8 }}>
            <span>{t("reg")}</span>
            <span style={{ margin: "0 12px", opacity: 0.4 }}>|</span>
            <span>{t("ceo")}</span>
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.05em" }}>
            {t("copyright")}
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
