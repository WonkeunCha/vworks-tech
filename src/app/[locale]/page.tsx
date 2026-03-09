import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ReferenceSection from "@/components/sections/ReferenceSection";
import PartnersSection from "@/components/sections/PartnersSection";

function ContactCTA() {
  return (
    <section style={{ padding: "80px 32px 120px", textAlign: "center" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.3em", color: "var(--teal)", marginBottom: 16 }}>
          CONTACT
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 16 }}>
          문의하기
        </h2>
        <p style={{ fontSize: 16, color: "var(--muted)", fontWeight: 300, marginBottom: 40 }}>
          프로젝트 문의, 견적 요청, 기술 상담 등 무엇이든 연락해 주세요.
        </p>
        <Link
          href="/ko/contact"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px", background: "linear-gradient(135deg, var(--teal), var(--cyan))", color: "var(--bg)", fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, fontWeight: 500, textDecoration: "none", borderRadius: 2 }}
        >
          문의 페이지로 →
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
