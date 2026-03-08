import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ReferenceSection from "@/components/sections/ReferenceSection";
import PartnersSection from "@/components/sections/PartnersSection";

function ContactCTA() {
  const t = useTranslations("contact_section");
  const locale = useLocale();

  return (
    <section style={{
      padding: "80px 32px 120px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: "var(--teal)",
          marginBottom: 16,
        }}>
          {t("section_label")}
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(40px, 5vw, 64px)",
          letterSpacing: "0.02em",
          lineHeight: 1,
          marginBottom: 16,
        }}>
          {t("section_title")}
        </h2>
        <p style={{ fontSize: 16, color: "var(--muted)", fontWeight: 300, marginBottom: 40 }}>
          {t("section_sub")}
        </p>
        <Link
          href={`/${locale}/contact`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "16px 40px",
            background: "linear-gradient(135deg, var(--teal), var(--cyan))",
            color: "var(--bg)",
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            textDecoration: "none",
            borderRadius: 2,
          }}
        >
          {t("go")} →
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <ReferenceSection />
      <PartnersSection />
      <ContactCTA />
    </>
  );
}
