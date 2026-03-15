'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const VAST_SUB = [
  { href: '/ko/solutions/vast-data/ai-os/', label: 'AI Operating System', badge: 'AI OS', color: 'text-teal-400' },
  { href: '/ko/solutions/vast-data/gemini/', label: 'Gemini 구독 모델', badge: 'GEMINI', color: 'text-amber-400' },
  { href: '/ko/solutions/vast-data/platform/', label: 'Supported Platform', badge: 'HW', color: 'text-cyan-400' },
  { href: '/ko/solutions/vast-data/datastore/', label: 'DataStore', badge: 'STORE', color: 'text-teal-400' },
  { href: '/ko/solutions/vast-data/database/', label: 'DataBase', badge: 'DB', color: 'text-cyan-400' },
  { href: '/ko/solutions/vast-data/dataspace/', label: 'DataSpace', badge: 'SPACE', color: 'text-blue-400' },
  { href: '/ko/solutions/vast-data/dataengine/', label: 'DataEngine', badge: 'ENGINE', color: 'text-amber-400' },
  { href: '/ko/solutions/vast-data/insightengine/', label: 'InsightEngine', badge: 'RAG', color: 'text-pink-400' },
];

const SOL = [
  { href: '/ko/solutions/vast-data/', label: 'VAST Data 스토리지', badge: 'STORAGE', color: 'text-teal-400', hasSub: true },
  { href: '/ko/solutions/hpe-cray/', label: 'HPE Cray 슈퍼컴퓨터', badge: 'HPC', color: 'text-blue-400' },
  { href: '/ko/solutions/hpe-server/', label: 'HPE ProLiant · Synergy', badge: 'SERVER', color: 'text-sky-400' },
  { href: '/ko/solutions/dell-server/', label: 'Dell PowerEdge 서버', badge: 'SERVER', color: 'text-orange-400' },
  { href: '/ko/solutions/network-security/', label: '보안 아키텍처', badge: 'SECURITY', color: 'text-cyan-400' },
];

const DEV = [
  { href: '/ko/dev/cubrid/', label: 'CUBRID DB', badge: 'DB', color: 'text-purple-400', disabled: false },
  { href: '/ko/dev/wx-viz/', label: '기상해양 가시화', badge: 'VIZ', color: 'text-blue-400', disabled: false },
  { href: '#', label: 'HPC 모니터링', badge: 'HPC', color: 'text-gray-500', disabled: true },
];

const COM = [
  { href: '/ko/notice/', label: '공지사항', badge: 'NEWS', color: 'text-teal-400' },
  { href: '/ko/faq/',    label: 'FAQ',      badge: 'FAQ',  color: 'text-cyan-400' },
  { href: '/ko/news/',   label: '뉴스/소식', badge: 'BLOG', color: 'text-blue-400' },
];

function GroupwareIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [vastSubOpen, setVastSubOpen] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const [comOpen, setComOpen] = useState(false);
  const solTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const devTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const comTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSol = pathname?.startsWith('/ko/solutions') ?? false;
  const isCom = pathname?.startsWith('/ko/notice') || pathname?.startsWith('/ko/faq') || pathname?.startsWith('/ko/news') || false;
  const isDev = pathname?.startsWith('/ko/dev') ?? false;
  const isVast = pathname?.startsWith('/ko/solutions/vast-data') ?? false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solEnter = () => { if (solTimer.current) clearTimeout(solTimer.current); setSolOpen(true); };
  const solLeave = () => { solTimer.current = setTimeout(() => { setSolOpen(false); setVastSubOpen(false); }, 150); };
  const devEnter = () => { if (devTimer.current) clearTimeout(devTimer.current); setDevOpen(true); };
  const devLeave = () => { devTimer.current = setTimeout(() => setDevOpen(false), 150); };
  const comEnter = () => { if (comTimer.current) clearTimeout(comTimer.current); setComOpen(true); };
  const comLeave = () => { comTimer.current = setTimeout(() => setComOpen(false), 150); };

  const navBase = `text-sm transition-colors py-5 flex items-center gap-1`;
  const activeClass = `text-white font-semibold`;
  const inactiveClass = `text-[#8899bb] hover:text-white`;
  const linkActiveClass = `text-sm transition-colors text-white font-semibold`;
  const linkInactiveClass = `text-sm transition-colors text-[#8899bb] hover:text-white`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#000d1a]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        <Link href="/ko/" className="flex items-center flex-shrink-0">
          <Image src="/logo-wide.png" alt="VWorks Technologies" width={180} height={40} className="h-9 w-auto max-w-[260px] object-contain" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-8">

          {/* 솔루션 드롭다운 — VAST 서브메뉴 포함 */}
          <div className="relative" onMouseEnter={solEnter} onMouseLeave={solLeave}>
            <button className={`${navBase} ${isSol ? activeClass : inactiveClass}`}>
              솔루션
              <svg className={`w-3 h-3 transition-transform duration-200 ${solOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {solOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50" style={{ width: vastSubOpen ? 520 : 264 }}>
                <div className="flex">
                  {/* 메인 솔루션 목록 */}
                  <div className="bg-[#0a1828] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden w-64 flex-shrink-0">
                    {SOL.map(item => (
                      <div
                        key={item.href}
                        className="relative"
                        onMouseEnter={() => { if ((item as any).hasSub) setVastSubOpen(true); else setVastSubOpen(false); }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => { setSolOpen(false); setVastSubOpen(false); }}
                          className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group ${pathname === item.href || ((item as any).hasSub && isVast) ? 'bg-white/5' : ''}`}
                        >
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 ${item.color} flex-shrink-0`}>{item.badge}</span>
                          <span className={`text-sm flex-1 ${pathname === item.href || ((item as any).hasSub && isVast) ? 'text-white font-medium' : 'text-[#c8d8e8] group-hover:text-white'}`}>{item.label}</span>
                          {(item as any).hasSub && (
                            <svg className="w-3 h-3 text-[#8899bb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* VAST 서브메뉴 */}
                  {vastSubOpen && (
                    <div
                      className="bg-[#0a1828] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden ml-1 w-64"
                      onMouseEnter={() => setVastSubOpen(true)}
                    >
                      <div className="px-4 py-2 border-b border-white/5">
                        <span className="text-xs text-[#8899bb] uppercase tracking-widest">VAST Data 제품</span>
                      </div>
                      {VAST_SUB.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => { setSolOpen(false); setVastSubOpen(false); }}
                          className={`flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group ${pathname === item.href ? 'bg-white/5' : ''}`}
                        >
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 ${item.color} flex-shrink-0`} style={{ fontSize: 9 }}>{item.badge}</span>
                          <span className={`text-sm ${pathname === item.href ? 'text-white font-medium' : 'text-[#c8d8e8] group-hover:text-white'}`}>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={devEnter} onMouseLeave={devLeave}>
            <button className={`${navBase} ${isDev ? activeClass : inactiveClass}`}>
              Development
              <svg className={`w-3 h-3 transition-transform duration-200 ${devOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {devOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 z-50">
                <div className="bg-[#0a1828] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
                  {DEV.map(item => (
                    item.disabled ? (
                      <div key={item.href} className="flex items-center gap-3 px-4 py-3 opacity-40 cursor-not-allowed">
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 ${item.color} flex-shrink-0`}>{item.badge}</span>
                        <span className="text-sm text-[#8899bb]">{item.label}</span>
                        <span className="text-xs text-[#8899bb] ml-auto">준비중</span>
                      </div>
                    ) : (
                      <Link key={item.href} href={item.href} onClick={() => setDevOpen(false)} className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group ${pathname === item.href ? 'bg-white/5' : ''}`}>
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 ${item.color} flex-shrink-0`}>{item.badge}</span>
                        <span className={`text-sm ${pathname === item.href ? 'text-white font-medium' : 'text-[#c8d8e8] group-hover:text-white'}`}>{item.label}</span>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={comEnter} onMouseLeave={comLeave}>
            <button className={`${navBase} ${isCom ? activeClass : inactiveClass}`}>
              커뮤니티
              <svg className={`w-3 h-3 transition-transform duration-200 ${comOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {comOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 z-50">
                <div className="bg-[#0a1828] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
                  {COM.map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setComOpen(false)} className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group ${pathname === item.href ? 'bg-white/5' : ''}`}>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 ${item.color} flex-shrink-0`}>{item.badge}</span>
                      <span className={`text-sm ${pathname === item.href ? 'text-white font-medium' : 'text-[#c8d8e8] group-hover:text-white'}`}>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/ko/partners/" className={pathname?.startsWith('/ko/partners') ? linkActiveClass : linkInactiveClass}>파트너</Link>
          <Link href="/ko/reference/" className={pathname?.startsWith('/ko/reference') ? linkActiveClass : linkInactiveClass}>레퍼런스</Link>
          <Link href="/ko/about/" className={pathname?.startsWith('/ko/about') ? linkActiveClass : linkInactiveClass}>회사소개</Link>

          <Link href="/ko/contact/" className="text-sm bg-teal-500 hover:bg-teal-400 text-[#000d1a] font-bold px-4 py-2 rounded-lg transition-colors">
            문의하기
          </Link>

          <div className="w-px h-5 bg-white/20" />

          <a href="https://vworks.daouoffice.com" target="_blank" rel="noopener noreferrer"
            className="text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-400/40 text-teal-400 hover:bg-teal-400/10 transition-colors whitespace-nowrap">
            <GroupwareIcon />
            그룹웨어
          </a>

        </nav>

        <button className="md:hidden text-white/70 hover:text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="메뉴">
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden bg-[#000d1a]/98 backdrop-blur-md border-t border-white/5">
          <div className="px-6 py-4 space-y-1">
            <p className="text-xs text-[#8899bb] uppercase tracking-widest px-2 py-2">솔루션</p>
            {SOL.map(item => (
              <div key={item.href}>
                <Link href={item.href} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors ${pathname === item.href ? 'text-white bg-white/5' : 'text-[#c8d8e8] hover:text-white hover:bg-white/5'}`}>
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 ${item.color}`}>{item.badge}</span>
                  {item.label}
                </Link>
                {/* VAST 서브메뉴 (모바일) */}
                {(item as any).hasSub && (
                  <div className="ml-6 mt-1 mb-2 space-y-0.5">
                    {VAST_SUB.map(sub => (
                      <Link key={sub.href} href={sub.href} onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${pathname === sub.href ? 'text-white bg-white/5' : 'text-[#8899bb] hover:text-white hover:bg-white/5'}`}>
                        <span className={`text-xs font-bold px-1 py-0.5 rounded bg-white/10 ${sub.color}`} style={{ fontSize: 8 }}>{sub.badge}</span>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <p className="text-xs text-[#8899bb] uppercase tracking-widest px-2 py-2 pt-4">Development</p>
            {DEV.map(item => (
              item.disabled ? (
                <div key={item.href} className="flex items-center gap-3 px-2 py-2.5 opacity-40 cursor-not-allowed">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 ${item.color}`}>{item.badge}</span>
                  <span className="text-[#8899bb] text-sm">{item.label}</span>
                  <span className="text-xs text-[#8899bb] ml-auto">준비중</span>
                </div>
              ) : (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors ${pathname === item.href ? 'text-white bg-white/5' : 'text-[#c8d8e8] hover:text-white hover:bg-white/5'}`}>
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 ${item.color}`}>{item.badge}</span>
                  {item.label}
                </Link>
              )
            ))}

            <p className="text-xs text-[#8899bb] uppercase tracking-widest px-2 py-2 pt-4">커뮤니티</p>
            {COM.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors ${pathname?.startsWith(item.href.slice(0, -1)) ? 'text-white bg-white/5' : 'text-[#c8d8e8] hover:text-white hover:bg-white/5'}`}>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 ${item.color}`}>{item.badge}</span>
                {item.label}
              </Link>
            ))}

            <div className="border-t border-white/5 pt-4 mt-4 space-y-1">
              {[
                { href: '/ko/partners/', label: '파트너' },
                { href: '/ko/reference/', label: '레퍼런스' },
                { href: '/ko/about/', label: '회사소개' },
              ].map(item => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className={`block px-2 py-2.5 rounded-lg text-sm transition-colors ${pathname?.startsWith(item.href.slice(0, -1)) ? 'text-white font-semibold' : 'text-[#8899bb] hover:text-white'}`}>
                  {item.label}
                </Link>
              ))}
              <Link href="/ko/contact/" onClick={() => setMobileOpen(false)}
                className="block mt-3 text-center px-4 py-3 bg-teal-500 hover:bg-teal-400 text-[#000d1a] font-bold rounded-lg transition-colors text-sm">
                문의하기
              </Link>
              <a href="https://vworks.daouoffice.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-2 px-4 py-3 border border-teal-400/40 text-teal-400 rounded-lg transition-colors text-sm hover:bg-teal-400/10">
                <GroupwareIcon />
                그룹웨어
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
