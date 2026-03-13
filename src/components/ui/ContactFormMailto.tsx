'use client';

import { useState } from 'react';

const TYPES = ['VAST Data 스토리지', 'HPC 인프라', 'AI 컴퓨팅', 'Dell 서버 공급', '보안 아키텍처', '기술지원/유지보수', '기타 문의'];

export default function ContactFormMailto({ from }: { from?: string }) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [selectedType, setSelectedType] = useState(from ? `${from} 도입 문의` : '');

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)',
    borderRadius: 2, padding: '12px 16px', color: 'var(--white)',
    fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, fontWeight: 300,
    outline: 'none', transition: 'border-color 0.2s',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[VWorks 문의] ${selectedType || '일반 문의'} — ${form.company || form.name}`);
    const body = encodeURIComponent(
`성함: ${form.name}
회사명: ${form.company}
이메일: ${form.email}
연락처: ${form.phone}
문의 유형: ${selectedType}

문의 내용:
${form.message}
`
    );
    window.location.href = `mailto:aiden@vworks.tech?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: 'var(--teal)', marginBottom: 8 }}>성함 *</label>
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="홍길동"
            onFocus={e => e.target.style.borderColor = 'var(--border-t)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
        </div>
        <div>
          <label style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: 'var(--teal)', marginBottom: 8 }}>회사명</label>
          <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--border-t)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: 'var(--teal)', marginBottom: 8 }}>이메일 *</label>
          <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--border-t)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
        </div>
        <div>
          <label style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: 'var(--teal)', marginBottom: 8 }}>연락처</label>
          <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--border-t)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: 'var(--teal)', marginBottom: 12 }}>문의 유형</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {TYPES.map(type => (
            <button key={type} type="button" onClick={() => setSelectedType(type === selectedType ? '' : type)}
              style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, fontWeight: 400, padding: '7px 14px', borderRadius: 2,
                border: selectedType === type ? '1px solid var(--teal)' : '1px solid var(--border)',
                background: selectedType === type ? 'var(--teal-dim)' : 'transparent',
                color: selectedType === type ? 'var(--teal)' : 'var(--muted)', cursor: 'pointer' }}>
              {type}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: 'var(--teal)', marginBottom: 8 }}>문의 내용 *</label>
        <textarea required rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }} placeholder="문의 내용을 입력해주세요."
          onFocus={e => e.target.style.borderColor = 'var(--border-t)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
      </div>
      <button type="submit" style={{ background: 'linear-gradient(135deg, var(--teal), var(--cyan))', color: '#030810',
        fontWeight: 700, fontSize: 14, padding: '14px 32px', border: 'none', borderRadius: 2, cursor: 'pointer',
        fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.1em' }}>
        메일로 문의 보내기 →
      </button>
      <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: -8 }}>
        * 버튼 클릭 시 이메일 앱이 열립니다. aiden@vworks.tech 로 전송됩니다.
      </p>
    </form>
  );
}
