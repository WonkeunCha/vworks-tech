"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";

/* ──────────────────────────── 데이터 ──────────────────────────── */
const CATEGORIES = [
  { id: "all",      label: "전체",            color: "#00C9B1" },
  { id: "infra",    label: "서버·인프라",     color: "#0085FF" },
  { id: "db",       label: "DB·SW",           color: "#00C9B1" },
  { id: "security", label: "보안",            color: "#F97316" },
  { id: "monitor",  label: "모니터링·운영",   color: "#A78BFA" },
  { id: "si",       label: "SI·서비스",       color: "#38BDF8" },
  { id: "power",    label: "전력·인프라",     color: "#34D399" },
];

const CAT_MAP: Record<string, typeof CATEGORIES[0]> = {};
CATEGORIES.forEach((c) => (CAT_MAP[c.id] = c));

const PARTNERS = [
  {
    id: "cplatform", name: "씨플랫폼", category: "infra",
    short: "AI·Cloud·Security IT 총판 허브 · VAST Data 공식 총판",
    desc: "아이티센그룹 계열 IT 솔루션 총판 전문기업. IBM·레드햇·Nutanix 등 17개 글로벌 벤더 총판. 1,000여 파트너사 대상 Cloud·Data&AI·Security 솔루션 공급. 차세대 올플래시 AI 데이터 플랫폼 VAST Data 국내 공식 총판으로 HPC·AI 워크로드에 최적화된 초고속 스토리지 솔루션을 제공.",
    tags: ["VAST Data 총판", "Cloud 솔루션", "AI Platform"],
  },
  {
    id: "daolts", name: "다올TS", category: "infra",
    short: "Dell Technologies 공식 총판",
    desc: "Dell Technologies·SUSE·Palo Alto Networks 국내 총판사. 서버·스토리지·PC 등 하드웨어 인프라부터 AI 서버(매출 1,000억+)·클라우드 네이티브·보안 솔루션까지 종합 제공.",
    tags: ["Dell AI Factory", "HPC 서버", "클라우드 네이티브"],
  },
  {
    id: "scgs", name: "SCGS (에스씨지솔루션즈)", category: "infra",
    short: "Dell Technologies No.1 총판",
    desc: "서울도시가스그룹 IT 전문 계열사. Dell Technologies 전 제품군 공급 No.1 총판사로, 서버·스토리지·네트워크부터 스토리지 유지보수, IT 컨설팅까지 End-to-end 솔루션 제공.",
    tags: ["Dell EMC 스토리지", "서버 공급", "IT 컨설팅"],
  },
  {
    id: "unisoft", name: "유앤아이소프트", category: "db",
    short: "DB 전환·오픈소스 SW 전문",
    desc: "공공·금융 등 다양한 산업군의 레거시 DB 현대화 및 오픈소스 SW 전환 사업을 전문으로 수행. CUBRID 마이그레이션 프로젝트 파트너로 협업.",
    tags: ["DB 마이그레이션", "오픈소스 전환", "SW 컨설팅"],
  },
  {
    id: "comtree", name: "컴트리", category: "db",
    short: "IT 솔루션 공급·유지보수",
    desc: "중소·중견기업 대상 IT 솔루션 공급 및 시스템 통합 전문기업. 공공기관과 기업 고객의 소프트웨어·하드웨어 도입·유지보수를 원스톱으로 지원.",
    tags: ["IT 솔루션 유통", "SW 유지보수", "시스템 통합"],
  },
  {
    id: "youclic", name: "유클릭", category: "db",
    short: "NVIDIA GPU 솔루션 전문",
    desc: "NVIDIA GPU 기반 AI 컴퓨팅·딥러닝 인프라 구축이 강점인 IT 솔루션 전문기업. GPU 서버 공급·클러스터 설계부터 CUDA 환경 구성, AI 워크로드 최적화까지 엔터프라이즈 GPU 인프라 전 과정을 지원.",
    tags: ["NVIDIA GPU", "AI 컴퓨팅", "딥러닝 인프라"],
  },
  {
    id: "pilatech", name: "필라테크", category: "db",
    short: "VDI 가상화·하드웨어 인프라 전문",
    desc: "VMware Horizon 기반 VDI(가상 데스크톱 인프라) 구축·운영 및 하드웨어 인프라 공급 전문기업. 서버·스토리지·네트워크 하드웨어 도입부터 Horizon 환경 설계·구축·유지보수까지 엔드투엔드 가상화 인프라 서비스를 제공.",
    tags: ["VMware Horizon", "VDI 가상화", "하드웨어 인프라"],
  },
  {
    id: "secui", name: "씨큐아이", category: "security",
    short: "국내 네트워크 보안 1위",
    desc: "삼성그룹 계열 정보보호 전문기업. 차세대 방화벽·IPS·Anti-DDoS·통합관제·클라우드 보안 등 네트워크 보안 전 분야 국내 1위. 공공기관·금융기관 다수 레퍼런스.",
    tags: ["차세대 방화벽", "클라우드 보안", "보안 컨설팅"],
  },
  {
    id: "ccube", name: "씨큐브", category: "security",
    short: "정보보안 솔루션 전문",
    desc: "엔드포인트 보안·취약점 진단·정보보호 컨설팅을 제공하는 정보보안 전문기업. 공공기관·금융·제조 고객 대상 맞춤형 보안 솔루션 구축 및 운영 서비스 지원.",
    tags: ["엔드포인트 보안", "취약점 진단", "보안 운영"],
  },
  {
    id: "ait", name: "에이아이티", category: "security",
    short: "AI 기반 보안·IT 솔루션",
    desc: "AI 기술을 접목한 사이버보안 및 IT 인프라 솔루션 전문기업. 위협 탐지·대응 자동화와 IT 운영 효율화를 결합한 통합 서비스를 공공·기업 시장에 제공.",
    tags: ["AI 보안", "위협 대응", "IT 자동화"],
  },
  {
    id: "dpou",
    name: "디피오유",
    category: "security",
    short: "네트워크·엔드포인트 보안 전문",
    desc: "부산 해운대 소재 정보보안 전문기업. 차세대 방화벽(Ahnlab XTG·PaloAlto PA-Series), DDoS 방어(Ahnlab DPX), WAF(AiWAF), 무선 인증(PPX-Anylink) 등 네트워크 보안 전 영역과 엔드포인트 보안 솔루션을 공급·구축. 공공·금융·제조업 고객 대상 보안 컨설팅부터 구축·유지보수·사후관리까지 풀 서비스를 제공.",
    tags: ["차세대 방화벽", "DDoS 방어", "보안 구축·유지보수"],
  },
  {
    id: "brainz", name: "브레인즈컴퍼니", category: "monitor",
    short: "IT 인프라 통합 모니터링",
    desc: "지능형 IT 통합관리 솔루션 전문 상장기업(KOSDAQ). 자체 개발 모니터링 플랫폼 'Zabbix 기반 제니우스'로 서버·네트워크·클라우드를 통합 관제. 공공·기업 다수 구축.",
    tags: ["통합 모니터링", "AIOps", "클라우드 관제"],
  },
  {
    id: "ifrica", name: "이프리키아테크놀로지스", category: "si",
    short: "엔터프라이즈 백업·데이터 보호 전문",
    desc: "Quantum·Commvault 등 글로벌 백업 전문 솔루션 취급 전문기업. 테이프·디스크·클라우드 계층형 백업 아키텍처 설계부터 랜섬웨어 복구, 재해 복구(DR) 구축까지 데이터 보호 전 과정을 지원.",
    tags: ["Quantum 백업", "Commvault", "DR·재해복구"],
  },
  {
    id: "smartpower", name: "스마트파워시스템", category: "power",
    short: "전력·UPS·데이터센터 인프라",
    desc: "데이터센터·서버실 전력공급(UPS)·항온항습·랙 솔루션 전문기업. HPC·AI 컴퓨팅 환경의 안정적 전력 인프라 구성과 유지보수를 지원.",
    tags: ["UPS·전력", "데이터센터", "항온항습"],
  },
];

/* ──────────────────────── 모달 컴포넌트 ──────────────────────── */
function PartnerModal({
  partner,
  onClose,
}: {
  partner: typeof PARTNERS[0];
  onClose: () => void;
}) {
  const cat = CAT_MAP[partner.category];

  // ESC 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* 배경 오버레이 */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* 모달 콘텐츠 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 520,
          borderRadius: 20,
          background: "#0a1628",
          border: `1px solid ${cat.color}44`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${cat.color}15`,
          padding: "32px 28px",
          animation: "modalIn 0.25s ease-out",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)",
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        {/* 카테고리 뱃지 */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 6,
            background: `${cat.color}15`,
            border: `1px solid ${cat.color}35`,
            fontSize: 11,
            fontWeight: 600,
            color: cat.color,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: cat.color,
            }}
          />
          {cat.label}
        </div>

        {/* 파트너명 + 요약 */}
        <h3
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 6px",
            fontFamily: "'Pretendard', sans-serif",
          }}
        >
          {partner.name}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "rgba(212,223,240,0.5)",
            margin: "0 0 20px",
          }}
        >
          {partner.short}
        </p>

        {/* 구분선 */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, ${cat.color}30, transparent)`,
            marginBottom: 20,
          }}
        />

        {/* 상세 설명 */}
        <p
          style={{
            fontSize: 14,
            color: "rgba(212,223,240,0.65)",
            lineHeight: 1.8,
            margin: "0 0 24px",
          }}
        >
          {partner.desc}
        </p>

        {/* 태그 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {partner.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 12,
                padding: "5px 14px",
                borderRadius: 20,
                background: `${cat.color}10`,
                border: `1px solid ${cat.color}25`,
                color: cat.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/ko/contact/"
          onClick={onClose}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            borderRadius: 12,
            background: `${cat.color}18`,
            border: `1px solid ${cat.color}40`,
            color: cat.color,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          협력 문의하기 →
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────── 메인 페이지 ─────────────────────────── */
export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [modalPartner, setModalPartner] = useState<typeof PARTNERS[0] | null>(null);

  const filtered =
    activeTab === "all"
      ? PARTNERS
      : PARTNERS.filter((p) => p.category === activeTab);

  // 카테고리별 파트너 수
  const counts: Record<string, number> = { all: PARTNERS.length };
  PARTNERS.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return (
    <div className="min-h-screen text-[#d4dff0]" style={{ background: "#050d1a" }}>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fu { opacity:0; transform:translateY(20px); animation: fadeUp .6s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:none; } }
        .partner-card { transition: border-color 0.2s, transform 0.2s, background 0.2s; cursor: pointer; }
        .partner-card:hover { transform: translateY(-2px); }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-[360px] flex items-center justify-center overflow-hidden pt-24 pb-10 px-6">
        <AnimatedHeroBg variant="teal" />
        <div className="relative z-10 max-w-3xl mx-auto text-center fu">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium mb-6"
            style={{
              background: "rgba(0,201,177,0.1)",
              border: "1px solid rgba(0,201,177,0.3)",
              color: "#00C9B1",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#00C9B1" }}
            />
            PARTNER ECOSYSTEM
          </div>
          <h1
            className="font-bold leading-tight mb-5 text-white"
            style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: "clamp(32px,5vw,56px)",
            }}
          >
            VWorks 파트너 생태계
          </h1>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(212,223,240,0.5)" }}
          >
            서버·인프라·보안·DB·모니터링 분야 전문 파트너사와 함께
            고객의 IT 환경 전 주기를 지원합니다.
          </p>
        </div>
      </section>

      {/* ── 카테고리 통계 ── */}
      <section className="px-6 pb-4">
        <div
          className="max-w-5xl mx-auto grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
        >
          {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="partner-card rounded-xl p-4 text-center"
              style={{
                background:
                  activeTab === cat.id ? `${cat.color}10` : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeTab === cat.id ? cat.color + "40" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: cat.color,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {counts[cat.id] || 0}
              </div>
              <div style={{ fontSize: 12, color: "rgba(212,223,240,0.5)" }}>
                {cat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 탭 필터 + 카드 그리드 ── */}
      <section
        className="py-12 px-6"
        style={{
          background:
            "linear-gradient(180deg,transparent,rgba(0,201,177,0.02),transparent)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* 탭 */}
          <div
            className="flex gap-2 justify-center mb-10 flex-wrap"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: `1px solid ${activeTab === cat.id ? cat.color + "50" : "rgba(255,255,255,0.08)"}`,
                  background:
                    activeTab === cat.id ? `${cat.color}12` : "rgba(255,255,255,0.03)",
                  color:
                    activeTab === cat.id ? cat.color : "rgba(212,223,240,0.5)",
                  fontSize: 13,
                  fontWeight: activeTab === cat.id ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat.label}
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 11,
                    opacity: 0.6,
                  }}
                >
                  {counts[cat.id] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* 파트너 카드 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => {
              const cat = CAT_MAP[p.category];
              return (
                <div
                  key={p.id}
                  className="partner-card rounded-2xl p-5"
                  onClick={() => setModalPartner(p)}
                  style={{
                    background: "#0a1628",
                    border: `1px solid rgba(255,255,255,0.07)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${cat.color}35`;
                    e.currentTarget.style.background = `${cat.color}06`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.background = "#0a1628";
                  }}
                >
                  {/* 헤더 */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div
                        className="font-bold text-white mb-1"
                        style={{ fontSize: 16, fontFamily: "'Pretendard', sans-serif" }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "rgba(212,223,240,0.45)",
                          lineHeight: 1.5,
                        }}
                      >
                        {p.short}
                      </div>
                    </div>
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: `${cat.color}15`,
                        border: `1px solid ${cat.color}30`,
                        color: cat.color,
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "rgba(212,223,240,0.4)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* 더보기 힌트 */}
                  <div
                    style={{
                      fontSize: 12,
                      color: cat.color,
                      fontWeight: 500,
                      opacity: 0.7,
                    }}
                  >
                    자세히 보기 →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-3xl p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg,rgba(0,201,177,0.10),rgba(0,133,255,0.06))",
              border: "1px solid rgba(0,201,177,0.2)",
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Pretendard',sans-serif" }}
            >
              파트너십 문의
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(212,223,240,0.45)" }}
            >
              VWorks와 함께 성장할 새로운 파트너사를 기다립니다.
              <br />
              협력 가능성을 함께 탐색해 보세요.
            </p>
            <Link
              href="/ko/contact/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-[#030810] transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg,#00C9B1,#0085FF)",
                boxShadow: "0 8px 24px rgba(0,201,177,0.3)",
              }}
            >
              파트너십 문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* ── 모달 ── */}
      {modalPartner && (
        <PartnerModal
          partner={modalPartner}
          onClose={() => setModalPartner(null)}
        />
      )}
    </div>
  );
}
