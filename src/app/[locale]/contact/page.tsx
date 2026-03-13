'use client';

import { useSearchParams, Suspense } from 'next/navigation';
import ContactFormEmailJS from '@/components/ui/ContactFormEmailJS';

function ContactContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '';

  const title = from ? `${from} 도입 문의` : '문의하기';
  const sub = from
    ? `${from} 관련 문의 사항을 남겨주세요. 담당자가 신속히 연락드립니다.`
    : 'VWorks Technologies 프로젝트 문의, 견적, 기술 상담';

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 32px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.3em',
            color: 'var(--teal)',
            marginBottom: 16,
          }}>
            CONTACT
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 6vw, 80px)',
            letterSpacing: '0.02em',
            lineHeight: 0.95,
            marginBottom: 20,
          }}>
            {title}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', fontWeight: 300, maxWidth: 480 }}>
            {sub}
          </p>
        </div>

        {/* GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 64, alignItems: 'start' }}>

          {/* FORM */}
          <ContactFormEmailJS from={from} />

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{
              padding: '28px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.2em',
                color: 'var(--teal)',
                marginBottom: 20,
              }}>
                CONTACT INFO
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '📞', label: '대표전화', val: '051-747-6428' },
                  { icon: '✉️', label: 'Email', val: 'aiden@vworks.tech' },
                  { icon: '🏢', label: '본사', val: '부산 해운대구 센텀3로 26' },
                  { icon: '🔬', label: '기술연구소', val: '대구 달서구 달구벌대로 1130' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: 9,
                        letterSpacing: '0.12em',
                        color: 'var(--muted)',
                        marginBottom: 3,
                      }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 300 }}>
                        {item.val}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '20px 24px',
              background: 'var(--teal-dim)',
              border: '1px solid var(--border-t)',
              borderRadius: 2,
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <div>
                  <div style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    color: 'var(--teal)',
                    marginBottom: 6,
                  }}>
                    RESPONSE TIME
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 300, lineHeight: 1.7 }}>
                    문의 접수 후 1-2 영업일 내 담당자가 연락드립니다.
                    긴급 문의는 직접 전화 또는 이메일로 연락해 주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 400px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: 200, textAlign: 'center', color: 'var(--muted)' }}>
        Loading...
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
