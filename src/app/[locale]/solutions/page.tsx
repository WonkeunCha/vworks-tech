import Link from 'next/link';
import Image from 'next/image';

const SOLUTIONS = [
  { slug: 'vast-data', badge: 'CORE PARTNER', name: 'VAST Data 스토리지', desc: 'All-Flash Universal Storage. 엑사바이트급 데이터를 단일 네임스페이스로 관리. AI/ML 워크로드 최적화.', color: '#00C9B1', bg: 'rgba(0,201,177,.07)', border: 'rgba(0,201,177,.2)', tags: ['NFS·S3·NVMe','DASE 아키텍처','AI 스토리지'] },
  { slug: 'hpe-cray', badge: 'HPE OFFICIAL PARTNER', name: 'HPE Cray 슈퍼컴퓨팅', desc: 'TOP500 #1~#3 플랫폼. EX4000·EX2500·Cray XD. 엑사스케일 HPC를 국방·연구·기상·AI 분야에 구축.', color: '#01A982', bg: 'rgba(1,169,130,.07)', border: 'rgba(1,169,130,.25)', tags: ['Cray EX4000','Cray EX2500','Cray XD','ClusterStor'] },
  { slug: 'network-security', badge: 'SECURITY', name: '보안 솔루션', desc: '휴네시온 i-oneNet 망연계(국내 1위) + 씨크랩 KCDS-Guard CDS(국방 특화). 공식 총판 공급·구축.', color: '#4ade80', bg: 'rgba(74,222,128,.07)', border: 'rgba(74,222,128,.2)', tags: ['i-oneNet','KCDS-Guard','N²SF 대응','국방·공공'] },
  { slug: '#', badge: 'INFRASTRUCTURE', name: 'HPC 인프라', desc: 'AMD·NVIDIA·Intel 기반 고성능 컴퓨팅 클러스터 설계·구축. 냉각·전력·네트워크 풀스택 통합 서비스.', color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.2)', tags: ['AMD Epyc','NVIDIA H100','InfiniBand'] },
  { slug: '#', badge: 'AI/ML', name: 'AI 컴퓨팅', desc: 'GPU 클러스터·AI 서버 인프라. LLM 훈련·추론 최적화. STX엔진 AI 서버 인프라 구축 레퍼런스 보유.', color: '#a78bfa', bg: 'rgba(167,139,250,.07)', border: 'rgba(167,139,250,.2)', tags: ['AI 서버','LLM 훈련','GPU 클러스터'] },
  { slug: 'dell-server', badge: 'HARDWARE · DELL PARTNER', name: 'Dell PowerEdge 서버', desc: 'Dell Technologies 공식 파트너. PowerEdge 15G·16G 현행 제품 전 라인업 공급·구축·유지보수. Intel Xeon 4/5세대 · AMD EPYC 4/5세대.', color: '#38D9F5', bg: 'rgba(56,217,245,.07)', border: 'rgba(56,217,245,.2)', tags: ['15G / 16G 현행 제품','Intel · AMD 전 라인업','공식 견적·구축'] },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(5,13,26,.92)] backdrop-blur-md border-b border-[rgba(31,74,117,.5)] px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/"><Image src="/logo-white.png" alt="VWorks" width={110} height={44} /></Link>
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[#5a7a9a]">
            <Link href="/" className="hover:text-[#00C9B1]">홈</Link>
            <span className="opacity-40">›</span>
            <span className="text-[#00C9B1]">솔루션</span>
          </div>
        </div>
        <Link href="/contact" className="bg-gradient-to-r from-[#00C9B1] to-[#38D9F5] text-[#050d1a] text-[13px] font-medium px-5 py-2 rounded-sm">도입 상담 신청</Link>
      </nav>
      <section className="pt-36 pb-20 px-10">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] text-[#00C9B1] mb-4">SOLUTIONS</div>
          <h1 className="font-['Pretendard'] text-[72px] tracking-wide leading-[.92] mb-4">VWorks 솔루션<br /><span className="text-[42px] text-[rgba(200,220,255,.76)] font-['Noto_Sans_KR'] font-light tracking-normal">포트폴리오 전체</span></h1>
          <p className="text-[15px] text-[rgba(200,220,255,.76)] font-light leading-[1.85] max-w-xl mb-16">스토리지·HPC·AI·보안 전 영역을 공급·구축합니다. 각 솔루션을 클릭해 상세 정보를 확인하세요.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]">
            {SOLUTIONS.map((s) => {
              const isActive = s.slug !== '#';
              const cls = `group bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm overflow-hidden relative transition-colors duration-200 ${isActive ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`;
              const inner = (
                <>
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{background:`linear-gradient(90deg,${s.color},transparent)`}} />
                  <div className="p-6">
                    <div className="font-mono text-[8px] tracking-[.2em] mb-2" style={{color:s.color}}>{s.badge}</div>
                    <h2 className="font-['Pretendard'] text-[28px] tracking-wide leading-none mb-3" style={{color:s.color}}>{s.name}</h2>
                    <p className="text-[13px] text-[rgba(200,220,255,.76)] font-light leading-[1.75] mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-1">{s.tags.map((t)=><span key={t} className="font-mono text-[8.5px] tracking-[.1em] px-2 py-1 rounded-sm" style={{color:s.color,background:s.bg,border:`1px solid ${s.border}`}}>{t}</span>)}</div>
                  </div>
                  <div className="px-6 py-3 border-t border-[rgba(31,74,117,.5)] font-mono text-[9px] tracking-[.15em]" style={{color:isActive?s.color:'#5a7a9a'}}>{isActive?'자세히 보기 →':'준비 중'}</div>
                </>
              );
              return isActive
                ? <Link key={s.name} href={`/solutions/${s.slug}`} className={cls}>{inner}</Link>
                : <div key={s.name} className={cls}>{inner}</div>;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
