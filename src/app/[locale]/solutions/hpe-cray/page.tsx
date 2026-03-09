'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const SYSTEMS = [
  {
    tier: 'EXASCALE · FLAGSHIP', name: 'Cray EX4000', sub: 'LIQUID COOLED CABINET · EXASCALE',
    color: '#01A982', bg: 'rgba(1,169,130,.07)', border: 'rgba(1,169,130,.25)',
    desc: '세계 최초 엑사스케일 슈퍼컴퓨터 "El Capitan", "Frontier" 구축에 사용된 플래그십 플랫폼. 밀폐형 액체냉각 캐비넷으로 최고 밀도와 성능을 제공합니다.',
    specs: [
      ['COOLING', 'Direct Liquid (폐쇄순환)'],
      ['DENSITY', '최대 512 프로세서/캐비넷'],
      ['TDP', '프로세서 최대 500W 지원'],
      ['NETWORK', 'HPE Slingshot 200Gb/s'],
      ['CPU/GPU', 'AMD Epyc / Instinct MI300A'],
      ['OS', 'HPE Cray OS (Rocky Linux 기반)'],
    ],
    useCases: ['기상/해양 예측', '핵 시뮬레이션', 'AI 훈련', '국방 HPC'],
  },
  {
    tier: 'ENTERPRISE · HPC', name: 'Cray EX2500', sub: 'COMPACT LIQUID COOLED · ENTERPRISE',
    color: '#00C9B1', bg: 'rgba(0,201,177,.07)', border: 'rgba(0,201,177,.2)',
    desc: 'EX4000과 동일한 블레이드·스위치를 사용하면서 24% 소형화. CDU(냉각분배장치)가 캐비넷에 통합되어 별도 공간 불필요. 예산 제약 환경에 최적.',
    specs: [
      ['COOLING', 'Integrated CDU (일체형)'],
      ['SIZE', 'EX4000 대비 24% 소형'],
      ['BLADE', 'EX4000 동일 블레이드'],
      ['NETWORK', 'HPE Slingshot 200Gb/s'],
      ['CPU/GPU', 'AMD Epyc / Intel Xeon'],
      ['DEPLOY', '구매 또는 GreenLake (소비형)'],
    ],
    useCases: ['연구기관', '대학 HPC', '금융 분석', '엔터프라이즈 AI'],
  },
  {
    tier: 'AIR COOLED · STANDARD RACK', name: 'Cray XD', sub: '19-INCH RACK · AIR COOLED',
    color: '#38D9F5', bg: 'rgba(56,217,245,.07)', border: 'rgba(56,217,245,.2)',
    desc: '표준 19인치 랙 구성의 에어쿨드 HPC 시스템. HPE Cray 소프트웨어 스택과 Slingshot 네트워크를 그대로 적용하면서 기존 데이터센터 인프라 활용 가능.',
    specs: [
      ['COOLING', 'Air Cooled (표준)'],
      ['FORM', '표준 19인치 랙'],
      ['NETWORK', 'Slingshot ToR 스위치 (2U)'],
      ['CPU', 'AMD Epyc 7003/9004'],
      ['GPU', 'NVIDIA H100 / AMD MI300X'],
      ['SOFTWARE', 'HPE Cray PE 풀 지원'],
    ],
    useCases: ['기존 DC 활용', '중소 HPC', 'ML/AI 클러스터'],
  },
];

const SLINGSHOT = [
  { n: '200', unit: 'Gb/s', label: '포트당 양방향 대역폭', desc: 'Dual port 200Gb/s Slingshot Mezzanine Adapter.' },
  { n: '12.8', unit: 'Tb/s', label: '64포트 스위치 총 대역폭', desc: 'High-radix 64포트 스위치. Dragonfly 토폴로지로 3홉 내 전체 시스템 연결.' },
  { n: '3', unit: 'hop', label: '최대 hop 수 (전 시스템)', desc: '수십만 노드 규모에서도 어떤 엔드포인트든 3홉 이하로 도달.' },
  { n: '100/200', unit: 'GbE', label: 'Ethernet 엣지 포트', desc: '표준 Ethernet 기반이라 RoCE 프로토콜로 기존 서버·스토리지와 직접 연결 가능.' },
  { icon: '🧭', label: 'Adaptive Routing', desc: '실시간 전역 부하 정보 기반 동적 패킷 경로 결정. 혼잡 제어 내장.' },
  { icon: '⚙️', label: 'HW MPI Offload', desc: '메시지 처리 하드웨어 오프로드. CPU/GPU 활용률 극대화.' },
];

const STACK = [
  { name: 'HPE CRAY PROGRAMMING ENVIRONMENT', note: 'MPI·OpenSHMEM·Chapel', color: '#a78bfa', bg: 'rgba(167,139,250,.06)', border: 'rgba(167,139,250,.2)' },
  { name: 'HPE CRAY SYSTEM MANAGEMENT', note: '모니터링·배치·컨테이너', color: '#00C9B1', bg: 'rgba(0,201,177,.06)', border: 'rgba(0,201,177,.2)' },
  { name: 'HPE CRAY OPERATING SYSTEM', note: 'Rocky Linux 기반 HPC 최적화', color: '#01A982', bg: 'rgba(1,169,130,.06)', border: 'rgba(1,169,130,.2)' },
  { name: 'HPE SLINGSHOT FABRIC (200Gb/s)', note: 'Dragonfly Topology · 3-hop', color: '#38D9F5', bg: 'rgba(56,217,245,.06)', border: 'rgba(56,217,245,.2)' },
  { name: 'COMPUTE BLADES (CPU / GPU)', note: 'AMD · Intel · NVIDIA', color: '#fbbf24', bg: 'rgba(251,191,36,.06)', border: 'rgba(251,191,36,.2)' },
  { name: 'CLUSTERSTOR E1000 (Lustre)', note: '병렬 스토리지 · 수 TB/s', color: '#a78bfa', bg: 'rgba(167,139,250,.06)', border: 'rgba(167,139,250,.2)' },
];

export default function HpeCrayPage() {
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

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(5,13,26,.92)] backdrop-blur-md border-b border-[rgba(31,74,117,.5)] px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[#5a7a9a]">
            <span className="opacity-40">›</span>
            <span className="opacity-40">›</span>
            <span style={{ color: '#01A982' }}>HPE Cray 슈퍼컴퓨팅</span>
          </div>
        </div>
        <Link href="/contact"
          className="text-[#050d1a] text-[13px] font-medium px-5 py-2 rounded-sm"
          style={{ background: 'linear-gradient(135deg,#01A982,#00C9B1)' }}>
          도입 상담 신청
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 px-10 border-b border-[rgba(31,74,117,.5)] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 80% at 20% 50%,rgba(1,169,130,.06) 0%,transparent 60%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm" style={{ color: '#01A982', background: 'rgba(1,169,130,.07)', border: '1px solid rgba(1,169,130,.3)' }}>HPE 공식 파트너</span>
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm text-[#00C9B1] bg-[rgba(0,201,177,.08)] border border-[rgba(0,201,177,.2)]">TOP500 #1~#3 플랫폼</span>
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm text-[#fbbf24] bg-[rgba(251,191,36,.07)] border border-[rgba(251,191,36,.25)]">El Capitan · Frontier 기반</span>
            </div>
            <h1 className="font-['Bebas_Neue'] text-[72px] leading-[.92] tracking-wide mb-5">
              <span style={{ background: 'linear-gradient(135deg,#01A982,#00C9B1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HPE Cray</span>
              <br />
              <span className="text-[44px] text-[rgba(200,220,255,.76)] font-['Noto_Sans_KR'] font-light tracking-normal">슈퍼컴퓨팅 시스템</span>
            </h1>
            <p className="text-[15px] text-[rgba(200,220,255,.76)] font-light leading-[1.85] mb-8 max-w-xl">
              세계 No.1 슈퍼컴퓨터 플랫폼. TOP500 상위 10개 중 7개가 HPE Cray EX 기반. 엑사스케일 성능의 HPC 인프라를 국방·연구·기상·AI 분야에 구축합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="text-[#050d1a] text-[14px] font-medium px-7 py-3 rounded-sm" style={{ background: 'linear-gradient(135deg,#01A982,#00C9B1)' }}>도입 상담 신청 →</Link>
              <a href="#systems" className="border text-[14px] px-7 py-3 rounded-sm" style={{ borderColor: 'rgba(1,169,130,.3)', color: '#01A982' }}>시스템 라인업</a>
              <a href="#architecture" className="border text-[14px] px-7 py-3 rounded-sm border-[rgba(0,201,177,.2)] text-[#00C9B1]">아키텍처 보기</a>
            </div>
          </div>
          {/* STATS */}
          <div className="bg-[#0a1628] rounded-sm p-6 relative overflow-hidden" style={{ border: '1px solid rgba(1,169,130,.3)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#01A982,#00C9B1)' }} />
            <div className="font-mono text-[9px] tracking-[.2em] mb-4" style={{ color: '#01A982' }}>HPE Cray 글로벌 현황 (2025)</div>
            <div className="grid grid-cols-2 gap-[2px]">
              {[
                { n: 'TOP\n1·2·3', l: 'TOP500 세계 순위', s: '2025년 6월 기준' },
                { n: '7/10', l: 'TOP10 중 Cray EX', s: 'Nov 2024 TOP500' },
                { n: '2.79', l: 'El Capitan 엑사플롭스', s: '세계 #1 (LLNL)' },
                { n: '550', l: 'LUMI 페타플롭스', s: '유럽 #1 (핀란드)' },
              ].map((s) => (
                <div key={s.l} className="bg-[#0e1e35] border border-[rgba(31,74,117,.5)] p-3 text-center">
                  <div className="font-['Bebas_Neue'] text-[22px] leading-tight whitespace-pre-line" style={{ color: '#01A982' }}>{s.n}</div>
                  <div className="text-[11px] text-[rgba(200,220,255,.76)] my-1 leading-[1.3]">{s.l}</div>
                  <div className="font-mono text-[8px] text-[#5a7a9a]">{s.s}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[rgba(31,74,117,.5)]">
              <div className="font-mono text-[8.5px] text-[#5a7a9a] tracking-[.12em] mb-2">VWorks 공급 시스템</div>
              <div className="flex flex-wrap gap-1">
                {['Cray EX2500', 'Cray EX4000', 'Cray XD', 'ClusterStor E1000'].map((t) => (
                  <span key={t} className="font-mono text-[9px] px-2 py-1 rounded-sm" style={{ color: '#01A982', background: 'rgba(1,169,130,.07)', border: '1px solid rgba(1,169,130,.2)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP500 배너 ── */}
      <section className="px-10 py-12 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-8 p-7 rounded-sm" style={{ background: 'linear-gradient(135deg,rgba(1,169,130,.08),rgba(0,201,177,.05))', border: '1px solid rgba(1,169,130,.3)' }}>
            <div>
              <div className="font-['Bebas_Neue'] text-[52px] leading-none" style={{ color: '#01A982' }}>El Capitan</div>
              <div className="font-mono text-[9px] tracking-[.15em] mt-1" style={{ color: '#01A982' }}>세계 #1 슈퍼컴퓨터 · Lawrence Livermore National Laboratory</div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-[14px] text-[rgba(200,220,255,.76)] font-light leading-[1.7]">HPE Cray EX4000 기반, AMD Instinct MI300A APU 탑재.<br />2.79 엑사플롭스(ExaFLOPS) · 세계 최초 Exascale · TOP500 #1 (Nov 2024)</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[['#1 El Capitan (USA)', '#01A982', 'rgba(1,169,130,.1)', 'rgba(1,169,130,.3)'], ['#2 Frontier (USA)', '#38D9F5', 'rgba(56,217,245,.07)', 'rgba(56,217,245,.2)'], ['#3 LUMI (EU)', '#00C9B1', 'rgba(0,201,177,.08)', 'rgba(0,201,177,.2)']].map(([t, c, bg, b]) => (
                <span key={t} className="font-mono text-[9px] px-3 py-1 rounded-sm whitespace-nowrap"
                  style={{ color: c, background: bg, border: `1px solid ${b}` }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 시스템 라인업 ── */}
      <section id="systems" className="px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#01A982' }}>시스템 라인업</div>
          <h2 className="font-['Bebas_Neue'] text-[52px] tracking-wide leading-none mb-10">규모와 목적에 따른<br />최적 시스템 선택</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]">
            {SYSTEMS.map((s) => (
              <div key={s.name} className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm overflow-hidden transition-colors hover:border-[rgba(1,169,130,.3)]">
                <div className="p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,${s.color},transparent)` }} />
                  <div className="font-mono text-[8px] tracking-[.2em] mb-2" style={{ color: s.color }}>{s.tier}</div>
                  <div className="font-['Bebas_Neue'] text-[34px] leading-none mb-1" style={{ color: s.color }}>{s.name}</div>
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

          {/* ClusterStor */}
          <div className="mt-[2px] p-7 bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm flex flex-col lg:flex-row gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#a78bfa,#01A982)' }} />
            <div className="flex-1">
              <div className="font-mono text-[9px] tracking-[.2em] text-[#a78bfa] mb-1">PARALLEL STORAGE · ADD-ON</div>
              <div className="font-['Bebas_Neue'] text-[28px] tracking-wide text-[#a78bfa] mb-3">ClusterStor E1000</div>
              <p className="text-[13px] text-[rgba(200,220,255,.76)] font-light leading-[1.8]">
                HPC 슈퍼컴퓨터의 초고속 I/O 요구사항에 특화된 병렬 스토리지 시스템. 동일한 성능을 대안 제품 대비 현저히 적은 드라이브 수로 달성. Lustre 파일시스템 기반, HPE Cray 시스템과 완벽 통합.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] min-w-[300px]">
              {[['Lustre', '파일시스템'], ['수 TB/s', '집계 대역폭'], ['AI-Tier', '인텔리전트 계층'], ['NVMe', '고속 플래시 지원']].map(([n, l]) => (
                <div key={l} className="bg-[#0e1e35] border border-[rgba(31,74,117,.5)] p-3 text-center">
                  <div className="font-['Bebas_Neue'] text-[20px] text-[#a78bfa] leading-none">{n}</div>
                  <div className="text-[10px] text-[#5a7a9a] mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 아키텍처 ── */}
      <section id="architecture" className="px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500" style={{ background: 'linear-gradient(180deg,transparent,rgba(1,169,130,.03),transparent)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#01A982' }}>기술 아키텍처</div>
          <h2 className="font-['Bebas_Neue'] text-[52px] tracking-wide leading-none mb-10">엔드투엔드<br />슈퍼컴퓨팅 스택</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
            {/* 레이어 다이어그램 */}
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#01A982,#00C9B1)' }} />
              <div className="font-mono text-[9px] tracking-[.2em] mb-5" style={{ color: '#01A982' }}>HPE CRAY 소프트웨어 스택</div>
              {STACK.map((l, i) => (
                <div key={l.name}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-sm border" style={{ background: l.bg, borderColor: l.border }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                    <div className="font-mono text-[9px] tracking-[.1em] flex-1" style={{ color: l.color }}>{l.name}</div>
                    <div className="text-[10px] text-[#5a7a9a] text-right">{l.note}</div>
                  </div>
                  {i < STACK.length - 1 && <div className="text-center text-[#01A982] opacity-40 my-1">↓</div>}
                </div>
              ))}
            </div>
            {/* 특징 */}
            <div className="flex flex-col gap-3">
              {[
                { icon: '🌊', title: 'Dragonfly 토폴로지', desc: '수십만 노드 규모에서도 최대 3홉으로 모든 엔드포인트 연결. 구리 케이블과 광케이블의 최적 조합으로 비용 효율 극대화.' },
                { icon: '❄️', title: 'Direct Liquid Cooling', desc: '밀폐형 폐쇄순환 냉각. 500W 이상 고발열 프로세서를 공기냉각 대비 수 배 높은 밀도로 수용. 데이터센터 냉방 부하 획기적 절감.' },
                { icon: '🔄', title: 'Forward Compatibility', desc: '차세대 블레이드·스위치와 하위 호환 설계. 인프라를 새 프로세서 세대로 업그레이드 시 캐비넷·네트워크 재사용 가능.' },
                { icon: '🤖', title: 'HPC+AI 융합 워크로드', desc: '시뮬레이션·모델링·HPDA·AI 추론을 단일 플랫폼에서 혼용 실행. HPE Cray PE는 MPI·OpenMP·Python·PyTorch 동시 지원.' },
                { icon: '☁️', title: 'GreenLake 소비형 모델', desc: '구매 외에 GreenLake를 통한 사용량 기반 종량제 공급 가능. 초기 CAPEX 절감, 워크로드 증가에 따른 탄력적 확장.' },
              ].map((f) => (
                <div key={f.title} className="flex gap-4 p-4 bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm items-start transition-colors hover:border-[rgba(1,169,130,.25)]">
                  <span className="text-xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <div className="font-['Bebas_Neue'] text-[17px] tracking-wide mb-1">{f.title}</div>
                    <div className="text-[12px] text-[#5a7a9a] font-light leading-[1.75]">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Slingshot ── */}
      <section className="px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] text-[#38D9F5] mb-3">HPE Slingshot 인터커넥트</div>
          <h2 className="font-['Bebas_Neue'] text-[52px] tracking-wide leading-none mb-4">슈퍼컴퓨터급<br />네트워크 패브릭</h2>
          <p className="text-[14px] text-[rgba(200,220,255,.76)] font-light leading-[1.9] max-w-xl mb-10">
            HPE 전용 실리콘 기반 Slingshot NIC·스위치. 표준 Ethernet 기반이라 기존 데이터센터와 직접 연결 가능한 유일한 HPC 인터커넥트.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-[2px]">
            {SLINGSHOT.map((s) => (
              <div key={s.label} className="p-5 bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#38D9F5] to-transparent" />
                {s.n ? (
                  <div className="font-['Bebas_Neue'] text-[34px] text-[#38D9F5] leading-none mb-1">
                    {s.n}<span className="text-[18px]">{s.unit}</span>
                  </div>
                ) : (
                  <div className="text-2xl mb-2">{s.icon}</div>
                )}
                <div className="font-mono text-[9px] tracking-[.15em] text-[#5a7a9a] mb-2">{s.label}</div>
                <div className="text-[12px] text-[rgba(200,220,255,.76)] font-light leading-[1.7]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 적용 분야 + 레퍼런스 ── */}
      <section className="px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#01A982' }}>적용 분야</div>
          <h2 className="font-['Bebas_Neue'] text-[52px] tracking-wide leading-none mb-10">국방·연구·기상·AI<br />모든 고성능 워크로드</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] mb-6">
            {[
              { icon: '🛡️', title: '국방·안보 HPC', desc: '핵 시뮬레이션, 탄도 분석, 전자전, 암호해독, 군사 작전 시뮬레이션. El Capitan이 NNSA 핵무기 분석에 사용 중.' },
              { icon: '🌊', title: '기상·해양·기후', desc: '수치기상예보(NWP), 해양수치모델, 기후변화 시뮬레이션. VWorks 해군 해양수치모델 HPC 구축 레퍼런스 보유.' },
              { icon: '🤖', title: 'AI / LLM 훈련', desc: '대규모 언어모델(LLM) 훈련, 다중모달 AI, 과학적 AI 연구. GPU 클러스터를 Slingshot으로 초저지연 연결.' },
              { icon: '🔬', title: '과학·공학 R&D', desc: '유전체 분석, 신약개발, 재료과학, 유체역학(CFD), 구조해석. 대학·국책연구소 HPC 표준 플랫폼.' },
            ].map((u) => (
              <div key={u.title} className="p-5 bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm relative overflow-hidden transition-colors hover:border-[rgba(1,169,130,.3)]">
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#01A982,transparent)' }} />
                <div className="text-2xl mb-3">{u.icon}</div>
                <div className="font-['Bebas_Neue'] text-[18px] tracking-wide mb-2" style={{ color: '#01A982' }}>{u.title}</div>
                <div className="text-[12px] text-[#5a7a9a] font-light leading-[1.75]">{u.desc}</div>
              </div>
            ))}
          </div>

          {/* 레퍼런스 배너 */}
          <div className="flex flex-col lg:flex-row gap-5 items-start p-7 rounded-sm" style={{ background: 'rgba(1,169,130,.05)', border: '1px solid rgba(1,169,130,.3)' }}>
            <div className="text-3xl">⚓</div>
            <div className="flex-1">
              <div className="font-mono text-[9px] tracking-[.2em] mb-2" style={{ color: '#01A982' }}>VWORKS 구축 레퍼런스</div>
              <div className="font-['Bebas_Neue'] text-[22px] tracking-wide mb-2">대한민국 해군 — 해양수치모델 HPC 클러스터 구축</div>
              <div className="text-[13px] text-[rgba(200,220,255,.76)] font-light leading-[1.7]">
                해양수치모델 연산을 위한 HPC 클러스터 시스템 구축. 고성능 컴퓨팅 환경 기반 해양예보 정확도 향상. NAIMS-II HPC 클러스터 구축도 완료.
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {['해군 레퍼런스 #1', '해군 레퍼런스 #2 NAIMS-II'].map((t) => (
                <span key={t} className="font-mono text-[9px] px-3 py-1 rounded-sm whitespace-nowrap"
                  style={{ color: '#01A982', background: 'rgba(1,169,130,.07)', border: '1px solid rgba(1,169,130,.2)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY VWORKS ── */}
      <section className="px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#01A982' }}>왜 VWorks인가</div>
          <h2 className="font-['Bebas_Neue'] text-[52px] tracking-wide leading-none mb-10">HPE Cray 시스템,<br />VWorks를 선택해야 하는 이유</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px]">
            {[
              { n: '01', t: '해군 HPC 구축 2건', d: '해양수치모델 HPC + NAIMS-II HPC. 국방·안보 등급 HPC 구축 전문 엔지니어 보유.' },
              { n: '02', t: 'HPE 공식 파트너', d: '하드웨어 공급부터 소프트웨어 스택 설치·운영까지 원스톱 서비스.' },
              { n: '03', t: '조달 등록 / 보안심사', d: '방위사업청 등록업체. 국방·공공 HPC 사업의 보안심사, 적합성 검증 전문.' },
              { n: '04', t: '풀스택 HPC 구축', d: '컴퓨트·스토리지·네트워크·SW 스택·망분리 보안까지 전체 HPC 인프라 설계·구축.' },
            ].map((w) => (
              <div key={w.n} className="p-6 bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm relative overflow-hidden transition-colors hover:border-[rgba(1,169,130,.3)]">
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#01A982,transparent)' }} />
                <div className="font-['Bebas_Neue'] text-[44px] leading-none mb-2" style={{ color: 'rgba(1,169,130,.12)' }}>{w.n}</div>
                <div className="font-['Bebas_Neue'] text-[18px] tracking-wide leading-tight mb-2">{w.t}</div>
                <div className="text-[12px] text-[#5a7a9a] font-light leading-[1.8]">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-10 py-20 text-center reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-4" style={{ color: '#01A982' }}>HPE Cray 시스템 도입 문의</div>
          <h2 className="font-['Bebas_Neue'] text-[64px] tracking-wide leading-none mb-4">지금 바로<br />성능 분석을 시작하세요</h2>
          <p className="text-[15px] text-[#5a7a9a] font-light leading-[1.7] mb-8">
            워크로드 유형, 노드 규모, 예산, 냉각·전력 환경을 공유해 주시면 최적의 Cray 시스템 구성을 제안드립니다.
          </p>
          <div className="grid grid-cols-2 gap-[2px] max-w-sm mx-auto mb-8">
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] p-4">
              <div className="font-mono text-[8.5px] tracking-[.15em] mb-1" style={{ color: '#01A982' }}>PHONE</div>
              <div className="text-[13px] text-[rgba(200,220,255,.76)] font-light">051-747-6428</div>
            </div>
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] p-4">
              <div className="font-mono text-[8.5px] tracking-[.15em] mb-1" style={{ color: '#01A982' }}>EMAIL</div>
              <div className="text-[13px] text-[rgba(200,220,255,.76)] font-light">aiden@vworks.tech</div>
            </div>
          </div>
          <Link href="/contact"
            className="inline-flex items-center text-[#050d1a] text-[16px] font-medium px-12 py-4 rounded-sm"
            style={{ background: 'linear-gradient(135deg,#01A982,#00C9B1)' }}>
            HPE Cray 시스템 문의하기 →
          </Link>
          <div className="mt-4 font-mono text-[10px] tracking-[.12em] text-[#5a7a9a]">문의 접수 후 1~2 영업일 내 전문 HPC 엔지니어가 연락드립니다</div>
        </div>
      </section>

    </main>
  );
}
