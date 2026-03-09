'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV = [
  { href: '/solutions', label: '솔루션' },
  { href: '/reference', label: '구축 레퍼런스' },
  { href: '/about', label: '회사 소개' },
  { href: '/contact', label: '문의하기' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '12px 0' : '20px 0',
      background: scrolled ? 'rgba(5,13,26,0.95)' : 'linear-gradient(180deg,rgba(5,13,26,0.8) 0%,transparent 100%)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(31,74,117,0.4)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/logo-white.png" alt="VWorks Technologies" width={110} height={44} style={{ objectFit: 'contain', height: 'auto' }} priority />
        </Link>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} style={{ color: 'rgba(200,220,255,0.8)', fontSize: 14, textDecoration: 'none', fontWeight: 400, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00C9B1')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,220,255,0.8)')}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact" style={{ background: 'linear-gradient(135deg,#00C9B1,#38D9F5)', color: '#050d1a', fontSize: 13, fontWeight: 600, padding: '9px 20px', borderRadius: 2, textDecoration: 'none' }}>
            상담 신청
          </Link>
        </div>
      </div>
    </nav>
  );
}
