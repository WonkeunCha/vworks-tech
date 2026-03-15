"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ───── fade-in 훅 ───── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ───── TCO 비교 계산기 ───── */
function TcoCalculator() {
  const [capacity, setCapacity] = useState(500); // TB
  const [years, setYears] = useState(5);
  const [growthRate, setGrowthRate] = useState(30); // %

  // 간이 TCO 모델 (시각화 용도)
  const legacyCostPerTB = 1200; // 레거시: TB당 연간 비용 (HW+SW 번들)
  const geminiSwPerTB = 400; // Gemini SW: TB당 연간
  const geminiHwPerTB = 300; // Gemini HW: TB당 (초기 1회, 5년 감가)

  const yearData = Array.from({ length: years }, (_, i) => {
    const yr = i + 1;
    const currentCap = capacity * Math.pow(1 + growthRate / 100, i);

    // 레거시: 3년마다 포크리프트 업그레이드 (전체 교체 비용 추가)
    const forkliftYears = [3, 6, 9];
    const forkliftCost = forkliftYears.includes(yr) ? currentCap * 800 : 0;
    const legacyAnnual = currentCap * legacyCostPerTB + forkliftCost;

    // Gemini: SW 구독 + HW는 필요시 증설만
    const prevCap = i === 0 ? 0 : capacity * Math.pow(1 + growthRate / 100, i - 1);
    const newCap = currentCap - prevCap;
    const geminiAnnual = currentCap * geminiSwPerTB + (newCap > 0 ? newCap * geminiHwPerTB : 0);

    return { yr, capacity: Math.round(currentCap), legacy: Math.round(legacyAnnual), gemini: Math.round(geminiAnnual) };
  });

  const totalLegacy = yearData.reduce((s, d) => s + d.legacy, 0);
  const totalGemini = yearData.reduce((s, d) => s + d.gemini, 0);
  const savings = Math.round(((totalLegacy - totalGemini) / totalLegacy) * 100);
  const maxCost = Math.max(...yearData.map(d => Math.max(d.legacy, d.gemini)));

  return (
    <div
      style={{
        padding: "32px 28px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* 슬라이더 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>초기 데이터 용량</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#2dd4bf" }}>{capacity} TB</span>
          </div>
          <input
            type="range" min={100} max={5000} step={100} value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#2dd4bf" }}
          />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>연간 데이터 증가율</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#2dd4bf" }}>{growthRate}%</span>
          </div>
          <input
            type="range" min={10} max={100} step={5} value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#2dd4bf" }}
          />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>운영 기간</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#2dd4bf" }}>{years}년</span>
          </div>
          <input
            type="range" min={3} max={10} step={1} value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#2dd4bf" }}
          />
        </div>
      </div>

      {/* 차트 */}
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 180, marginBottom: 16 }}>
        {yearData.map((d) => (
          <div key={d.yr} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ display: "flex", gap: 3, alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
              <div
                style={{
                  width: "40%",
                  height: Math.max(4, (d.legacy / maxCost) * 150),
                  background: "rgba(239,68,68,0.5)",
                  borderRadius: "3px 3px 0 0",
                  transition: "height 0.5s ease",
                }}
                title={`레거시: ₩${(d.legacy / 10000).toFixed(0)}만`}
              />
              <div
                style={{
                  width: "40%",
                  height: Math.max(4, (d.gemini / maxCost) * 150),
                  background: "rgba(45,212,191,0.6)",
                  borderRadius: "3px 3px 0 0",
                  transition: "height 0.5s ease",
                }}
                title={`Gemini: ₩${(d.gemini / 10000).toFixed(0)}만`}
              />
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{d.yr}년차</div>
          </div>
        ))}
      </div>

      {/* 범례 + 결과 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: "rgba(239,68,68,0.5)" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>레거시 스토리지</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: "rgba(45,212,191,0.6)" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>VAST Gemini</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#2dd4bf" }}>~{savings}%</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginLeft: 8 }}>{years}년 TCO 절감</span>
        </div>
      </div>

      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 16, lineHeight: 1.5 }}>
        * 이 계산기는 개념적 비교를 위한 간이 모델입니다. 실제 비용은 구성, 워크로드, 데이터 축소율에 따라 달라집니다. 정확한 견적은 VWorks에 문의해주세요.
      </p>
    </div>
  );
}

/* ───── 라이선스 구조 ───── */
const LICENSE_MODEL = [
  {
    type: "용량 라이선스",
    icon: "💾",
    color: "#2dd4bf",
    points: [
      "사용 용량 기준 과금 (데이터 축소 후)",
      "100TB 단위로 시작 가능",
      "데이터 축소 혜택은 100% 고객에게",
      "하드웨어 용량과 독립적으로 라이선스",
    ],
  },
  {
    type: "컴퓨트 라이선스",
    icon: "⚡",
    color: "#06b6d4",
    points: [
      "CPU 코어 수 기준 과금",
      "컴퓨트와 스토리지 독립 확장",
      "성능 요구에 맞게 하드웨어 별도 증설",
      "소프트웨어 비용 없이 성능 업그레이드",
    ],
  },
];

/* ───── Co-Pilot 서비스 ───── */
const COPILOT_FEATURES = [
  { title: "L3 엔지니어 전담 배치", desc: "각 고객마다 전담 VAST Level 3 엔지니어가 배치되어 온보딩부터 일상 운영까지 책임집니다." },
  { title: "24/7 시스템 모니터링", desc: "Co-Pilot이 시스템을 상시 모니터링하여 용량, 성능, 건강 상태를 사전에 관리합니다." },
  { title: "무중단 확장 및 업그레이드", desc: "클러스터 확장과 소프트웨어 업그레이드의 모든 계획 및 배포를 Co-Pilot이 수행합니다." },
  { title: "기능 요청 우선 처리", desc: "고객의 핵심 기능 요청을 우선순위로 관리하고, 얼리 액세스 프로그램을 제공합니다." },
];

/* ───── Zero Compromises Guarantee ───── */
const GUARANTEES = [
  { title: "10년 플래시 보호", desc: "저비용 플래시의 10년 수명을 보장합니다. 하드웨어 투자를 장기적으로 보호합니다.", icon: "🛡️" },
  { title: "60일 무조건 반품", desc: "도입 후 60일 이내 무조건 반품을 보장합니다. 새로운 아키텍처 도입의 위험을 제거합니다.", icon: "↩️" },
  { title: "가동 시간 보장", desc: "컨트롤러 장애 시에도 시스템 다운타임이 발생하지 않음을 보장합니다.", icon: "⏱️" },
  { title: "데이터 내구성 보장", desc: "비휘발성 아키텍처로 컨트롤러 장애로 인한 데이터 손실이 없음을 보장합니다.", icon: "🔒" },
];

export default function VastGeminiPage() {
  return (
    <div style={{ background: "#020a1a", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          background: "linear-gradient(180deg, #020a1a 0%, #061428 50%, #020a1a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "30%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 text-center" style={{ maxWidth: 780 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            <Link href="/ko/solutions/vast-data/ai-os" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
              VAST AI OS
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 500 }}>Gemini</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 20,
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              marginBottom: 24,
              fontSize: 12,
              color: "#f59e0b",
              fontWeight: 500,
            }}
          >
            VAST DATA · GEMINI 구독 모델
          </div>

          <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.2, color: "#fff", margin: "0 0 16px" }}>
            무한한 <span style={{ color: "#f59e0b" }}>스토리지 생명주기</span>
          </h1>

          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", margin: "0 0 8px", fontWeight: 500 }}>
            포크리프트 업그레이드의 종말
          </p>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: 620,
              margin: "0 auto 32px",
            }}
          >
            하드웨어와 소프트웨어를 분리하여 구매하는 혁신적인 모델로,
            30년 넘게 이어져 온 강제 교체 주기를 끊습니다.
          </p>

          <Link
            href="/ko/contact?from=vast-gemini"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #d97706, #f59e0b)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Gemini 도입 상담
          </Link>
        </div>
      </section>

      {/* ── 핵심 개념: 레거시 vs Gemini 다이어그램 ── */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              핵심 개념
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>
              HW/SW 분리 구매 모델
            </h2>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* 레거시 모델 */}
          <FadeSection delay={0.1}>
            <div
              style={{
                padding: "28px 24px",
                borderRadius: 16,
                background: "rgba(239,68,68,0.04)",
                border: "1px solid rgba(239,68,68,0.12)",
                height: "100%",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(239,68,68,0.7)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                ✕ 레거시 모델
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: "0 0 16px" }}>HW + SW 번들 구매</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "하드웨어와 소프트웨어를 함께 구매",
                  "3~5년마다 전체 시스템 교체 (포크리프트)",
                  "교체 시 데이터 마이그레이션 필수",
                  "소프트웨어 라이선스 재구매",
                  "하드웨어 세대에 소프트웨어가 종속",
                  "숨겨진 비용과 불투명한 가격",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                    <span style={{ color: "rgba(239,68,68,0.5)", flexShrink: 0 }}>•</span>
                    {item}
                  </div>
                ))}
              </div>

              {/* 타임라인 */}
              <div style={{ marginTop: 24, padding: "16px", borderRadius: 10, background: "rgba(0,0,0,0.2)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>교체 주기</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  {["1년", "2년", "3년", "교체", "4년", "5년", "6년", "교체"].map((y, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: y === "교체" ? 28 : 20,
                        borderRadius: 4,
                        background: y === "교체" ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        color: y === "교체" ? "#fca5a5" : "rgba(255,255,255,0.3)",
                        fontWeight: y === "교체" ? 600 : 400,
                      }}
                    >
                      {y}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

          {/* Gemini 모델 */}
          <FadeSection delay={0.2}>
            <div
              style={{
                padding: "28px 24px",
                borderRadius: 16,
                background: "rgba(245,158,11,0.04)",
                border: "1px solid rgba(245,158,11,0.15)",
                height: "100%",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f59e0b", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                ✓ VAST GEMINI
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: "0 0 16px" }}>SW 구독 + HW 독립 구매</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "소프트웨어와 하드웨어를 분리 구매",
                  "무한한 스토리지 생명주기 (교체 없음)",
                  "데이터 마이그레이션 불필요",
                  "라이선스를 새 하드웨어로 이전 가능",
                  "하드웨어 비용 완전 투명",
                  "하이퍼스케일러 수준의 구매력",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                    <span style={{ color: "#f59e0b", flexShrink: 0 }}>•</span>
                    {item}
                  </div>
                ))}
              </div>

              {/* 타임라인 */}
              <div style={{ marginTop: 24, padding: "16px", borderRadius: 10, background: "rgba(0,0,0,0.2)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>무한 확장</div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  {["Gen1", "Gen1", "Gen2 추가", "Gen2", "Gen3 추가", "Gen1 퇴역", "Gen3", "Gen4 추가"].map((y, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: y.includes("추가") || y.includes("퇴역") ? 28 : 20,
                        borderRadius: 4,
                        background: y.includes("추가") ? "rgba(45,212,191,0.3)" : y.includes("퇴역") ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 8,
                        color: y.includes("추가") ? "#5eead4" : y.includes("퇴역") ? "#fbbf24" : "rgba(255,255,255,0.3)",
                        fontWeight: y.includes("추가") || y.includes("퇴역") ? 600 : 400,
                      }}
                    >
                      {y}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── 라이선스 구조 ── */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              비용 구조
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
              투명하고 유연한 라이선스
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 550, margin: "0 auto" }}>
              용량과 컴퓨트를 독립적으로 라이선스하여 워크로드에 최적화된 비용 구조를 구현합니다.
            </p>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {LICENSE_MODEL.map((l, i) => (
            <FadeSection key={i} delay={i * 0.15}>
              <div
                style={{
                  padding: "28px 24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{l.icon}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: l.color, margin: 0 }}>{l.type}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {l.points.map((p, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                      <span style={{ color: l.color, flexShrink: 0 }}>✓</span>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* 진입점 강조 */}
        <FadeSection delay={0.3}>
          <div
            style={{
              marginTop: 24,
              padding: "20px 28px",
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.03) 100%)",
              border: "1px solid rgba(245,158,11,0.15)",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 32, fontWeight: 700, color: "#f59e0b" }}>100TB</span>
            <span style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginLeft: 12 }}>
              부터 시작 가능 — 데이터 성장에 맞춰 유연하게 확장
            </span>
          </div>
        </FadeSection>
      </section>

      {/* ── TCO 비교 계산기 ── */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              비용 비교
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
              TCO 비교 시뮬레이터
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)" }}>
              슬라이더를 움직여 레거시 스토리지와 Gemini의 비용을 비교해보세요.
            </p>
          </div>
        </FadeSection>
        <FadeSection delay={0.1}>
          <TcoCalculator />
        </FadeSection>
      </section>

      {/* ── Co-Pilot 서비스 ── */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              포함 서비스
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
              VAST Co-Pilot
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}>
              모든 Gemini 구독에 기본 포함되는 전담 엔지니어 서비스입니다.
            </p>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {COPILOT_FEATURES.map((f, i) => (
            <FadeSection key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: "24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  height: "100%",
                }}
              >
                <h4 style={{ fontSize: 16, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{f.title}</h4>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── Zero Compromises Guarantee ── */}
      <section style={{ padding: "64px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              투자 보호
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", margin: 0 }}>
              Zero Compromises Guarantee
            </h2>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
          {GUARANTEES.map((g, i) => (
            <FadeSection key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: "24px 20px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>{g.icon}</span>
                <h4 style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{g.title}</h4>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{g.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 24px 100px" }}>
        <FadeSection>
          <div
            style={{
              maxWidth: 700,
              margin: "0 auto",
              padding: "48px 32px",
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(217,119,6,0.06) 100%)",
              border: "1px solid rgba(245,158,11,0.15)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
              Gemini로 스토리지 비용을 혁신하세요
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>
              VWorks Technologies는 VAST Data 공인 파트너로서<br />
              Gemini 도입 컨설팅과 TCO 분석을 제공합니다.
            </p>
            <Link
              href="/ko/contact?from=vast-gemini"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #d97706, #f59e0b)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              무료 TCO 분석 신청하기
            </Link>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}
