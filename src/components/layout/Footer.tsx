import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--navy-card)', padding: '56px 40px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* 회사 정보 */}
          <div>
            <Image src="/logo-white.png" alt="VWorks Technologies" width={100} height={40} style={{ objectFit: 'contain', height: 'auto', marginBottom: 16 }} />
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 12 }}>
              브이웍스테크놀로지스 주식회사<br />
              사업자등록번호: 184-87-01929<br />
              대표자: 차원근
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.8 }}>
              부산 해운대구 센텀3로 26, 3604호<br />
              Tel: 051-747-6428<br />
              Email: aiden@vworks.tech
            </p>
          </div>
          {/* 솔루션 */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.2em', color: 'var(--teal)', marginBottom: 16 }}>SOLUTIONS</div>
            {[
              { href: '/solutions/vast-data', label: 'VAST Data 스토리지' },
              { href: '/solutions/hpe-cray', label: 'HPE Cray 슈퍼컴퓨팅' },
              { href: '/solutions/network-security', label: '보안 솔루션' },
              { href: '/solutions/dell-server', label: 'Dell PowerEdge 서버' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', padding: '4px 0', transition: 'color .2s' }}>{l.label}</Link>
            ))}
          </div>
          {/* 회사 */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.2em', color: 'var(--teal)', marginBottom: 16 }}>COMPANY</div>
            {[
              { href: '/about', label: '회사소개' },
              { href: '/reference', label: '구축 레퍼런스' },
              { href: '/contact', label: '문의하기' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', padding: '4px 0' }}>{l.label}</Link>
            ))}
          </div>
          {/* 파트너 */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.2em', color: 'var(--teal)', marginBottom: 16 }}>PARTNERS</div>
            {['VAST Data', 'HPE / Cray', 'Dell Technologies', '휴네시온', '씨크랩'].map((p) => (
              <div key={p} style={{ fontSize: 13, color: 'var(--text-dim)', padding: '4px 0' }}>{p}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>© 2025 VWorks Technologies. All rights reserved.</div>
          <Link href="/privacy" style={{ fontSize: 12, color: 'var(--text-dim)', textDecoration: 'none' }}>개인정보처리방침</Link>
        </div>
      </div>
      <style>{`@media(max-width:768px){footer > div > div:first-child{grid-template-columns:1fr 1fr!important}}`}</style>
    </footer>
  );
}
