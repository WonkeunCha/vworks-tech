import ContactForm from "@/components/ui/ContactForm";

export const metadata = {
  title: "문의하기",
  description: "VWorks Technologies 프로젝트 문의, 견적, 기술 상담",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 32px" }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.3em", color: "var(--teal)", marginBottom: 12 }}>CONTACT</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 16 }}>문의하기</h1>
          <p style={{ fontSize: 16, color: "var(--muted)", fontWeight: 300, maxWidth: 560 }}>
            프로젝트 문의, 견적 요청, 기술 상담 등 무엇이든 연락해 주세요.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
