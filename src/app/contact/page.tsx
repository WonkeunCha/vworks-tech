'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  const inputStyle = { width: '100%', background: '#0a1628', border: '1px solid rgba(31,74,117,.5)', borderRadius: 2, padding: '12px 16px', color: '#e8f1ff', fontSize: 14, outline: 'none', fontFamily: "'Noto Sans KR',sans-serif" };
  const labelStyle = { fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.15em', color: '#00C9B1', display: 'block', marginBottom: 6 };

  return (
    <>
      <Navbar />
      <section style={{ padding: '130px 40px 80px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.3em', color: '#00C9B1', marginBottom: 10 }}>CONTACT</div>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,5.5vw,68px)', letterSpacing: '.02em', marginBottom: 12 }}>문의하기</h1>
          <p style={{ fontSize: 14, color: '#5a7a9a', fontWeight: 300, marginBottom: 40, lineHeight: 1.8 }}>인프라 도입 상담, 견적 요청, 기술 문의를 남겨주시면 1~2 영업일 내 연락드립니다.</p>

          {status === 'success' ? (
            <div style={{ background: 'rgba(0,201,177,.08)', border: '1px solid rgba(0,201,177,.3)', borderRadius: 2, padding: '32px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: '#00C9B1', marginBottom: 8 }}>문의가 접수되었습니다</div>
              <p style={{ fontSize: 14, color: '#5a7a9a', fontWeight: 300 }}>빠른 시일 내에 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={labelStyle}>이름 *</label><input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                <div><label style={labelStyle}>회사명</label><input style={inputStyle} value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={labelStyle}>이메일 *</label><input type="email" style={inputStyle} value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
                <div><label style={labelStyle}>연락처</label><input style={inputStyle} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
              </div>
              <div><label style={labelStyle}>문의 유형</label>
                <select style={{...inputStyle}} value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                  <option value="">선택해주세요</option>
                  <option>VAST Data 스토리지 도입 상담</option>
                  <option>HPE Cray 슈퍼컴퓨팅 상담</option>
                  <option>Dell PowerEdge 서버 견적</option>
                  <option>보안 솔루션(망연계/CDS) 상담</option>
                  <option>기타 문의</option>
                </select>
              </div>
              <div><label style={labelStyle}>문의 내용 *</label>
                <textarea style={{...inputStyle, height: 160, resize: 'vertical'}} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
              </div>
              <button type="submit" disabled={status === 'loading'} style={{ background: status === 'loading' ? '#1a3a5c' : 'linear-gradient(135deg,#00C9B1,#38D9F5)', color: '#050d1a', fontSize: 15, fontWeight: 600, padding: '14px', borderRadius: 2, border: 'none', cursor: status === 'loading' ? 'default' : 'pointer' }}>
                {status === 'loading' ? '전송 중...' : '문의 보내기 →'}
              </button>
              {status === 'error' && <p style={{ color: '#f87171', fontSize: 13, textAlign: 'center' }}>전송 중 오류가 발생했습니다. 이메일로 직접 연락해 주세요.</p>}
            </form>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, marginTop: 40 }}>
            {[['TEL','051-747-6428'],['EMAIL','aiden@vworks.tech'],['MOBILE','010-2597-5855'],['FAX','051-747-6422']].map(([k,v]) => (
              <div key={k} style={{ padding: '16px', background: '#0a1628', border: '1px solid rgba(31,74,117,.5)' }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8.5, letterSpacing: '.15em', color: '#00C9B1', marginBottom: 5 }}>{k}</div>
                <div style={{ fontSize: 13.5, color: '#e8f1ff', fontWeight: 300 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
