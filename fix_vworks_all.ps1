$base = "C:\Users\aiden\Downloads\vworks-tech-v4\vworks-v4"

function Write-TSX($relPath, $content) {
    $fullPath = Join-Path $base $relPath
    $dir = Split-Path $fullPath -Parent
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "OK: $relPath"
}

# ── 1. solutions/page.tsx ──
Write-TSX "src\app\[locale]\solutions\page.tsx" @'
import Link from "next/link";

const solutions = [
  {
    slug: "vast-data",
    category: "STORAGE · CORE PARTNER",
    badge: "CORE",
    badgeColor: "bg-teal-500",
    title: "VAST Data 스토리지",
    desc: "페타바이트 규모 비정형 데이터를 단일 플랫폼으로 통합 관리하는 차세대 올플래시 스토리지 솔루션.",
    tags: ["All-Flash", "NFS/S3", "AI Ready"],
  },
  {
    slug: "hpe-cray",
    category: "INFRASTRUCTURE · HPC",
    badge: "HPC",
    badgeColor: "bg-blue-500",
    title: "HPE Cray 슈퍼컴퓨터",
    desc: "국방·연구기관 특화 고성능 컴퓨팅 클러스터의 설계·구축·운영 전 과정을 책임집니다.",
    tags: ["HPC", "Supercomputer", "MPI/SLURM"],
  },
  {
    slug: "dell-server",
    category: "SERVER · INFRASTRUCTURE",
    badge: "SERVER",
    badgeColor: "bg-orange-500",
    title: "Dell PowerEdge 서버",
    desc: "AI·HPC·클라우드 워크로드에 최적화된 Dell PowerEdge 서버를 공급·구축합니다.",
    tags: ["PowerEdge", "GPU Server", "AI/ML"],
  },
  {
    slug: "network-security",
    category: "SECURITY · NETWORK",
    badge: "SECURITY",
    badgeColor: "bg-cyan-500",
    title: "보안 솔루션",
    desc: "망연계 i-oneNet(휴네시온)과 국방 특화 CDS KCDS-Guard(씨크랩)를 공식 총판으로 공급·구축합니다.",
    tags: ["망연계", "CDS", "Zero Trust"],
  },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-widest text-teal-400 mb-3">SOLUTIONS</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">솔루션</h1>
        <p className="text-[#8ba3c7] text-lg mb-16">AI·HPC·스토리지·보안 전 영역을 아우르는 통합 인프라 서비스</p>
        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((s) => (
            <Link key={s.slug} href={`/ko/solutions/${s.slug}/`}
              className="group border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-8 hover:border-teal-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-[#8ba3c7] tracking-widest">{s.category}</span>
                <span className={`text-xs px-2 py-1 rounded ${s.badgeColor} text-white font-bold`}>{s.badge}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-teal-400 transition-colors">{s.title}</h2>
              <p className="text-[#8ba3c7] text-sm mb-6 leading-relaxed">{s.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {s.tags.map(t => (
                  <span key={t} className="text-xs border border-[#1a2d4a] px-3 py-1 rounded-full text-[#8ba3c7]">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
'@

# ── 2. vast-data/page.tsx ──
Write-TSX "src\app\[locale]\solutions\vast-data\page.tsx" @'
import Link from "next/link";

export default function VastDataPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-4"><Link href="/ko/solutions/" className="text-xs text-[#8ba3c7] hover:text-teal-400">← 솔루션 목록</Link></div>
        <div className="flex gap-2 mb-6">
          <span className="text-xs bg-teal-500 text-white px-2 py-1 rounded font-bold">CORE</span>
          <span className="text-xs text-[#8ba3c7] tracking-widest self-center">STORAGE · CORE PARTNER</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">VAST Data 스토리지</h1>
        <p className="text-xl text-[#8ba3c7] mb-12">페타바이트 규모 비정형 데이터를 단일 플랫폼으로 통합 관리</p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[{num:"PB+",label:"구축 데이터 규모"},{num:"5+",label:"국방·공공 레퍼런스"},{num:"24×7",label:"기술지원 서비스"}].map(s=>(
            <div key={s.label} className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">{s.num}</div>
              <div className="text-sm text-[#8ba3c7]">{s.label}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6">주요 기능</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {["단일 네임스페이스 — NFS·S3·SMB 동시 지원","All-Flash 아키텍처로 μs급 레이턴시 실현","인라인 압축·중복제거로 TCO 최대 70% 절감","AI/ML 워크로드 GPU Direct Storage 지원","국방·공공 보안 요구사항 대응 (CC 인증)","자동 계층화 및 무중단 확장"].map(f=>(
            <div key={f} className="flex items-start gap-3 border border-[#1a2d4a] bg-[#0a1628] rounded-lg p-4">
              <span className="text-teal-400 mt-0.5">✓</span>
              <span className="text-sm text-[#c8d8f0]">{f}</span>
            </div>
          ))}
        </div>
        <div className="border border-teal-500/30 bg-teal-500/5 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">도입 상담 신청</h3>
          <p className="text-[#8ba3c7] mb-6">VAST Data 공식 파트너 VWorks가 최적의 구성을 제안합니다</p>
          <Link href="/ko/contact/" className="inline-block bg-teal-500 hover:bg-teal-400 text-[#050d1a] font-bold px-8 py-3 rounded-lg transition-colors">무료 상담 신청 →</Link>
        </div>
      </div>
    </main>
  );
}
'@

# ── 3. hpe-cray/page.tsx ──
Write-TSX "src\app\[locale]\solutions\hpe-cray\page.tsx" @'
import Link from "next/link";

export default function HpeCrayPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-4"><Link href="/ko/solutions/" className="text-xs text-[#8ba3c7] hover:text-teal-400">← 솔루션 목록</Link></div>
        <div className="flex gap-2 mb-6">
          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded font-bold">HPC</span>
          <span className="text-xs text-[#8ba3c7] tracking-widest self-center">INFRASTRUCTURE · HPC</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">HPE Cray 슈퍼컴퓨터</h1>
        <p className="text-xl text-[#8ba3c7] mb-12">국방·연구기관 특화 HPC 클러스터 설계·구축·운영</p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[{num:"2건+",label:"국방 HPC 구축 레퍼런스"},{num:"KHNP",label:"해군 HPC 구축"},{num:"24×7",label:"운영 유지보수"}].map(s=>(
            <div key={s.label} className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{s.num}</div>
              <div className="text-sm text-[#8ba3c7]">{s.label}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6">주요 기능</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {["HPE Cray EX / XD 슈퍼컴퓨터 공급·구축","MPI·SLURM 기반 HPC 소프트웨어 스택 구성","InfiniBand HDR/NDR 고속 인터커넥트","GPU 클러스터 (NVIDIA H100/A100) 통합","국방·공공 보안 요구사항 대응","설계부터 유지보수까지 전 과정 책임"].map(f=>(
            <div key={f} className="flex items-start gap-3 border border-[#1a2d4a] bg-[#0a1628] rounded-lg p-4">
              <span className="text-blue-400 mt-0.5">✓</span>
              <span className="text-sm text-[#c8d8f0]">{f}</span>
            </div>
          ))}
        </div>
        <div className="border border-blue-500/30 bg-blue-500/5 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">HPC 도입 상담</h3>
          <p className="text-[#8ba3c7] mb-6">HPE Cray 공식 파트너 VWorks가 최적 사양을 제안합니다</p>
          <Link href="/ko/contact/" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3 rounded-lg transition-colors">무료 상담 신청 →</Link>
        </div>
      </div>
    </main>
  );
}
'@

# ── 4. dell-server/page.tsx ──
Write-TSX "src\app\[locale]\solutions\dell-server\page.tsx" @'
import Link from "next/link";

export default function DellServerPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-4"><Link href="/ko/solutions/" className="text-xs text-[#8ba3c7] hover:text-teal-400">← 솔루션 목록</Link></div>
        <div className="flex gap-2 mb-6">
          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded font-bold">SERVER</span>
          <span className="text-xs text-[#8ba3c7] tracking-widest self-center">SERVER · INFRASTRUCTURE</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Dell PowerEdge 서버</h1>
        <p className="text-xl text-[#8ba3c7] mb-12">AI·HPC·클라우드 워크로드 최적화 서버 공급·구축</p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[{num:"Dell",label:"공식 파트너"},{num:"GPU",label:"AI 서버 전문"},{num:"24×7",label:"기술지원"}].map(s=>(
            <div key={s.label} className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{s.num}</div>
              <div className="text-sm text-[#8ba3c7]">{s.label}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6">주요 제품 라인업</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {["PowerEdge R750/R760 — 범용 2U 랙 서버","PowerEdge XE9680 — AI/ML GPU 서버 (H100×8)","PowerEdge MX — 모듈형 블레이드 서버","PowerEdge R6625/R7625 — AMD EPYC 서버","국방·공공 납품 경험 (조달 등록)","설치·구성·유지보수 원스톱 서비스"].map(f=>(
            <div key={f} className="flex items-start gap-3 border border-[#1a2d4a] bg-[#0a1628] rounded-lg p-4">
              <span className="text-orange-400 mt-0.5">✓</span>
              <span className="text-sm text-[#c8d8f0]">{f}</span>
            </div>
          ))}
        </div>
        <div className="border border-orange-500/30 bg-orange-500/5 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">서버 도입 상담</h3>
          <p className="text-[#8ba3c7] mb-6">최적 사양 선정부터 납품·설치까지 VWorks가 책임집니다</p>
          <Link href="/ko/contact/" className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3 rounded-lg transition-colors">무료 상담 신청 →</Link>
        </div>
      </div>
    </main>
  );
}
'@

# ── 5. network-security/page.tsx ──
Write-TSX "src\app\[locale]\solutions\network-security\page.tsx" @'
import Link from "next/link";

export default function NetworkSecurityPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-4"><Link href="/ko/solutions/" className="text-xs text-[#8ba3c7] hover:text-teal-400">← 솔루션 목록</Link></div>
        <div className="flex gap-2 mb-6">
          <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded font-bold">SECURITY</span>
          <span className="text-xs text-[#8ba3c7] tracking-widest self-center">SECURITY · NETWORK</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">보안 솔루션</h1>
        <p className="text-xl text-[#8ba3c7] mb-4">망연계 · CDS 전문 공급</p>
        <p className="text-[#8ba3c7] mb-12">국내 1위 망연계 솔루션 i-oneNet(휴네시온)과 국방 특화 CDS KCDS-Guard(씨크랩)를 공식 총판으로 공급·구축합니다.</p>
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {[{num:"10년",label:"망연계 조달 1위"},{num:"50%",label:"국내 망연계 점유율"},{num:"13+",label:"KCDS 국방 기관"},{num:"2건",label:"VWorks 국방 레퍼런스"}].map(s=>(
            <div key={s.label} className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-2">{s.num}</div>
              <div className="text-xs text-[#8ba3c7]">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 text-cyan-400">i-oneNet (휴네시온)</h2>
            <p className="text-sm text-[#8ba3c7] mb-4">국내 망연계 시장 10년 연속 1위. 양방향 망연계 솔루션</p>
            {["업무망 ↔ 인터넷망 양방향 실시간 연계","제로트러스트 인증 기술 내장","CSAP SaaS 표준등급 보안인증","AWS·Azure 주요 클라우드 환경 지원"].map(f=>(
              <div key={f} className="flex items-start gap-2 mb-2">
                <span className="text-cyan-400 text-xs mt-0.5">✓</span>
                <span className="text-xs text-[#c8d8f0]">{f}</span>
              </div>
            ))}
          </div>
          <div className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 text-cyan-400">KCDS-Guard (씨크랩)</h2>
            <p className="text-sm text-[#8ba3c7] mb-4">국방 특화 CDS. 국방부·해군·육군 등 13개+ 기관 납품</p>
            {["국방부·해군·육군 등 국방 기관 납품","국가용 보안요구사항 V3.0 만족","신국가망보안체계 N²SF C/S/O 등급 지원","VWorks 국방 레퍼런스: KHNP·해군 HPC"].map(f=>(
              <div key={f} className="flex items-start gap-2 mb-2">
                <span className="text-cyan-400 text-xs mt-0.5">✓</span>
                <span className="text-xs text-[#c8d8f0]">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-cyan-500/30 bg-cyan-500/5 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">도입 상담 신청</h3>
          <p className="text-[#8ba3c7] mb-6">망연계·CDS 공식 총판 VWorks가 환경 분석부터 구축까지 책임집니다</p>
          <Link href="/ko/contact/" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-[#050d1a] font-bold px-8 py-3 rounded-lg transition-colors">무료 상담 신청 →</Link>
        </div>
      </div>
    </main>
  );
}
'@

# ── 6. Navbar.tsx 드롭다운 버전으로 교체 ──
Write-TSX "src\components\layout\Navbar.tsx" @'
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const solutions = [
  { href: "/ko/solutions/vast-data/", label: "VAST Data 스토리지", badge: "STORAGE", color: "text-teal-400" },
  { href: "/ko/solutions/hpe-cray/", label: "HPE Cray 슈퍼컴퓨터", badge: "HPC", color: "text-blue-400" },
  { href: "/ko/solutions/dell-server/", label: "Dell PowerEdge 서버", badge: "SERVER", color: "text-orange-400" },
  { href: "/ko/solutions/network-security/", label: "보안 솔루션", badge: "SECURITY", color: "text-cyan-400" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#050d1a]/95 backdrop-blur-md border-b border-[#1a2d4a]" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/ko/" className="flex items-center">
          <Image src="/logo-white.png" alt="VWorks Technologies" width={110} height={44}
            style={{ objectFit: "contain", height: "auto" }} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative"
            onMouseEnter={() => setSolutionOpen(true)}
            onMouseLeave={() => setSolutionOpen(false)}>
            <button className="flex items-center gap-1 text-sm text-[#c8d8f0] hover:text-white transition-colors">
              솔루션
              <svg className={`w-3 h-3 transition-transform ${solutionOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {solutionOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#0a1628] border border-[#1a2d4a] rounded-xl shadow-xl overflow-hidden">
                <div className="p-2">
                  {solutions.map((s) => (
                    <Link key={s.href} href={s.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1a2d4a] transition-colors group">
                      <span className={`text-xs font-bold ${s.color} w-16 shrink-0`}>{s.badge}</span>
                      <span className="text-sm text-[#c8d8f0] group-hover:text-white">{s.label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-[#1a2d4a] mt-2 pt-2">
                    <Link href="/ko/solutions/"
                      className="flex items-center justify-center gap-2 px-4 py-2 text-xs text-teal-400 hover:text-teal-300 transition-colors">
                      전체 솔루션 보기 →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link href="/ko/partners/" className="text-sm text-[#c8d8f0] hover:text-white transition-colors">파트너십</Link>
          <Link href="/ko/reference/" className="text-sm text-[#c8d8f0] hover:text-white transition-colors">구축 레퍼런스</Link>
          <Link href="/ko/about/" className="text-sm text-[#c8d8f0] hover:text-white transition-colors">회사 소개</Link>
          <Link href="/ko/contact/"
            className="text-sm bg-teal-500 hover:bg-teal-400 text-[#050d1a] font-bold px-4 py-2 rounded-lg transition-colors">
            문의하기
          </Link>
        </nav>
        <button className="md:hidden text-[#c8d8f0]" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-[#1a2d4a] px-6 py-4">
          <p className="text-xs text-[#8ba3c7] mb-2 tracking-widest">솔루션</p>
          {solutions.map((s) => (
            <Link key={s.href} href={s.href}
              className="block py-2 text-sm text-[#c8d8f0] hover:text-white"
              onClick={() => setMobileOpen(false)}>
              {s.label}
            </Link>
          ))}
          <div className="border-t border-[#1a2d4a] my-3" />
          {[{href:"/ko/partners/",label:"파트너십"},{href:"/ko/reference/",label:"구축 레퍼런스"},{href:"/ko/about/",label:"회사 소개"}].map((item) => (
            <Link key={item.href} href={item.href}
              className="block py-2 text-sm text-[#c8d8f0] hover:text-white"
              onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/ko/contact/"
            className="block mt-3 text-center bg-teal-500 text-[#050d1a] font-bold px-4 py-2 rounded-lg"
            onClick={() => setMobileOpen(false)}>
            문의하기
          </Link>
        </div>
      )}
    </header>
  );
}
'@

Write-Host ""
Write-Host "모든 파일 생성 완료! 이제 npm run build 를 실행하세요."
