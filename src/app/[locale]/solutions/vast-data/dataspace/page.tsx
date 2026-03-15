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
  { title: "분산 일관성 관리", desc: "파일, 오브젝트, 테이블 수준의 세밀한 락/리스 제어로 WAN 병목 없이 로컬 트랜잭션을 처리합니다.", icon: "🔗" },
  { title: "통합 글로벌 네임스페이스", desc: "인텔리전트 캐싱과 예측 프리페치로 모든 사이트의 데이터를 통합하여 사일로와 파편화를 제거합니다.", icon: "🌐" },
  { title: "멀티프로토콜 접근", desc: "NFS, SMB, S3, SQL을 네이티브로 지원하여 구조화/비정형 데이터를 하나의 시스템에서 통합 관리합니다.", icon: "🔀" },
  { title: "클라우드 클러스터", desc: "주요 퍼블릭 클라우드에서 완전한 VAST 클러스터를 운영하며, DataSpace를 통해 다른 클러스터와 데이터를 공유합니다.", icon: "☁️" },
  { title: "버스트 컴퓨팅 통합", desc: "DataEngine과 연동하여 데이터와 컴퓨트 배치를 조율합니다. GPU를 최대로 활용하여 AI/분석 워크로드를 가속합니다.", icon: "⚡" },
  { title: "Snap-to-Object", desc: "스냅샷을 S3 호환 오브젝트로 캡처하여 아카이브, 복제, 즉시 복구를 수행합니다.", icon: "📸" },
];

export default function VastDataSpacePage() {
  return (
    <div style={{ background: "#020a1a", minHeight: "100vh" }}>
      <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 70px", background: "linear-gradient(180deg, #020a1a 0%, #061428 50%, #020a1a 100%)", position: "relative", overflow: "hidden" }}>
        <div className="relative z-10 text-center" style={{ maxWidth: 780 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/ko/solutions/vast-data/ai-os" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>VAST AI OS</Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ fontSize: 12, color: "#3b82f6", fontWeight: 500 }}>DataSpace</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", marginBottom: 24, fontSize: 12, color: "#3b82f6", fontWeight: 500 }}>VAST AI OS 내장 기능</div>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.2, color: "#fff", margin: "0 0 16px" }}>
            VAST <span style={{ color: "#3b82f6" }}>DataSpace</span>
          </h1>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", fontWeight: 500 }}>AI의 글로벌 패브릭</p>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 32px" }}>
            엣지, 코어, 클라우드를 아우르는 단일 데이터 패브릭으로 데이터가 필요한 곳에서 즉시 활용할 수 있습니다.
          </p>
          <Link href="/ko/contact?from=vast-dataspace" style={{ display: "inline-block", padding: "12px 28px", borderRadius: 8, background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>DataSpace 도입 상담</Link>
        </div>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeSection><div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#3b82f6", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>핵심 기능</div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>데이터 사일로의 종말</h2>
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
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 32px", borderRadius: 20, background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(37,99,235,0.06) 100%)", border: "1px solid rgba(59,130,246,0.15)", textAlign: "center" }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>글로벌 데이터 전략이 필요하신가요?</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>멀티사이트, 하이브리드 클라우드, 엣지 컴퓨팅 — VWorks가 최적의 DataSpace 구성을 제안합니다.</p>
            <Link href="/ko/contact?from=vast-dataspace" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 8, background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>무료 상담 신청하기</Link>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}
