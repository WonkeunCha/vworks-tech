import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ui/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isKo = locale === "ko";
  return {
    title: isKo ? "문의하기" : "Contact",
    description: isKo
      ? "VWorks Technologies 프로젝트 문의, 견적, 기술 상담"
      : "VWorks Technologies — project inquiries, quotes, technical consultation",
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const isKo = locale === "ko";

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 32px" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "var(--teal)",
            marginBottom: 16,
          }}>
            CONTACT
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 6vw, 80px)",
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            marginBottom: 20,
          }}>
            {t("title")}
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", fontWeight: 300, maxWidth: 480 }}>
            {t("sub")}
          </p>
        </div>

        {/* GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 64, alignItems: "start" }}>
          {/* FORM */}
          <ContactForm />

          {/* SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* CONTACT INFO */}
            <div style={{
              padding: "28px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--teal)",
                marginBottom: 20,
              }}>
                CONTACT INFO
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "📞", label: isKo ? "대표전화" : "Tel", val: "051-747-6428" },
                  { icon: "✉️", label: "Email", val: "aiden@vworks.tech" },
                  { icon: "🏢", label: isKo ? "본사" : "HQ", val: isKo ? "부산 해운대구 센텀3로 26" : "26 Centum 3-ro, Haeundae-gu, Busan" },
                  { icon: "🔬", label: isKo ? "기술연구소" : "Tech Lab", val: isKo ? "대구 달서구 달구벌대로 1130" : "1130 Dalgubeol-daero, Dalseo-gu, Daegu" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 3 }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 300 }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESPONSE TIME */}
            <div style={{
              padding: "20px 24px",
              background: "var(--teal-dim)",
              border: "1px solid var(--border-t)",
              borderRadius: 2,
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <div>
                  <div style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    color: "var(--teal)",
                    marginBottom: 6,
                  }}>
                    RESPONSE TIME
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text)", fontWeight: 300, lineHeight: 1.7 }}>
                    {isKo
                      ? "문의 접수 후 1~2 영업일 내 담당자가 연락드립니다. 긴급 문의는 직접 전화 또는 이메일로 연락해 주세요."
                      : "Our team will contact you within 1-2 business days. For urgent inquiries, please call or email us directly."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 400px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
