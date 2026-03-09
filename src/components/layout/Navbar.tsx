"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const SOL = [
  { href: "/ko/solutions/vast-data/", label: "VAST Data 스토리지", badge: "STORAGE", color: "text-teal-400" },
  { href: "/ko/solutions/hpe-cray/", label: "HPE Cray 슈퍼컴퓨팅", badge: "HPC", color: "text-blue-400" },
  { href: "/ko/solutions/dell-server/", label: "Dell PowerEdge 서버", badge: "SERVER", color: "text-orange-400" },
  { href: "/ko/solutions/network-security/", label: "보안 솔루션", badge: "SECURITY", color: "text-cyan-400" },
];

const NAV = [
  { href: "/ko/partners/", label: "파트너" },
  { href: "/ko/reference/", label: "레퍼런스" },
  { href: "/ko/about/", label: "회사소개" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050d1a]/95 backdrop-blur-md border-b border-[#1a2d4a]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/ko/" className="flex items-center">
          <Image src="/vworks-tech/logo-white.png" alt="VWorks" width={110} height={44} style={{ objectFit: "contain", height: "auto" }} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative" onMouseEnter={() => setSolOpen(true)} onMouseLeave={() => setSolOpen(false)}>
            <button className="flex items-center gap-1 text-sm text-[#c8d8f0] hover:text-white transition-colors">
              솔루션
              <svg className={`w-3 h-3 transition-transform ${solOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {solOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#0a1628] border border-[#1a2d4a] rounded-xl shadow-xl overflow-hidden">
                <div className="p-2">
                  {SOL.map((s) => (
                    <Link key={s.href} href={s.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1a2d4a] transition-colors group">
                      <span className={`text-xs font-bold ${s.color} w-16 shrink-0`}>{s.badge}</span>
                      <span className="text-sm text-[#c8d8f0] group-hover:text-white">{s.label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-[#1a2d4a] mt-2 pt-2">
                    <Link href="/ko/solutions/" className="flex items-center justify-center px-4 py-2 text-xs text-teal-400 hover:text-teal-300">전체 솔루션 보기</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-[#c8d8f0] hover:text-white transition-colors">{n.label}</Link>
          ))}
          <Link href="/ko/contact/" className="text-sm bg-teal-500 hover:bg-teal-400 text-[#050d1a] font-bold px-4 py-2 rounded-lg transition-colors">문의하기</Link>
        </nav>
        <button className="md:hidden text-[#c8d8f0]" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-[#1a2d4a] px-6 py-4">
          <p className="text-xs text-[#8ba3c7] tracking-widest mb-2">솔루션</p>
          {SOL.map((s) => (
            <Link key={s.href} href={s.href} className="block py-2 text-sm text-[#c8d8f0] hover:text-white" onClick={() => setMobileOpen(false)}>{s.label}</Link>
          ))}
          <div className="border-t border-[#1a2d4a] my-3" />
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="block py-2 text-sm text-[#c8d8f0] hover:text-white" onClick={() => setMobileOpen(false)}>{n.label}</Link>
          ))}
          <Link href="/ko/contact/" className="block mt-3 text-center bg-teal-500 text-[#050d1a] font-bold px-4 py-2 rounded-lg" onClick={() => setMobileOpen(false)}>문의하기</Link>
        </div>
      )}
    </header>
  );
}
