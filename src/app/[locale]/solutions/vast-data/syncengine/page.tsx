"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>{children}</div>;
}

const FEATURES = [
  { title: "데이터 디스커버리", desc: "레거시 스토리지, 엔터프라이즈 앱 등 외부 소스를 자동으로 인덱싱하여 데이터 자산의 전체 현황을 파악합니다.", icon: "🔍" },
  { title: "자동 동기화", desc: "외부 소스의 데이터를 DataSpace로 동기화합니다. 변경 사항을 감지하여 최신 상태를 유지합니다.", icon: "🔄" },
  { title: "인제스트 시 자동 인리치먼트", desc: "데이터 인제스트 시 자동으로 인리치먼트 파이프라인을 트리거합니다. 메타데이터 추출, 분류, 태깅을 자동화합니다.", icon: "✨" },
  { title: "레거시 마이그레이션", desc: "기존 스토리지에서 VAST로의 마이그레이션을 간소화합니다. 대규모 데이터를 안전하고 효율적으로 이동합니다.", icon: "📦" },
  { title: "멀티소스 통합", desc: "NAS, 오브젝트 스토리지, 클라우드 등 다양한 소스의 데이터를 단일 네임스페이스로 통합합니다.", icon: "🔗" },
  { title: "확장 가능한 파이프라인", desc: "페타바이트급 데이터 이동에도 선형적으로 확장됩니다. DataEngine과 연동하여 처리 성능을 극대화합니다.", icon: "📈" },
];

export default function VastSyncEnginePage() {
  return (
    <div style={{ background: "#020a1a", minHeight: "100vh" }}>
      <section style={{ minHeight: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 48px", background: "linear-gradient(180deg, #020a1a 0%, #061428 50%, #020a1a 100%)" }}>
        <div className="relative z-10 text-center" style={{ maxWidth: 780 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/ko/solutions/vast-data/ai-os" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>VAST AI OS</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 500 }}>SyncEngine</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", marginBottom: 24, fontSize: 12, color: "#8b5cf6", fontWeight: 500 }}>VAST AI OS 내장 기능</div>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.2, color: "#fff", margin: "0 0 16px" }}>
            VAST <span style={{ color: "#8b5cf6" }}>SyncEngine</span>
          </h1>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", fontWeight: 500 }}>AI의 데이터 동기화</p>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 32px" }}>
            외부 소스를 인덱싱하고 DataSpace로 동기화하는 확장 가능한 데이터 디스커버리 및 마이그레이션 서비스입니다.
          </p>
          <Link href="/ko/contact?from=vast-syncengine" style={{ display: "inline-block", padding: "12px 28px", borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>SyncEngine 도입 상담</Link>
        </div>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection><div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#8b5cf6", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>핵심 기능</div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>데이터를 보고, 검색하고, 동원하세요</h2>
        </div></FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <FadeSection key={i} delay={i * 0.08}>
              <div style={{ padding: "28px 24px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", height: "100%" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{f.icon}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      <section style={{ padding: "64px 24px 100px" }}>
        <FadeSection>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 32px", borderRadius: 20, background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(124,58,237,0.06) 100%)", border: "1px solid rgba(139,92,246,0.15)", textAlign: "center" }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>데이터 마이그레이션을 계획하고 계신가요?</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>레거시 스토리지에서 VAST로의 안전한 전환 — VWorks가 전 과정을 지원합니다.</p>
            <Link href="/ko/contact?from=vast-syncengine" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>무료 상담 신청하기</Link>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}
