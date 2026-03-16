"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";

/* ──────────────────────────── 데이터 ──────────────────────────── */
const CATEGORIES = [
  { id: "all", label: "전체", color: "#00C9B1" },
  { id: "defense", label: "국방·공공", color: "#0085FF" },
  { id: "energy", label: "에너지·제조", color: "#F59E0B" },
  { id: "research", label: "연구·교육", color: "#A78BFA" },
];

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  period: string;
  summary: string;
  challenge: string;
  solution: string;
  architecture: { label: string; items: string[] }[];
  results: { value: string; label: string; color: string }[];
  tags: string[];
  products: string[];
}

const PROJECTS: Project[] = [
  {
    id: "navy-hpc",
    title: "해군 해양예측체계 HPC 이전설치",
    client: "대한민국 해군",
    category: "defense",
    year: "2024",
    period: "4개월",
    summary: "1차 구축 성과를 기반으로 컴퓨트 노드 및 스토리지 용량을 확장하고, GPU 가속 기반 AI 추론 환경을 추가한 프로젝트입니다.",
    challenge: "증가하는 해양 데이터와 고해상도 모델의 연산 요구량을 기존 인프라로 감당하기 어려웠으며, AI 기반 해양 예측 모델 도입이 요구되었습니다.",
    solution: "기존 VAST Data 클러스터의 무중단 용량 확장과 GPU 서버 추가를 통해 전통적 수치모델과 AI 추론을 동시에 운영할 수 있는 하이브리드 HPC 환경을 구성했습니다.",
    architecture: [
      { label: "컴퓨트 확장", items: ["기존 클러스터 노드 증설", "NVIDIA GPU 서버 추가", "Slurm GPU 파티션 구성"] },
      { label: "스토리지 확장", items: ["VAST Data 무중단 용량 확장", "GPUDirect Storage 지원", "AI 학습 데이터 전용 볼륨"] },
      { label: "소프트웨어", items: ["컨테이너 기반 AI 추론 환경", "기상해양 수치모델 최적화", "통합 모니터링 시스템"] },
    ],
    results: [
      { value: "2×", label: "컴퓨트 확장", color: "#00C9B1" },
      { value: "무중단", label: "스토리지 확장", color: "#0085FF" },
      { value: "AI", label: "추론 환경 추가", color: "#A78BFA" },
    ],
    tags: ["HPC 확장", "GPU 가속", "AI 추론", "해양예측"],
    products: ["VAST Data", "NVIDIA GPU", "HPE ProLiant"],
  },
  {
    id: "khnp",
    title: "한국수력원자력 데이터 인프라 구축",
    client: "한국수력원자력",
    category: "energy",
    year: "2024",
    period: "5개월",
    summary: "원자력 발전소 운영 데이터의 통합 저장·분석을 위한 고성능 스토리지 및 서버 인프라를 구축한 프로젝트입니다.",
    challenge: "분산된 운영 데이터를 통합 관리할 단일 플랫폼이 부재했으며, 데이터 증가에 따른 확장성과 엄격한 보안 규정 준수가 요구되었습니다.",
    solution: "Dell PowerEdge 서버와 고성능 스토리지를 결합하여 데이터 통합 플랫폼을 구축했습니다. 이중화 설계와 엄격한 보안 아키텍처로 원전 환경의 안정성 요구사항을 충족했습니다.",
    architecture: [
      { label: "서버", items: ["Dell PowerEdge R750 × 다수", "이중화 구성 (Active-Active)", "가상화 환경 (VMware)"] },
      { label: "스토리지", items: ["고성능 올플래시 스토리지", "데이터 통합 단일 볼륨", "스냅샷 기반 백업 체계"] },
      { label: "보안", items: ["망분리 + 접근제어", "감사 로깅 시스템", "원전 보안 규정 준수"] },
    ],
    results: [
      { value: "통합", label: "데이터 플랫폼", color: "#00C9B1" },
      { value: "이중화", label: "고가용성 설계", color: "#F59E0B" },
      { value: "준수", label: "원전 보안 규정", color: "#0085FF" },
    ],
    tags: ["에너지", "데이터 통합", "이중화", "보안"],
    products: ["Dell PowerEdge", "VMware", "보안 솔루션"],
  },
  {
    id: "stx",
    title: "STX엔진 AI 서버 인프라 구축",
    client: "STX엔진",
    category: "energy",
    year: "2025",
    period: "3개월",
    summary: "제조 공정의 AI 기반 예측정비 및 품질검사를 위한 GPU 서버 클러스터와 고성능 스토리지 인프라를 구축한 프로젝트입니다.",
    challenge: "공장 센서 데이터의 실시간 수집·처리·AI 추론을 위한 통합 인프라가 부재했으며, 기존 시스템으로는 딥러닝 모델 학습에 수일이 소요되었습니다.",
    solution: "VAST Data 스토리지와 NVIDIA GPU 서버를 통합하여 센서 데이터 수집부터 AI 추론까지 엔드투엔드 파이프라인을 구성했습니다. GPUDirect Storage로 데이터 병목을 제거했습니다.",
    architecture: [
      { label: "AI 컴퓨트", items: ["NVIDIA GPU 서버 (A100/H100)", "CUDA 기반 딥러닝 환경", "컨테이너 오케스트레이션"] },
      { label: "스토리지", items: ["VAST Data 올플래시", "GPUDirect Storage 지원", "센서 데이터 실시간 인제스트"] },
      { label: "파이프라인", items: ["실시간 센서 데이터 수집", "AI 추론 자동화 파이프라인", "결과 대시보드 연동"] },
    ],
    results: [
      { value: "실시간", label: "AI 추론", color: "#00C9B1" },
      { value: "10×", label: "학습 시간 단축", color: "#F59E0B" },
      { value: "자동화", label: "예측정비 파이프라인", color: "#A78BFA" },
    ],
    tags: ["AI 팩토리", "예측정비", "GPU", "제조"],
    products: ["VAST Data", "NVIDIA GPU", "Dell PowerEdge"],
  },
  {
    id: "research-lab",
    title: "기업부설연구소 기상해양 가시화 플랫폼",
    client: "VWorks 기술연구소",
    category: "research",
    year: "2025",
    period: "진행중",
    summary: "기상·해양 수치모델 데이터를 웹 기반으로 가시화하는 인터랙티브 플랫폼을 자체 개발한 R&D 프로젝트입니다.",
    challenge: "기존 기상해양 가시화 도구는 전문 소프트웨어 설치가 필요하고, 대용량 데이터의 실시간 렌더링이 어려웠습니다. 비전문가도 사용할 수 있는 웹 기반 도구가 필요했습니다.",
    solution: "WebGL 기반 인터랙티브 가시화 엔진을 개발하고, HPC 수치모델 출력을 자동으로 처리하여 웹 브라우저에서 실시간으로 탐색할 수 있는 플랫폼을 구축했습니다.",
    architecture: [
      { label: "프론트엔드", items: ["Next.js + WebGL 렌더링 엔진", "인터랙티브 지도 (Windy 스타일)", "실시간 데이터 스트리밍"] },
      { label: "백엔드", items: ["Python 기반 데이터 처리", "NetCDF/GRIB 파서", "REST API + WebSocket"] },
      { label: "인프라", items: ["클라우드 네이티브 배포", "자동 스케일링", "CDN 기반 타일 서빙"] },
    ],
    results: [
      { value: "웹", label: "브라우저 기반", color: "#00C9B1" },
      { value: "실시간", label: "데이터 가시화", color: "#A78BFA" },
      { value: "R&D", label: "자체 기술 개발", color: "#F59E0B" },
    ],
    tags: ["기상해양", "가시화", "WebGL", "R&D"],
    products: ["Next.js", "WebGL", "Python"],
  },
];

/* ──────────────────────── 모달 컴포넌트 ──────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  const catColor = CATEGORIES.find(c => c.id === project.category)?.color || "#00C9B1";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "relative", width: "100%", maxWidth: 680, borderRadius: 20,
        background: "#0a1628", border: `1px solid ${catColor}33`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${catColor}10`,
        padding: "32px 28px", animation: "modalIn 0.25s ease-out",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <style>{`@keyframes modalIn { from { opacity:0; transform:translateY(16px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>

        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: `${catColor}15`, border: `1px solid ${catColor}30`, color: catColor, fontWeight: 600 }}>
            {CATEGORIES.find(c => c.id === project.category)?.label}
          </span>
          <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
            {project.year} · {project.period}
          </span>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 4px", fontFamily: "'Pretendard',sans-serif", lineHeight: 1.3 }}>{project.title}</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: "0 0 16px" }}>{project.client}</p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 24px" }}>{project.summary}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <div style={{ padding: "16px", borderRadius: 12, background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.15)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#F97316", marginBottom: 8, letterSpacing: "0.08em" }}>CHALLENGE</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>{project.challenge}</p>
          </div>
          <div style={{ padding: "16px", borderRadius: 12, background: "rgba(0,201,177,0.06)", border: "1px solid rgba(0,201,177,0.15)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#00C9B1", marginBottom: 8, letterSpacing: "0.08em" }}>SOLUTION</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>{project.solution}</p>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: catColor, marginBottom: 12, letterSpacing: "0.1em" }}>ARCHITECTURE</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${project.architecture.length}, 1fr)`, gap: 8 }}>
            {project.architecture.map((layer, i) => (
              <div key={i} style={{ padding: "14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{layer.label}</div>
                {layer.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginBottom: 4 }}>
                    <span style={{ color: catColor, flexShrink: 0 }}>·</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {project.results.map((r, i) => (
            <div key={i} style={{ flex: 1, minWidth: 100, padding: "14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: r.color, lineHeight: 1 }}>{r.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{r.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {project.products.map(p => (
            <span key={p} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: `${catColor}10`, border: `1px solid ${catColor}25`, color: catColor }}>{p}</span>
          ))}
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>{t}</span>
          ))}
        </div>

        <Link href="/ko/contact/" onClick={onClose} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: `${catColor}18`, border: `1px solid ${catColor}40`, color: catColor, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          유사 프로젝트 문의하기 →
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────── 메인 페이지 ─────────────────────────── */
export default function ReferencePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const filtered = activeTab === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeTab);
  const counts: Record<string, number> = { all: PROJECTS.length };
  PROJECTS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });

  return (
    <div className="min-h-screen text-[#d4dff0]" style={{ background: "#050d1a" }}>
      {/* Hero */}
      <section className="relative min-h-[340px] flex items-center justify-center overflow-hidden pt-24 pb-10 px-6">
        <AnimatedHeroBg variant="teal" />
        <div className="relative z-10 max-w-3xl mx-auto text-center" style={{ animation: "fadeUp .6s ease forwards", opacity: 0, transform: "translateY(20px)" }}>
          <style>{`@keyframes fadeUp { to { opacity:1; transform:none; } }`}</style>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium mb-6" style={{ background: "rgba(0,201,177,0.1)", border: "1px solid rgba(0,201,177,0.3)", color: "#00C9B1" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00C9B1" }} />
            PROJECT REFERENCES
          </div>
          <h1 className="font-bold leading-tight mb-5 text-white" style={{ fontFamily: "'Pretendard',sans-serif", fontSize: "clamp(32px,5vw,56px)" }}>
            프로젝트 레퍼런스
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(212,223,240,0.5)" }}>
            국방·공공·에너지·연구 분야에서 VWorks가 수행한<br />실제 프로젝트와 적용 아키텍처를 소개합니다.
          </p>
        </div>
      </section>

      {/* 통계 */}
      <section className="px-6 pb-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: `${PROJECTS.length}건+`, label: "구축 프로젝트", color: "#00C9B1" },
            { value: "국방·공공", label: "핵심 고객군", color: "#0085FF" },
            { value: "24×7", label: "운영 지원", color: "#F59E0B" },
            { value: "4년+", label: "HPC 구축 경험", color: "#A78BFA" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(212,223,240,0.45)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 탭 + 카드 — 블라인드 처리 */}
      <div className="relative">
        {/* 블러 오버레이 */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          background: "rgba(5,13,26,0.7)",
          backdropFilter: "blur(6px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          borderRadius: 12,
        }}>
          <div style={{
            padding: "24px 40px", borderRadius: 16,
            background: "rgba(0,201,177,0.08)",
            border: "1px solid rgba(0,201,177,0.2)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🔒</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>상세 내용 업데이트 예정</div>
            <div style={{ fontSize: 14, color: "rgba(212,223,240,0.5)" }}>프로젝트 레퍼런스 상세 정보를 준비하고 있습니다.</div>
          </div>
        </div>

        {/* 실제 카드 영역 (블러 뒤에 보임) */}
        <section className="py-10 px-6" style={{ background: "linear-gradient(180deg,transparent,rgba(0,201,177,0.02),transparent)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-2 justify-center mb-10 flex-wrap">
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{
                  padding: "8px 18px", borderRadius: 8,
                  border: `1px solid ${activeTab === cat.id ? cat.color + "50" : "rgba(255,255,255,0.08)"}`,
                  background: activeTab === cat.id ? `${cat.color}12` : "rgba(255,255,255,0.03)",
                  color: activeTab === cat.id ? cat.color : "rgba(212,223,240,0.5)",
                  fontSize: 13, fontWeight: activeTab === cat.id ? 600 : 400, cursor: "pointer", transition: "all 0.2s",
                }}>
                  {cat.label}
                  <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.6 }}>{counts[cat.id] || 0}</span>
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {filtered.map(p => {
                const catColor = CATEGORIES.find(c => c.id === p.category)?.color || "#00C9B1";
                return (
                  <div key={p.id} style={{ padding: "24px", borderRadius: 16, background: "#0a1628", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: `${catColor}15`, border: `1px solid ${catColor}30`, color: catColor, fontWeight: 600 }}>
                          {CATEGORIES.find(c => c.id === p.category)?.label}
                        </span>
                        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>{p.year}</span>
                      </div>
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 4px", fontFamily: "'Pretendard',sans-serif", lineHeight: 1.3 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(212,223,240,0.4)", margin: "0 0 14px" }}>{p.client}</p>
                    <p style={{ fontSize: 13, color: "rgba(212,223,240,0.5)", lineHeight: 1.6, margin: "0 0 16px" }}>{p.summary}</p>
                    <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                      {p.results.map((r, i) => (
                        <div key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <span style={{ color: r.color, fontWeight: 700 }}>{r.value}</span>
                          <span style={{ color: "rgba(255,255,255,0.35)", marginLeft: 4 }}>{r.label}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {p.products.map(prod => (
                        <span key={prod} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(212,223,240,0.4)" }}>{prod}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: catColor, fontWeight: 500, marginTop: 14, opacity: 0.7 }}>상세 아키텍처 보기 →</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg,rgba(0,201,177,0.10),rgba(0,133,255,0.06))", border: "1px solid rgba(0,201,177,0.2)" }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Pretendard',sans-serif" }}>유사 프로젝트를 계획하고 계신가요?</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(212,223,240,0.45)" }}>VWorks의 검증된 레퍼런스를 기반으로 최적의 설계를 제안합니다.<br />국방·공공·에너지 전문 엔지니어가 직접 답변드립니다.</p>
            <Link href="/ko/contact/" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-[#030810] transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#00C9B1,#0085FF)", boxShadow: "0 8px 24px rgba(0,201,177,0.3)" }}>
              프로젝트 상담 신청하기
            </Link>
          </div>
        </div>
      </section>

      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
    </div>
  );
}
