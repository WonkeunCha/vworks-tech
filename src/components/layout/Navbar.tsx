"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const locale = 'ko';
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLocale = locale === "ko" ? "en" : "ko";
  const switchHref = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { href: `/${locale}/solutions`, label: "solutions" },
    { href: `/${locale}/partners`, label: "partners" },
    { href: `/${locale}/reference`, label: "reference" },
    { href: `/${locale}/about`, label: "about" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 0" : "20px 0",
        background: scrolled
          ? "rgba(5,13,26,0.92)"
          : "linear-gradient(180deg, rgba(5,13,26,0.8) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(31,74,117,0.4)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* LOGO */}
        <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/logo-white.png"
            alt="VWorks Technologies"
            width={110}
            height={44}
            style={{ objectFit: "contain", height: "auto" }}
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: pathname.startsWith(link.href) ? "var(--teal)" : "var(--text)",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: 2,
                transition: "color 0.2s",
                letterSpacing: "-0.01em",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* LANG SWITCHER */}
          <Link
            href={switchHref}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "var(--muted)",
              textDecoration: "none",
              padding: "6px 12px",
              border: "1px solid var(--border)",
              borderRadius: 2,
              marginLeft: 8,
              transition: "all 0.2s",
            }}
          >
            {otherLocale.toUpperCase()}
          </Link>

          {/* CTA */}
          <Link
            href={`/${locale}/contact`}
            style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--bg)",
              textDecoration: "none",
              padding: "8px 20px",
              background: "linear-gradient(135deg, var(--teal), var(--cyan))",
              borderRadius: 2,
              marginLeft: 4,
              transition: "opacity 0.2s",
            }}
          >
            {"contact"}
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: "var(--white)",
          }}
          className="mobile-menu-btn"
          aria-label="메뉴"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{
          background: "rgba(5,13,26,0.98)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid var(--border)",
          padding: "24px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 16,
                color: "var(--text)",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <Link
              href={switchHref}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 12,
                color: "var(--muted)",
                textDecoration: "none",
                padding: "8px 16px",
                border: "1px solid var(--border)",
                borderRadius: 2,
              }}
            >
              {otherLocale.toUpperCase()}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              style={{
                flex: 1,
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--bg)",
                textDecoration: "none",
                padding: "8px 20px",
                background: "linear-gradient(135deg, var(--teal), var(--cyan))",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              {"contact"}
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
