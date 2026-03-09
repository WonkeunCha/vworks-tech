import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SOLUTIONS = [
  { slug: 'vast-data', badge: 'CORE PARTNER', name: 'VAST Data 스토리지', desc: '엑사바이트급 All-Flash. 단일 네임스페이스로 HPC·AI·분석 워크로드를 하나의 플랫폼에서.', color: '#00C9B1', border: 'rgba(0,201,177,.25)', bg: 'rgba(0,201,177,.07)', tags: ['All-Flash', 'S3 호환', 'NFS/SMB', 'AI Ready'], ready: true },
  { slug: 'hpe-cray', badge: 'HPE PARTNER', name: 'HPE Cray 슈퍼컴퓨팅', desc: 'TOP500 #1~#3 플랫폼. EX4000·EX2500·Cray XD. 엑사스케일 HPC를 국방·연구·기상 분야에.', color: '#01A982', border: 'rgba(1,169,130,.25)', bg: 'rgba(1,169,130,.07)', tags: ['Cray EX4000', 'Slingshot 200Gb/s', 'ClusterStor'], ready: true },
  { slug: 'dell-server', badge: 'DELL PARTNER', name: 'Dell PowerEdge 서버', desc: 'PowerEdge 15G·16G 현행 제품 전 라인업. Intel Xeon 4세대·AMD EPYC 4/5세대 공급·구축.', color: '#007DB8', border: 'rgba(0,125,184,.25)', bg: 'rgba(0,125,184,.07)', tags: ['15G / 16G', 'Intel · AMD', '공식 견적'], ready: true },
  { slug: 'network-security', badge: 'SECURITY', name: '보안 솔루션', desc: '휴네시온 i-oneNet 망연계(국내 1위) + 씨크랩 KCDS-Guard CDS. N²SF 대응 공식 총판.', color: '#4ade80', border: 'rgba(74,222,128,.2)', bg: 'rgba(74,222,128,.07)', tags: ['i-oneNet', 'KCDS-Guard', 'N²SF'], ready: true },
  { slug: '#', badge: 'HPC INFRA', name: 'HPC 인프라', desc: '고성능 컴퓨팅 클러스터 설계·구축·운영. 기상·국방·연구 분야 구축 레퍼런스 보유.', color: '#fbbf24', border: 'rgba(251,191,36,.2)', bg: 'rgba(251,191,36,.07)', tags: ['클러스터 설계', 'InfiniBand', 'Slurm'], ready: false },
  { slug: '#', badge: 'AI COMPUTING', name: 'AI 컴퓨팅', desc: 'GPU 서버·AI 플랫폼 구축. 모델 훈련·추론 인프라 최적화. STX엔진 AI 인프라 구축 레퍼런스.', color: '#a78bfa', border: 'rgba(167,139,250,.2)', bg: 'rgba(167,139,250,.07)', tags: ['GPU 클러스터', 'NVIDIA', 'AI 추론'], ready: false },
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <section style={{ padding: '130px 40px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.3em', color: '#00C9B1', marginBottom: 10 }}>SOLUTIONS</div>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,5.5vw,72px)', letterSpacing: '.02em', marginBottom: 12 }}>솔루션 라인업</h1>
          <p style={{ fontSize: 14, color: '#5a7a9a', fontWeight: 300, marginBottom: 48, lineHeight: 1.8 }}>HPC·AI·스토리지·보안 분야의 검증된 파트너 솔루션.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {SOLUTIONS.map((s) => (
              s.ready ? (
                <Link key={s.slug} href={`/solutions/${s.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#0a1628', border: `1px solid ${s.border}`, borderTop: `2px solid ${s.color}`, padding: '28px 24px' }}>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8.5, letterSpacing: '.2em', color: s.color, marginBottom: 8 }}>{s.badge}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, color: s.color, marginBottom: 10 }}>{s.name}</div>
                  <p style={{ fontSize: 12.5, color: 'rgba(200,220,255,.76)', fontWeight: 300, lineHeight: 1.75, marginBottom: 14 }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {s.tags.map((t) => <span key={t} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8.5, padding: '3px 9px', border: `1px solid ${s.border}`, color: s.color, background: s.bg, borderRadius: 2 }}>{t}</span>)}
                  </div>
                </Link>
              ) : (
                <div key={s.name} style={{ background: '#0a1628', border: `1px solid ${s.border}`, borderTop: `2px solid ${s.color}`, padding: '28px 24px', opacity: 0.5 }}>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8.5, letterSpacing: '.2em', color: s.color, marginBottom: 8 }}>{s.badge} · COMING SOON</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, color: s.color, marginBottom: 10 }}>{s.name}</div>
                  <p style={{ fontSize: 12.5, color: 'rgba(200,220,255,.5)', fontWeight: 300, lineHeight: 1.75 }}>{s.desc}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
