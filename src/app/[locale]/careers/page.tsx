"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";

/* ──────────────────────────── 채용 공고 데이터 ──────────────────────────── */
interface JobPosting {
  id: string;
  title: string;
  team: string;
  type: string;        // 정규직 / 계약직 / 인턴
  location: string;
  experience: string;
  status: "open" | "closed";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  benefits: string[];
}

const JOB_POSTINGS: JobPosting[] = [
  {
    id: "se-hpc",
    title: "HPC/AI 인프라 시스템 엔지니어",
    team: "인프라사업부",
    type: "정규직",
    location: "부산 해운대",
    experience: "경력 3년 이상",
    status: "open",
    summary: "HPC 클러스터 및 AI 인프라의 설계·구축·운영을 담당합니다. VAST Data, HPE, Dell 서버 기반의 고성능 컴퓨팅 환경을 고객사에 구축하고, 기술 지원을 제공합니다.",
    responsibilities: [
      "HPC 클러스터 및 AI GPU 서버 인프라 설계·구축",
      "VAST Data 올플래시 스토리지 구축 및 기술 지원",
      "Linux 서버 관리 및 Slurm 워크로드 매니저 운영",
      "InfiniBand / RoCE 네트워크 패브릭 구성",
      "고객사 기술 지원 및 장애 대응 (24×7 on-call)",
    ],
    requirements: [
      "Linux 시스템 관리 경험 3년 이상",
      "서버 하드웨어 (랙마운트 서버, 스토리지) 구축 경험",
      "네트워크 기초 지식 (TCP/IP, VLAN, 이중화)",
      "문서 작성 능력 (제안서, 기술 보고서)",
      "국내 출장 가능자 (주 1~2회)",
    ],
    preferred: [
      "HPC 클러스터 구축 또는 운영 경험",
      "VAST Data, NetApp, Dell EMC 등 엔터프라이즈 스토리지 경험",
      "InfiniBand 또는 고속 네트워크 경험",
      "GPU 서버 (NVIDIA DGX, HGX) 경험",
      "방위사업 또는 공공사업 수행 경험",
    ],
    benefits: [
      "VAST Data / HPE / Dell 공식 교육 및 인증 지원",
      "최신 AI·HPC 인프라 기술 습득 기회",
      "유연 근무제 (코어타임 10:00~16:00)",
      "연차 외 리프레시 휴가 제공",
      "부산 해운대 오피스",
    ],
  },
  {
    id: "dev-fullstack",
    title: "풀스택 웹 개발자",
    team: "기술연구소",
    type: "정규직",
    location: "대구 달서구 / 원격 가능",
    experience: "경력 2년 이상",
    status: "open",
    summary: "기상해양 가시화 플랫폼 및 사내 웹 서비스를 개발합니다. Next.js, Python 기반의 데이터 가시화 및 관리 시스템을 설계·개발합니다.",
    responsibilities: [
      "기상해양 데이터 가시화 웹 플랫폼 개발 (Next.js)",
      "데이터 처리 백엔드 API 개발 (Python/FastAPI)",
      "WebGL 기반 인터랙티브 지도 렌더링 엔진 개발",
      "사내 관리 시스템 및 고객 포털 개발",
      "CI/CD 파이프라인 구축 및 배포 자동화",
    ],
    requirements: [
      "React / Next.js 개발 경험 2년 이상",
      "Python 백엔드 개발 경험 (FastAPI, Flask 등)",
      "TypeScript 사용 경험",
      "Git 기반 협업 경험",
      "REST API 설계 및 개발 경험",
    ],
    preferred: [
      "WebGL / Three.js / D3.js 경험",
      "지리정보 시스템 (GIS) 또는 기상 데이터 처리 경험",
      "Docker / Kubernetes 경험",
      "AWS / GCP 클라우드 경험",
      "오픈소스 기여 경험",
    ],
    benefits: [
      "원격 근무 가능 (주 2~3일)",
      "자체 R&D 프로젝트 참여 기회",
      "컨퍼런스 참가 및 교육비 지원",
      "자유로운 기술 스택 선택",
      "기업부설연구소 연구원 자격",
    ],
  },
  {
    id: "sales-enterprise",
    title: "엔터프라이즈 영업 담당",
    team: "영업부",
    type: "정규직",
    location: "부산 해운대",
    experience: "경력 5년 이상",
    status: "open",
    summary: "국방·공공·에너지 분야 고객을 대상으로 HPC·AI 인프라 솔루션을 영업합니다. VAST Data, HPE, Dell 제품군의 기술 영업과 프로젝트 수주를 담당합니다.",
    responsibilities: [
      "국방·공공·에너지 고객 신규 발굴 및 관계 구축",
      "HPC·AI·스토리지 솔루션 기술 영업",
      "RFP/RFI 대응 및 제안서 작성",
      "프로젝트 수주 및 계약 관리",
      "파트너사 협업 및 채널 영업",
    ],
    requirements: [
      "IT 인프라 또는 솔루션 영업 경험 5년 이상",
      "공공·국방 사업 수행 경험",
      "제안서 작성 및 프레젠테이션 역량",
      "고객 관계 관리 (CRM) 경험",
      "국내 출장 가능자",
    ],
    preferred: [
      "서버·스토리지·네트워크 기술 이해",
      "조달청 나라장터 입찰 경험",
      "방위사업청 사업 수행 경험",
      "HPC 또는 AI 인프라 영업 경험",
      "부울경 지역 고객 네트워크 보유",
    ],
    benefits: [
      "성과 기반 인센티브 (분기별)",
      "법인 차량 지원",
      "글로벌 벤더 파트너 행사 참여",
      "유연 근무제",
      "부산 해운대 오피스",
    ],
  },
];

/* ──────────────────────────── 지원 모달 ──────────────────────────── */
function ApplyModal({ job, onClose }: { job: JobPosting; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;
    setSending(true);
    try {
      // EmailJS 로드
      if (!(window as any).emailjs) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
        document.head.appendChild(script);
        await new Promise((r) => (script.onload = r));
        (window as any).emailjs.init("17r0XFH17PjAC674T");
      }
      await (window as any).emailjs.send("service_x5qus0h", "template_b9o6ede", {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: `[채용지원] ${job.title} — ${formData.name}`,
        message: `지원 포지션: ${job.title}\n소속팀: ${job.team}\n\n지원자: ${formData.name}\n이메일: ${formData.email}\n연락처: ${formData.phone}\n\n자기소개:\n${formData.message}`,
      });
      setSent(true);
    } catch {
      alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "relative", width: "100%", maxWidth: 560, borderRadius: 20,
        background: "#0a1628", border: "1px solid rgba(0,201,177,0.25)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)", padding: "32px 28px",
        animation: "modalIn 0.25s ease-out", maxHeight: "90vh", overflowY: "auto",
      }}>
        <style>{`@keyframes modalIn { from { opacity:0; transform:translateY(16px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>

        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>지원이 완료되었습니다</h3>
            <p style={{ fontSize: 14, color: "rgba(212,223,240,0.5)", marginBottom: 24 }}>검토 후 1주일 이내에 연락드리겠습니다.</p>
            <button onClick={onClose} style={{ padding: "12px 32px", borderRadius: 10, background: "rgba(0,201,177,0.15)", border: "1px solid rgba(0,201,177,0.3)", color: "#00C9B1", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>닫기</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(0,201,177,0.12)", border: "1px solid rgba(0,201,177,0.25)", color: "#00C9B1", fontWeight: 600, display: "inline-block", marginBottom: 16 }}>채용 지원</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 4px", fontFamily: "'Pretendard',sans-serif" }}>{job.title}</h3>
            <p style={{ fontSize: 13, color: "rgba(212,223,240,0.4)", marginBottom: 24 }}>{job.team} · {job.type} · {job.location}</p>

            <form ref={formRef} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, color: "rgba(212,223,240,0.5)", display: "block", marginBottom: 6 }}>이름 *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none" }}
                    placeholder="홍길동" />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "rgba(212,223,240,0.5)", display: "block", marginBottom: 6 }}>이메일 *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none" }}
                    placeholder="example@email.com" />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "rgba(212,223,240,0.5)", display: "block", marginBottom: 6 }}>연락처</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none" }}
                    placeholder="010-0000-0000" />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "rgba(212,223,240,0.5)", display: "block", marginBottom: 6 }}>자기소개 / 경력 요약</label>
                  <textarea rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 14, outline: "none", resize: "vertical" }}
                    placeholder="간단한 자기소개와 경력 사항을 작성해주세요." />
                </div>
              </div>
              <p style={{ fontSize: 11, color: "rgba(212,223,240,0.3)", marginTop: 12, marginBottom: 20 }}>* 이력서·포트폴리오는 이메일로 별도 송부해주세요 (aiden@vworks.tech)</p>
              <button type="submit" disabled={sending}
                style={{ width: "100%", padding: "14px", borderRadius: 12, background: sending ? "rgba(0,201,177,0.1)" : "linear-gradient(135deg,#00C9B1,#0085FF)", color: sending ? "rgba(255,255,255,0.5)" : "#fff", fontSize: 15, fontWeight: 700, cursor: sending ? "not-allowed" : "pointer", border: "none", transition: "all 0.2s" }}>
                {sending ? "전송 중..." : "지원서 제출하기"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────── 공고 상세 모달 ──────────────────────────── */
function JobDetailModal({ job, onClose, onApply }: { job: JobPosting; onClose: () => void; onApply: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "relative", width: "100%", maxWidth: 640, borderRadius: 20,
        background: "#0a1628", border: "1px solid rgba(0,201,177,0.25)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)", padding: "32px 28px",
        animation: "modalIn 0.25s ease-out", maxHeight: "90vh", overflowY: "auto",
      }}>
        <style>{`@keyframes modalIn { from { opacity:0; transform:translateY(16px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>

        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

        {/* 헤더 */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(0,201,177,0.12)", border: "1px solid rgba(0,201,177,0.25)", color: "#00C9B1", fontWeight: 600 }}>{job.status === "open" ? "채용중" : "마감"}</span>
          <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>{job.type}</span>
          <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>{job.experience}</span>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 4px", fontFamily: "'Pretendard',sans-serif" }}>{job.title}</h2>
        <p style={{ fontSize: 13, color: "rgba(212,223,240,0.4)", marginBottom: 20 }}>{job.team} · {job.location}</p>
        <p style={{ fontSize: 14, color: "rgba(212,223,240,0.6)", lineHeight: 1.7, marginBottom: 28 }}>{job.summary}</p>

        {/* 주요 업무 */}
        <Section title="주요 업무" items={job.responsibilities} color="#00C9B1" />
        <Section title="자격 요건" items={job.requirements} color="#0085FF" />
        <Section title="우대 사항" items={job.preferred} color="#A78BFA" />
        <Section title="복리후생" items={job.benefits} color="#F59E0B" />

        {/* 지원 버튼 */}
        {job.status === "open" && (
          <button onClick={() => { onClose(); onApply(); }}
            style={{ width: "100%", padding: "14px", borderRadius: 12, background: "linear-gradient(135deg,#00C9B1,#0085FF)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", border: "none", marginTop: 8 }}>
            지원하기
          </button>
        )}
      </div>
    </div>
  );
}

function Section({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color, letterSpacing: "0.08em", marginBottom: 10 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "rgba(212,223,240,0.55)", lineHeight: 1.5 }}>
            <span style={{ color, flexShrink: 0, marginTop: 2 }}>·</span>{item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────── 메인 페이지 ──────────────────────────── */
export default function CareersPage() {
  const [detailJob, setDetailJob] = useState<JobPosting | null>(null);
  const [applyJob, setApplyJob] = useState<JobPosting | null>(null);

  const openCount = JOB_POSTINGS.filter((j) => j.status === "open").length;

  return (
    <div className="min-h-screen text-[#d4dff0]" style={{ background: "#050d1a" }}>
      {/* Hero */}
      <section className="relative min-h-[340px] flex items-center justify-center overflow-hidden pt-24 pb-10 px-6">
        <AnimatedHeroBg variant="teal" />
        <div className="relative z-10 max-w-3xl mx-auto text-center" style={{ animation: "fadeUp .6s ease forwards", opacity: 0, transform: "translateY(20px)" }}>
          <style>{`@keyframes fadeUp { to { opacity:1; transform:none; } }`}</style>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium mb-6" style={{ background: "rgba(0,201,177,0.1)", border: "1px solid rgba(0,201,177,0.3)", color: "#00C9B1" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00C9B1" }} />
            WE ARE HIRING
          </div>
          <h1 className="font-bold leading-tight mb-5 text-white" style={{ fontFamily: "'Pretendard',sans-serif", fontSize: "clamp(32px,5vw,56px)" }}>
            함께 성장할<br />동료를 찾습니다
          </h1>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(212,223,240,0.5)" }}>
            HPC·AI·스토리지 인프라의 최전선에서<br />대한민국 데이터 인프라의 미래를 함께 만들어갈 분을 기다립니다.
          </p>
        </div>
      </section>

      {/* 회사 소개 요약 */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "2021", label: "설립연도", color: "#00C9B1" },
            { value: "부산·대구", label: "오피스 위치", color: "#0085FF" },
            { value: `${openCount}개`, label: "채용 중 포지션", color: "#F59E0B" },
            { value: "HPC·AI", label: "핵심 사업 분야", color: "#A78BFA" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(212,223,240,0.45)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VWorks 일하는 방식 */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="inline-block text-xs font-mono px-3 py-1 rounded mb-4" style={{ background: "rgba(0,201,177,0.08)", border: "1px solid rgba(0,201,177,0.2)", color: "#00C9B1" }}>CULTURE</div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Pretendard',sans-serif" }}>VWorks에서 일하는 방식</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "🚀", title: "최전선의 기술", desc: "VAST Data, HPE Cray, NVIDIA GPU — 국내에서 가장 앞선 HPC·AI 인프라 기술을 직접 다룹니다." },
              { icon: "🤝", title: "수평적 소통", desc: "직급이 아닌 역할 중심의 조직. 엔지니어와 영업이 함께 고객 미팅에 참여하고, 함께 설계합니다." },
              { icon: "📚", title: "성장 지원", desc: "글로벌 벤더 공식 교육, 인증 취득 비용, 컨퍼런스 참가비를 전액 지원합니다." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "24px 20px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{item.icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(212,223,240,0.5)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 채용 공고 카드 */}
      <section className="py-12 px-6" style={{ background: "linear-gradient(180deg,transparent,rgba(0,201,177,0.02),transparent)" }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="inline-block text-xs font-mono px-3 py-1 rounded mb-4" style={{ background: "rgba(0,201,177,0.08)", border: "1px solid rgba(0,201,177,0.2)", color: "#00C9B1" }}>OPEN POSITIONS</div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Pretendard',sans-serif" }}>채용 중인 포지션</h2>
          </div>

          <div className="grid md:grid-cols-1 gap-5">
            {JOB_POSTINGS.map((job) => (
              <div key={job.id} onClick={() => setDetailJob(job)}
                style={{ padding: "28px 24px", borderRadius: 16, background: "#0a1628", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,201,177,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: job.status === "open" ? "rgba(0,201,177,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${job.status === "open" ? "rgba(0,201,177,0.25)" : "rgba(255,255,255,0.08)"}`, color: job.status === "open" ? "#00C9B1" : "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                        {job.status === "open" ? "채용중" : "마감"}
                      </span>
                      <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>{job.type}</span>
                      <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>{job.experience}</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 6px", fontFamily: "'Pretendard',sans-serif" }}>{job.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(212,223,240,0.4)", margin: "0 0 10px" }}>{job.team} · {job.location}</p>
                    <p style={{ fontSize: 13, color: "rgba(212,223,240,0.5)", lineHeight: 1.6 }}>{job.summary}</p>
                  </div>
                  <div style={{ fontSize: 13, color: "#00C9B1", fontWeight: 500, whiteSpace: "nowrap", marginTop: 4 }}>상세보기 →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 채용 프로세스 */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="inline-block text-xs font-mono px-3 py-1 rounded mb-4" style={{ background: "rgba(0,201,177,0.08)", border: "1px solid rgba(0,201,177,0.2)", color: "#00C9B1" }}>PROCESS</div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Pretendard',sans-serif" }}>채용 프로세스</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { step: "01", title: "서류 접수", desc: "지원서 + 이력서", color: "#00C9B1" },
              { step: "02", title: "서류 심사", desc: "1주일 이내 안내", color: "#0085FF" },
              { step: "03", title: "면접", desc: "실무 + 컬처핏", color: "#A78BFA" },
              { step: "04", title: "최종 합격", desc: "처우 협의 후 입사", color: "#F59E0B" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "20px 16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.step}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "rgba(212,223,240,0.4)" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg,rgba(0,201,177,0.10),rgba(0,133,255,0.06))", border: "1px solid rgba(0,201,177,0.2)" }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Pretendard',sans-serif" }}>원하는 포지션이 없으신가요?</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(212,223,240,0.45)" }}>상시 채용도 진행하고 있습니다.<br />이력서를 보내주시면 적합한 포지션이 열릴 때 우선 검토합니다.</p>
            <a href="mailto:aiden@vworks.tech?subject=[상시채용] 입사 지원"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-[#030810] transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#00C9B1,#0085FF)", boxShadow: "0 8px 24px rgba(0,201,177,0.3)" }}>
              이력서 보내기 (aiden@vworks.tech)
            </a>
          </div>
        </div>
      </section>

      {/* 모달 */}
      {detailJob && <JobDetailModal job={detailJob} onClose={() => setDetailJob(null)} onApply={() => { setDetailJob(null); setApplyJob(detailJob); }} />}
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
}
