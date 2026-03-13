'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 오브(빛나는 구체) 정의
    const orbs = [
      { x: 0.15, y: 0.3,  r: 0.55, color: [0,   80,  200], speed: 0.0003 },
      { x: 0.75, y: 0.2,  r: 0.45, color: [0,   140, 255], speed: 0.0005 },
      { x: 0.5,  y: 0.85, r: 0.4,  color: [0,   60,  160], speed: 0.0004 },
      { x: 0.85, y: 0.65, r: 0.35, color: [0,   200, 180], speed: 0.0006 },
    ];

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 베이스 배경: 딥 네이비
      ctx.fillStyle = '#020a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 각 오브 렌더링
      orbs.forEach((orb, i) => {
        const px = (orb.x + Math.sin(t * orb.speed + i) * 0.08) * canvas.width;
        const py = (orb.y + Math.cos(t * orb.speed * 0.7 + i) * 0.06) * canvas.height;
        const radius = orb.r * Math.min(canvas.width, canvas.height);

        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        grad.addColorStop(0,   `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0.28)`);
        grad.addColorStop(0.4, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0.10)`);
        grad.addColorStop(1,   `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 미세 노이즈 도트
      if (t % 3 === 0) {
        for (let i = 0; i < 6; i++) {
          const dx = Math.random() * canvas.width;
          const dy = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.arc(dx, dy, Math.random() * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100,200,255,${Math.random() * 0.15})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const HEADLINES = ['AI 컴퓨팅 인프라', 'HPC 클러스터 구축', 'VAST Data 스토리지', '국방·공공 특화 솔루션', '24×7 기술지원 서비스'];

function TypeWriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const target = HEADLINES[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < target.length) t = setTimeout(() => setText(target.slice(0, text.length + 1)), 60);
    else if (!deleting && text.length === target.length) t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 30);
    else { setDeleting(false); setIdx((idx + 1) % HEADLINES.length); }
    return () => clearTimeout(t);
  }, [text, deleting, idx]);
  return <span className="text-teal-400">{text}<span className="animate-pulse">|</span></span>;
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0; const step = to / 50;
        const timer = setInterval(() => { s += step; if (s >= to) { setVal(to); clearInterval(timer); } else setVal(Math.floor(s)); }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <div ref={ref}>{val}{suffix}</div>;
}

const PILLARS = [
  { icon: '⚡', label: 'HPC · AI 컴퓨팅', desc: '국방·연구기관을 위한\nHPC 클러스터 & GPU 인프라\n설계·구축·운영', color: 'from-cyan-500/10 to-blue-500/5', border: 'border-cyan-500/30', accent: 'text-cyan-400', href: '/ko/solutions/hpe-cray/' },
  { icon: '🗄', label: 'VAST Data 스토리지', desc: 'PB급 비정형 데이터를\n단일 네임스페이스로 통합\nVAST Data 국내 공식 총판', color: 'from-teal-500/10 to-emerald-500/5', border: 'border-teal-500/30', accent: 'text-teal-400', href: '/ko/solutions/vast-data/' },
  { icon: '🛡', label: '보안 · 망연계', desc: '방위사업 ISMS 기준\n망분리·망연계 보안 아키텍처\n설계 및 구축 전문', color: 'from-violet-500/10 to-purple-500/5', border: 'border-violet-500/30', accent: 'text-violet-400', href: '/ko/solutions/network-security/' },
];
const REFS = [
  { client: '대한민국 해군', tag: 'HPC', project: '해양수치모델 HPC 클러스터 구축' },
  { client: '대한민국 해군', tag: 'HPC', project: 'NAIMS-II HPC 클러스터 구축' },
  { client: '한국수력원자력', tag: '보안', project: '망연계 솔루션 통합 유지보수' },
  { client: 'STX엔진', tag: 'AI·GPU', project: 'AI 서버 인프라 구축' },
];
const STATS = [
  { to: 5, suffix: '+', label: '국방·공공 레퍼런스' },
  { to: 3, suffix: ' PB+', label: '관리 데이터 규모' },
  { to: 24, suffix: '×7', label: '기술지원 서비스' },
  { to: 4, suffix: '년+', label: '운영 경력' },
];
const WHY = [
  { icon: '🔐', title: '방위사업 특화 경험', desc: '해군 NAIMS-II, 해양수치모델 HPC 등 실전 국방 프로젝트 수행' },
  { icon: '🤝', title: '글로벌 공식 파트너', desc: 'VAST Data 국내 총판 · Dell Technologies 공식 파트너' },
  { icon: '🔧', title: '설계부터 운영까지', desc: '아키텍처 설계 → 구축 → 24×7 기술지원의 원스톱 서비스' },
];

export default function HomePage() {
  return (
    <div className="bg-[#020a1a] text-white overflow-x-hidden">


      {/* ══════════════════════════════
          슬로건 섹션 — 최상단
      ══════════════════════════════ */}

      {/* ══════════════════════════════
          슬로건 섹션 — 최상단
      ══════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#020a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(0,180,140,0.07),transparent)]" />
        {/* 수평선 배경 */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '100% 80px' }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* 회사 뱃지 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-14 text-xs text-[#8899bb] tracking-[0.2em] uppercase">
            VWORKS TECHNOLOGIES · VAST Data 공인 파트너
          </div>

          {/* 메인 슬로건 */}
          <h1 className="font-black leading-[1.1] tracking-tight mb-0">
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-3">
              데이터의 속도로.
            </span>
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem] bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent pb-2">
              비즈니스의 미래로
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light text-white/50 tracking-wide">
            HPC · AI · 스토리지&nbsp;—&nbsp;<TypeWriter />
          </p>

          {/* 구분선 */}
          <div className="flex items-center justify-center gap-4 my-10">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-teal-500/50" />
            <div className="w-2 h-2 rounded-full bg-teal-400/80" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-teal-500/50" />
          </div>

          {/* 부제 */}
          <p className="text-[#8899bb] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-14">
            수치모델 가시화부터 네트워크, 서버, 보안, 소프트웨어 개발까지<br className="hidden sm:block" />
            IT 인프라 전 주기를 단일 파트너로 해결합니다
          </p>


          {/* 스크롤 인디케이터 */}
          <div className="mt-20 flex flex-col items-center gap-2 text-white/20 text-[11px] tracking-widest">
            <span>SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#020a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(0,180,140,0.07),transparent)]" />
        {/* 수평선 배경 */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '100% 80px' }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* 회사 뱃지 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-14 text-xs text-[#8899bb] tracking-[0.2em] uppercase">
            VWorks Technologies
          </div>

          {/* 메인 슬로건 */}
          <h1 className="font-black leading-[1.1] tracking-tight mb-0">
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-3">
              데이터의 속도로,
            </span>
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem] bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent pb-2">
              비즈니스의 미래로
            </span>
          </h1>

          {/* 구분선 */}
          <div className="flex items-center justify-center gap-4 my-10">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-teal-500/50" />
            <div className="w-2 h-2 rounded-full bg-teal-400/80" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-teal-500/50" />
          </div>

          {/* 부제 */}
          <p className="text-[#8899bb] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-14">
            수치모델 가시화부터 네트워크, 서버, 보안, 소프트웨어 개발까지<br className="hidden sm:block" />
            IT 인프라 전 주기를 단일 파트너로 해결합니다
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/ko/solutions/"
              className="group px-8 py-4 bg-teal-500 hover:bg-teal-400 text-[#020c18] font-bold rounded-xl transition-all duration-200 text-sm tracking-wide inline-flex items-center gap-2">
              솔루션 알아보기
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a href="/ko/contact/"
              className="px-8 py-4 border border-white/20 hover:border-teal-500/50 text-white/70 hover:text-white rounded-xl transition-all duration-200 text-sm tracking-wide">
              도입 문의하기
            </a>
          </div>

          {/* 스크롤 인디케이터 */}
          <div className="mt-20 flex flex-col items-center gap-2 text-white/20 text-[11px] tracking-widest">
            <span>SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#020a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,180,140,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(14,165,233,0.07),transparent)]" />
        <HeroBg />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/5 mb-8 text-xs text-teal-300 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            VWORKS TECHNOLOGIES · VAST Data 공인 파트너
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-4">
            <span className="block text-white/90">HPC · AI · 스토리지</span>
            <span className="block mt-2 min-h-[1.2em]"><TypeWriter /></span>
            <span className="block text-white/90 text-4xl md:text-5xl font-light mt-2">전문 인프라 기업</span>
          </h1>
          <p className="text-[#8899bb] text-lg md:text-xl mt-8 mb-12 max-w-2xl mx-auto leading-relaxed">
            국방·공공·연구기관 특화 HPC·AI·스토리지 인프라<br />설계부터 운영까지 VWorks Technologies가 함께합니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/ko/solutions/" className="group px-8 py-4 bg-teal-500 hover:bg-teal-400 text-[#020c18] font-bold rounded-xl transition-all duration-200 text-sm tracking-wide flex items-center gap-2">
              솔루션 알아보기
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ko/contact/" className="px-8 py-4 border border-white/20 hover:border-teal-500/60 text-white/80 hover:text-white rounded-xl transition-all duration-200 text-sm tracking-wide">도입 문의하기</Link>
          </div>
          <div className="mt-20 flex flex-col items-center gap-2 text-white/20 text-xs">
            <span>SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-teal-400"><Counter to={s.to} suffix={s.suffix} /></div>
              <div className="text-xs text-[#8899bb] mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-teal-400 text-xs tracking-[0.3em] uppercase mb-4">Core Business</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">3대 핵심 사업 영역</h2>
            <p className="text-[#8899bb] mt-4 text-lg max-w-xl mx-auto">HPC·AI·보안 인프라의 전 영역을 단일 파트너로</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map(p => (
              <Link key={p.label} href={p.href} className={`group relative p-8 rounded-2xl border ${p.border} bg-gradient-to-br ${p.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 block`}>
                <div className="text-4xl mb-5">{p.icon}</div>
                <h3 className={`text-xl font-bold ${p.accent} mb-3`}>{p.label}</h3>
                <p className="text-[#8899bb] text-sm leading-relaxed whitespace-pre-line">{p.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors">
                  자세히 보기
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-[#020e20]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-teal-400 text-xs tracking-[0.3em] uppercase mb-4">Why VWorks</p>
              <h2 className="text-4xl font-black leading-tight mb-8">국방·공공 인프라<br /><span className="text-teal-400">전문성</span>이 다릅니다</h2>
              <div className="space-y-6">
                {WHY.map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-white mb-1">{item.title}</div>
                      <div className="text-[#8899bb] text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-[#8899bb] tracking-widest uppercase mb-5">구축 레퍼런스</p>
              {REFS.map((r, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-1 rounded-md flex-shrink-0 min-w-[52px] text-center">{r.tag}</div>
                  <div>
                    <div className="text-xs text-[#8899bb] mb-0.5">{r.client}</div>
                    <div className="text-sm text-white/80 font-medium">{r.project}</div>
                  </div>
                </div>
              ))}
              <Link href="/ko/reference/" className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 mt-4 transition-colors">
                전체 레퍼런스 보기
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-[#8899bb] tracking-[0.3em] uppercase mb-10">Official Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['VAST Data', 'Dell Technologies', 'HPE Cray', '씨플랫폼', '필라테크'].map(p => (
              <span key={p} className="text-[#8899bb] hover:text-white transition-colors text-sm font-medium tracking-wide">{p}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-blue-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,212,170,0.05),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">프로젝트를 시작할<br /><span className="text-teal-400">준비가 됐나요?</span></h2>
          <p className="text-[#8899bb] text-lg mb-12 leading-relaxed">HPC·AI·스토리지 인프라 도입부터 운영까지<br />VWorks Technologies 전문가와 상담해 보세요</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ko/contact/" className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-[#020c18] font-bold rounded-xl transition-all duration-200 text-sm tracking-wide">무료 기술 상담 신청</Link>
            <Link href="/ko/about/" className="px-10 py-4 border border-white/20 hover:border-white/40 text-white/70 hover:text-white rounded-xl transition-all duration-200 text-sm tracking-wide">회사소개 보기</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
