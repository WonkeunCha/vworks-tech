'use client';

import { useState } from 'react';

const EMAILJS_SERVICE_ID = 'service_x5qus0h';
const EMAILJS_TEMPLATE_ID = 'template_b9o6ede';
const EMAILJS_PUBLIC_KEY = '17r0XFH17PjAC674T';

const TYPES = [
  'VAST Data 스토리지',
  'HPC 인프라',
  'AI 컴퓨팅',
  'Dell 서버 공급',
  '보안 아키텍처',
  '기술지원/유지보수',
  '기타 문의',
];

export default function ContactFormEmailJS({ from }: { from?: string }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [selectedType, setSelectedType] = useState(
    from ? `${from} 도입 문의` : ''
  );
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: 2,
    padding: '12px 16px',
    color: 'var(--white)',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: 14,
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // emailjs SDK를 CDN으로 로드 (npm 설치 없이 사용)
      const emailjs = (window as any).emailjs;
      if (!emailjs) {
        // SDK가 없으면 동적으로 로드
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
          script.onload = () => resolve();
          script.onerror = () => reject();
          document.head.appendChild(script);
        });
      }

      await (window as any).emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          inquiry_type: selectedType || '일반 문의',
          from_name: form.name,
          company: form.company || '(미기재)',
          reply_email: form.email,
          phone: form.phone || '(미기재)',
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus('success');
      setForm({ name: '', company: '', email: '', phone: '', message: '' });
      setSelectedType('');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 32px',
        background: 'var(--surface)',
        border: '1px solid var(--border-t)',
        borderRadius: 2,
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 32,
          color: 'var(--teal)',
          marginBottom: 12,
        }}>
          SUBMITTED
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 300, lineHeight: 1.8 }}>
          문의가 접수되었습니다.<br />
          1–2 영업일 내로 담당자가 연락드리겠습니다.
        </p>
        <button
          onClick={() => setStatus('idle')}
          style={{
            marginTop: 24,
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--muted)',
            padding: '8px 20px',
            borderRadius: 2,
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: "'Share Tech Mono', monospace",
          }}
        >
          다른 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 이름 + 회사명 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{
            display: 'block',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.15em',
            color: 'var(--teal)',
            marginBottom: 8,
          }}>
            성함 *
          </label>
          <input
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            placeholder="홍길동"
            onFocus={e => (e.target.style.borderColor = 'var(--border-t)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
        <div>
          <label style={{
            display: 'block',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.15em',
            color: 'var(--teal)',
            marginBottom: 8,
          }}>
            회사명
          </label>
          <input
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--border-t)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
      </div>

      {/* 이메일 + 연락처 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{
            display: 'block',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.15em',
            color: 'var(--teal)',
            marginBottom: 8,
          }}>
            이메일 *
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--border-t)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
        <div>
          <label style={{
            display: 'block',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.15em',
            color: 'var(--teal)',
            marginBottom: 8,
          }}>
            연락처
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            style={inputStyle}
            placeholder="010-0000-0000"
            onFocus={e => (e.target.style.borderColor = 'var(--border-t)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
      </div>

      {/* 문의 유형 */}
      <div>
        <label style={{
          display: 'block',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.15em',
          color: 'var(--teal)',
          marginBottom: 12,
        }}>
          문의 유형
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type === selectedType ? '' : type)}
              style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 12,
                fontWeight: 400,
                padding: '7px 14px',
                borderRadius: 2,
                border: selectedType === type
                  ? '1px solid var(--teal)'
                  : '1px solid var(--border)',
                background: selectedType === type
                  ? 'var(--teal-dim)'
                  : 'transparent',
                color: selectedType === type
                  ? 'var(--teal)'
                  : 'var(--muted)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 문의 내용 */}
      <div>
        <label style={{
          display: 'block',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.15em',
          color: 'var(--teal)',
          marginBottom: 8,
        }}>
          문의 내용 *
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="문의 내용을 입력해주세요."
          onFocus={e => (e.target.style.borderColor = 'var(--border-t)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>

      {/* 에러 메시지 */}
      {status === 'error' && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255,80,80,0.08)',
          border: '1px solid rgba(255,80,80,0.3)',
          borderRadius: 2,
          color: '#ff6b6b',
          fontSize: 13,
        }}>
          ⚠️ 전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나{' '}
          <a href="mailto:aiden@vworks.tech" style={{ color: '#ff9b9b' }}>
            aiden@vworks.tech
          </a>
          로 직접 연락해 주세요.
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          background: status === 'sending'
            ? 'var(--surface2)'
            : 'linear-gradient(135deg, var(--teal), var(--cyan))',
          color: status === 'sending' ? 'var(--muted)' : '#030810',
          fontWeight: 700,
          fontSize: 14,
          padding: '14px 32px',
          border: 'none',
          borderRadius: 2,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          fontFamily: "'Share Tech Mono', monospace",
          letterSpacing: '0.1em',
          transition: 'opacity 0.2s',
        }}
      >
        {status === 'sending' ? '전송 중...' : '문의 보내기 →'}
      </button>
    </form>
  );
}
