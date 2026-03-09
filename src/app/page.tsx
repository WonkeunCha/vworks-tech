'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SOLUTIONS = [
  { slug: 'vast-data', badge: 'CORE PARTNER', name: 'VAST Data 스토리지', desc: '엑사바이트급 All-Flash. 단일 네임스페이스로 HPC·AI·분석 워크로드를 하나의 플랫폼에서.', color: '#00C9B1', border: 'rgba(0,201,177,.25)', bg: 'rgba(0,201,177,.07)', tags: ['All-Flash', 'S3 호환', 'AI Ready'] },
  { slug: 'hpe-cray', badge: 'HPE PARTNER', name: 'HPE Cray 슈퍼컴퓨팅', desc: 'TOP500 #1~#3 플랫폼. EX4000·EX2500·Cray XD. 엑사스케일 HPC를 국방·연구·기상 분야에.', color: '#01A982', border: 'rgba(1,169,130,.25)', bg: 'rgba(1,169,130,.07)', tags: ['Cray EX4000', 'Slingshot 200Gb/s', 'HPC'] },
  { slug: 'dell-server', badge: 'DELL PARTNER', name: 'Dell PowerEdge 서버', desc: 'PowerEdge 15G·16G 현행 제품 전 라인업. Intel Xeon 4세대·AMD EPYC 4/5세대 공급·구축.', color: '#007DB8', border: 'rgba(0,125,184,.25)', bg: 'rgba(0,125,184,.07)', tags: ['15G / 16G', 'Intel · AMD', '공식 견적'] },
  { slug: 'network-security', badge: 'SECURITY', name: '보안 솔루션', desc: '휴네시온 i-oneNet 망연계(국내 1위) + 씨크랩 KCDS-Guard CDS. N²SF 대응 공식 총판.', color: '#4ade80', border: 'rgba(74,222,128,.2)', bg: 'rgba(74,222,128,.07)', tags: ['i-oneNet', 'KCDS-Guard', 'N²SF'] },
];

const REFS = [
  { no: '01', client: '대한민국 해군', title: '해양수치모델 HPC 클러스터 구축', tag: '국방·HPC' },
  { no: '02', client: '대한민국 해군', title: 'NAIMS-II HPC 클러스터 구축', tag: '국방·HPC' },
  { no: '03', client: '대한민국 해군', title: '통합기상해양정보체계 SW 성능 개선', tag: '국방·SW' },
  { no: '04', client: '한국수력원자력', title: '망연계 솔루션 통합 유지보수', tag: '공공·보안' },
  { no: '05', client: 'STX엔진', title: 'AI 서버 인프라 구축', tag: '민간·AI' },
];

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 40px 80px', overflow: 'hidden', background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,201,177,.06) 0%, transparent 60%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 18, flexWrap: 'wrap' }}>
            {['● HPC·AI·스토리지 전문', '● VAST Data 공식 파트너', '● 국방·공공 구축 레퍼런스'].map((t, i) => (
              <span key={i} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.15em', padding: '5px 13px', borderRadius: 2, color: '#00C9B1', background: 'rgba(0,201,177,.08)', border: '1px solid rgba(0,201,177,.2)' }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(56px,7vw,96px)', letterSpacing: '.02em', lineHeight: .9, marginBottom: 20 }}>
            <span style={{ background: 'linear-gradient(135deg,#00C9B1,#38D9F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Beyond Boundaries,</span><br />
            <span style={{ color: '#e8f1ff' }}>Built to Scale</span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(200,220,255,.76)', fontWeight: 300, lineHeight: 1.85, maxWidth: 540, marginBottom: 36 }}>
            데이터의 속도로, 비즈니스의 미래로.<br />
            VWorks Technologies는 HPC·AI·스토리지·보안 인프라를 구축합니다.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/solutions" style={{ display: 'inline-flex', alignItems: 'center', background: 'linear-gradient(135deg,#00C9B1,#38D9F5)', color: '#050d1a', fontSize: 15, fontWeight: 600, padding: '14px 32px', borderRadius: 2, textDecoration: 'none' }}>솔루션 보기 →</Link>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(0,201,177,.4)', color: '#00C9B1', fontSize: 15, fontWeight: 400, padding: '14px 32px', borderRadius: 2, textDecoration: 'none' }}>상담 신청</Link>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section style={{ padding: '80px 40px', position: 'relative' }} className="reveal">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.3em', color: '#00C9B1', marginBottom: 10 }}>SOLUTIONS</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,4.5vw,52px)', letterSpacing: '.02em', marginBottom: 8 }}>핵심 솔루션</h2>
          <p style={{ fontSize: 13.5, color: '#5a7a9a', marginBottom: 40, fontWeight: 300 }}>HPC·AI·스토리지·보안 분야의 검증된 파트너 솔루션을 공급·구축합니다.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
            {SOLUTIONS.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#0a1628', border: `1px solid ${s.border}`, borderTop: `2px solid ${s.color}`, padding: '28px 24px', transition: 'border-color .2s' }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8.5, letterSpacing: '.2em', color: s.color, marginBottom: 8 }}>{s.badge}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: '.02em', color: s.color, marginBottom: 8 }}>{s.name}</div>
                <p style={{ fontSize: 13, color: 'rgba(200,220,255,.76)', fontWeight: 300, lineHeight: 1.75, marginBottom: 14 }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {s.tags.map((t) => <span key={t} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8.5, padding: '3px 9px', border: `1px solid ${s.border}`, color: s.color, background: s.bg, borderRadius: 2 }}>{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCE */}
      <section style={{ padding: '80px 40px', background: 'rgba(0,201,177,.02)' }} className="reveal">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.3em', color: '#00C9B1', marginBottom: 10 }}>REFERENCE</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,4.5vw,52px)', letterSpacing: '.02em', marginBottom: 40 }}>구축 레퍼런스</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {REFS.map((r) => (
              <div key={r.no} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '18px 24px', background: '#0a1628', border: '1px solid rgba(31,74,117,.5)' }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: 'rgba(0,201,177,.3)', minWidth: 32 }}>{r.no}</span>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8.5, letterSpacing: '.12em', padding: '3px 10px', border: '1px solid rgba(0,201,177,.2)', color: '#00C9B1', background: 'rgba(0,201,177,.07)', borderRadius: 2, whiteSpace: 'nowrap' }}>{r.tag}</span>
                <div>
                  <div style={{ fontSize: 13, color: 'rgba(200,220,255,.6)', fontWeight: 300, marginBottom: 2 }}>{r.client}</div>
                  <div style={{ fontSize: 15, color: '#e8f1ff', fontWeight: 400 }}>{r.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', textAlign: 'center' }} className="reveal">
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,5.5vw,68px)', letterSpacing: '.02em', lineHeight: 1, marginBottom: 14 }}>인프라 구축,<br />지금 상담하세요</h2>
          <p style={{ fontSize: 14.5, color: '#5a7a9a', fontWeight: 300, marginBottom: 28, lineHeight: 1.75 }}>HPC·AI·스토리지·보안 인프라 도입을 검토 중이시라면<br />VWorks 전문 엔지니어가 최적 솔루션을 제안드립니다.</p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: 'linear-gradient(135deg,#00C9B1,#38D9F5)', color: '#050d1a', fontSize: 16, fontWeight: 600, padding: '15px 48px', borderRadius: 2, textDecoration: 'none' }}>문의하기 →</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
