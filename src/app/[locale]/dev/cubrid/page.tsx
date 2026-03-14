"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";

const STATS = [
  { num: "30년+",    label: "국내 검증 역사" },
  { num: "100%",     label: "Oracle 호환 문법" },
  { num: "70%",      label: "라이선스 비용 절감" },
  { num: "공공기관", label: "최다 도입 DBMS" },
];

const FEATURES = [
  {
    icon: "DB",
    tag: "Oracle Compatibility",
    title: "Oracle 완전 호환",
    desc: "Oracle SQL 문법, PL/SQL 패키지·함수·트리거, 데이터 타입을 동일하게 지원합니다. 기존 Oracle 애플리케이션의 코드 수정을 최소화하면서 이전할 수 있습니다.",
  },
  {
    icon: "HPC",
    tag: "High Performance",
    title: "검증된 고성능 엔진",
    desc: "네이버 포털의 수십억 건 일 처리량을 실전 검증한 CUBRID 엔진. 동시 접속 처리, 멀티 프로세서 최적화, 인덱스 스킵 스캔 등 고성능 쿼리 최적화를 제공합니다.",
  },
  {
    icon: "HA",
    tag: "High Availability",
    title: "고가용성 HA 내장",
    desc: "CUBRID HA(High Availability) 기능으로 Master-Slave 자동 페일오버를 지원합니다. 데이터 손실 없는 자동 전환으로 미션 크리티컬 환경에서도 서비스 연속성을 보장합니다.",
  },
  {
    icon: "SEC",
    tag: "Enterprise Security",
    title: "엔터프라이즈 보안",
    desc: "테이블·컬럼 단위 접근 권한 제어, TLS/SSL 암호화 통신, 감사(Audit) 로그, 암호화 백업을 지원합니다. 공공기관 보안 요구사항을 완벽히 충족합니다.",
  },
  {
    icon: "STD",
    tag: "Open Standard",
    title: "오픈 표준 기반",
    desc: "SQL-92, SQL-99 표준을 준수하며 JDBC, ODBC, PHP, Python, Node.js, .NET 등 다양한 언어 드라이버를 공식 지원합니다. 벤더 종속 없는 자유로운 개발 환경을 제공합니다.",
  },
  {
    icon: "TCO",
    tag: "Cost Optimization",
    title: "라이선스 비용 혁신",
    desc: "GPL v2.0 기반 오픈소스로 소프트웨어 자체 비용이 없습니다. 기존 Oracle DBMS 대비 라이선스·유지보수 비용을 최대 70% 이상 절감합니다.",
  },
];

const MIG_STEPS = [
  {
    num: "01",
    color: "#0085FF",
    title: "현황 분석 & 진단",
    items: [
      "기존 Oracle DB 스키마·오브젝트 분석",
      "PL/SQL 패키지·함수·트리거 목록화",
      "애플리케이션 SQL 쿼리 패턴 분석",
      "마이그레이션 범위·일정·리스크 산정",
    ],
  },
  {
    num: "02",
    color: "#00C9B1",
    title: "CMT 자동 변환",
    items: [
      "CUBRID Migration Toolkit(CMT) 실행",
      "스키마·인덱스·뷰·시퀀스 자동 변환",
      "SQL 구문 차이 자동 패치 적용",
      "변환 리포트 생성 및 검토",
    ],
  },
  {
    num: "03",
    color: "#00C9FF",
    title: "데이터 이전 & 검증",
    items: [
      "운영 데이터 Full Export → CUBRID Import",
      "건수·체크섬 기반 정합성 검증",
      "애플리케이션 연동 테스트",
      "성능 테스트 및 쿼리 최적화",
    ],
  },
  {
    num: "04",
    color: "#A78BFA",
    title: "전환 & 안정화",
    items: [
      "듀얼 운영 (Oracle / CUBRID 병행)",
      "점진적 트래픽 전환",
      "모니터링·알람 체계 구성",
      "30일 안정화 지원 및 운영 이관",
    ],
  },
];

const SUPPORT_PLANS = [
  {
    name: "Standard",
    color: "#00C9B1",
    border: "rgba(0,201,177,0.2)",
    tag: "도입 초기",
    highlight: false,
    items: [
      "설치 및 초기 구성 지원",
      "기본 운영 교육 (4시간)",
      "이메일 기술 문의 대응",
      "패치 적용 가이드",
      "분기별 헬스체크",
    ],
  },
  {
    name: "Professional",
    color: "#0085FF",
    border: "rgba(0,133,255,0.3)",
    tag: "운영 안정화",
    highlight: true,
    items: [
      "Oracle → CUBRID 마이그레이션 전담 지원",
      "DBA 기술 컨설팅 (월 8시간)",
      "전화·화상 긴급 대응 (8×5)",
      "성능 튜닝·쿼리 최적화",
      "HA 구성 및 백업 전략 수립",
      "월간 운영 리포트",
    ],
  },
  {
    name: "Enterprise",
    color: "#A78BFA",
    border: "rgba(167,139,250,0.2)",
    tag: "미션 크리티컬",
    highlight: false,
    items: [
      "전담 DBA 상주 지원",
      "24×7 긴급 장애 대응",
      "무제한 기술 컨설팅",
      "DR 구성·재해복구 훈련",
      "연간 용량·성능 계획 수립",
      "CUBRID 로드맵 우선 검토",
    ],
  },
];

const CASES = [
  {
    sector: "공공기관",
    color: "#00C9B1",
    title: "Oracle → CUBRID 전환",
    desc: "공공기관 행정시스템의 Oracle DB를 CUBRID로 전환하는 전자정부 SW 전환 사업을 수행했습니다. 라이선스 비용을 최대 70% 절감하면서 동일한 서비스 안정성을 유지합니다.",
    tags: ["Oracle 마이그레이션", "공공 SW", "비용 절감"],
  },
  {
    sector: "금융·보험",
    color: "#0085FF",
    title: "HA 구성·운영 최적화",
    desc: "일 수백만 건의 거래를 처리하는 금융 시스템에 CUBRID HA 이중화 구성을 적용했습니다. Master 장애 시 자동 페일오버로 서비스 중단 시간 0에 가까운 운영 환경을 구성합니다.",
    tags: ["HA·이중화", "무중단 운영", "금융 컴플라이언스"],
  },
  {
    sector: "의료·복지",
    color: "#A78BFA",
    title: "EMR·의료정보 시스템",
    desc: "환자 EMR(전자의무기록) 시스템의 DB 전환을 지원했습니다. Oracle 호환성 덕분에 애플리케이션 수정을 최소화하면서 공공기관 보안 기준을 충족하는 CUBRID 환경으로 이전했습니다.",
    tags: ["EMR 시스템", "보안 강화", "Oracle 호환"],
  },
];

const BD = "rgba(255,255,255,0.07)";
const MUTED = "rgba(212,223,240,0.5)";
const CARD = "#0a1628";
const BLUE = "#0085FF";
const CYAN = "#00C9FF";

function FeatureIcon({ label }: { label: string }) {
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold mb-4"
      style={{ background: "rgba(0,133,255,0.12)", border: "1px solid rgba(0,133,255,0.25)", color: BLUE }}
    >
      {label}
    </div>
  );
}

export default function CubridPage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fu").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-[#d4dff0]" style={{ background: "#050d1a" }}>
      <style>{`
        .fu{opacity:0;transform:translateY(24px);transition:opacity .55s ease,transform .55s ease}
        .fu.vis{opacity:1;transform:none}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden pt-24 pb-16 px-6">
        <AnimatedHeroBg variant="blue" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,133,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,133,255,1) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium mb-6"
            style={{ background: "rgba(0,133,255,0.1)", border: "1px solid rgba(0,133,255,0.3)", color: BLUE }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: BLUE }} />
            CUBRID 공식 기술파트너 · VWorks Technologies
          </div>

          <h1
            className="font-bold leading-tight mb-5 tracking-tight"
            style={{ fontFamily: "'Pretendard',sans-serif", fontSize: "clamp(36px,6vw,68px)" }}
          >
            <span className="text-white">Enterprise Open Source</span>
            <br />
            <span style={{ background: `linear-gradient(135deg,${BLUE},${CYAN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              DBMS — CUBRID
            </span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: MUTED }}>
            Oracle 완전 호환·고가용성·오픈소스를 동시에 갖춘 국산 엔터프라이즈 DBMS.<br />
            VWorks가 Oracle → CUBRID 마이그레이션부터 운영 기술지원까지 전담합니다.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/ko/contact/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#030810] transition-all hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg,${BLUE},${CYAN})`, boxShadow: "0 8px 24px rgba(0,133,255,0.35)" }}
            >
              도입 상담 신청 →
            </Link>
            <a
              href="#migration"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#d4dff0" }}
            >
              마이그레이션 가이드 보기
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="border-y" style={{ borderColor: BD, background: "rgba(10,22,40,0.6)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i} className="py-7 px-6 text-center border-r last:border-r-0" style={{ borderColor: BD }}>
              <div className="font-mono font-bold mb-1" style={{ fontSize: 28, color: BLUE }}>{s.num}</div>
              <div className="text-xs" style={{ color: MUTED }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="fu text-center mb-14">
            <div className="inline-block text-xs font-mono px-3 py-1 rounded mb-4"
              style={{ background: "rgba(0,133,255,0.08)", border: "1px solid rgba(0,133,255,0.2)", color: BLUE }}>
              ABOUT CUBRID
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Pretendard',sans-serif" }}>
              국산 RDBMS의 표준<br />CUBRID란 무엇인가
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: MUTED }}>
              네이버가 실전 검증하고, 대한민국 공공기관이 가장 많이 선택한 엔터프라이즈 오픈소스 DBMS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 fu">
            <div className="rounded-2xl p-8" style={{ background: CARD, border: `1px solid ${BD}` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold mb-4"
                style={{ background: "rgba(0,133,255,0.12)", border: "1px solid rgba(0,133,255,0.25)", color: BLUE }}>
                INFO
              </div>
              <h3 className="text-lg font-bold text-white mb-3">CUBRID란?</h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                CUBRID는 대한민국 NAVER에서 개발하고 현재 CUBRID Inc.가 운영하는 오픈소스 관계형 데이터베이스(RDBMS)입니다.
                1997년부터 국내 대형 포털 서비스에서 수십억 건의 트랜잭션을 처리하며 엔터프라이즈 환경에서의 안정성을 증명했습니다.
                GPL v2.0 기반으로 소프트웨어 자체 비용이 없으며, Oracle DB를 대체하는 공공기관 표준 DBMS로 자리 잡고 있습니다.
              </p>
            </div>
            <div className="rounded-2xl p-8" style={{ background: CARD, border: `1px solid ${BD}` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold mb-4"
                style={{ background: "rgba(0,133,255,0.12)", border: "1px solid rgba(0,133,255,0.25)", color: BLUE }}>
                WHY
              </div>
              <h3 className="text-lg font-bold text-white mb-3">왜 선택하는가</h3>
              <ul className="space-y-2">
                {[
                  "Oracle SQL / PL/SQL 완전 호환으로 재개발 비용 최소화",
                  "GPL v2.0 오픈소스 — 상용 라이선스 비용 제로",
                  "내장 HA로 별도 클러스터 솔루션 불필요",
                  "한국어 기술지원 · 국내 전문 커뮤니티 활성화",
                  "공공기관 조달청 등록 · 전자정부 프레임워크 공식 지원",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: MUTED }}>
                    <span className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(180deg,transparent,rgba(0,133,255,0.03),transparent)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="fu text-center mb-14">
            <div className="inline-block text-xs font-mono px-3 py-1 rounded mb-4"
              style={{ background: "rgba(0,133,255,0.08)", border: "1px solid rgba(0,133,255,0.2)", color: BLUE }}>
              PLATFORM FEATURES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Pretendard',sans-serif" }}>
              CUBRID 핵심 기능
            </h2>
            <p className="text-base" style={{ color: MUTED }}>엔터프라이즈 DBMS에 요구되는 모든 기능을 오픈소스로</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="fu rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ background: CARD, border: `1px solid ${BD}`, transitionDelay: `${i * 60}ms` }}
              >
                <FeatureIcon label={f.icon} />
                <div className="inline-block text-[10px] font-mono px-2 py-0.5 rounded mb-3"
                  style={{ background: "rgba(0,133,255,0.08)", border: "1px solid rgba(0,133,255,0.2)", color: BLUE }}>
                  {f.tag}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MIGRATION ── */}
      <section id="migration" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="fu text-center mb-14">
            <div className="inline-block text-xs font-mono px-3 py-1 rounded mb-4"
              style={{ background: "rgba(0,133,255,0.08)", border: "1px solid rgba(0,133,255,0.2)", color: BLUE }}>
              ORACLE → CUBRID MIGRATION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Pretendard',sans-serif" }}>
              Oracle에서 CUBRID로<br />안전하고 빠른 전환
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: MUTED }}>
              CUBRID Migration Toolkit(CMT)과 VWorks 전문 엔지니어의 검증된 4단계 방법론으로
              데이터 손실 없는 안전한 마이그레이션을 보장합니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fu mb-6">
            {MIG_STEPS.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-300"
                style={{
                  background: activeStep === i ? "rgba(0,0,0,0.4)" : CARD,
                  border: `1px solid ${activeStep === i ? step.color : BD}`,
                  boxShadow: activeStep === i ? `0 0 20px ${step.color}22` : "none",
                }}
              >
                <div className="font-mono font-bold text-2xl mb-2" style={{ color: step.color }}>{step.num}</div>
                <div className="text-sm font-bold text-white">{step.title}</div>
              </div>
            ))}
          </div>

          <div className="fu rounded-2xl p-8" style={{ background: "#0d1b30", border: `1px solid ${MIG_STEPS[activeStep].color}33` }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono font-bold text-xl" style={{ color: MIG_STEPS[activeStep].color }}>
                {MIG_STEPS[activeStep].num}
              </span>
              <h3 className="text-xl font-bold text-white">{MIG_STEPS[activeStep].title}</h3>
            </div>
            <ul className="grid md:grid-cols-2 gap-3">
              {MIG_STEPS[activeStep].items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-sm" style={{ color: MUTED }}>
                  <span
                    className="mt-1 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{ background: `${MIG_STEPS[activeStep].color}22`, color: MIG_STEPS[activeStep].color }}
                  >
                    V
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="fu mt-6 rounded-2xl p-6 flex items-start gap-4"
            style={{ background: "rgba(0,133,255,0.05)", border: "1px solid rgba(0,133,255,0.2)" }}>
            <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-mono font-bold"
              style={{ background: "rgba(0,133,255,0.15)", border: "1px solid rgba(0,133,255,0.3)", color: BLUE }}>
              CMT
            </div>
            <div>
              <div className="font-bold text-white mb-1">CUBRID Migration Toolkit (CMT)</div>
              <p className="text-sm" style={{ color: MUTED }}>
                CUBRID에서 공식 제공하는 마이그레이션 도구입니다. Oracle, MySQL, MSSQL 등 주요 DBMS에서 CUBRID로의
                스키마·데이터 변환을 GUI 환경에서 자동화합니다. SQL 호환성 분석 리포트로 수동 수정이 필요한 항목을 사전에 파악할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUPPORT PLANS ── */}
      <section className="py-20 px-6" style={{ background: "rgba(0,133,255,0.02)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="fu text-center mb-14">
            <div className="inline-block text-xs font-mono px-3 py-1 rounded mb-4"
              style={{ background: "rgba(0,133,255,0.08)", border: "1px solid rgba(0,133,255,0.2)", color: BLUE }}>
              TECHNICAL SUPPORT
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Pretendard',sans-serif" }}>
              VWorks CUBRID 기술지원
            </h2>
            <p className="text-base" style={{ color: MUTED }}>도입 규모와 운영 환경에 맞는 최적의 지원 플랜을 제공합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {SUPPORT_PLANS.map((plan, i) => (
              <div
                key={i}
                className="fu rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: plan.highlight ? "rgba(0,133,255,0.08)" : CARD,
                  border: `1px solid ${plan.border}`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div>
                  <div className="text-xs font-mono px-2 py-0.5 rounded inline-block mb-3"
                    style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}40`, color: plan.color }}>
                    {plan.tag}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{plan.name}</h3>
                  <ul className="space-y-2.5 mb-6">
                    {plan.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: MUTED }}>
                        <span className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: plan.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <Link
                    href="/ko/contact/"
                    className="block text-center py-2.5 rounded-xl text-sm transition-all hover:opacity-80"
                    style={{
                      background: plan.highlight ? `linear-gradient(135deg,${BLUE},${CYAN})` : `${plan.color}18`,
                      border: `1px solid ${plan.color}40`,
                      color: plan.highlight ? "#030810" : plan.color,
                      fontWeight: plan.highlight ? 700 : 500,
                    }}
                  >
                    상담 문의 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASES ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="fu text-center mb-14">
            <div className="inline-block text-xs font-mono px-3 py-1 rounded mb-4"
              style={{ background: "rgba(0,133,255,0.08)", border: "1px solid rgba(0,133,255,0.2)", color: BLUE }}>
              USE CASES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Pretendard',sans-serif" }}>
              산업별 도입 사례
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {CASES.map((c, i) => (
              <div
                key={i}
                className="fu rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ background: CARD, border: `1px solid ${BD}`, transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: `${c.color}15`, border: `1px solid ${c.color}40`, color: c.color }}>
                    {c.sector}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{c.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] px-2 py-0.5 rounded"
                      style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BD}`, color: MUTED }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto fu">
          <div className="rounded-3xl p-10 text-center"
            style={{ background: "linear-gradient(135deg,rgba(0,133,255,0.12),rgba(0,201,177,0.07))", border: "1px solid rgba(0,133,255,0.25)" }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-sm font-mono font-bold mx-auto mb-6"
              style={{ background: "rgba(0,133,255,0.15)", border: "1px solid rgba(0,133,255,0.3)", color: BLUE }}>
              DB
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Pretendard',sans-serif" }}>
              CUBRID 도입을 검토하고 계신가요?
            </h2>
            <p className="text-sm mb-6" style={{ color: MUTED }}>
              Oracle 라이선스 비용 부담, 마이그레이션 리스크 걱정 — VWorks 전문 엔지니어와 함께라면 안전합니다.<br />
              무료 사전 진단부터 시작해보세요.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/ko/contact/"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-[#030810] transition-all hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg,${BLUE},${CYAN})`, boxShadow: "0 8px 24px rgba(0,133,255,0.35)" }}
              >
                무료 사전 진단 신청
              </Link>
              <a
                href="https://www.cubrid.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#d4dff0" }}
              >
                CUBRID 공식 사이트
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
