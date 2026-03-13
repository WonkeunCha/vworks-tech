import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ReferenceSection from "@/components/sections/ReferenceSection";
import PartnersSection from "@/components/sections/PartnersSection";

function ContactCTA() {
  const locale = 'ko';

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
          CONTACT US
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(20px,5vw,64px)",
          letterSpacing: "0.02em",
          lineHeight: 1,
          marginBottom: 16,
        }}>
          프로젝트를 시작할 준비가 됐나요?
        </h2>
        <p style={{ fontSize: 16, color: "var(--muted)", fontWeight: 300, marginBottom: 40 }}>
          HPC·AI·스토리지 인프라 도입부터 운영까지, VWorks가 함께합니다.
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
          문의하기 →
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
