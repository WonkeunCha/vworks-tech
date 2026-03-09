"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const handleMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      const cols = Math.ceil(canvas.width / 60) + 2;
      const rows = Math.ceil(canvas.height / 60) + 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * 60 - 30;
          const y = j * 60 - 30;
          const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
          const mouseWave = Math.sin(dist * 0.015 - t * 3) * (120 / (dist * 0.05 + 1));
          const wave = Math.sin(i * 0.3 + t) * Math.cos(j * 0.3 + t * 0.7) * 8 + mouseWave;
          const py = y + wave;
          const alpha = 0.12 + Math.abs(wave) * 0.015;
          const size = 1.5 + Math.abs(wave) * 0.2;
          const tealAmt = Math.max(0, wave / 15);
          const r = Math.round(31 + tealAmt * (0 - 31));
          const g = Math.round(74 + tealAmt * (201 - 74));
          const b = Math.round(117 + tealAmt * (177 - 117));
          ctx.beginPath();
          ctx.arc(x, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha, 0.6)})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.8 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,201,177,0.04) 0%, transparent 70%)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(180deg, transparent 0%, var(--bg) 100%)", zIndex: 2 }} />

      <div style={{ position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto", padding: "120px 32px 80px", width: "100%" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--teal)", border: "1px solid var(--border-t)", padding: "6px 16px", borderRadius: 2, background: "var(--teal-dim)", marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", boxShadow: "0 0 8px var(--teal)", flexShrink: 0, display: "inline-block" }} />
          VAST Data 공식 파트너
        </div>

        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 8vw, 96px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 24 }}>
          <span style={{ display: "block" }}>데이터의 속도로,</span>
          <span style={{ display: "block", background: "linear-gradient(135deg, var(--teal) 0%, var(--cyan) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            비즈니스의 미래로
          </span>
        </h1>

        <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--text)", fontWeight: 300, maxWidth: 560, marginBottom: 48, lineHeight: 1.7 }}>
          국방·공공·연구기관 특화 HPC·AI·스토리지 인프라 전문 기업
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/ko/solutions" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 15, fontWeight: 500, color: "var(--bg)", textDecoration: "none", padding: "14px 32px", background: "linear-gradient(135deg, var(--teal), var(--cyan))", borderRadius: 2 }}>
            솔루션 알아보기 <span style={{ fontSize: 18 }}>→</span>
          </Link>
          <Link href="/ko/reference" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 15, fontWeight: 400, color: "var(--white)", textDecoration: "none", padding: "14px 32px", border: "1px solid var(--border)", borderRadius: 2 }}>
            구축 사례 보기
          </Link>
        </div>

        <div style={{ display: "flex", gap: 48, marginTop: 80, flexWrap: "wrap" }}>
          {[
            { num: "5+", label: "국방·공공 레퍼런스" },
            { num: "PB", label: "관리 데이터 규모" },
            { num: "24×7", label: "기술지원 서비스" },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: "0.03em", color: "var(--teal)", lineHeight: 1, marginBottom: 4 }}>{stat.num}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </section>
  );
}
