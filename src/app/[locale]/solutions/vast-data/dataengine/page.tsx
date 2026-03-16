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
  { title: "서버리스 Python 런타임", desc: "컨테이너화된 Python 함수를 작성하고 배포합니다. 인프라 관리 없이 데이터 처리 로직에 집중할 수 있습니다.", icon: "🐍" },
  { title: "이벤트 기반 트리거", desc: "데이터 변경 시 자동으로 워크플로우를 시작합니다. 데이터 인리치먼트, 벡터화, 태깅, 라우팅 등을 자동화합니다.", icon: "⚡" },
  { title: "Kafka 호환 이벤트 브로커", desc: "네이티브 Kafka API 호환 브로커로 결정적 저지연과 선형 확장을 제공합니다. 외부 Kafka 클러스터가 필요 없습니다.", icon: "📡" },
  { title: "데이터에 가까운 컴퓨트", desc: "데이터를 이동시키지 않고 컴퓨트를 데이터에 가까이 배치합니다. 네트워크 오버헤드를 제거하고 처리 속도를 극대화합니다.", icon: "🎯" },
  { title: "GPU 활용 최적화", desc: "DataSpace와 연동하여 데이터와 컴퓨트 배치를 조율합니다. 올바른 데이터가 준비된 상태에서 작업이 즉시 시작됩니다.", icon: "🚀" },
  { title: "엔드투엔드 파이프라인", desc: "인제스트 → 처리 → 인리치먼트 → 저장까지 전체 데이터 파이프라인을 단일 플랫폼에서 오케스트레이션합니다.", icon: "🔄" },
];

export default function VastDataEnginePage() {
  return (
    <div style={{ background: "#020a1a", minHeight: "100vh" }}>
      <section style={{  display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 48px", background: "linear-gradient(180deg, #020a1a 0%, #061428 50%, #020a1a 100%)" }}>
        <div className="relative z-10 text-center" style={{ maxWidth: 780 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/ko/solutions/vast-data/ai-os" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>VAST AI OS</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 500 }}>DataEngine</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", marginBottom: 24, fontSize: 12, color: "#f59e0b", fontWeight: 500 }}>VAST AI OS 내장 기능</div>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.2, color: "#fff", margin: "0 0 16px" }}>
            VAST <span style={{ color: "#f59e0b" }}>DataEngine</span>
          </h1>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", fontWeight: 500 }}>AI의 신경계</p>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 32px" }}>
            이벤트 트리거, Python 함수, Kafka 호환 브로커로 데이터에 가까운 서버리스 컴퓨트를 실현합니다.
          </p>
          
        </div>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection><div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>핵심 기능</div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>서버리스 데이터 처리의 새로운 기준</h2>
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
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 32px", borderRadius: 20, background: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(217,119,6,0.06) 100%)", border: "1px solid rgba(245,158,11,0.15)", textAlign: "center" }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>데이터 파이프라인 자동화가 필요하신가요?</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>이벤트 기반 처리, 실시간 스트리밍, GPU 워크로드 오케스트레이션 — VWorks가 함께합니다.</p>
            <Link href="/ko/contact?from=vast-dataengine" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 8, background: "linear-gradient(135deg, #d97706, #f59e0b)", color: "#fff", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>무료 상담 신청하기</Link>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}
