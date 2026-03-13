"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";

/* ──────────────────────────── 데이터 ──────────────────────────── */
const CATEGORIES = [
  { id: "infra",    label: "서버·인프라",    color: "#0085FF", angle: 270 },
  { id: "db",       label: "DB·SW",          color: "#00C9B1", angle: 330 },
  { id: "security", label: "보안",            color: "#F97316", angle:  30 },
  { id: "monitor",  label: "모니터링·운영",   color: "#A78BFA", angle:  90 },
  { id: "si",       label: "SI·서비스",       color: "#38BDF8", angle: 150 },
  { id: "power",    label: "전력·인프라",     color: "#34D399", angle: 210 },
];

const PARTNERS = [
  // ─ 서버·인프라
  {
    id: "cplatform",
    name: "씨플랫폼",
    category: "infra",
    short: "AI·Cloud·Security IT 총판 허브 · VAST Data 공식 총판",
    desc: "아이티센그룹 계열 IT 솔루션 총판 전문기업. IBM·레드햇·Nutanix 등 17개 글로벌 벤더 총판. 1,000여 파트너사 대상 Cloud·Data&AI·Security 솔루션 공급. 차세대 올플래시 AI 데이터 플랫폼 VAST Data 국내 공식 총판으로 HPC·AI 워크로드에 최적화된 초고속 스토리지 솔루션을 제공.",
    tags: ["VAST Data 총판", "Cloud 솔루션", "AI Platform"],
  },
  {
    id: "daolts",
    name: "다올TS",
    category: "infra",
    short: "Dell Technologies 공식 총판",
    desc: "Dell Technologies·SUSE·Palo Alto Networks 국내 총판사. 서버·스토리지·PC 등 하드웨어 인프라부터 AI 서버(매출 1,000억+)·클라우드 네이티브·보안 솔루션까지 종합 제공.",
    tags: ["Dell AI Factory", "HPC 서버", "클라우드 네이티브"],
  },
  {
    id: "scgs",
    name: "SCGS (에스씨지솔루션즈)",
    category: "infra",
    short: "Dell Technologies No.1 총판",
    desc: "서울도시가스그룹 IT 전문 계열사. Dell Technologies 전 제품군 공급 No.1 총판사로, 서버·스토리지·네트워크부터 스토리지 유지보수, IT 컨설팅까지 End-to-end 솔루션 제공.",
    tags: ["Dell EMC 스토리지", "서버 공급", "IT 컨설팅"],
  },

  // ─ DB·SW
  {
    id: "unisoft",
    name: "유앤아이소프트",
    category: "db",
    short: "DB 전환·오픈소스 SW 전문",
    desc: "공공·금융 등 다양한 산업군의 레거시 DB 현대화 및 오픈소스 SW 전환 사업을 전문으로 수행. CUBRID 마이그레이션 프로젝트 파트너로 협업.",
    tags: ["DB 마이그레이션", "오픈소스 전환", "SW 컨설팅"],
  },
  {
    id: "comtree",
    name: "컴트리",
    category: "db",
    short: "IT 솔루션 공급·유지보수",
    desc: "중소·중견기업 대상 IT 솔루션 공급 및 시스템 통합 전문기업. 공공기관과 기업 고객의 소프트웨어·하드웨어 도입·유지보수를 원스톱으로 지원.",
    tags: ["IT 솔루션 유통", "SW 유지보수", "시스템 통합"],
  },
  {
    id: "youclic",
    name: "유클릭",
    category: "db",
    short: "NVIDIA GPU 솔루션 전문",
    desc: "NVIDIA GPU 기반 AI 컴퓨팅·딥러닝 인프라 구축이 강점인 IT 솔루션 전문기업. GPU 서버 공급·클러스터 설계부터 CUDA 환경 구성, AI 워크로드 최적화까지 엔터프라이즈 GPU 인프라 전 과정을 지원.",
    tags: ["NVIDIA GPU", "AI 컴퓨팅", "딥러닝 인프라"],
  },
  // ─ 보안
  {
    id: "secui",
    name: "씨큐아이",
    category: "security",
    short: "국내 네트워크 보안 1위",
    desc: "삼성그룹 계열 정보보호 전문기업. 차세대 방화벽·IPS·Anti-DDoS·통합관제·클라우드 보안 등 네트워크 보안 전 분야 국내 1위. 공공기관·금융기관 다수 레퍼런스.",
    tags: ["차세대 방화벽", "클라우드 보안", "보안 컨설팅"],
  },
  {
    id: "ccube",
    name: "씨큐브",
    category: "security",
    short: "정보보안 솔루션 전문",
    desc: "엔드포인트 보안·취약점 진단·정보보호 컨설팅을 제공하는 정보보안 전문기업. 공공기관·금융·제조 고객 대상 맞춤형 보안 솔루션 구축 및 운영 서비스 지원.",
    tags: ["엔드포인트 보안", "취약점 진단", "보안 운영"],
  },
  {
    id: "ait",
    name: "에이아이티",
    category: "security",
    short: "AI 기반 보안·IT 솔루션",
    desc: "AI 기술을 접목한 사이버보안 및 IT 인프라 솔루션 전문기업. 위협 탐지·대응 자동화와 IT 운영 효율화를 결합한 통합 서비스를 공공·기업 시장에 제공.",
    tags: ["AI 보안", "위협 대응", "IT 자동화"],
  },
  // ─ 모니터링·운영
  {
    id: "brainz",
    name: "브레인즈컴퍼니",
    category: "monitor",
    short: "IT 인프라 통합 모니터링",
    desc: "지능형 IT 통합관리 솔루션 전문 상장기업(KOSDAQ). 자체 개발 모니터링 플랫폼 'Zabbix 기반 제니우스'로 서버·네트워크·클라우드를 통합 관제. 공공·기업 다수 구축.",
    tags: ["통합 모니터링", "AIOps", "클라우드 관제"],
  },
  {
    id: "pilatech",
    name: "필라테크",
    category: "db",
    short: "VDI 가상화·하드웨어 인프라 전문",
    desc: "VMware Horizon 기반 VDI(가상 데스크톱 인프라) 구축·운영 및 하드웨어 인프라 공급 전문기업. 서버·스토리지·네트워크 하드웨어 도입부터 Horizon 환경 설계·구축·유지보수까지 엔드투엔드 가상화 인프라 서비스를 제공.",
    tags: ["VMware Horizon", "VDI 가상화", "하드웨어 인프라"],
  },
  // ─ SI·서비스
  {
    id: "ifrica",
    name: "이프리키아테크놀로지스",
    category: "si",
    short: "엔터프라이즈 백업·데이터 보호 전문",
    desc: "Quantum·Commvault 등 글로벌 백업 전문 솔루션 취급 전문기업. 테이프·디스크·클라우드 계층형 백업 아키텍처 설계부터 랜섬웨어 복구, 재해 복구(DR) 구축까지 데이터 보호 전 과정을 지원.",
    tags: ["Quantum 백업", "Commvault", "DR·재해복구"],
  },
  {
    id: "smartpower",
    name: "스마트파워시스템",
    category: "power",
    short: "전력·UPS·데이터센터 인프라",
    desc: "데이터센터·서버실 전력공급(UPS)·항온항습·랙 솔루션 전문기업. HPC·AI 컴퓨팅 환경의 안정적 전력 인프라 구성과 유지보수를 지원.",
    tags: ["UPS·전력", "데이터센터", "항온항습"],
  },
];

const CAT_MAP: Record<string, typeof CATEGORIES[0]> = {};
CATEGORIES.forEach((c) => (CAT_MAP[c.id] = c));

const R_OUTER = 230; // 카테고리 레이블 반지름
const R_INNER = 155; // 노드 반지름

function polarToXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

/* ─────────────────────── 컴포넌트 ─────────────────────────────── */
export default function PartnersPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const activePid = hovered ?? selected;
  const activePartner = PARTNERS.find((p) => p.id === activePid);

  // 카테고리별 파트너 배치
  const grouped: Record<string, typeof PARTNERS> = {};
  CATEGORIES.forEach((c) => (grouped[c.id] = []));
  PARTNERS.forEach((p) => grouped[p.category]?.push(p));

  // 각 파트너 위치 계산
  const partnerPositions: Record<string, { x: number; y: number; cat: typeof CATEGORIES[0] }> = {};
  CATEGORIES.forEach((cat) => {
    const members = grouped[cat.id];
    const total = members.length;
    const spread = total <= 1 ? 0 : 28;
    members.forEach((p, i) => {
      const offset = total <= 1 ? 0 : (i - (total - 1) / 2) * spread;
      const pos = polarToXY(cat.angle + offset, R_INNER);
      partnerPositions[p.id] = { ...pos, cat };
    });
  });

  return (
    <div className="min-h-screen text-[#d4dff0]" style={{ background: "#050d1a" }}>
      <style>{`
        .pnode { cursor: pointer; }
        .fu { opacity:0; transform:translateY(20px); animation: fadeUp .6s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:none; } }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden pt-24 pb-14 px-6">
        <AnimatedHeroBg variant="teal" />
        <div className="relative z-10 max-w-3xl mx-auto text-center fu">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium mb-6"
            style={{ background: "rgba(0,201,177,0.1)", border: "1px solid rgba(0,201,177,0.3)", color: "#00C9B1" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00C9B1" }} />
            PARTNER ECOSYSTEM
          </div>
          <h1
            className="font-bold leading-tight mb-5 text-white"
            style={{ fontFamily: "'Exo 2', sans-serif", fontSize: "clamp(36px,6vw,64px)" }}
          >
            VWorks 파트너 생태계
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(212,223,240,0.5)" }}>
            서버·인프라·보안·DB·모니터링 분야 전문 파트너사와 함께<br />
            고객의 IT 환경 전 주기를 지원합니다.
          </p>
        </div>
      </section>

      {/* ── DIAGRAM ── */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* SVG 다이어그램 */}
          <div className="flex-shrink-0 w-full lg:w-[520px] flex justify-center">
            <svg
              viewBox="-320 -320 640 640"
              width="100%"
              style={{ maxWidth: 520, overflow: "visible" }}
            >
              {/* 배경 원들 */}
              <circle cx="0" cy="0" r={R_INNER + 50} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="0" cy="0" r={R_INNER - 10} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              {/* 카테고리 섹터 라인 */}
              {CATEGORIES.map((cat) => {
                const p = polarToXY(cat.angle, R_OUTER + 20);
                return (
                  <line key={cat.id} x1="0" y1="0" x2={p.x} y2={p.y}
                    stroke={cat.color} strokeWidth="0.5" strokeOpacity="0.2" />
                );
              })}

              {/* 파트너 → VWorks 연결선 */}
              {PARTNERS.map((p) => {
                const pos = partnerPositions[p.id];
                const isAct = activePid === p.id;
                const cat = CAT_MAP[p.category];
                return (
                  <line key={p.id + "_line"}
                    x1="0" y1="0" x2={pos.x} y2={pos.y}
                    stroke={cat.color}
                    strokeWidth={isAct ? 1.5 : 0.8}
                    strokeOpacity={activePid ? (isAct ? 0.75 : 0.08) : 0.2}
                    strokeDasharray={isAct ? "none" : "3 4"}
                  />
                );
              })}

              {/* 카테고리 레이블 */}
              {CATEGORIES.map((cat) => {
                const p = polarToXY(cat.angle, R_OUTER + 12);
                return (
                  <g key={cat.id}>
                    <text x={p.x} y={p.y}
                      textAnchor="middle" dominantBaseline="middle"
                      fill={cat.color} fontSize="10" fontWeight="700"
                      fontFamily="'JetBrains Mono', monospace"
                      opacity="0.9"
                    >
                      {cat.label}
                    </text>
                  </g>
                );
              })}

              {/* 파트너 노드 */}
              {PARTNERS.map((p) => {
                const pos = partnerPositions[p.id];
                const cat = CAT_MAP[p.category];
                const isAct = activePid === p.id;
                const isDimmed = !!activePid && !isAct;
                return (
                  <g
                    key={p.id}
                    className="pnode"
                    transform={`translate(${pos.x}, ${pos.y})`}
                    opacity={isDimmed ? 0.3 : 1}
                    onClick={() => setSelected(selected === p.id ? null : p.id)}
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <circle r="18"
                      fill={isAct ? cat.color + "28" : "#0a1628"}
                      stroke={cat.color}
                      strokeWidth={isAct ? 2 : 1.5}
                      strokeOpacity={isAct ? 1 : 0.6}
                    />
                    <text textAnchor="middle" dominantBaseline="middle"
                      fill={isAct ? "#ffffff" : cat.color}
                      fontSize={p.name.length > 6 ? "5.5" : "6.5"}
                      fontWeight="700"
                      style={{ pointerEvents: "none" }}
                    >
                      {p.name.length > 8 ? p.name.slice(0, 7) + "…" : p.name}
                    </text>
                  </g>
                );
              })}

              {/* VWorks 중심 */}
              <circle cx="0" cy="0" r="52" fill="#050d1a" stroke="rgba(0,201,177,0.4)" strokeWidth="2" />
              <circle cx="0" cy="0" r="44" fill="rgba(0,201,177,0.06)" />
              <text textAnchor="middle" y="-6" fill="#00C9B1"
                fontSize="13" fontWeight="900" fontFamily="'Exo 2', sans-serif">
                VWorks
              </text>
              <text textAnchor="middle" y="9" fill="rgba(212,223,240,0.5)"
                fontSize="6.5" fontFamily="'JetBrains Mono', monospace">
                Technologies
              </text>
            </svg>
          </div>

          {/* 상세 패널 */}
          <div className="flex-1 w-full lg:min-h-[420px]">
            {activePartner ? (
              <div
                key={activePartner.id}
                className="rounded-2xl p-7 fu h-full"
                style={{
                  background: "#0a1628",
                  border: `1px solid ${CAT_MAP[activePartner.category].color}44`,
                  boxShadow: `0 0 30px ${CAT_MAP[activePartner.category].color}18`,
                }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold font-mono"
                    style={{
                      background: `${CAT_MAP[activePartner.category].color}15`,
                      border: `1px solid ${CAT_MAP[activePartner.category].color}40`,
                      color: CAT_MAP[activePartner.category].color,
                    }}
                  >
                    {CAT_MAP[activePartner.category].label.slice(0, 2)}
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-mono px-2 py-0.5 rounded inline-block mb-1"
                      style={{
                        background: `${CAT_MAP[activePartner.category].color}18`,
                        border: `1px solid ${CAT_MAP[activePartner.category].color}35`,
                        color: CAT_MAP[activePartner.category].color,
                      }}
                    >
                      {CAT_MAP[activePartner.category].label}
                    </div>
                    <h3 className="text-xl font-bold text-white">{activePartner.name}</h3>
                    <p className="text-sm" style={{ color: "rgba(212,223,240,0.45)" }}>{activePartner.short}</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(212,223,240,0.55)" }}>
                  {activePartner.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {activePartner.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: `${CAT_MAP[activePartner.category].color}12`,
                        border: `1px solid ${CAT_MAP[activePartner.category].color}30`,
                        color: CAT_MAP[activePartner.category].color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/ko/contact/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                  style={{
                    background: `${CAT_MAP[activePartner.category].color}18`,
                    border: `1px solid ${CAT_MAP[activePartner.category].color}40`,
                    color: CAT_MAP[activePartner.category].color,
                  }}
                >
                  협력 문의 →
                </Link>
              </div>
            ) : (
              <div
                className="rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]"
                style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4"
                  style={{ background: "rgba(0,201,177,0.08)", border: "1px solid rgba(0,201,177,0.2)", color: "#00C9B1" }}
                >
                  ECO
                </div>
                <p className="text-sm font-bold text-white mb-2">파트너를 선택하세요</p>
                <p className="text-xs" style={{ color: "rgba(212,223,240,0.35)" }}>
                  다이어그램의 파트너 노드를 클릭하면<br />상세 협력 사업 정보를 확인할 수 있습니다
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                      <span style={{ color: "rgba(212,223,240,0.4)" }}>{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 파트너 리스트 그리드 ── */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(180deg,transparent,rgba(0,201,177,0.025),transparent)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block text-xs font-mono px-3 py-1 rounded mb-4"
              style={{ background: "rgba(0,201,177,0.08)", border: "1px solid rgba(0,201,177,0.2)", color: "#00C9B1" }}
            >
              ALL PARTNERS
            </div>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Exo 2',sans-serif" }}>
              13개 전문 파트너사
            </h2>
          </div>

          {CATEGORIES.map((cat) => {
            const members = grouped[cat.id];
            if (!members.length) return null;
            return (
              <div key={cat.id} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                  <span className="text-xs font-mono font-bold" style={{ color: cat.color }}>{cat.label}</span>
                  <div className="flex-1 h-px" style={{ background: `${cat.color}20` }} />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelected(selected === p.id ? null : p.id)}
                      className="text-left rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: selected === p.id ? `${cat.color}10` : "#0a1628",
                        border: `1px solid ${selected === p.id ? cat.color + "50" : "rgba(255,255,255,0.07)"}`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-white text-sm mb-0.5">{p.name}</div>
                          <div className="text-xs" style={{ color: "rgba(212,223,240,0.4)" }}>{p.short}</div>
                        </div>
                        <span
                          className="flex-shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded"
                          style={{ background: `${cat.color}15`, color: cat.color }}
                        >
                          {cat.label.slice(0,2)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded"
                            style={{ background: "rgba(255,255,255,0.04)", color: "rgba(212,223,240,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-3xl p-10 text-center"
            style={{ background: "linear-gradient(135deg,rgba(0,201,177,0.10),rgba(0,133,255,0.06))", border: "1px solid rgba(0,201,177,0.2)" }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-xs font-mono font-bold mx-auto mb-5"
              style={{ background: "rgba(0,201,177,0.12)", border: "1px solid rgba(0,201,177,0.3)", color: "#00C9B1" }}
            >
              NET
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Exo 2',sans-serif" }}>
              파트너십 문의
            </h2>
            <p className="text-sm mb-6" style={{ color: "rgba(212,223,240,0.45)" }}>
              VWorks와 함께 성장할 새로운 파트너사를 기다립니다.<br />
              협력 가능성을 함께 탐색해 보세요.
            </p>
            <Link
              href="/ko/contact/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-[#030810] transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#00C9B1,#0085FF)", boxShadow: "0 8px 24px rgba(0,201,177,0.3)" }}
            >
              파트너십 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
