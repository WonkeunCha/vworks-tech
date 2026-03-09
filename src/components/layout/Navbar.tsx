'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SOL = [
  { href: '/ko/solutions/vast-data/', label: 'VAST Data 스토리지', badge: 'STORAGE', color: 'text-teal-400' },
  { href: '/ko/solutions/hpe-cray/', label: 'HPE Cray 슈퍼컴퓨팅', badge: 'HPC', color: 'text-blue-400' },
  { href: '/ko/solutions/dell-server/', label: 'Dell PowerEdge 서버', badge: 'SERVER', color: 'text-orange-400' },
  { href: '/ko/solutions/network-security/', label: '보안 솔루션', badge: 'SECURITY', color: 'text-cyan-400' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const open = () => { if (timer.current) clearTimeout(timer.current); setSolOpen(true); };
  const close = () => { timer.current = setTimeout(() => setSolOpen(false), 250); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050d1a]/95 backdrop-blur-md border-b border-[#1a2d4a]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/ko/">
          {/* 로고 1.5배: 160→240, 28→42 */}
          <Image src="/vworks-tech/logo-wide.png" alt="VWorks Technologies" width={240} height={42} style={{ objectFit: 'contain', height: 'auto', maxHeight: 42 }} priority />
        </Link>

        {/* 데스크탑 */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative" onMouseEnter={open} onMouseLeave={close}>
            <button className="flex items-center gap-1 text-sm hover:text-white transition-colors py-5">
              솔루션
              <svg className={`w-3 h-3 transition-transform ${solOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {solOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#0a0f28] border border-[#1a2d4a] rounded-xl shadow-2xl overflow-hidden">
                <div className="p-2">
                  {SOL.map((s) => (
                    <Link key={s.href} href={s.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1a2d4a] transition-colors group" onClick={() => setSolOpen(false)}>
                      <span className={`text-xs font-bold ${s.color}`}>{s.badge}</span>
                      <span className="text-sm text-[#8899bb] group-hover:text-white">{s.label}</span>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-[#1a2d4a] mt-2 pt-2">
                  <Link href="/ko/solutions/" className="flex items-center justify-center py-2 text-xs text-teal-400 hover:text-teal-300" onClick={() => setSolOpen(false)}>전체 솔루션 보기 →</Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/ko/partners/" className="text-sm text-[#8899bb] hover:text-white">파트너</Link>
          <Link href="/ko/reference/" className="text-sm text-[#8899bb] hover:text-white">레퍼런스</Link>
          <Link href="/ko/about/" className="text-sm text-[#8899bb] hover:text-white">회사소개</Link>
          <Link href="/ko/contact/" className="text-sm bg-teal-500 hover:bg-teal-400 text-[#000d1a] font-bold px-4 py-2 rounded-lg transition-colors">문의하기</Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button className="md:hidden text-[#8899bb] p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0f28] border-t border-[#1a2d4a] px-6 py-4">
          {SOL.map((s) => (
            <Link key={s.href} href={s.href} className="block py-3 text-sm text-[#8899bb] hover:text-white border-b border-[#1a2d4a]/50" onClick={() => setMobileOpen(false)}>{s.label}</Link>
          ))}
          <Link href="/ko/partners/" className="block py-3 text-sm text-[#8899bb] hover:text-white border-b border-[#1a2d4a]/50" onClick={() => setMobileOpen(false)}>파트너</Link>
          <Link href="/ko/reference/" className="block py-3 text-sm text-[#8899bb] hover:text-white border-b border-[#1a2d4a]/50" onClick={() => setMobileOpen(false)}>레퍼런스</Link>
          <Link href="/ko/about/" className="block py-3 text-sm text-[#8899bb] hover:text-white border-b border-[#1a2d4a]/50" onClick={() => setMobileOpen(false)}>회사소개</Link>
          <Link href="/ko/contact/" className="block mt-4 text-center text-sm bg-teal-500 text-[#000d1a] font-bold px-4 py-3 rounded-lg" onClick={() => setMobileOpen(false)}>문의하기</Link>
        </div>
      )}
    </header>
  );
}
