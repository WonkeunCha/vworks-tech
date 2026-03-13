'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function EventPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 문의하기 페이지에서는 표시 안 함
    if (pathname?.includes('/contact')) return;

    // 오늘 이미 닫은 경우 표시 안 함
    const dismissed = localStorage.getItem('popup_dismissed_date');
    const today = new Date().toDateString();
    if (dismissed === today) return;

    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, [pathname]);

  const close = () => {
    setClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  const closeToday = () => {
    localStorage.setItem('popup_dismissed_date', new Date().toDateString());
    close();
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-all duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-black/60 transition-all duration-300 ${closing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>

        {/* 상단 헤더 */}
        <div className="relative bg-gradient-to-br from-[#00d4aa] via-[#00b894] to-[#0ea5e9] px-8 pt-10 pb-14 text-center overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            홈페이지 리뉴얼 기념
          </div>
          <div className="text-6xl mb-3">☕</div>
          <h2 className="text-white font-black text-2xl leading-tight">
            문의하기만 해도<br />
            <span className="text-white/90">스타벅스 쿠폰 지급!</span>
          </h2>
          <p className="text-white/80 text-sm mt-2">랜덤 금액 쿠폰을 드립니다</p>
        </div>

        {/* 하단 내용 */}
        <div className="bg-[#0d1e30] px-8 py-7">
          <div className="space-y-3 mb-6">
            {[
              { icon: '✅', text: 'HPC·AI·스토리지 인프라 도입 문의 접수 시' },
              { icon: '🎁', text: '스타벅스 모바일 쿠폰 랜덤 지급 (선착순)' },
              { icon: '⚡', text: '문의 후 24시간 내 전문가가 연락드립니다' },
            ].map(item => (
              <div key={item.text} className="flex items-start gap-3">
                <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                <span className="text-[#c8d8e8] text-sm leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
          <Link
            href="/ko/contact/"
            onClick={close}
            className="block w-full text-center px-6 py-4 bg-teal-500 hover:bg-teal-400 text-[#020c18] font-black rounded-xl transition-all duration-200 text-sm tracking-wide"
          >
            지금 문의하고 쿠폰 받기 →
          </Link>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
            <button onClick={closeToday} className="text-xs text-[#8899bb] hover:text-white transition-colors">
              오늘 하루 보지 않기
            </button>
            <button onClick={close} className="text-xs text-[#8899bb] hover:text-white transition-colors">
              닫기
            </button>
          </div>
        </div>

        {/* X 버튼 */}
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/80 hover:text-white transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
