'use client';
import AnimatedHeroBg from '@/components/AnimatedHeroBg';
import { useEffect } from 'react';
import Link from 'next/link';

const PROLIANT = [
  {
    tier: '1U · COMPUTE OPTIMIZED',
    name: 'ProLiant DL360 Gen11',
    sub: '1U RACK · DUAL SOCKET · COMPUTE DENSE',
    color: '#00A3E0',
    bg: 'rgba(0,163,224,.07)',
    border: 'rgba(0,163,224,.25)',
    desc: '1U 고밀도 랙 서버. EDA·CAD·VDI·컨테이너 등 컴퓨팅 집약 워크로드에 최적화. 4th/5th Gen Intel Xeon Scalable 프로세서 탑재, 소형 폼팩터에서 최대 성능 구현.',
    specs: [
      ['FORM', '1U Rack, 듀얼 소켓'],
      ['CPU', '4th/5th Gen Intel Xeon (최대 64코어)'],
      ['MEMORY', '최대 8TB DDR5 (32 DIMM)'],
      ['STORAGE', '최대 10 SFF SAS/SATA/NVMe'],
      ['PCIe', 'PCIe Gen5 (최대 3 x16 슬롯)'],
      ['MGMT', 'HPE iLO 6 (Silicon Root of Trust)'],
    ],
    useCases: ['EDA/CAD', 'VDI', '컨테이너', '일반 가상화'],
  },
  {
    tier: '2U · VERSATILE FLAGSHIP',
    name: 'ProLiant DL380 Gen11',
    sub: '2U RACK · DUAL SOCKET · INDUSTRY STANDARD',
    color: '#01A982',
    bg: 'rgba(1,169,130,.07)',
    border: 'rgba(1,169,130,.25)',
    desc: '업계 표준 2U 플래그십 서버. 확장성과 유연성의 최적 균형. 컨테이너·클라우드·빅데이터·AI/ML·스토리지 정의 워크로드까지 모든 환경에 대응하는 범용 플랫폼.',
    specs: [
      ['FORM', '2U Rack, 듀얼 소켓'],
      ['CPU', '4th/5th Gen Intel Xeon (최대 64코어, 350W)'],
      ['MEMORY', '최대 8TB DDR5 (32 DIMM)'],
      ['STORAGE', '최대 24 SFF 또는 12 LFF / NVMe 지원'],
      ['PCIe', 'PCIe Gen5 (최대 8슬롯 + OCP 2슬롯)'],
      ['GPU', '최대 8x SW 또는 3x DW GPU'],
    ],
    useCases: ['AI/ML', '빅데이터', '가상화', 'SDS', '클라우드'],
  },
  {
    tier: '2U · MISSION CRITICAL',
    name: 'ProLiant DL560 Gen11',
    sub: '2U RACK · QUAD SOCKET · SCALE-UP',
    color: '#7B5EA7',
    bg: 'rgba(123,94,167,.07)',
    border: 'rgba(123,94,167,.25)',
    desc: '4소켓 고성능 2U 서버. 최대 16TB DDR5 메모리와 60코어 프로세서 4개로 비즈니스 크리티컬·인메모리DB·대규모 가상화 집약 환경에 최적화.',
    specs: [
      ['FORM', '2U Rack, 쿼드 소켓 (4S)'],
      ['CPU', '4th Gen Intel Xeon (최대 60코어 x4)'],
      ['MEMORY', '최대 16TB DDR5 (64 DIMM)'],
      ['STORAGE', 'SFF/LFF 혼합 구성 지원'],
      ['PCIe', 'PCIe Gen5 (최대 6슬롯 + OCP 2슬롯)'],
      ['GPU', '최대 6x SW GPU 지원'],
    ],
    useCases: ['인메모리 DB', '대규모 가상화', '비즈니스 크리티컬', 'ERP/SAP'],
  },
];

const SYNERGY = [
  {
    tier: 'COMPOSABLE · 2-SOCKET BLADE',
    name: 'Synergy 480 Gen11',
    sub: 'HALF-HEIGHT · HALF-WIDTH · COMPOSABLE',
    color: '#00C9B1',
    bg: 'rgba(0,201,177,.07)',
    border: 'rgba(0,201,177,.25)',
    desc: '컴포저블 인프라의 핵심 2소켓 블레이드. 4th/5th Gen Intel Xeon 탑재, DDR5 메모리, PCIe Gen5 지원. HPE OneView로 소프트웨어 정의 방식으로 즉시 프로비저닝.',
    specs: [
      ['FORM', 'Half-Height, Half-Width'],
      ['CPU', '4th/5th Gen Intel Xeon (최대 64코어)'],
      ['MEMORY', '최대 8TB DDR5'],
      ['STORAGE', '최대 8 SFF 드라이브 베이'],
      ['MGMT', 'HPE OneView (소프트웨어 정의)'],
      ['FRAME', 'HPE Synergy 12000 Frame'],
    ],
    useCases: ['가상화', '컨테이너', '하이브리드 클라우드', 'DevOps'],
  },
  {
    tier: 'COMPOSABLE · 4-SOCKET BLADE',
    name: 'Synergy 660 Gen10',
    sub: 'FULL-HEIGHT · SINGLE-WIDTH · SCALE-UP',
    color: '#38D9F5',
    bg: 'rgba(56,217,245,.07)',
    border: 'rgba(56,217,245,.25)',
    desc: '4소켓 풀-하이트 블레이드. 최대 6TB DDR4 메모리(48 DIMM)로 대규모 데이터 집약 워크로드·스케일업 DB에 최적. 컴포저블 인프라 내 최고 메모리 밀도 제공.',
    specs: [
      ['FORM', 'Full-Height, Single-Width'],
      ['CPU', 'Intel Xeon Scalable (2S 또는 4S)'],
      ['MEMORY', '최대 6TB DDR4 (48 DIMM)'],
      ['STORAGE', '최대 4 SFF 드라이브'],
      ['MGMT', 'HPE OneView + iLO 통합'],
      ['FRAME', 'HPE Synergy 12000 Frame'],
    ],
    useCases: ['대용량 DB', '인메모리 분석', '극한 가상화', 'ERP'],
  },
];

const FEATURES = [
  { icon: '🔒', title: 'Silicon Root of Trust', desc: 'HPE 전용 ASIC 기반 보안. 서버 부팅 전 펌웨어 무결성 검증. 악성코드 감염 서버는 부팅 자체를 차단.' },
  { icon: '☁️', title: 'HPE iLO 6 원격 관리', desc: '어디서나 서버 구성·모니터링·업데이트. AI 기반 상태 분석 및 예측 유지보수. HPE Compute Ops Management와 통합.' },
  { icon: '⚡', title: 'PCIe Gen5 고속 I/O', desc: '이전 세대 대비 2배 대역폭. GPU·NVMe·NIC 등 고속 디바이스와 병목 없는 연결. AI/ML 워크로드 가속에 최적.' },
  { icon: '🧩', title: 'HPE OneView 컴포저블', desc: 'Synergy 프레임 내 컴퓨트·스토리지·패브릭을 소프트웨어로 정의. 템플릿 기반 즉시 프로비저닝. RESTful API 완전 지원.' },
  { icon: '💚', title: 'GreenLake 소비형 모델', desc: '구매 외 사용량 기반 종량제 공급 가능. 초기 CAPEX 절감, 워크로드 증가에 따른 탄력적 확장. 클라우드 운영 경험 제공.' },
  { icon: '🛡️', title: '조달 등록 / 보안 심사', desc: 'VWorks는 방위사업청 등록업체. 국방·공공기관 HPE 서버 도입 시 보안심사 및 적합성 검증 전문 지원.' },
];

export default function HpeServerPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff]">

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-12 px-4 md:px-10 border-b border-[rgba(31,74,117,.5)] overflow-hidden">
        <AnimatedHeroBg variant="blue" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 80% at 20% 50%,rgba(0,163,224,.06) 0%,transparent 60%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm" style={{ color: '#00A3E0', background: 'rgba(0,163,224,.07)', border: '1px solid rgba(0,163,224,.3)' }}>HPE 공식 파트너</span>
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm text-[#01A982] bg-[rgba(1,169,130,.08)] border border-[rgba(1,169,130,.2)]">ProLiant Gen11</span>
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm text-[#00C9B1] bg-[rgba(0,201,177,.07)] border border-[rgba(0,201,177,.25)]">Synergy 컴포저블</span>
            </div>
            <h1 className="font-['Bebas_Neue'] text-[40px] md:text-[56px] lg:text-[72px] leading-[.92] tracking-wide mb-5">
              <span style={{ background: 'linear-gradient(135deg,#00A3E0,#00C9B1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HPE 서버</span>
              <br />
              <span className="text-[22px] md:text-[32px] lg:text-[44px] text-[rgba(200,220,255,.76)] font-['Noto_Sans_KR'] font-light tracking-normal">ProLiant · Synergy 블레이드</span>
            </h1>
            <p className="text-[15px] text-[rgba(200,220,255,.76)] font-light leading-[1.85] mb-8 max-w-xl">
              업계 최고 신뢰성의 HPE ProLiant Gen11 랙 서버부터 소프트웨어 정의 컴포저블 인프라 Synergy 블레이드까지. 국방·공공·연구기관 특화 서버 인프라를 VWorks가 구축합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/ko/contact/" className="text-[#050d1a] text-[14px] font-medium px-7 py-3 rounded-sm" style={{ background: 'linear-gradient(135deg,#00A3E0,#00C9B1)' }}>도입 상담 신청 →</Link>
              <a href="#proliant" className="border text-[14px] px-7 py-3 rounded-sm" style={{ borderColor: 'rgba(0,163,224,.3)', color: '#00A3E0' }}>ProLiant 라인업</a>
              <a href="#synergy" className="border text-[14px] px-7 py-3 rounded-sm border-[rgba(0,201,177,.2)] text-[#00C9B1]">Synergy 블레이드</a>
            </div>
          </div>

          {/* STATS */}
          <div className="bg-[#0a1628] rounded-sm p-6 relative overflow-hidden" style={{ border: '1px solid rgba(0,163,224,.3)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#00A3E0,#00C9B1)' }} />
            <div className="font-mono text-[9px] tracking-[.2em] mb-4" style={{ color: '#00A3E0' }}>HPE ProLiant Gen11 주요 사양</div>
            <div className="grid grid-cols-2 gap-[2px]">
              {[
                { n: '64', u: '코어', l: '소켓당 최대 코어', s: '5th Gen Intel Xeon' },
                { n: '8TB', u: '', l: 'DDR5 최대 메모리', s: '듀얼 소켓 기준' },
                { n: 'Gen5', u: '', l: 'PCIe 세대', s: '이전 대비 2배 대역폭' },
                { n: 'iLO 6', u: '', l: 'Silicon Root of Trust', s: '제로트러스트 보안' },
              ].map((s) => (
                <div key={s.l} className="bg-[#0e1e35] border border-[rgba(31,74,117,.5)] p-3 text-center">
                  <div className="font-['Bebas_Neue'] text-[22px] leading-tight" style={{ color: '#00A3E0' }}>{s.n}<span className="text-[14px]">{s.u}</span></div>
                  <div className="text-[11px] text-[rgba(200,220,255,.76)] my-1 leading-[1.3]">{s.l}</div>
                  <div className="font-mono text-[8px] text-[#5a7a9a]">{s.s}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[rgba(31,74,117,.5)]">
              <div className="font-mono text-[8.5px] text-[#5a7a9a] tracking-[.12em] mb-2">VWorks 공급 제품</div>
              <div className="flex flex-wrap gap-1">
                {['DL360 Gen11', 'DL380 Gen11', 'DL560 Gen11', 'Synergy 480 Gen11', 'Synergy 660 Gen10'].map((t) => (
                  <span key={t} className="font-mono text-[9px] px-2 py-1 rounded-sm" style={{ color: '#00A3E0', background: 'rgba(0,163,224,.07)', border: '1px solid rgba(0,163,224,.2)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ProLiant 라인업 ── */}
      <section id="proliant" className="px-4 md:px-10 py-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#00A3E0' }}>HPE ProLiant Gen11</div>
          <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[44px] lg:text-[52px] tracking-wide leading-none mb-2">랙 서버 라인업</h2>
          <p className="text-[14px] text-[rgba(200,220,255,.76)] font-light mb-10 max-w-xl">업계 최고 신뢰성. 4th/5th Gen Intel Xeon Scalable 프로세서, DDR5, PCIe Gen5 탑재.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
            {PROLIANT.map((s) => (
              <div key={s.name} className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm overflow-hidden transition-colors hover:border-[rgba(0,163,224,.3)]">
                <div className="p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,${s.color},transparent)` }} />
                  <div className="font-mono text-[8px] tracking-[.2em] mb-2" style={{ color: s.color }}>{s.tier}</div>
                  <div className="font-['Bebas_Neue'] text-[28px] leading-none mb-1" style={{ color: s.color }}>{s.name}</div>
                  <div className="font-mono text-[9px] tracking-[.1em] text-[#5a7a9a] mb-4">{s.sub}</div>
                  <p className="text-[13px] text-[rgba(200,220,255,.76)] font-light leading-[1.75]">{s.desc}</p>
                </div>
                <div className="px-6 py-4 bg-[#0e1e35] border-t border-[rgba(31,74,117,.5)]">
                  {s.specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-1.5 border-b border-[rgba(31,74,117,.3)] last:border-b-0 text-[11.5px]">
                      <span className="font-mono text-[9px] tracking-[.1em] text-[#5a7a9a]">{k}</span>
                      <span className="text-[rgba(200,220,255,.76)] text-right">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-3 border-t border-[rgba(31,74,117,.5)] flex flex-wrap gap-1">
                  {s.useCases.map((u) => (
                    <span key={u} className="font-mono text-[8.5px] tracking-[.1em] px-2 py-1 rounded-sm"
                      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>{u}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Synergy 블레이드 ── */}
      <section id="synergy" className="px-4 md:px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500" style={{ background: 'linear-gradient(180deg,transparent,rgba(0,201,177,.03),transparent)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3 text-[#00C9B1]">HPE SYNERGY · COMPOSABLE INFRASTRUCTURE</div>
          <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[44px] lg:text-[52px] tracking-wide leading-none mb-2">Synergy 블레이드</h2>
          <p className="text-[14px] text-[rgba(200,220,255,.76)] font-light mb-10 max-w-xl">
            소프트웨어 정의 컴포저블 인프라. HPE OneView 단일 인터페이스로 컴퓨트·스토리지·패브릭을 즉시 구성·재배포.
          </p>

          {/* Synergy 개요 배너 */}
          <div className="mb-[2px] p-6 bg-[#0a1628] border border-[rgba(0,201,177,.3)] rounded-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#00C9B1,#38D9F5)' }} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="font-mono text-[9px] tracking-[.2em] text-[#00C9B1] mb-2">SYNERGY 12000 FRAME</div>
                <div className="font-['Bebas_Neue'] text-[22px] tracking-wide mb-2">컴포저블 인프라 플랫폼</div>
                <p className="text-[12px] text-[#5a7a9a] font-light leading-[1.8]">
                  단일 프레임에 최대 12개 하프-하이트 블레이드 수용. HPE Composer가 모든 리소스를 자동 탐색·풀링. 최대 21개 프레임 연결로 대규모 확장 가능.
                </p>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-[2px]">
                {[['12', '블레이드/프레임 (최대)'], ['21', '프레임 연결 (최대)'], ['API', 'RESTful 완전 지원'], ['OneView', '단일 관리 인터페이스']].map(([n, l]) => (
                  <div key={l} className="bg-[#0e1e35] border border-[rgba(31,74,117,.5)] p-3 text-center">
                    <div className="font-['Bebas_Neue'] text-[20px] text-[#00C9B1] leading-none">{n}</div>
                    <div className="text-[10px] text-[#5a7a9a] mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {SYNERGY.map((s) => (
              <div key={s.name} className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm overflow-hidden transition-colors hover:border-[rgba(0,201,177,.3)]">
                <div className="p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,${s.color},transparent)` }} />
                  <div className="font-mono text-[8px] tracking-[.2em] mb-2" style={{ color: s.color }}>{s.tier}</div>
                  <div className="font-['Bebas_Neue'] text-[28px] leading-none mb-1" style={{ color: s.color }}>{s.name}</div>
                  <div className="font-mono text-[9px] tracking-[.1em] text-[#5a7a9a] mb-4">{s.sub}</div>
                  <p className="text-[13px] text-[rgba(200,220,255,.76)] font-light leading-[1.75]">{s.desc}</p>
                </div>
                <div className="px-6 py-4 bg-[#0e1e35] border-t border-[rgba(31,74,117,.5)]">
                  {s.specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-1.5 border-b border-[rgba(31,74,117,.3)] last:border-b-0 text-[11.5px]">
                      <span className="font-mono text-[9px] tracking-[.1em] text-[#5a7a9a]">{k}</span>
                      <span className="text-[rgba(200,220,255,.76)] text-right">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-3 border-t border-[rgba(31,74,117,.5)] flex flex-wrap gap-1">
                  {s.useCases.map((u) => (
                    <span key={u} className="font-mono text-[8.5px] tracking-[.1em] px-2 py-1 rounded-sm"
                      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>{u}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 주요 특징 ── */}
      <section className="px-4 md:px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#00A3E0' }}>기술 특징</div>
          <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[44px] lg:text-[52px] tracking-wide leading-none mb-10">HPE Gen11<br />핵심 기술</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-4 p-5 bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm items-start transition-colors hover:border-[rgba(0,163,224,.25)]">
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <div className="font-['Bebas_Neue'] text-[17px] tracking-wide mb-1">{f.title}</div>
                  <div className="text-[12px] text-[#5a7a9a] font-light leading-[1.75]">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY VWORKS ── */}
      <section className="px-4 md:px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#00A3E0' }}>왜 VWorks인가</div>
          <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[44px] lg:text-[52px] tracking-wide leading-none mb-10">HPE 서버 도입,<br />VWorks를 선택해야 하는 이유</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px]">
            {[
              { n: '01', t: 'HPE 공식 파트너', d: '하드웨어 공급부터 설치·운영까지 원스톱. HPE 공식 채널을 통한 정품 보증 및 기술지원.' },
              { n: '02', t: '국방·공공 HPC 레퍼런스', d: '해군 해양수치모델 HPC 구축 2건. 국방·공공기관 보안 요건에 맞는 서버 도입 전문.' },
              { n: '03', t: '조달 등록 업체', d: '방위사업청 등록업체. 국방·공공 사업의 보안심사, 적합성 검증, 조달 절차 전 과정 지원.' },
              { n: '04', t: '풀스택 인프라 구축', d: '서버·스토리지·네트워크·SW 스택·망분리 보안까지. 전체 IT 인프라 설계·구축·유지보수.' },
            ].map((w) => (
              <div key={w.n} className="p-6 bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm relative overflow-hidden transition-colors hover:border-[rgba(0,163,224,.3)]">
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#00A3E0,transparent)' }} />
                <div className="font-['Bebas_Neue'] text-[44px] leading-none mb-2" style={{ color: 'rgba(0,163,224,.12)' }}>{w.n}</div>
                <div className="font-['Bebas_Neue'] text-[18px] tracking-wide leading-tight mb-2">{w.t}</div>
                <div className="text-[12px] text-[#5a7a9a] font-light leading-[1.8]">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 md:px-10 py-20 text-center reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-4" style={{ color: '#00A3E0' }}>HPE 서버 도입 문의</div>
          <h2 className="font-['Bebas_Neue'] text-[40px] md:text-[52px] lg:text-[64px] tracking-wide leading-none mb-4">최적의 서버 구성을<br />제안해 드립니다</h2>
          <p className="text-[15px] text-[#5a7a9a] font-light leading-[1.7] mb-8">
            워크로드 유형, 규모, 예산을 공유해 주시면 ProLiant 또는 Synergy 최적 구성을 제안드립니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] max-w-sm mx-auto mb-8">
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] p-4">
              <div className="font-mono text-[8.5px] tracking-[.15em] mb-1" style={{ color: '#00A3E0' }}>PHONE</div>
              <div className="text-[13px] text-[rgba(200,220,255,.76)] font-light">051-747-6428</div>
            </div>
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] p-4">
              <div className="font-mono text-[8.5px] tracking-[.15em] mb-1" style={{ color: '#00A3E0' }}>EMAIL</div>
              <div className="text-[13px] text-[rgba(200,220,255,.76)] font-light">aiden@vworks.tech</div>
            </div>
          </div>
          <Link href="/ko/contact/?from=HPE 서버"
            className="inline-flex items-center text-[#050d1a] text-[16px] font-medium px-12 py-4 rounded-sm"
            style={{ background: 'linear-gradient(135deg,#00A3E0,#00C9B1)' }}>
            HPE 서버 도입 문의하기 →
          </Link>
          <div className="mt-4 font-mono text-[10px] tracking-[.12em] text-[#5a7a9a]">문의 접수 후 1~2 영업일 내 전문 엔지니어가 연락드립니다</div>
        </div>
      </section>

    </main>
  );
}
