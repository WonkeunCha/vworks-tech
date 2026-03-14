"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";

/* ─── 스택 레이어 데이터 ─── */
const LAYERS = [
  {
    level: "L6 · APP",
    name: "수치모델\n가시화",
    color: "#38D9F5",
    chips: ["기상·해양 예측모델", "WRF / ROMS", "실시간 데이터 시각화", "위성·레이더 연계", "VWorks 자체 플랫폼"],
  },
  {
    level: "L5 · HPC/AI",
    name: "AI·HPC\n컴퓨팅",
    color: "#A78BFA",
    chips: ["딥러닝 인프라", "NVIDIA GPU 클러스터", "HPC 슈퍼컴퓨팅", "VAST Data 올플래시", "HPE Cray EX"],
  },
  {
    level: "L4 · INFRA",
    name: "서버·\n스토리지",
    color: "#0085FF",
    chips: ["Dell / HPE 서버", "올플래시 스토리지", "하이브리드 클라우드", "데이터센터 설계", "UPS·전력 인프라"],
  },
  {
    level: "L3 · NET",
    name: "네트워크\n·VDI",
    color: "#00C9B1",
    chips: ["고속 인터커넥트", "InfiniBand / Ethernet", "VMware Horizon VDI", "SD-WAN", "네트워크 최적화"],
  },
  {
    level: "L2 · SEC",
    name: "보안",
    color: "#F97316",
    chips: ["차세대 방화벽", "IPS·Anti-DDoS", "엔드포인트 보안", "클라우드 보안", "보안 취약점 진단"],
  },
  {
    level: "L1 · SW",
    name: "소프트웨어\n개발",
    color: "#34D399",
    chips: ["CUBRID DB 솔루션", "웹·플랫폼 개발", "HPC 모니터링 SW", "AI 솔루션 개발", "맞춤형 SI"],
  },
];

/* ─── 핵심 가치 데이터 ─── */
const VALUES = [
  {
    num: "01", icon: "🔭", title: "전문성", sub: "EXPERTISE", color: "#00C9B1",
    desc: "HPC·AI·보안·소프트웨어 개발까지, 각 분야 최고 전문가로 구성된 팀이 고객의 기술 과제를 함께 해결합니다. 단순 납품이 아닌 기술 파트너로서 최적의 솔루션을 제안합니다.",
  },
  {
    num: "02", icon: "🔗", title: "통합성", sub: "INTEGRATION", color: "#0085FF",
    desc: "수치모델부터 하드웨어 인프라, 네트워크, 보안, 소프트웨어까지 모든 레이어를 단일 파트너로 통합 설계·구축·운영합니다. 복잡한 IT 환경을 하나의 시선으로 바라봅니다.",
  },
  {
    num: "03", icon: "🚀", title: "혁신성", sub: "INNOVATION", color: "#A78BFA",
    desc: "VAST Data 올플래시, NVIDIA AI Factory, HPE Cray 슈퍼컴퓨팅 등 최첨단 기술을 가장 빠르게 도입합니다. 고객이 미래 기술을 오늘 경험할 수 있도록 앞장섭니다.",
  },
  {
    num: "04", icon: "🤝", title: "신뢰성", sub: "RELIABILITY", color: "#34D399",
    desc: "공공기관·연구기관·기업 고객의 미션 크리티컬 시스템을 책임지는 파트너입니다. 도입 이후에도 지속적인 유지보수와 기술 지원으로 안정적인 운영을 보장합니다.",
  },
];

/* ─── 통계 데이터 ─── */
const STATS = [
  { target: 13, suffix: "+", label: "전문 파트너사\n협력 네트워크" },
  { target: 6,  suffix: "",  label: "기술 커버리지\n전문 영역" },
  { target: 2021, suffix: "", label: "설립연도\n부산 해운대" },
  { target: 100, suffix: "%", label: "엔드투엔드\n커버리지" },
];

/* ─── 브랜드 컬러 팔레트 ─── */
const PALETTE = [
  { hex: "#00C9B1", name: "Primary Teal" },
  { hex: "#0085FF", name: "Primary Blue" },
  { hex: "#050d1a", name: "Background", border: true },
  { hex: "#0a1628", name: "Card", border: true },
  { hex: "#d4dff0", name: "Text" },
];

/* ─── 유틸 훅: 인터섹션 옵저버 ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── 카운터 컴포넌트 ─── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.5);
  useEffect(() => {
    if (!visible) return;
    const duration = target > 1000 ? 1800 : 1200;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [visible, target]);
  return (
    <span ref={ref} style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 600 }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── 스택 레이어 컴포넌트 ─── */
function StackLayer({ layer, index }: { layer: typeof LAYERS[0]; index: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        borderLeft: "2px solid rgba(255,255,255,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-40px)",
        transition: `opacity .7s ease ${index * 100}ms, transform .7s ease ${index * 100}ms`,
      }}
    >
      {/* 레이블 */}
      <div
        style={{
          padding: "28px 24px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
        }}
      >
        {/* 컬러 도트 */}
        <div style={{
          position: "absolute", left: -8, top: "50%", transform: "translateY(-50%)",
          width: 14, height: 14, borderRadius: "50%",
          background: layer.color,
          boxShadow: `0 0 12px ${layer.color}`,
        }} />
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: "rgba(212,223,240,0.45)", letterSpacing: ".1em", marginBottom: 8,
        }}>
          {layer.level}
        </div>
        <div style={{
          fontFamily: "'Pretendard', sans-serif", fontWeight: 700, fontSize: 15,
          color: layer.color, lineHeight: 1.3, whiteSpace: "pre-line",
        }}>
          {layer.name}
        </div>
      </div>
      {/* 칩 */}
      <div style={{ padding: "20px 28px", display: "flex", flexWrap: "wrap" as const, gap: 10, alignItems: "center" }}>
        {layer.chips.map((chip) => (
          <span
            key={chip}
            style={{
              display: "inline-flex", alignItems: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8, padding: "7px 14px",
              fontSize: 12, color: "#d4dff0",
            }}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── 가치 카드 컴포넌트 ─── */
function ValueCard({ v, index }: { v: typeof VALUES[0]; index: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        padding: "48px 44px",
        background: "#0a1628",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity .7s ease ${index * 120}ms, transform .7s ease ${index * 120}ms`,
      }}
    >
      {/* 상단 컬러 바 */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: v.color }} />
      {/* 배경 글로우 */}
      <div style={{
        position: "absolute", top: -80, right: -80,
        width: 220, height: 220, borderRadius: "50%",
        background: `radial-gradient(circle, ${v.color}20 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        letterSpacing: ".15em", color: "rgba(212,223,240,0.45)", marginBottom: 20,
      }}>
        {v.num}
      </div>
      <div style={{
        width: 50, height: 50, borderRadius: 12, marginBottom: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        {v.icon}
      </div>
      <div style={{
        fontFamily: "'Pretendard', sans-serif", fontWeight: 700, fontSize: 22,
        color: "#fff", marginBottom: 8, lineHeight: 1.2,
      }}>
        {v.title}
      </div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        color: v.color, marginBottom: 16, letterSpacing: ".05em",
      }}>
        {v.sub}
      </div>
      <div style={{ fontSize: 14, color: "rgba(212,223,240,0.5)", lineHeight: 1.9 }}>
        {v.desc}
      </div>
    </div>
  );
}

/* ─── 통계 아이템 컴포넌트 ─── */
function StatItem({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const { ref, visible } = useReveal(0.3);
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity .6s ease ${index * 100}ms, transform .6s ease ${index * 100}ms`,
      }}
    >
      <div style={{ fontSize: "clamp(36px,5vw,56px)", color: "#fff", lineHeight: 1, marginBottom: 8 }}>
        <Counter target={stat.target} suffix={stat.suffix} />
      </div>
      <div style={{ fontSize: 12, color: "rgba(212,223,240,0.45)", letterSpacing: ".08em", lineHeight: 1.6, whiteSpace: "pre-line" as const }}>
        {stat.label}
      </div>
    </div>
  );
}

/* ─── 메인 페이지 ─── */
export default function AboutPage() {
  return (
    <div style={{ background: "#050d1a", color: "#d4dff0", fontFamily: "'Noto Sans KR', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;900&family=JetBrains+Mono:wght@400;600&display=swap');
        .fu { opacity:0; transform:translateY(20px); animation: fadeUp .7s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:none; } }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <AnimatedHeroBg variant="teal" />
        <div className="fu" style={{ position: "relative", zIndex: 10, maxWidth: 860, padding: "0 24px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,201,177,0.08)", border: "1px solid rgba(0,201,177,0.25)",
            color: "#00C9B1", fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            padding: "6px 16px", borderRadius: 999, marginBottom: 28, letterSpacing: ".12em",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C9B1", display: "inline-block" }}
              className="animate-pulse" />
            ABOUT VWORKS
          </div>
          <h1 style={{
            fontFamily: "'Pretendard', sans-serif", fontWeight: 600, lineHeight: 1.08,
            fontSize: "clamp(42px, 7vw, 86px)", color: "#fff", marginBottom: 20,
          }}>
            HPC · AI를 아우르는<br />
            <span style={{ color: "#00C9B1" }}>모든 인프라</span>
          </h1>
          <p style={{ fontSize: "clamp(14px,2vw,18px)", color: "rgba(212,223,240,0.5)", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 44px" }}>
            수치모델 가시화부터 네트워크, 서버, 보안, 소프트웨어 개발까지<br />
            IT 인프라 전 주기를 단일 파트너로 해결합니다.
          </p>
          <Link href="/ko/contact/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg,#00C9B1,#0085FF)",
              color: "#030810", fontWeight: 600, fontSize: 14,
              padding: "14px 36px", borderRadius: 12, textDecoration: "none",
            }}
          >
            도입 문의 →
          </Link>
        </div>
      </section>

      {/* ── FULL-STACK INFOGRAPHIC ── */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: ".15em", color: "#00C9B1", marginBottom: 16, textTransform: "uppercase" as const }}>
          FULL-STACK INFRASTRUCTURE
        </div>
        <h2 style={{ fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: "clamp(28px,5vw,52px)", color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
          VWorks가 커버하는<br />모든 기술 영역
        </h2>
        <p style={{ color: "rgba(212,223,240,0.45)", fontSize: 15, lineHeight: 1.9, maxWidth: 560, marginBottom: 64 }}>
          단순 하드웨어 공급사가 아닙니다. 수치모델 애플리케이션부터 하드웨어 인프라,
          보안, 소프트웨어 개발까지 전 레이어를 설계·구축·운영합니다.
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {LAYERS.map((layer, i) => (
            <StackLayer key={layer.level} layer={layer} index={i} />
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{
        background: "linear-gradient(135deg, rgba(0,201,177,0.04) 0%, rgba(0,133,255,0.04) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "80px 24px",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
          {STATS.map((s, i) => (
            <StatItem key={i} stat={s} index={i} />
          ))}
        </div>
      </section>

      {/* ── 고객과의 약속 ── */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: ".15em", color: "#00C9B1", marginBottom: 16 }}>
            CORE IDENTITY
          </div>
          <h2 style={{ fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: "clamp(28px,5vw,52px)", color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
            고객과의 약속
          </h2>
          <p style={{ color: "rgba(212,223,240,0.45)", fontSize: 15, lineHeight: 1.9, maxWidth: 480, margin: "0 auto" }}>
            VWorks가 모든 프로젝트에서 지키는<br />네 가지 핵심 가치입니다.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          {VALUES.map((v, i) => <ValueCard key={v.num} v={v} index={i} />)}
        </div>
      </section>

      {/* ── BRAND CI ── */}
      <section style={{
        padding: "80px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        textAlign: "center",
      }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: ".15em", color: "#00C9B1", marginBottom: 12 }}>
          BRAND IDENTITY
        </div>
        <h2 style={{ fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: "clamp(24px,4vw,40px)", color: "#fff", marginBottom: 52 }}>
          VWorks CI
        </h2>
        {/* 컬러 팔레트 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" as const }}>
          {PALETTE.map((p) => (
            <div key={p.hex} style={{ textAlign: "center" }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: p.hex, margin: "0 auto 10px",
                border: p.border ? "1px solid rgba(255,255,255,0.15)" : "none",
              }} />
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(212,223,240,0.45)", lineHeight: 1.6 }}>
                {p.hex}<br />{p.name}
              </div>
            </div>
          ))}
        </div>
        {/* CTA */}
        <div style={{ marginTop: 80 }}>
          <Link href="/ko/contact/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,201,177,0.1)", border: "1px solid rgba(0,201,177,0.3)",
              color: "#00C9B1", fontWeight: 700, fontSize: 14,
              padding: "14px 36px", borderRadius: 12, textDecoration: "none",
            }}
          >
            파트너십 문의하기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
