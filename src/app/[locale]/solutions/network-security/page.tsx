'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ══════════════════════════════════
   타입 정의
══════════════════════════════════ */
type ProductKey = 0 | 1 | 2 | 3;

const PRODUCTS: Record<ProductKey, {
  tier: string; name: string; sub: string; desc: string;
  color: string; bg: string; border: string;
  features: string[]; useCases: string[]; ref: string;
}> = {
  0: {
    tier: 'FLAGSHIP', name: 'i-oneNet', sub: '양방향 망연계 솔루션',
    color: '#00C9B1', bg: 'rgba(0,201,177,.07)', border: 'rgba(0,201,177,.2)',
    desc: '국내 망연계 시장 10년 연속 1위 대표 제품. 물리적으로 분리된 업무망과 인터넷망 사이에서 안전한 양방향 데이터 전송을 제공합니다. 제로트러스트 인증 기술과 CSAP SaaS 표준등급 보안인증을 획득한 검증된 솔루션입니다.',
    features: [
      '업무망 ↔ 인터넷망 양방향 실시간 데이터 연계',
      '제로트러스트(Zero Trust) 사용자·단말 인증 체계 내장',
      'CSAP SaaS 표준등급 클라우드 보안인증 획득',
      'AWS·Azure·네이버클라우드 등 주요 클라우드 환경 지원',
      '보안기능 확인서 획득 (국가용 보안요구사항 V3.0 만족)',
      '新국가망보안체계(N²SF) C/S/O 등급 다중망 연계 지원',
    ],
    useCases: ['공공기관', '지자체', '금융기관', '대기업'],
    ref: '한국수력원자력(KHNP) 망연계 솔루션 통합 유지보수',
  },
  1: {
    tier: 'MANAGEMENT', name: 'i-oneNet UC', sub: '망연계 통합관리 솔루션',
    color: '#38D9F5', bg: 'rgba(56,217,245,.07)', border: 'rgba(56,217,245,.2)',
    desc: '분산된 망연계 시스템을 하나의 콘솔에서 통합 관리하는 솔루션. 다수의 망연계 장비를 중앙집중식으로 모니터링하고 정책을 일괄 배포·관리합니다.',
    features: [
      '다수 망연계 장비 중앙 통합관리 및 모니터링',
      '정책 일괄 배포 및 변경이력 관리',
      '실시간 트래픽 모니터링 및 이상 탐지',
      '사용자·그룹별 접근 권한 세분화 관리',
      '장애 발생 시 즉시 알림 및 자동 리포트 생성',
      '감사로그 통합 수집 및 장기 보관',
    ],
    useCases: ['대규모 공공기관', '통합관제센터', '망연계 다수 운영 기관'],
    ref: '한국수력원자력(KHNP) 망연계 솔루션 통합 유지보수',
  },
  2: {
    tier: 'OT SECURITY', name: 'i-oneNet DD', sub: '일방향 망연계 솔루션 (OT 특화)',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.2)',
    desc: '제어망(OT) 보안을 위한 물리적 일방향 통신 기반 망연계 솔루션. 중요 제어망에서 외부망으로 데이터가 단방향으로만 흐르도록 보장해 외부 침투 경로를 원천 차단합니다.',
    features: [
      '물리적 일방향(Unidirectional) 통신으로 역방향 침입 원천 차단',
      '발전소·수처리·교통 등 주요정보통신기반시설 최적화',
      'OT/ICS(산업제어시스템) 보안 전문 설계',
      '중요망→업무망 데이터 전송 시 무결성 보장',
      'IT/OT 융합 환경 데이터 수집·전송 자동화',
    ],
    useCases: ['발전소·에너지', '수처리 시설', '교통 제어', '스마트시티'],
    ref: '한국수력원자력(KHNP) 망연계 솔루션 통합 유지보수',
  },
  3: {
    tier: 'OT SECURITY', name: 'i-oneNet DX', sub: '양일방향 망연계 솔루션 (OT 특화)',
    color: '#a78bfa', bg: 'rgba(167,139,250,.07)', border: 'rgba(167,139,250,.2)',
    desc: '제어망 환경에서 업무망과 제어망 간 양일방향 데이터 연계가 필요한 경우를 위한 OT 보안 특화 솔루션. 일방향의 강력한 보안성을 유지하면서 필요한 범위의 양방향 연계를 지원합니다.',
    features: [
      'OT 환경 맞춤형 양일방향 보안 데이터 전송',
      '제어망 완전 격리 상태에서 필요 데이터만 선택 연계',
      'IoT·센서 데이터 실시간 수집 및 업무망 전달',
      '클라우드·AI 활용을 위한 OT 데이터 안전 반출',
      'SCADA/DCS 시스템과 연동 최적화',
    ],
    useCases: ['방산·군사시설', '원자력·에너지', '철도·교통', '산업 플랜트'],
    ref: '한국수력원자력(KHNP) 망연계 솔루션 통합 유지보수',
  },
};

/* ══════════════════════════════════
   페이지 컴포넌트
══════════════════════════════════ */
export default function NetworkSecurityPage() {
  const [activeTab, setActiveTab] = useState<ProductKey>(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const prod = PRODUCTS[activeTab];

  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(5,13,26,.92)] backdrop-blur-md border-b border-[rgba(31,74,117,.5)] px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/">
          </Link>
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[#5a7a9a]">
            <span className="opacity-40">›</span>
            <span className="opacity-40">›</span>
            <span className="text-[#00C9B1]">보안 솔루션</span>
          </div>
        </div>
        <Link href="/contact"
          className="bg-gradient-to-r from-[#4ade80] to-[#00C9B1] text-[#050d1a] text-[13px] font-medium px-5 py-2 rounded-sm">
          도입 상담 신청
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 px-10 border-b border-[rgba(31,74,117,.5)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_30%_50%,rgba(0,201,177,.05)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm text-[#4ade80] bg-[rgba(74,222,128,.07)] border border-[rgba(74,222,128,.2)]">● 휴네시온 공식 총판 파트너</span>
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm text-[#00C9B1] bg-[rgba(0,201,177,.08)] border border-[rgba(0,201,177,.2)]">● 씨크랩 공식 총판 파트너</span>
            </div>
            <h1 className="font-['Bebas_Neue'] text-[72px] leading-[.92] tracking-wide mb-5">
              <span className="bg-gradient-to-r from-[#4ade80] to-[#00C9B1] bg-clip-text text-transparent">보안 솔루션</span>
              <br />
              <span className="text-[42px] text-[rgba(200,220,255,.76)] font-['Noto_Sans_KR'] font-light tracking-normal">망연계 · CDS 전문 공급</span>
            </h1>
            <p className="text-[15px] text-[rgba(200,220,255,.76)] font-light leading-[1.85] mb-8 max-w-xl">
              국내 1위 망연계 솔루션 i-oneNet(휴네시온)과 국방 특화 CDS KCDS-Guard(씨크랩)를 공식 총판으로 공급·구축합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="bg-gradient-to-r from-[#4ade80] to-[#00C9B1] text-[#050d1a] text-[14px] font-medium px-7 py-3 rounded-sm">도입 상담 신청 →</Link>
              <a href="#ionenet" className="border border-[rgba(74,222,128,.3)] text-[#4ade80] text-[14px] px-7 py-3 rounded-sm">망연계 솔루션</a>
              <a href="#cds" className="border border-[rgba(251,191,36,.3)] text-[#fbbf24] text-[14px] px-7 py-3 rounded-sm">KCDS-Guard CDS</a>
            </div>
          </div>
          {/* Stats */}
          <div className="bg-[#0a1628] border border-[rgba(74,222,128,.25)] rounded-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4ade80] to-[#00C9B1]" />
            <div className="font-mono text-[9px] tracking-[.2em] text-[#00C9B1] mb-4">VWorks 보안 솔루션 현황</div>
            <div className="grid grid-cols-2 gap-[2px]">
              {[
                { n: '10년', l: '망연계 조달 1위', s: '2015–2024' },
                { n: '50%', l: '국내 망연계 점유율', s: '2024년 기준' },
                { n: '13+', l: 'KCDS 국방 기관', s: '국방부·해군·육군 외' },
                { n: '2건', l: 'VWorks 국방 레퍼런스', s: 'KHNP · 해군 HPC' },
              ].map((s) => (
                <div key={s.n} className="bg-[#0e1e35] border border-[rgba(31,74,117,.5)] p-3 text-center">
                  <div className="font-['Bebas_Neue'] text-[26px] text-[#00C9B1] leading-none">{s.n}</div>
                  <div className="text-[11px] text-[rgba(200,220,255,.76)] my-1">{s.l}</div>
                  <div className="font-mono text-[8px] text-[#5a7a9a]">{s.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 구분선 01 ── */}
      <div id="ionenet" className="max-w-6xl mx-auto px-10 py-12 flex items-center gap-5 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="flex-1 h-px bg-[rgba(31,74,117,.5)]" />
        <span className="font-mono text-[10px] tracking-[.2em] text-[#00C9B1] px-5 py-2 border border-[rgba(0,201,177,.2)] bg-[#0a1628] whitespace-nowrap">
          01 · 휴네시온 i-oneNet 망연계 솔루션
        </span>
        <div className="flex-1 h-px bg-[rgba(31,74,117,.5)]" />
      </div>

      {/* ── 제품 탭 ── */}
      <section className="px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] text-[#00C9B1] mb-3">제품 라인업</div>
          <h2 className="font-['Bebas_Neue'] text-[52px] tracking-wide leading-none mb-3">환경에 따른 최적 제품 선택</h2>
          <p className="text-[14px] text-[#5a7a9a] font-light mb-10">VWorks는 고객 환경 분석 후 최적의 i-oneNet 제품을 선정·구축합니다</p>

          {/* 탭 버튼 */}
          <div className="flex flex-wrap gap-[2px] mb-[2px]">
            {([0, 1, 2, 3] as ProductKey[]).map((i) => {
              const p = PRODUCTS[i];
              const active = activeTab === i;
              return (
                <button key={i} onClick={() => setActiveTab(i)}
                  className="px-5 py-3 text-left rounded-sm transition-all duration-200 flex flex-col gap-1 border"
                  style={{
                    background: active ? p.bg : '#0a1628',
                    borderColor: active ? p.border : 'rgba(31,74,117,.5)',
                    color: active ? p.color : '#5a7a9a',
                  }}>
                  <span className="font-mono text-[7.5px] tracking-[.15em] opacity-70">{p.tier}</span>
                  <span className="font-mono text-[12px] tracking-[.08em]">{p.name}</span>
                </button>
              );
            })}
          </div>

          {/* 탭 콘텐츠 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] bg-[#0a1628] border border-[rgba(31,74,117,.5)]">
            <div className="p-10 border-r border-[rgba(31,74,117,.5)]">
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm"
                style={{ color: prod.color, background: prod.bg, border: `1px solid ${prod.border}` }}>
                {prod.tier}
              </span>
              <div className="font-['Bebas_Neue'] text-[44px] mt-4 mb-1 leading-none" style={{ color: prod.color }}>{prod.name}</div>
              <div className="font-mono text-[10px] tracking-[.12em] text-[#5a7a9a] mb-5">{prod.sub}</div>
              <p className="text-[14px] text-[rgba(200,220,255,.76)] font-light leading-[1.9] mb-6">{prod.desc}</p>
              <div className="font-mono text-[9px] tracking-[.2em] text-[#5a7a9a] mb-3">주요 기능</div>
              <div className="flex flex-col gap-2">
                {prod.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-[13px] text-[rgba(200,220,255,.76)] font-light">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: prod.color }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 flex flex-col gap-5">
              <div>
                <div className="font-mono text-[9px] tracking-[.2em] text-[#5a7a9a] mb-3">적용 환경</div>
                {prod.useCases.map((u) => (
                  <div key={u} className="flex items-center gap-3 text-[13px] text-[rgba(200,220,255,.76)] font-light bg-[#0e1e35] border border-[rgba(31,74,117,.5)] px-4 py-3 mb-[2px]">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: prod.color }} />
                    {u}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-sm" style={{ background: prod.bg, border: `1px solid ${prod.border}` }}>
                <div className="font-mono text-[9px] tracking-[.15em] mb-2" style={{ color: prod.color }}>VWorks 구축 지원</div>
                <p className="text-[12px] text-[rgba(200,220,255,.76)] font-light leading-[1.7] mb-4">
                  환경 분석 → 제품 선정 → 설계 → 구축 → 유지보수까지 전 과정을 VWorks가 책임집니다.
                </p>
                <Link href="/contact"
                  className="flex justify-center py-2.5 rounded-sm text-[13px] font-medium text-[#050d1a]"
                  style={{ background: `linear-gradient(135deg, ${prod.color}, #38D9F5)` }}>
                  {prod.name} 도입 문의 →
                </Link>
              </div>
              <div className="bg-[#0e1e35] border border-[rgba(31,74,117,.5)] p-4 rounded-sm">
                <div className="font-mono text-[8px] tracking-[.15em] text-[#5a7a9a] mb-2">VWorks 구축 레퍼런스</div>
                <div className="text-[12px] text-[rgba(200,220,255,.76)] leading-[1.6]">
                  🏭 {prod.ref}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 구분선 02 ── */}
      <div id="cds" className="max-w-6xl mx-auto px-10 py-12 flex items-center gap-5 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="flex-1 h-px bg-[rgba(31,74,117,.5)]" />
        <span className="font-mono text-[10px] tracking-[.2em] text-[#fbbf24] px-5 py-2 border border-[rgba(251,191,36,.3)] bg-[#0a1628] whitespace-nowrap">
          02 · 씨크랩 KCDS-Guard 1000 — 국방 특화 CDS
        </span>
        <div className="flex-1 h-px bg-[rgba(31,74,117,.5)]" />
      </div>

      {/* ── KCDS-Guard ── */}
      <section className="px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] text-[#fbbf24] mb-3">국방 특화 보안통제장비</div>
          <h2 className="font-['Bebas_Neue'] text-[52px] tracking-wide leading-none mb-4">
            KCDS-Guard 1000<br />
            <span className="text-[32px] text-[rgba(200,220,255,.76)] font-['Noto_Sans_KR'] font-light tracking-normal">Cross Domain Solution</span>
          </h2>
          <p className="text-[15px] text-[rgba(200,220,255,.76)] font-light leading-[1.85] max-w-2xl mb-8">
            보안등급이 상이한 체계 간 간접연동을 위한 국가보안기술연구소 기술이전 암호장비. 국방/공공기관 13개 이상에 구축된 국내 유일의 공인 CDS 솔루션.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { t: '★ 씨크랩 공식 총판', c: '#fbbf24', bg: 'rgba(251,191,36,.07)', b: 'rgba(251,191,36,.25)' },
              { t: '🔐 보안기능확인서 획득', c: '#f87171', bg: 'rgba(248,113,113,.07)', b: 'rgba(248,113,113,.25)' },
              { t: '국가보안기술연구소 기술이전', c: '#00C9B1', bg: 'rgba(0,201,177,.08)', b: 'rgba(0,201,177,.2)' },
              { t: 'KOIST 공인시험성적서', c: '#a78bfa', bg: 'rgba(167,139,250,.07)', b: 'rgba(167,139,250,.25)' },
            ].map((b) => (
              <span key={b.t} className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm"
                style={{ color: b.c, background: b.bg, border: `1px solid ${b.b}` }}>{b.t}</span>
            ))}
          </div>

          {/* 직접연동 vs CDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px] mb-10">
            <div className="p-7 bg-[rgba(248,113,113,.05)] border border-[rgba(248,113,113,.18)] rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#f87171] to-transparent" />
              <div className="font-['Bebas_Neue'] text-[20px] tracking-wide text-[#f87171] mb-2">직접연동 (사용 불가)</div>
              <div className="font-mono text-[9px] tracking-[.1em] text-[#5a7a9a] mb-4">방화벽 · 망연계 스트리밍 · 인피니밴드</div>
              {['악성코드 검증·필터링 미적용으로 악성코드 유입 가능', '직접연계 취약점으로 인한 해킹 위협 내재', '보안등급이 상이한 체계 간 사용 불가', '프로토콜 분석으로 정확한 자료 유출 내역 파악 불가'].map((t) => (
                <div key={t} className="flex gap-3 text-[12px] text-[#5a7a9a] font-light leading-[1.6] mb-2">
                  <span className="text-[#f87171] flex-shrink-0">✕</span>{t}
                </div>
              ))}
            </div>
            <div className="p-7 bg-[rgba(0,201,177,.05)] border border-[rgba(0,201,177,.2)] rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00C9B1] to-transparent" />
              <div className="font-['Bebas_Neue'] text-[20px] tracking-wide text-[#00C9B1] mb-2">CDS 간접연동 (KCDS-Guard)</div>
              <div className="font-mono text-[9px] tracking-[.1em] text-[#5a7a9a] mb-4">국가보안기술연구소 기술이전 · 파일변환 불필요</div>
              {['비밀등급 상이 체계 간 쌍방향 자료유통 보장', 'CDE 레이블링 + 프로토콜 필터링으로 무결성 검증', '실시간 서비스 제공 (파일단위 변환 불필요)', '방첩대·국보연 공식 인정 · 보안적합성 검증 통과'].map((t) => (
                <div key={t} className="flex gap-3 text-[12px] text-[rgba(200,220,255,.76)] font-light leading-[1.6] mb-2">
                  <span className="text-[#00C9B1] flex-shrink-0">✓</span>{t}
                </div>
              ))}
            </div>
          </div>

          {/* 6대 핵심 기능 */}
          <div className="font-mono text-[9px] tracking-[.2em] text-[#00C9B1] mb-4">KCDS-Guard 1000 핵심 기능</div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-[2px] mb-10">
            {[
              { icon: '🔐', title: '전용 보안통제 모듈', desc: '국가보안기술연구소 이전 통제모듈 CHIP 탑재. 전용 H/W 기반 암호키 생성·관리.' },
              { icon: '🔑', title: 'SUD 키 관리', desc: 'Secure USB Device를 통한 키 발급. 전용 API를 통해서만 접근 가능하여 키 탈취 원천 차단.' },
              { icon: '📡', title: '전용 프로토콜 (H/W)', desc: '국가보안연구소 검증 전용 프로토콜 적용. CDE 레이블링 보안통제 규격으로 무결성 검증.' },
              { icon: '🦠', title: '백신 악성코드 검사', desc: '망간 데이터 전송 전 메모리 방식 백신 정밀검사 수행. 검출 내용 로그 리포트 제공.' },
              { icon: '🔍', title: '체계연동 통제 모듈', desc: 'RAWS·HTTP(S)·DB·파일·CCTV·화상회의·VOIP 프로토콜별 분석. SGX 기반 위변조 차단.' },
              { icon: '🛡️', title: '암호장비 보안기능', desc: '키 소거 버튼 탑재. H/W 탬퍼 기능으로 서버 분해 시 중요정보 자동 삭제.' },
            ].map((f) => (
              <div key={f.title} className="p-5 bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#fbbf24] to-transparent" />
                <div className="text-xl mb-2">{f.icon}</div>
                <div className="font-['Bebas_Neue'] text-[16px] tracking-wide mb-2">{f.title}</div>
                <div className="text-[12px] text-[#5a7a9a] font-light leading-[1.7]">{f.desc}</div>
              </div>
            ))}
          </div>

          {/* 레퍼런스 */}
          <div className="font-mono text-[9px] tracking-[.2em] text-[#00C9B1] mb-4">KCDS 구축 레퍼런스 (국방/공공 13개 기관)</div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-[2px] mb-6">
            {['🏛 국방부', '⚔️ 육군본부', '⚓ 해군', '✈️ 공군작전사령부', '🔬 국방과학연구소', '🏥 국군의무사령부', '📡 국군지휘통신사령부', '💻 국방전산정보원', '✈️ 공군29전대', '🎖 논산훈련소', '💰 국군재정관리단', '🔐 국가보안기술연구소'].map((r) => (
              <div key={r} className="text-[11px] text-[rgba(200,220,255,.76)] font-light p-2 bg-[#0e1e35] border border-[rgba(31,74,117,.5)] text-center leading-[1.4]">{r}</div>
            ))}
          </div>
          <div className="text-[11px] text-[#5a7a9a] font-light mb-10">+ 행정안전부</div>

          {/* 유사 CDS 경고 */}
          <div className="p-5 bg-[rgba(248,113,113,.05)] border border-[rgba(248,113,113,.2)] rounded-sm flex gap-4 items-start">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <div>
              <div className="font-['Bebas_Neue'] text-[16px] tracking-wide text-[#f87171] mb-1">유사 CDS 주의</div>
              <div className="text-[12px] text-[#5a7a9a] font-light leading-[1.7]">
                기술이전 후 물리적단방향·인피니밴드 방식으로 연결하거나 CDS 케이스에 타 장비를 탑재한 유사 CDS는 방첩대·국보연에서 CDS로 인정받지 못합니다.
                KCDS-Guard 1000은 국보연 이전 통제모듈 CHIP을 탑재한 유일한 공인 제품입니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-10 py-20 text-center reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] text-[#00C9B1] mb-4">보안 솔루션 도입 문의</div>
          <h2 className="font-['Bebas_Neue'] text-[64px] tracking-wide leading-none mb-4">지금 바로<br />환경 분석을 시작하세요</h2>
          <p className="text-[15px] text-[#5a7a9a] font-light leading-[1.7] mb-8">
            현재 망구성 환경, 도입 목적, 예산 규모를 알려주시면 최적의 솔루션을 제안드립니다.
          </p>
          <div className="grid grid-cols-2 gap-[2px] max-w-sm mx-auto mb-8">
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] p-4">
              <div className="font-mono text-[8.5px] tracking-[.15em] text-[#00C9B1] mb-1">PHONE</div>
              <div className="text-[13px] text-[rgba(200,220,255,.76)] font-light">051-747-6428</div>
            </div>
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] p-4">
              <div className="font-mono text-[8.5px] tracking-[.15em] text-[#00C9B1] mb-1">EMAIL</div>
              <div className="text-[13px] text-[rgba(200,220,255,.76)] font-light">aiden@vworks.tech</div>
            </div>
          </div>
          <Link href="/contact"
            className="inline-flex items-center bg-gradient-to-r from-[#4ade80] to-[#00C9B1] text-[#050d1a] text-[16px] font-medium px-12 py-4 rounded-sm">
            보안 솔루션 문의하기 →
          </Link>
        </div>
      </section>

    </main>
  );
}
