'use client';
import AnimatedHeroBg from '@/components/AnimatedHeroBg';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const HPE_KR = 'https://www.hpe.com/kr/ko/hpe-proliant-compute.html';
const HPE_SYNERGY_KR = 'https://www.hpe.com/kr/ko/integrated-systems/synergy.html';

// ── SVG 일러스트 ────────────────────────────────────────────────

function Img1U({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 44" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="40" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.2" strokeOpacity=".5"/>
      <rect x="2" y="2" width="276" height="3" rx="1.5" fill={c} fillOpacity=".7"/>
      <rect x="8" y="6" width="36" height="32" rx="1" fill="#060f1e" stroke={c} strokeWidth=".7" strokeOpacity=".4"/>
      <circle cx="20" cy="16" r="4" fill="none" stroke={c} strokeWidth=".9" strokeOpacity=".6"/>
      <circle cx="20" cy="16" r="1.5" fill={c} fillOpacity=".7"/>
      <rect x="10" y="28" width="14" height="4" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <rect x="26" y="28" width="14" height="4" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".3"/>
      <text x="50" y="11" fill={c} fillOpacity=".45" fontSize="5" fontFamily="monospace">SFF DRIVES ×8</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={50+i*17} y={13} width="14" height="22" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".45"/>
      ))}
      <rect x="192" y="6" width="78" height="32" rx="1" fill="#060f1e" stroke={c} strokeWidth=".5" strokeOpacity=".3"/>
      <rect x="196" y="10" width="32" height="8" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <rect x="196" y="20" width="32" height="8" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <rect x="232" y="10" width="32" height="10" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <rect x="232" y="23" width="32" height="10" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <text x="10" y="40" fill={c} fillOpacity=".4" fontSize="5" fontFamily="monospace">1U</text>
    </svg>
  );
}

function Img1U_AMD({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 44" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="40" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.2" strokeOpacity=".5"/>
      <rect x="2" y="2" width="276" height="3" rx="1.5" fill={c} fillOpacity=".7"/>
      <rect x="8" y="6" width="36" height="32" rx="1" fill="#060f1e" stroke={c} strokeWidth=".7" strokeOpacity=".4"/>
      <circle cx="20" cy="16" r="4" fill="none" stroke={c} strokeWidth=".9" strokeOpacity=".6"/>
      <circle cx="20" cy="16" r="1.5" fill={c} fillOpacity=".7"/>
      {/* AMD 뱃지 */}
      <rect x="10" y="26" width="32" height="8" rx=".5" fill="#1a0808" stroke={c} strokeWidth=".5" strokeOpacity=".6"/>
      <text x="26" y="32" fill={c} fillOpacity=".8" fontSize="5" fontFamily="monospace" textAnchor="middle">AMD</text>
      <text x="50" y="11" fill={c} fillOpacity=".45" fontSize="5" fontFamily="monospace">SFF DRIVES ×8</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={50+i*17} y={13} width="14" height="22" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".45"/>
      ))}
      <rect x="192" y="6" width="78" height="32" rx="1" fill="#060f1e" stroke={c} strokeWidth=".5" strokeOpacity=".3"/>
      <rect x="196" y="10" width="32" height="8" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <rect x="196" y="20" width="32" height="8" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <rect x="232" y="10" width="32" height="10" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <rect x="232" y="23" width="32" height="10" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <text x="10" y="40" fill={c} fillOpacity=".4" fontSize="5" fontFamily="monospace">1U · AMD EPYC</text>
    </svg>
  );
}

function Img2U({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 82" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="78" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.2" strokeOpacity=".5"/>
      <rect x="2" y="2" width="276" height="3" rx="1.5" fill={c} fillOpacity=".7"/>
      <rect x="8" y="6" width="36" height="70" rx="1" fill="#060f1e" stroke={c} strokeWidth=".7" strokeOpacity=".4"/>
      <circle cx="26" cy="22" r="6" fill="none" stroke={c} strokeWidth="1" strokeOpacity=".6"/>
      <circle cx="26" cy="22" r="2.5" fill={c} fillOpacity=".7"/>
      <rect x="12" y="42" width="28" height="6" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".35"/>
      <rect x="12" y="52" width="20" height="4" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".3" strokeOpacity=".25"/>
      <text x="50" y="14" fill={c} fillOpacity=".45" fontSize="5" fontFamily="monospace">ROW 1 ×8</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={50+i*17} y={16} width="14" height="22" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".45"/>
      ))}
      <text x="50" y="46" fill={c} fillOpacity=".45" fontSize="5" fontFamily="monospace">ROW 2 ×8</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={50+i*17} y={48} width="14" height="22" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".45"/>
      ))}
      <rect x="192" y="6" width="78" height="70" rx="1" fill="#060f1e" stroke={c} strokeWidth=".5" strokeOpacity=".3"/>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="196" y={12+i*13} width="70" height="9" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      ))}
      <text x="10" y="78" fill={c} fillOpacity=".4" fontSize="5" fontFamily="monospace">2U</text>
    </svg>
  );
}

function Img2U_AMD({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 82" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="78" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.2" strokeOpacity=".5"/>
      <rect x="2" y="2" width="276" height="3" rx="1.5" fill={c} fillOpacity=".7"/>
      <rect x="8" y="6" width="36" height="70" rx="1" fill="#060f1e" stroke={c} strokeWidth=".7" strokeOpacity=".4"/>
      <circle cx="26" cy="22" r="6" fill="none" stroke={c} strokeWidth="1" strokeOpacity=".6"/>
      <circle cx="26" cy="22" r="2.5" fill={c} fillOpacity=".7"/>
      {/* AMD + 160코어 표시 */}
      <rect x="10" y="36" width="32" height="10" rx=".5" fill="#1a0808" stroke={c} strokeWidth=".5" strokeOpacity=".6"/>
      <text x="26" y="43" fill={c} fillOpacity=".8" fontSize="5" fontFamily="monospace" textAnchor="middle">AMD</text>
      <rect x="10" y="50" width="32" height="10" rx=".5" fill="#1a0808" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      <text x="26" y="57" fill={c} fillOpacity=".6" fontSize="4" fontFamily="monospace" textAnchor="middle">160C</text>
      <text x="50" y="14" fill={c} fillOpacity=".45" fontSize="5" fontFamily="monospace">ROW 1 ×8</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={50+i*17} y={16} width="14" height="22" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".45"/>
      ))}
      <text x="50" y="46" fill={c} fillOpacity=".45" fontSize="5" fontFamily="monospace">ROW 2 ×8</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={50+i*17} y={48} width="14" height="22" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".45"/>
      ))}
      <rect x="192" y="6" width="78" height="70" rx="1" fill="#060f1e" stroke={c} strokeWidth=".5" strokeOpacity=".3"/>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="196" y={12+i*13} width="70" height="9" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      ))}
      <text x="10" y="78" fill={c} fillOpacity=".4" fontSize="5" fontFamily="monospace">2U · AMD EPYC · 160-CORE</text>
    </svg>
  );
}

function Img4S({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 82" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="78" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.2" strokeOpacity=".5"/>
      <rect x="2" y="2" width="276" height="3" rx="1.5" fill={c} fillOpacity=".7"/>
      <rect x="8" y="6" width="62" height="70" rx="1" fill="#060f1e" stroke={c} strokeWidth=".7" strokeOpacity=".4"/>
      <text x="39" y="14" fill={c} fillOpacity=".45" fontSize="5" fontFamily="monospace" textAnchor="middle">4-SOCKET</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={12+(i%2)*28} y={18+Math.floor(i/2)*30} width="22" height="22" rx="1" fill="#0e1e35" stroke={c} strokeWidth=".8" strokeOpacity=".6"/>
          <text x={23+(i%2)*28} y={31+Math.floor(i/2)*30} fill={c} fillOpacity=".5" fontSize="5" fontFamily="monospace" textAnchor="middle">CPU</text>
          <text x={23+(i%2)*28} y={38+Math.floor(i/2)*30} fill={c} fillOpacity=".35" fontSize="4" fontFamily="monospace" textAnchor="middle">×60c</text>
        </g>
      ))}
      <text x="78" y="14" fill={c} fillOpacity=".45" fontSize="5" fontFamily="monospace">LFF DRIVES</text>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={78+i*20} y={16} width="17" height="60" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".45"/>
      ))}
      <rect x="184" y="6" width="86" height="70" rx="1" fill="#060f1e" stroke={c} strokeWidth=".5" strokeOpacity=".3"/>
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x="188" y={12+i*11} width="78" height="7" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      ))}
      <text x="10" y="78" fill={c} fillOpacity=".4" fontSize="5" fontFamily="monospace">2U QUAD-SOCKET</text>
    </svg>
  );
}

function ImgAI({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 82" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="78" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.5" strokeOpacity=".6"/>
      <rect x="2" y="2" width="276" height="3" rx="1.5" fill={c} fillOpacity=".8"/>
      <rect x="8" y="6" width="28" height="70" rx="1" fill="#060f1e" stroke={c} strokeWidth=".6" strokeOpacity=".4"/>
      <circle cx="22" cy="22" r="6" fill="none" stroke={c} strokeWidth=".9" strokeOpacity=".6"/>
      <circle cx="22" cy="22" r="2.5" fill={c} fillOpacity=".6"/>
      <text x="22" y="48" fill={c} fillOpacity=".5" fontSize="5" fontFamily="monospace" textAnchor="middle">CPU</text>
      <text x="44" y="12" fill={c} fillOpacity=".55" fontSize="5" fontFamily="monospace">GPU ×4  Double-Wide</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={44+i*56} y={14} width="52" height="64" rx="2" fill="#160a10" stroke={c} strokeWidth="1.1" strokeOpacity=".7"/>
          <rect x={48+i*56} y={18} width="44" height="56" rx="1" fill="#0e0610" stroke={c} strokeWidth=".5" strokeOpacity=".4"/>
          <text x={70+i*56} y={42} fill={c} fillOpacity=".7" fontSize="7" fontFamily="monospace" textAnchor="middle">GPU</text>
          <text x={70+i*56} y={52} fill={c} fillOpacity=".5" fontSize="5" fontFamily="monospace" textAnchor="middle">H100</text>
          {[0,1,2].map(j => (
            <rect key={j} x={50+i*56} y={60+j*5} width="40" height="3" rx=".5" fill={c} fillOpacity=".1"/>
          ))}
        </g>
      ))}
      <rect x="268" y="6" width="10" height="70" rx="1" fill="#060f1e" stroke={c} strokeWidth=".5" strokeOpacity=".3"/>
      <text x="10" y="78" fill={c} fillOpacity=".4" fontSize="5" fontFamily="monospace">2U AI GPU SERVER</text>
    </svg>
  );
}

function ImgAI_H200({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 82" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="78" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.8" strokeOpacity=".7"/>
      <rect x="2" y="2" width="276" height="4" rx="2" fill={c} fillOpacity=".9"/>
      {/* Gen12 표시 */}
      <rect x="2" y="2" width="50" height="6" rx="1" fill={c} fillOpacity=".9"/>
      <text x="27" y="7" fill="#050d1a" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">GEN 12</text>
      <rect x="8" y="10" width="28" height="66" rx="1" fill="#060f1e" stroke={c} strokeWidth=".6" strokeOpacity=".4"/>
      <circle cx="22" cy="26" r="6" fill="none" stroke={c} strokeWidth=".9" strokeOpacity=".6"/>
      <circle cx="22" cy="26" r="2.5" fill={c} fillOpacity=".6"/>
      <text x="22" y="52" fill={c} fillOpacity=".5" fontSize="5" fontFamily="monospace" textAnchor="middle">CPU</text>
      <text x="44" y="14" fill={c} fillOpacity=".6" fontSize="5" fontFamily="monospace">H200 NVL ×8  (2× faster than H100)</text>
      {[0,1,2,3,4,5,6,7].map(i => (
        <g key={i}>
          <rect x={44+i*28} y={17} width="24" height="58" rx="2" fill="#0d0616" stroke={c} strokeWidth="1" strokeOpacity=".75"/>
          <text x={56+i*28} y={40} fill={c} fillOpacity=".7" fontSize="6" fontFamily="monospace" textAnchor="middle">H200</text>
          <text x={56+i*28} y={50} fill={c} fillOpacity=".5" fontSize="4" fontFamily="monospace" textAnchor="middle">NVL</text>
          <rect x={46+i*28} y={56} width="20" height="3" rx=".5" fill={c} fillOpacity=".15"/>
          <rect x={46+i*28} y={61} width="20" height="3" rx=".5" fill={c} fillOpacity=".1"/>
          <rect x={46+i*28} y={66} width="20" height="3" rx=".5" fill={c} fillOpacity=".15"/>
        </g>
      ))}
      <text x="10" y="80" fill={c} fillOpacity=".5" fontSize="5" fontFamily="monospace">2U AI GPU · H200 NVL ×8 · GEN12</text>
    </svg>
  );
}

function ImgAI_GH200({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 82" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="78" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.8" strokeOpacity=".7"/>
      <rect x="2" y="2" width="276" height="4" rx="2" fill={c} fillOpacity=".9"/>
      <rect x="2" y="2" width="50" height="6" rx="1" fill={c} fillOpacity=".9"/>
      <text x="27" y="7" fill="#050d1a" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">GEN 12</text>
      {/* GH200 NVL2 — Grace CPU + Hopper GPU 슈퍼칩 2개 */}
      <text x="14" y="16" fill={c} fillOpacity=".6" fontSize="5" fontFamily="monospace">GH200 NVL2 Superchip ×2  (1.2TB unified memory)</text>
      {[0,1].map(i => (
        <g key={i}>
          <rect x={14+i*128} y={20} width="120" height="56" rx="3" fill="#0d0a16" stroke={c} strokeWidth="1.2" strokeOpacity=".8"/>
          {/* Grace CPU */}
          <rect x={20+i*128} y={26} width="48" height="44" rx="2" fill="#1a1028" stroke={c} strokeWidth=".8" strokeOpacity=".6"/>
          <text x={44+i*128} y={46} fill={c} fillOpacity=".7" fontSize="6" fontFamily="monospace" textAnchor="middle">Grace</text>
          <text x={44+i*128} y={55} fill={c} fillOpacity=".5" fontSize="4" fontFamily="monospace" textAnchor="middle">CPU</text>
          <text x={44+i*128} y={63} fill={c} fillOpacity=".4" fontSize="4" fontFamily="monospace" textAnchor="middle">72c Arm</text>
          {/* NVLink 연결 */}
          <rect x={70+i*128} y={42} width="8" height="6" rx="1" fill={c} fillOpacity=".5"/>
          <text x={74+i*128} y={56} fill={c} fillOpacity=".4" fontSize="4" fontFamily="monospace" textAnchor="middle">NVL</text>
          {/* Hopper GPU */}
          <rect x={80+i*128} y={26} width="48" height="44" rx="2" fill="#0d1628" stroke={c} strokeWidth=".8" strokeOpacity=".6"/>
          <text x={104+i*128} y={46} fill={c} fillOpacity=".7" fontSize="6" fontFamily="monospace" textAnchor="middle">Hopper</text>
          <text x={104+i*128} y={55} fill={c} fillOpacity=".5" fontSize="4" fontFamily="monospace" textAnchor="middle">GPU</text>
          <text x={104+i*128} y={63} fill={c} fillOpacity=".4" fontSize="4" fontFamily="monospace" textAnchor="middle">4 PFLOPS</text>
        </g>
      ))}
      <text x="10" y="80" fill={c} fillOpacity=".5" fontSize="5" fontFamily="monospace">2U · NVIDIA GH200 NVL2 ×2 · GEN12</text>
    </svg>
  );
}

function ImgTower({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 120 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="4" width="100" height="168" rx="4" fill="#0a1628" stroke={c} strokeWidth="1.2" strokeOpacity=".5"/>
      <rect x="10" y="4" width="100" height="4" rx="2" fill={c} fillOpacity=".7"/>
      <circle cx="60" cy="30" r="10" fill="none" stroke={c} strokeWidth="1.2" strokeOpacity=".6"/>
      <circle cx="60" cy="30" r="4" fill={c} fillOpacity=".5"/>
      <rect x="20" y="50" width="80" height="12" rx="1" fill="#0e1e35" stroke={c} strokeWidth=".6" strokeOpacity=".4"/>
      <rect x="56" y="55" width="20" height="2" rx=".5" fill={c} fillOpacity=".3"/>
      <text x="60" y="80" fill={c} fillOpacity=".45" fontSize="6" fontFamily="monospace" textAnchor="middle">STORAGE</text>
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x="20" y={84+i*14} width="80" height="11" rx="1" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".4"/>
      ))}
      <text x="60" y="175" fill={c} fillOpacity=".4" fontSize="5" fontFamily="monospace" textAnchor="middle">TOWER</text>
    </svg>
  );
}

function ImgEdge({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 82" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="78" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.8" strokeOpacity=".6"/>
      <rect x="2" y="2" width="276" height="4" rx="2" fill={c} fillOpacity=".7"/>
      <line x1="2" y1="28" x2="278" y2="28" stroke={c} strokeWidth=".4" strokeOpacity=".2"/>
      <line x1="2" y1="54" x2="278" y2="54" stroke={c} strokeWidth=".4" strokeOpacity=".2"/>
      <rect x="8" y="8" width="46" height="66" rx="1" fill="#060f1e" stroke={c} strokeWidth=".8" strokeOpacity=".5"/>
      <circle cx="24" cy="24" r="6" fill="none" stroke={c} strokeWidth="1" strokeOpacity=".6"/>
      <circle cx="24" cy="24" r="2.5" fill={c} fillOpacity=".7"/>
      <rect x="10" y="40" width="42" height="28" rx="1" fill="#060f18" stroke={c} strokeWidth=".8" strokeOpacity=".6"/>
      <text x="31" y="52" fill={c} fillOpacity=".8" fontSize="6" fontFamily="monospace" textAnchor="middle">RUGGED</text>
      <text x="31" y="62" fill={c} fillOpacity=".6" fontSize="5" fontFamily="monospace" textAnchor="middle">-5~55°C</text>
      <text x="31" y="71" fill={c} fillOpacity=".5" fontSize="4" fontFamily="monospace" textAnchor="middle">DUSTPROOF</text>
      <text x="64" y="16" fill={c} fillOpacity=".45" fontSize="5" fontFamily="monospace">DRIVES</text>
      {[0,1,2,3].map(i => (
        <rect key={i} x={64+i*20} y={18} width="17" height="28" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".45"/>
      ))}
      <rect x="64" y="52" width="80" height="24" rx="1" fill="#060f18" stroke={c} strokeWidth=".6" strokeOpacity=".5"/>
      <text x="104" y="63" fill={c} fillOpacity=".7" fontSize="7" fontFamily="monospace" textAnchor="middle">AMD EPYC</text>
      <text x="104" y="72" fill={c} fillOpacity=".5" fontSize="5" fontFamily="monospace" textAnchor="middle">64-CORE  PCIe Gen5</text>
      <rect x="152" y="8" width="118" height="66" rx="1" fill="#060f1e" stroke={c} strokeWidth=".5" strokeOpacity=".3"/>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="156" y={14+i*12} width="110" height="8" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      ))}
      <text x="10" y="80" fill={c} fillOpacity=".4" fontSize="5" fontFamily="monospace">2U EDGE · RUGGED</text>
    </svg>
  );
}

function ImgEdge1U({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 44" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="40" rx="3" fill="#0a1628" stroke={c} strokeWidth="1.8" strokeOpacity=".6"/>
      <rect x="2" y="2" width="276" height="3" rx="1.5" fill={c} fillOpacity=".7"/>
      <line x1="2" y1="22" x2="278" y2="22" stroke={c} strokeWidth=".4" strokeOpacity=".2"/>
      <rect x="8" y="6" width="44" height="32" rx="1" fill="#060f1e" stroke={c} strokeWidth=".8" strokeOpacity=".5"/>
      <circle cx="22" cy="16" r="4" fill="none" stroke={c} strokeWidth=".9" strokeOpacity=".6"/>
      <circle cx="22" cy="16" r="1.5" fill={c} fillOpacity=".7"/>
      <rect x="10" y="26" width="40" height="8" rx=".5" fill="#060f18" stroke={c} strokeWidth=".6" strokeOpacity=".5"/>
      <text x="30" y="33" fill={c} fillOpacity=".7" fontSize="5" fontFamily="monospace" textAnchor="middle">EDGE</text>
      {[0,1,2,3].map(i => (
        <rect key={i} x={58+i*17} y={10} width="14" height="22" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".5" strokeOpacity=".45"/>
      ))}
      <rect x="130" y="8" width="60" height="28" rx="1" fill="#060f18" stroke={c} strokeWidth=".6" strokeOpacity=".5"/>
      <text x="160" y="20" fill={c} fillOpacity=".7" fontSize="5" fontFamily="monospace" textAnchor="middle">INTEL XEON</text>
      <text x="160" y="30" fill={c} fillOpacity=".5" fontSize="5" fontFamily="monospace" textAnchor="middle">GPU ×4 SW</text>
      <rect x="198" y="6" width="72" height="32" rx="1" fill="#060f1e" stroke={c} strokeWidth=".5" strokeOpacity=".3"/>
      {[0,1,2].map(i => (
        <rect key={i} x="202" y={10+i*10} width="64" height="7" rx=".5" fill="#0e1e35" stroke={c} strokeWidth=".4" strokeOpacity=".4"/>
      ))}
      <text x="10" y="41" fill={c} fillOpacity=".4" fontSize="5" fontFamily="monospace">1U EDGE</text>
    </svg>
  );
}

function ImgBlade({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 280 110" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="276" height="106" rx="4" fill="#060f1e" stroke={c} strokeWidth="1.2" strokeOpacity=".4"/>
      <rect x="2" y="2" width="276" height="4" rx="2" fill={c} fillOpacity=".5"/>
      <text x="10" y="14" fill={c} fillOpacity=".45" fontSize="6" fontFamily="monospace">SYNERGY 12000 FRAME</text>
      {[0,1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x={8+i*44} y={18} width={40} height={86} rx="2"
            fill={i===0 ? '#0e1e35' : '#080f1c'}
            stroke={c}
            strokeWidth={i===0 ? 1.1 : .4}
            strokeOpacity={i===0 ? .8 : .2}
          />
          {i===0 && <>
            <text x="28" y="36" fill={c} fillOpacity=".7" fontSize="7" fontFamily="monospace" textAnchor="middle">480</text>
            <text x="28" y="46" fill={c} fillOpacity=".5" fontSize="5" fontFamily="monospace" textAnchor="middle">Gen11</text>
            <rect x="12" y="52" width="32" height="5" rx=".5" fill={c} fillOpacity=".15"/>
            <rect x="12" y="60" width="24" height="5" rx=".5" fill={c} fillOpacity=".1"/>
            <rect x="12" y="68" width="32" height="5" rx=".5" fill={c} fillOpacity=".15"/>
            {[0,1,2,3].map(j=>(
              <rect key={j} x={12+j*9} y={80} width={7} height={18} rx=".5" fill="#0a1628" stroke={c} strokeWidth=".5" strokeOpacity=".5"/>
            ))}
          </>}
          {i>0 && <text x={28+i*44} y="64" fill={c} fillOpacity=".15" fontSize="6" fontFamily="monospace" textAnchor="middle">SLOT</text>}
        </g>
      ))}
    </svg>
  );
}

// ── 제품 데이터 ────────────────────────────────────────────────
type Product = {
  category: string;
  name: string;
  sub: string;
  tier: string;
  color: string;
  bg: string;
  border: string;
  desc: string;
  specs: [string, string][];
  useCases: string[];
  links: { label: string; href: string }[];
  Img: React.ComponentType<{ c: string }>;
  imgH: string;
  isNew?: boolean;
};

const PRODUCTS: Product[] = [
  // ── AI / GPU ──────────────────────────────────────────────
  {
    category: 'ai', name: 'ProLiant DL380a Gen11', sub: '2U · DUAL SOCKET · AI GPU OPTIMIZED',
    tier: 'AI · GPU ACCELERATED · Gen11',
    color: '#f472b6', bg: 'rgba(244,114,182,.07)', border: 'rgba(244,114,182,.25)',
    desc: 'AI·ML 추론·훈련 특화 GPU 최적화 서버. 이중너비(DW) GPU 최대 4개 장착. MLPerf 세계 1위 벤치마크 달성.',
    specs: [['FORM','2U Rack, 듀얼 소켓'],['CPU','4th/5th Gen Intel Xeon (최대 56코어)'],['GPU','최대 4x DW GPU (H100/A100 등)'],['MEMORY','최대 8TB DDR5'],['PCIe','PCIe Gen5 고속 GPU 연결'],['MGMT','HPE iLO 6']],
    useCases: ['AI 학습','ML 추론','LLM','GPU 클러스터'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR }],
    Img: ImgAI, imgH: 'h-[82px]',
  },
  {
    category: 'ai', name: 'ProLiant DL385 Gen11', sub: '2U · DUAL SOCKET · AMD EPYC · AI/ML',
    tier: 'AI · AMD EPYC · Gen11',
    color: '#e879f9', bg: 'rgba(232,121,249,.07)', border: 'rgba(232,121,249,.25)',
    desc: 'AMD EPYC 기반 고성능 2U AI/ML 서버. 최대 160코어(듀얼)·6TB DDR5·GPU 최대 8개 지원. AI·빅데이터·HPC에 탁월한 가성비.',
    specs: [['FORM','2U Rack, 듀얼 소켓'],['CPU','AMD EPYC 9004/9005 (최대 160코어 ×2)'],['MEMORY','최대 6TB DDR5'],['GPU','최대 8x SW 또는 4x DW GPU'],['PCIe','PCIe Gen5 (최대 8슬롯 + OCP 2슬롯)'],['MGMT','HPE iLO 6 (AMD Silicon RoT)']],
    useCases: ['AI/ML','빅데이터','HPC','가상화'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR }],
    Img: Img2U_AMD, imgH: 'h-[82px]',
  },
  {
    category: 'ai', name: 'ProLiant DL380a Gen12', sub: '2U · DUAL SOCKET · NVIDIA H200 NVL · Gen12',
    tier: 'AI · H200 NVL · Gen12 최신',
    color: '#ff6eb4', bg: 'rgba(255,110,180,.07)', border: 'rgba(255,110,180,.3)',
    desc: '최신 Gen12 AI 서버. NVIDIA H200 NVL ×8 탑재. H100 대비 추론 속도 2배. 전용 이중화 GPU 전원 ×6 탑재. MLPerf 1위 플랫폼.',
    specs: [['FORM','2U Rack, 듀얼 소켓 · Gen12'],['GPU','NVIDIA H200 NVL ×8 (H100 대비 2× 추론 속도)'],['CPU','Intel Xeon 6 프로세서'],['COOLING','직접 수랭(DLC) 지원'],['보안','HPE iLO 7 + FIPS 140-3 Level 3'],['MGMT','HPE Compute Ops Management']],
    useCases: ['엔터프라이즈 AI','LLM 추론','AI 파인튜닝','GenAI'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR }],
    Img: ImgAI_H200, imgH: 'h-[82px]', isNew: true,
  },
  {
    category: 'ai', name: 'ProLiant DL384 Gen12', sub: '2U · NVIDIA GH200 NVL2 Superchip · Gen12',
    tier: 'AI · GH200 SUPERCHIP · Gen12 최신',
    color: '#c084fc', bg: 'rgba(192,132,252,.07)', border: 'rgba(192,132,252,.3)',
    desc: 'HPE 최초 GH200 NVL2 Grace Hopper 슈퍼칩 탑재 서버. Grace CPU + Hopper GPU 통합 1.2TB 통합 메모리. LLM 추론·파인튜닝·RAG에 최적.',
    specs: [['FORM','2U Rack · Gen12'],['CHIP','NVIDIA GH200 NVL2 ×2 (Grace CPU + Hopper GPU)'],['MEMORY','1.2TB 통합 메모리 (LPDDR5X + HBM3e)'],['성능','8 PFLOPS AI 성능 / 5TB/s 대역폭'],['보안','HPE iLO 7 + FIPS 140-3 Level 3'],['특징','H100 대비 메모리 3.5×, 대역폭 3×']],
    useCases: ['초거대 LLM','RAG 추론','AI 파인튜닝','기상해양 시뮬레이션'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR }],
    Img: ImgAI_GH200, imgH: 'h-[82px]', isNew: true,
  },
  // ── 랙 서버 ──────────────────────────────────────────────
  {
    category: 'rack', name: 'ProLiant DL325 Gen11', sub: '1U · SINGLE SOCKET · AMD EPYC · 가성비',
    tier: '1U · AMD EPYC · 가성비',
    color: '#60a5fa', bg: 'rgba(96,165,250,.07)', border: 'rgba(96,165,250,.25)',
    desc: '1P 경제성의 AMD EPYC 1U 서버. 최대 160코어·3TB DDR5. Intel 기반 대비 동급 최고 가성비. 소프트웨어 정의·CDN·VDI에 최적.',
    specs: [['FORM','1U Rack, 싱글 소켓'],['CPU','AMD EPYC 9004/9005 (최대 160코어)'],['MEMORY','최대 3TB DDR5 6400MT/s'],['GPU','최대 4x SW 또는 2x DW GPU'],['PCIe','PCIe Gen5 (2 x16 + OCP 2슬롯)'],['MGMT','HPE iLO 6 (AMD Silicon RoT)']],
    useCases: ['SDS','CDN','VDI','가상화 가성비'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR }],
    Img: Img1U_AMD, imgH: 'h-[44px]',
  },
  {
    category: 'rack', name: 'ProLiant DL360 Gen11', sub: '1U · DUAL SOCKET · COMPUTE DENSE',
    tier: '1U · COMPUTE OPTIMIZED',
    color: '#00A3E0', bg: 'rgba(0,163,224,.07)', border: 'rgba(0,163,224,.25)',
    desc: '1U 고밀도 랙 서버. EDA·CAD·VDI·컨테이너 집약 워크로드 최적화. 소형 폼팩터에서 최대 64코어·8TB DDR5 구현.',
    specs: [['FORM','1U Rack, 듀얼 소켓'],['CPU','4th/5th Gen Intel Xeon (최대 64코어)'],['MEMORY','최대 8TB DDR5 (32 DIMM)'],['STORAGE','최대 10 SFF SAS/SATA/NVMe'],['PCIe','PCIe Gen5 (최대 3 x16 슬롯)'],['MGMT','HPE iLO 6 (Silicon Root of Trust)']],
    useCases: ['EDA/CAD','VDI','컨테이너','일반 가상화'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR },{ label: '데이터시트 (PDF)', href: 'https://www.hpe.com/psnow/doc/PSN1014696065USEN.pdf' }],
    Img: Img1U, imgH: 'h-[44px]',
  },
  {
    category: 'rack', name: 'ProLiant DL380 Gen11', sub: '2U · DUAL SOCKET · INDUSTRY STANDARD',
    tier: '2U · VERSATILE FLAGSHIP',
    color: '#01A982', bg: 'rgba(1,169,130,.07)', border: 'rgba(1,169,130,.25)',
    desc: '업계 표준 2U 플래그십. 확장성과 유연성의 최적 균형. AI/ML·빅데이터·가상화·SDS까지 모든 환경을 커버하는 범용 플랫폼.',
    specs: [['FORM','2U Rack, 듀얼 소켓'],['CPU','4th/5th Gen Intel Xeon (최대 64코어, 350W)'],['MEMORY','최대 8TB DDR5 (32 DIMM)'],['STORAGE','최대 24 SFF 또는 12 LFF / NVMe'],['PCIe','PCIe Gen5 (최대 8슬롯 + OCP 2슬롯)'],['GPU','최대 8x SW 또는 3x DW GPU']],
    useCases: ['AI/ML','빅데이터','가상화','SDS','클라우드'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR },{ label: '데이터시트 (PDF)', href: 'https://www.hpe.com/psnow/doc/PSN1014696069USEN.pdf' }],
    Img: Img2U, imgH: 'h-[82px]',
  },
  {
    category: 'rack', name: 'ProLiant DL560 Gen11', sub: '2U · QUAD SOCKET · SCALE-UP',
    tier: '2U · MISSION CRITICAL',
    color: '#7B5EA7', bg: 'rgba(123,94,167,.07)', border: 'rgba(123,94,167,.25)',
    desc: '4소켓 고성능 서버. 최대 16TB DDR5로 인메모리DB·대규모 가상화 최적. SAP HANA 공식 인증.',
    specs: [['FORM','2U Rack, 쿼드 소켓 (4S)'],['CPU','4th Gen Intel Xeon (최대 60코어 ×4)'],['MEMORY','최대 16TB DDR5 (64 DIMM)'],['STORAGE','SFF/LFF 혼합 구성'],['PCIe','PCIe Gen5 (최대 6슬롯 + OCP 2슬롯)'],['GPU','최대 6x SW GPU']],
    useCases: ['인메모리 DB','SAP HANA','대규모 가상화','ERP'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR },{ label: '데이터시트 (PDF)', href: 'https://www.hpe.com/psnow/doc/PSN1014705735USEN.pdf' }],
    Img: Img4S, imgH: 'h-[82px]',
  },
  // ── 타워 서버 ──────────────────────────────────────────────
  {
    category: 'tower', name: 'ProLiant ML110 Gen11', sub: 'TOWER · SINGLE SOCKET · ENTRY',
    tier: '타워 · 싱글소켓 · 엔트리',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.25)',
    desc: '중소기업·지사 최적화 엔트리 타워 서버. 경제적 가격으로 엔터프라이즈급 보안·안정성 제공. 5.5U 랙 전환 가능.',
    specs: [['FORM','타워 (5.5U 랙 전환 가능)'],['CPU','4th/5th Gen Intel Xeon (싱글 소켓)'],['MEMORY','최대 1.5TB DDR5 (16 DIMM)'],['STORAGE','최대 8 LFF 또는 16 SFF'],['PCIe','PCIe Gen5 (4 x16 + OCP 1슬롯)'],['MGMT','HPE iLO 6']],
    useCases: ['중소기업 IT','파일 서버','원격 사무소','경량 가상화'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR }],
    Img: ImgTower, imgH: 'h-[130px]',
  },
  {
    category: 'tower', name: 'ProLiant ML350 Gen11', sub: 'TOWER · DUAL SOCKET · ENTERPRISE',
    tier: '타워 · 듀얼소켓 · 엔터프라이즈',
    color: '#fb923c', bg: 'rgba(251,146,60,.07)', border: 'rgba(251,146,60,.25)',
    desc: '중견·대기업용 2P 엔터프라이즈 타워 서버. 최대 64코어·8TB DDR5·GPU 4개 지원. 랙 마운트 섀시 옵션 가능.',
    specs: [['FORM','타워 (랙 마운트 섀시 옵션)'],['CPU','4th/5th Gen Intel Xeon (최대 64코어)'],['MEMORY','최대 8TB DDR5'],['STORAGE','최대 12 E3.S NVMe + LFF/SFF'],['PCIe','PCIe Gen5 (최대 10슬롯)'],['GPU','최대 4x DW GPU 지원']],
    useCases: ['데이터 분석','VDI','ERP/CRM','AI 추론'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR }],
    Img: ImgTower, imgH: 'h-[130px]',
  },
  // ── 엣지 서버 ──────────────────────────────────────────────
  {
    category: 'edge', name: 'ProLiant DL320 Gen11', sub: '1U · SINGLE SOCKET · EDGE COMPUTE',
    tier: '1U · 엣지 최적화',
    color: '#34d399', bg: 'rgba(52,211,153,.07)', border: 'rgba(52,211,153,.25)',
    desc: '엣지 컴퓨팅 전용 1U 1P 서버. 컴팩트 모듈식 설계로 현장·원격지 배포 최적. GPU 최대 4개 지원으로 엣지 AI·비디오 분석 가능.',
    specs: [['FORM','1U Rack, 싱글 소켓'],['CPU','4th/5th Gen Intel Xeon (최대 60코어)'],['MEMORY','최대 2TB DDR5 5600MT/s'],['GPU','최대 4x SW 또는 2x DW GPU'],['PCIe','PCIe Gen5'],['용도','엣지 AI·영상 분석·VDI']],
    useCases: ['엣지 AI','영상 분석','VDI','컨테이너화'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR }],
    Img: ImgEdge1U, imgH: 'h-[44px]',
  },
  {
    category: 'edge', name: 'ProLiant DL145 Gen11', sub: '2U · SINGLE SOCKET · RUGGED EDGE',
    tier: '2U · 견고형 엣지',
    color: '#2dd4bf', bg: 'rgba(45,212,191,.07)', border: 'rgba(45,212,191,.25)',
    desc: '극한 환경용 견고형 엣지 서버. -5°C~55°C 동작, 내먼지·내진동 설계. 국방·소매·제조·통신 현장 특화.',
    specs: [['FORM','2U Rack, 싱글 소켓'],['CPU','AMD EPYC 8004 Zen4c (최대 64코어)'],['환경','-5°C ~ 55°C, 내먼지·내진동'],['GPU','최대 3x GPU 지원'],['PCIe','PCIe Gen5, EDSFF 스토리지'],['MGMT','HPE Compute Ops Management']],
    useCases: ['국방·현장','소매 AI','산업 자동화','원격지 배포'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_KR }],
    Img: ImgEdge, imgH: 'h-[82px]',
  },
  // ── 컴포저블 ──────────────────────────────────────────────
  {
    category: 'composable', name: 'Synergy 480 Gen11', sub: 'HALF-HEIGHT · HALF-WIDTH · COMPOSABLE',
    tier: 'COMPOSABLE · 2-SOCKET BLADE',
    color: '#00C9B1', bg: 'rgba(0,201,177,.07)', border: 'rgba(0,201,177,.25)',
    desc: '컴포저블 인프라 핵심 2소켓 블레이드. HPE OneView 소프트웨어 정의로 즉시 프로비저닝. 하이브리드 클라우드·DevOps에 최적.',
    specs: [['FORM','Half-Height, Half-Width'],['CPU','4th/5th Gen Intel Xeon (최대 64코어)'],['MEMORY','최대 8TB DDR5'],['STORAGE','최대 8 SFF 드라이브'],['MGMT','HPE OneView (소프트웨어 정의)'],['FRAME','HPE Synergy 12000 Frame']],
    useCases: ['가상화','컨테이너','하이브리드 클라우드','DevOps'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_SYNERGY_KR }],
    Img: ImgBlade, imgH: 'h-[110px]',
  },
  {
    category: 'composable', name: 'Synergy 660 Gen10', sub: 'FULL-HEIGHT · SINGLE-WIDTH · SCALE-UP',
    tier: 'COMPOSABLE · 4-SOCKET BLADE',
    color: '#38D9F5', bg: 'rgba(56,217,245,.07)', border: 'rgba(56,217,245,.25)',
    desc: '4소켓 풀-하이트 블레이드. 최대 6TB DDR4(48 DIMM)로 대규모 스케일업 DB·극한 가상화 최적. 컴포저블 인프라 내 최고 메모리 밀도.',
    specs: [['FORM','Full-Height, Single-Width'],['CPU','Intel Xeon Scalable (2S 또는 4S)'],['MEMORY','최대 6TB DDR4 (48 DIMM)'],['STORAGE','최대 4 SFF 드라이브'],['MGMT','HPE OneView + iLO 통합'],['FRAME','HPE Synergy 12000 Frame']],
    useCases: ['대용량 DB','인메모리 분석','극한 가상화','ERP'],
    links: [{ label: '한국 공식 제품 페이지', href: HPE_SYNERGY_KR }],
    Img: ImgBlade, imgH: 'h-[110px]',
  },
];

const TABS = [
  { id: 'all',        label: '전체',      icon: '⬛', color: '#00A3E0' },
  { id: 'ai',         label: 'AI · GPU',  icon: '🤖', color: '#f472b6' },
  { id: 'rack',       label: '랙 서버',   icon: '🖥️', color: '#01A982' },
  { id: 'tower',      label: '타워 서버', icon: '🏢', color: '#fbbf24' },
  { id: 'edge',       label: '엣지 서버', icon: '🌐', color: '#34d399' },
  { id: 'composable', label: '컴포저블',  icon: '🧩', color: '#00C9B1' },
];

export default function HpeServerPage() {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = activeTab === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeTab);
  const activeTabData = TABS.find(t => t.id === activeTab)!;

  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff]">

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-12 px-4 md:px-10 border-b border-[rgba(31,74,117,.5)] overflow-hidden">
        <AnimatedHeroBg variant="blue" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 80% at 20% 50%,rgba(0,163,224,.06) 0%,transparent 60%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm" style={{ color: '#00A3E0', background: 'rgba(0,163,224,.07)', border: '1px solid rgba(0,163,224,.3)' }}>HPE 공식 파트너</span>
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm text-[#f472b6] bg-[rgba(244,114,182,.07)] border border-[rgba(244,114,182,.2)]">AI · GPU 서버</span>
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm text-[#01A982] bg-[rgba(1,169,130,.07)] border border-[rgba(1,169,130,.2)]">ProLiant Gen11 / Gen12</span>
              <span className="font-mono text-[9px] tracking-[.18em] px-3 py-1 rounded-sm text-[#00C9B1] bg-[rgba(0,201,177,.07)] border border-[rgba(0,201,177,.2)]">Synergy 컴포저블</span>
            </div>
            <h1 className="font-['Bebas_Neue'] text-[40px] md:text-[56px] lg:text-[72px] leading-[.92] tracking-wide mb-5">
              <span style={{ background: 'linear-gradient(135deg,#00A3E0,#00C9B1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HPE 서버</span>
              <br />
              <span className="text-[20px] md:text-[28px] lg:text-[38px] text-[rgba(200,220,255,.76)] font-['Noto_Sans_KR'] font-light tracking-normal">AI · 랙 · 타워 · 엣지 · 컴포저블</span>
            </h1>
            <p className="text-[15px] text-[rgba(200,220,255,.76)] font-light leading-[1.85] mb-8 max-w-xl">
              HPE ProLiant Gen11 · Gen12 전 라인업. GH200 슈퍼칩 서버부터 견고형 엣지, 컴포저블 블레이드까지. VWorks가 워크로드에 맞는 최적 구성을 제안합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/ko/contact/" className="text-[#050d1a] text-[14px] font-medium px-7 py-3 rounded-sm" style={{ background: 'linear-gradient(135deg,#00A3E0,#00C9B1)' }}>도입 상담 신청 →</Link>
              <a href="#lineup" className="border text-[14px] px-7 py-3 rounded-sm" style={{ borderColor: 'rgba(0,163,224,.3)', color: '#00A3E0' }}>제품 라인업 보기</a>
            </div>
          </div>
          <div className="bg-[#0a1628] rounded-sm p-6 relative overflow-hidden" style={{ border: '1px solid rgba(0,163,224,.3)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#00A3E0,#f472b6,#01A982,#00C9B1)' }} />
            <div className="font-mono text-[9px] tracking-[.2em] mb-4" style={{ color: '#00A3E0' }}>VWorks HPE 서버 포트폴리오</div>
            <div className="grid grid-cols-2 gap-[2px] mb-4">
              {[
                { n: '5',    l: '서버 카테고리',  s: 'AI·랙·타워·엣지·컴포저블', c: '#00A3E0' },
                { n: '14',   l: '공급 제품 라인', s: 'Gen11 + Gen12 전 라인',     c: '#f472b6' },
                { n: '160+', l: '최대 코어/소켓', s: 'AMD EPYC 9005 기준',        c: '#01A982' },
                { n: '1.2TB',l: 'GH200 통합 메모리',s: 'DL384 Gen12 기준',        c: '#00C9B1' },
              ].map((s) => (
                <div key={s.l} className="bg-[#0e1e35] border border-[rgba(31,74,117,.5)] p-3 text-center">
                  <div className="font-['Bebas_Neue'] text-[20px] leading-tight" style={{ color: s.c }}>{s.n}</div>
                  <div className="text-[10px] text-[rgba(200,220,255,.76)] my-0.5 leading-[1.3]">{s.l}</div>
                  <div className="font-mono text-[8px] text-[#5a7a9a]">{s.s}</div>
                </div>
              ))}
            </div>
            <div className="font-mono text-[8px] text-[#5a7a9a] tracking-[.1em] mb-2">카테고리별 제품</div>
            <div className="flex flex-wrap gap-1">
              {TABS.filter(t => t.id !== 'all').map(t => (
                <span key={t.id} className="font-mono text-[9px] px-2 py-1 rounded-sm"
                  style={{ color: t.color, background: `${t.color}11`, border: `1px solid ${t.color}44` }}>
                  {t.icon} {t.label} ({PRODUCTS.filter(p => p.category === t.id).length})
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 제품명 읽는 법 ── */}
      <section className="px-4 md:px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#00A3E0' }}>네이밍 가이드</div>
          <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[44px] lg:text-[52px] tracking-wide leading-none mb-2">
            제품명 읽는 법
          </h2>
          <p className="text-[13px] text-[#5a7a9a] font-light leading-[1.8] mb-8 max-w-xl">
            HPE ProLiant 모델명은 폼팩터 · 클래스 · CPU아키텍처 · 세부모델 순으로 구성됩니다. 예시: <span className="font-mono text-[#00A3E0]">DL 3 8 0 a Gen11</span>
          </p>

          {/* ── 예시 박스 ── */}
          <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm p-6 md:p-8 mb-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#00A3E0,#00C9B1,transparent)' }} />
            <div className="font-mono text-[9px] tracking-[.2em] text-[#5a7a9a] mb-4">제품명 읽는 법 · ProLiant DL380a Gen11</div>

            {/* 칩 행 */}
            <div className="flex flex-wrap gap-2 mb-6 items-end">
              {[
                { val: 'DL',    lbl: '폼팩터',        color: '#00A3E0', bg: 'rgba(0,163,224,.1)',   border: 'rgba(0,163,224,.4)' },
                { val: '3',     lbl: '소켓 클래스',    color: '#01A982', bg: 'rgba(1,169,130,.1)',   border: 'rgba(1,169,130,.4)' },
                { val: '8',     lbl: 'CPU 아키텍처',   color: '#fbbf24', bg: 'rgba(251,191,36,.1)',  border: 'rgba(251,191,36,.4)' },
                { val: '0',     lbl: '세부 모델',      color: '#5a7a9a', bg: 'rgba(90,122,154,.1)',  border: 'rgba(90,122,154,.3)' },
                { val: 'a',     lbl: 'GPU 가속 변형',  color: '#f472b6', bg: 'rgba(244,114,182,.1)', border: 'rgba(244,114,182,.4)' },
                { val: 'Gen11', lbl: '세대',           color: '#00C9B1', bg: 'rgba(0,201,177,.1)',   border: 'rgba(0,201,177,.4)' },
              ].map(chip => (
                <div key={chip.val} className="flex flex-col items-center gap-1.5">
                  <div className="font-['Bebas_Neue'] text-[28px] md:text-[36px] leading-none px-4 md:px-5 py-2.5 rounded-sm min-w-[56px] text-center"
                    style={{ color: chip.color, background: chip.bg, border: `1px solid ${chip.border}` }}>
                    {chip.val}
                  </div>
                  <div className="font-mono text-[8px] tracking-[.08em] text-center" style={{ color: chip.color }}>{chip.lbl}</div>
                </div>
              ))}
            </div>

            {/* 해석 결과 */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[rgba(31,74,117,.4)]">
              <span className="font-mono text-[9px] tracking-[.15em] text-[#5a7a9a]">DL380a Gen11 =</span>
              <span className="font-mono text-[10px] text-[#00A3E0]">Rack 서버</span>
              <span className="text-[#5a7a9a]">·</span>
              <span className="font-mono text-[10px] text-[#01A982]">2소켓 클래스</span>
              <span className="text-[#5a7a9a]">·</span>
              <span className="font-mono text-[10px] text-[#fbbf24]">Intel 2U</span>
              <span className="text-[#5a7a9a]">·</span>
              <span className="font-mono text-[10px] text-[#f472b6]">GPU 가속 특화</span>
              <span className="text-[#5a7a9a]">·</span>
              <span className="font-mono text-[10px] text-[#00C9B1]">11세대</span>
              <span className="text-[#5a7a9a]">→</span>
              <span className="text-[11px] text-[rgba(200,220,255,.76)]">Intel Xeon 기반 AI GPU 최적화 2U 랙서버 · 11세대</span>
            </div>
          </div>

          {/* ── 각 자리 설명 그리드 ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] mb-2">

            {/* 폼팩터 */}
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#00A3E0' }} />
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-['Bebas_Neue'] text-[32px] leading-none" style={{ color: '#00A3E0' }}>DL / ML / BL</span>
                <span className="font-mono text-[8px] tracking-[.15em] text-[#5a7a9a]">폼팩터</span>
              </div>
              <div className="space-y-2">
                {[
                  { k: 'DL', v: 'Dense/Rack — 19인치 랙 마운트 서버' },
                  { k: 'ML', v: 'MicroLine — 타워형 (세로 설치)' },
                  { k: 'BL/Synergy', v: 'Blade — 섀시 장착 블레이드' },
                ].map(r => (
                  <div key={r.k} className="flex gap-3 items-start">
                    <span className="font-mono text-[10px] font-bold w-16 flex-shrink-0" style={{ color: '#00A3E0' }}>{r.k}</span>
                    <span className="text-[11px] text-[#5a7a9a] leading-[1.6]">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 첫 번째 숫자 */}
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#01A982' }} />
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-['Bebas_Neue'] text-[32px] leading-none" style={{ color: '#01A982' }}>첫째 자리</span>
                <span className="font-mono text-[8px] tracking-[.15em] text-[#5a7a9a]">소켓 클래스</span>
              </div>
              <div className="space-y-2">
                {[
                  { k: '1·3xx', v: '1~2소켓 (싱글·듀얼) — DL325·DL360·DL380' },
                  { k: '5xx',   v: '4소켓 스케일업 — DL560·DL580' },
                  { k: 'ML3xx', v: '타워 엔터프라이즈 — ML350 (2소켓)' },
                ].map(r => (
                  <div key={r.k} className="flex gap-3 items-start">
                    <span className="font-mono text-[10px] font-bold w-16 flex-shrink-0" style={{ color: '#01A982' }}>{r.k}</span>
                    <span className="text-[11px] text-[#5a7a9a] leading-[1.6]">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 두 번째 숫자 */}
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#fbbf24' }} />
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-['Bebas_Neue'] text-[32px] leading-none" style={{ color: '#fbbf24' }}>둘째 자리</span>
                <span className="font-mono text-[8px] tracking-[.15em] text-[#5a7a9a]">CPU 아키텍처</span>
              </div>
              <div className="space-y-2">
                {[
                  { k: '2',  v: 'Intel 기반 1U — DL320·DL360' },
                  { k: '6',  v: 'AMD EPYC 전용 — DL325·DL365·DL385' },
                  { k: '8',  v: 'Intel 기반 2U — DL380·DL580' },
                  { k: '84', v: 'GPU 전용 특수 — DL384(GH200)' },
                ].map(r => (
                  <div key={r.k} className="flex gap-3 items-start">
                    <span className="font-mono text-[10px] font-bold w-16 flex-shrink-0" style={{ color: '#fbbf24' }}>{r.k}</span>
                    <span className="text-[11px] text-[#5a7a9a] leading-[1.6]">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 접미사 */}
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#f472b6' }} />
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-['Bebas_Neue'] text-[32px] leading-none" style={{ color: '#f472b6' }}>접미사</span>
                <span className="font-mono text-[8px] tracking-[.15em] text-[#5a7a9a]">특화 변형 (없으면 범용)</span>
              </div>
              <div className="space-y-2">
                {[
                  { k: 'a',    v: 'Accelerated — GPU 가속 최적화 (DL380a·DL384)' },
                  { k: 's',    v: 'Storage Dense — 드라이브 베이 집약형' },
                  { k: 'xs',   v: 'Cross-Scale — 1DPC·HPC 스케일아웃 특화' },
                  { k: '없음', v: '범용 — 표준 구성' },
                ].map(r => (
                  <div key={r.k} className="flex gap-3 items-start">
                    <span className="font-mono text-[10px] font-bold w-16 flex-shrink-0" style={{ color: '#f472b6' }}>{r.k}</span>
                    <span className="text-[11px] text-[#5a7a9a] leading-[1.6]">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 세대 */}
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#00C9B1' }} />
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-['Bebas_Neue'] text-[32px] leading-none" style={{ color: '#00C9B1' }}>Gen 번호</span>
                <span className="font-mono text-[8px] tracking-[.15em] text-[#5a7a9a]">세대</span>
              </div>
              <div className="space-y-2">
                {[
                  { k: 'Gen10/10+', v: 'Xeon 1~3세대·EPYC 1~2세대. iLO 5. 레거시' },
                  { k: 'Gen11',     v: 'Xeon 4~5세대·EPYC 9004/9005. PCIe Gen5. iLO 6 — 현행 주력' },
                  { k: 'Gen12',     v: 'Xeon 6·GH200. iLO 7. FIPS 140-3. 수랭 기본 — 최신' },
                ].map(r => (
                  <div key={r.k} className="flex gap-3 items-start">
                    <span className="font-mono text-[10px] font-bold w-20 flex-shrink-0" style={{ color: '#00C9B1' }}>{r.k}</span>
                    <span className="text-[11px] text-[#5a7a9a] leading-[1.6]">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 빠른 해석 예시 */}
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#00A3E0,#00C9B1)' }} />
              <div className="font-mono text-[8px] tracking-[.2em] text-[#5a7a9a] mb-3">빠른 해석 예시</div>
              <div className="space-y-3">
                {[
                  { name: 'DL325 Gen11', desc: 'AMD EPYC 1U · 가성비 싱글소켓',   color: '#60a5fa' },
                  { name: 'DL385 Gen11', desc: 'AMD EPYC 2U · AI/ML 듀얼소켓',    color: '#e879f9' },
                  { name: 'DL560 Gen11', desc: 'Intel 2U · 4소켓 스케일업',        color: '#7B5EA7' },
                  { name: 'DL384 Gen12', desc: 'GH200 슈퍼칩 · GPU 전용 Gen12',   color: '#c084fc' },
                  { name: 'ML350 Gen11', desc: '타워형 · 듀얼소켓 · 엔터프라이즈', color: '#fb923c' },
                ].map(ex => (
                  <div key={ex.name} className="flex items-start gap-2">
                    <span className="font-mono text-[10px] font-bold w-28 flex-shrink-0" style={{ color: ex.color }}>{ex.name}</span>
                    <span className="text-[11px] text-[#5a7a9a] leading-[1.5]">{ex.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 탭 필터 + 제품 그리드 ── */}
      <section id="lineup" className="px-4 md:px-10 py-16 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#00A3E0' }}>HPE ProLiant 제품 라인업</div>
          <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[44px] lg:text-[52px] tracking-wide leading-none mb-8">전체 서버 포트폴리오</h2>

          {/* 탭 버튼 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-[11px] tracking-[.08em] transition-all duration-200"
                style={{
                  color: activeTab === tab.id ? '#050d1a' : tab.color,
                  background: activeTab === tab.id ? tab.color : `${tab.color}11`,
                  border: `1px solid ${activeTab === tab.id ? tab.color : `${tab.color}44`}`,
                  fontWeight: activeTab === tab.id ? 700 : 400,
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className="text-[9px] opacity-70">
                  ({tab.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === tab.id).length})
                </span>
              </button>
            ))}
          </div>

          {/* 탭 설명 */}
          {activeTab !== 'all' && (
            <div className="mb-6 px-4 py-3 rounded-sm text-[12px] font-light"
              style={{ background: `${activeTabData.color}0d`, border: `1px solid ${activeTabData.color}33`, color: activeTabData.color }}>
              {{ ai: '🤖 AI·ML 훈련 및 추론에 특화된 GPU 가속 서버. Gen11 H100부터 Gen12 GH200 슈퍼칩까지.', rack: '🖥️ 데이터센터 표준 19인치 랙 서버. Intel Xeon·AMD EPYC 1U/2U/4소켓 라인업.', tower: '🏢 중소기업·사무실용 타워형 서버. 경제적이고 조용한 운영. 랙 전환 가능.', edge: '🌐 현장·원격지·국방 환경 특화. -5°C~55°C 혹독한 환경에서도 안정적 동작.', composable: '🧩 HPE OneView 기반 소프트웨어 정의 컴포저블 인프라. 템플릿 즉시 프로비저닝.' }[activeTab]}
            </div>
          )}

          {/* 제품 그리드 */}
          <div className={`grid gap-[2px] ${filtered.length <= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {filtered.map((p) => (
              <div key={p.name} className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm overflow-hidden flex flex-col">

                {/* ① 카테고리 뱃지 + tier */}
                <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-[rgba(31,74,117,.3)]">
                  <div className="font-mono text-[8px] tracking-[.12em] flex items-center gap-2" style={{ color: p.color }}>
                    {p.tier}
                    {p.isNew && (
                      <span className="text-[7px] px-1.5 py-0.5 rounded-sm font-bold" style={{ background: p.color, color: '#050d1a' }}>NEW</span>
                    )}
                  </div>
                  <span className="font-mono text-[8px] px-2 py-0.5 rounded-sm flex-shrink-0"
                    style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}>
                    {TABS.find(t => t.id === p.category)?.icon} {TABS.find(t => t.id === p.category)?.label}
                  </span>
                </div>

                {/* ② SVG 이미지 */}
                <div className="px-5 py-4 relative" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,.15),transparent)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,${p.color},transparent)` }} />
                  <div className={`${p.imgH} flex items-center justify-center ${p.category === 'tower' ? 'max-w-[100px] mx-auto' : ''}`}>
                    <p.Img c={p.color} />
                  </div>
                </div>

                {/* ③ 제품명 + 설명 */}
                <div className="px-5 pb-3 pt-2 border-t border-[rgba(31,74,117,.3)]">
                  <div className="font-['Bebas_Neue'] text-[22px] leading-none mb-0.5" style={{ color: p.color }}>{p.name}</div>
                  <div className="font-mono text-[8px] tracking-[.07em] text-[#5a7a9a] mb-3">{p.sub}</div>
                  <p className="text-[12px] text-[rgba(200,220,255,.76)] font-light leading-[1.75]">{p.desc}</p>
                </div>

                {/* ④ 스펙 */}
                <div className="px-5 py-3 bg-[#0e1e35] border-t border-[rgba(31,74,117,.5)]">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-1.5 border-b border-[rgba(31,74,117,.3)] last:border-b-0">
                      <span className="font-mono text-[8px] tracking-[.1em] text-[#5a7a9a] flex-shrink-0">{k}</span>
                      <span className="text-[10px] text-[rgba(200,220,255,.76)] text-right ml-2">{v}</span>
                    </div>
                  ))}
                </div>

                {/* ⑤ 유스케이스 */}
                <div className="px-5 py-2.5 border-t border-[rgba(31,74,117,.5)] flex flex-wrap gap-1">
                  {p.useCases.map(u => (
                    <span key={u} className="font-mono text-[8px] px-2 py-0.5 rounded-sm"
                      style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}>{u}</span>
                  ))}
                </div>

                {/* ⑥ 링크 */}
                <div className="px-5 py-2.5 border-t border-[rgba(31,74,117,.5)] flex flex-col gap-1 mt-auto">
                  {p.links.map(l => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-mono tracking-[.07em] py-0.5 transition-opacity hover:opacity-70"
                      style={{ color: p.color }}>
                      <span>↗</span> {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY VWORKS ── */}
      <section className="px-4 md:px-10 pb-20 reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-3" style={{ color: '#00A3E0' }}>왜 VWorks인가</div>
          <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[44px] lg:text-[52px] tracking-wide leading-none mb-10">HPE 서버 도입,<br />VWorks를 선택해야 하는 이유</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px]">
            {[
              { n: '01', t: 'HPE 공식 파트너',       d: '하드웨어 공급부터 설치·운영까지 원스톱. HPE 공식 채널 정품 보증 및 기술지원.' },
              { n: '02', t: '국방·공공 HPC 레퍼런스', d: '해군 해양수치모델 HPC 구축 2건. 국방·공공기관 보안 요건 맞춤 서버 도입 전문.' },
              { n: '03', t: '조달 등록 업체',         d: '방위사업청 등록업체. 보안심사·적합성 검증·조달 절차 전 과정 지원.' },
              { n: '04', t: '풀스택 인프라 구축',     d: '서버·스토리지·네트워크·SW 스택·망분리까지. 전체 IT 인프라 설계·구축·유지보수.' },
            ].map((w) => (
              <div key={w.n} className="p-6 bg-[#0a1628] border border-[rgba(31,74,117,.5)] rounded-sm relative overflow-hidden transition-colors hover:border-[rgba(0,163,224,.3)]">
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,#00A3E0,transparent)' }} />
                <div className="font-['Bebas_Neue'] text-[44px] leading-none mb-2" style={{ color: 'rgba(0,163,224,.12)' }}>{w.n}</div>
                <div className="font-['Bebas_Neue'] text-[18px] tracking-wide leading-tight mb-2">{w.t}</div>
                <div className="text-[12px] text-[#5a7a9a] font-light leading-[1.8]">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 md:px-10 py-20 text-center reveal opacity-0 translate-y-5 transition-all duration-500">
        <div className="max-w-xl mx-auto">
          <div className="font-mono text-[9px] tracking-[.3em] mb-4" style={{ color: '#00A3E0' }}>HPE 서버 도입 문의</div>
          <h2 className="font-['Bebas_Neue'] text-[40px] md:text-[52px] lg:text-[64px] tracking-wide leading-none mb-4">최적의 서버 구성을<br />제안해 드립니다</h2>
          <p className="text-[15px] text-[#5a7a9a] font-light leading-[1.7] mb-8">워크로드·규모·예산을 공유해 주시면 최적 HPE 서버 구성을 제안드립니다.</p>
          <div className="grid grid-cols-2 gap-[2px] max-w-sm mx-auto mb-8">
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] p-4">
              <div className="font-mono text-[8.5px] tracking-[.15em] mb-1" style={{ color: '#00A3E0' }}>PHONE</div>
              <div className="text-[13px] text-[rgba(200,220,255,.76)] font-light">051-747-6428</div>
            </div>
            <div className="bg-[#0a1628] border border-[rgba(31,74,117,.5)] p-4">
              <div className="font-mono text-[8.5px] tracking-[.15em] mb-1" style={{ color: '#00A3E0' }}>EMAIL</div>
              <div className="text-[13px] text-[rgba(200,220,255,.76)] font-light">aiden@vworks.tech</div>
            </div>
          </div>
          <Link href="/ko/contact/?from=HPE 서버"
            className="inline-flex items-center text-[#050d1a] text-[16px] font-medium px-12 py-4 rounded-sm"
            style={{ background: 'linear-gradient(135deg,#00A3E0,#00C9B1)' }}>
            HPE 서버 도입 문의하기 →
          </Link>
          <div className="mt-4 font-mono text-[10px] tracking-[.12em] text-[#5a7a9a]">문의 접수 후 1~2 영업일 내 전문 엔지니어가 연락드립니다</div>
        </div>
      </section>

    </main>
  );
}
