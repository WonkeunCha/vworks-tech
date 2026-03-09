const fs = require('fs');
const content = `"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const SOL = [
  { href: "/ko/solutions/vast-data/", label: "VAST Data Storage", badge: "STORAGE", color: "text-teal-400" },
  { href: "/ko/solutions/hpe-cray/", label: "HPE Cray HPC", badge: "HPC", color: "text-blue-400" },
  { href: "/ko/solutions/dell-server/", label: "Dell PowerEdge Server", badge: "SERVER", color: "text-orange-400" },
  { href: "/ko/solutions/network-security/", label: "Security Solution", badge: "SECURITY", color: "text-cyan-400" },
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
    <header
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        scrolled
          ? "bg-[#050d1a]/95 backdrop-blur-md border-b border-[#1a2d4a]"
          : "bg-transparent"
      }\`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/ko/" className="flex items-center">
          <Image
            src="/logo-white.png"
            alt="VWorks"
            width={110}
            height={44}
            style={{ objectFit: "contain", height: "auto" }}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setSolOpen(true)}
            onMouseLeave={() => setSolOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm text-[#c8d8f0] hover:text-white transition-colors">
              Solutions
              <svg
                className={\`w-3 h-3 transition-transform \${solOpen ? "rotate-180" : ""}\`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {solOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#0a1628] border border-[#1a2d4a] rounded-xl shadow-xl overflow-hidden">
                <div className="p-2">
                  {SOL.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1a2d4a] transition-colors group"
                    >
                      <span className={\`text-xs font-bold \${s.color} w-16 shrink-0\`}>{s.badge}</span>
                      <span className="text-sm text-[#c8d8f0] group-hover:text-white">{s.label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-[#1a2d4a] mt-2 pt-2">
                    <Link
                      href="/ko/solutions/"
                      className="flex items-center justify-center px-4 py-2 text-xs text-teal-400 hover:text-teal-300"
                    >
                      All Solutions
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/ko/partners/" className="text-sm text-[#c8d8f0] hover:text-white transition-colors">Partners</Link>
          <Link href="/ko/reference/" className="text-sm text-[#c8d8f0] hover:text-white transition-colors">References</Link>
          <Link href="/ko/about/" className="text-sm text-[#c8d8f0] hover:text-white transition-colors">About</Link>
          <Link
            href="/ko/contact/"
            className="text-sm bg-teal-500 hover:bg-teal-400 text-[#050d1a] font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Contact
          </Link>
        </nav>

        <button
          className="md:hidden text-[#c8d8f0]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-[#1a2d4a] px-6 py-4">
          {SOL.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block py-2 text-sm text-[#c8d8f0] hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {s.label}
            </Link>
          ))}
          <div className="border-t border-[#1a2d4a] my-3" />
          <Link href="/ko/partners/" className="block py-2 text-sm text-[#c8d8f0] hover:text-white" onClick={() => setMobileOpen(false)}>Partners</Link>
          <Link href="/ko/reference/" className="block py-2 text-sm text-[#c8d8f0] hover:text-white" onClick={() => setMobileOpen(false)}>References</Link>
          <Link href="/ko/about/" className="block py-2 text-sm text-[#c8d8f0] hover:text-white" onClick={() => setMobileOpen(false)}>About</Link>
          <Link
            href="/ko/contact/"
            className="block mt-3 text-center bg-teal-500 text-[#050d1a] font-bold px-4 py-2 rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
`;

const target = process.argv[2];
fs.writeFileSync(target, content, { encoding: 'utf8' });
console.log('OK lines:', content.split('\n').length);
