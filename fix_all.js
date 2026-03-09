const fs = require('fs');
const path = require('path');
const base = process.argv[2];
if (!base) { console.error('경로를 인자로 전달하세요'); process.exit(1); }

// ── 1. src/app/[locale]/page.tsx → 진짜 홈 ──
const homePage = `import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ReferenceSection from "@/components/sections/ReferenceSection";
import PartnersSection from "@/components/sections/PartnersSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff]">
      <HeroSection />
      <SolutionsSection />
      <ReferenceSection />
      <PartnersSection />
    </main>
  );
}
`;
fs.writeFileSync(path.join(base, 'src/app/[locale]/page.tsx'), homePage, 'utf8');
console.log('1. [locale]/page.tsx 교체 완료');

// ── 2. src/app/page.tsx → 루트 리다이렉트 ──
const rootPage = `"use client";
import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    window.location.replace("/vworks-tech/ko/");
  }, []);
  return null;
}
`;
fs.writeFileSync(path.join(base, 'src/app/page.tsx'), rootPage, 'utf8');
console.log('2. src/app/page.tsx 교체 완료');

// ── 3. Navbar.tsx 로고 경로 수정 (next/image basePath 자동 적용) ──
const navbarPath = path.join(base, 'src/components/layout/Navbar.tsx');
let navbar = fs.readFileSync(navbarPath, 'utf8');
// src="/logo-white.png" → src="/logo-white.png" 는 next/image가 basePath 자동 붙여줌
// 하지만 <img> 태그라면 수동으로 붙여야 함 - next/image 사용 여부 확인
const usesNextImage = navbar.includes("from 'next/image'") || navbar.includes('from "next/image"');
console.log('3. Navbar next/image 사용:', usesNextImage);
if (!usesNextImage) {
  navbar = navbar.replace(/src="\/logo-white\.png"/g, 'src="/vworks-tech/logo-white.png"');
  navbar = navbar.replace(/src="\/logo-black\.png"/g, 'src="/vworks-tech/logo-black.png"');
  fs.writeFileSync(navbarPath, navbar, 'utf8');
  console.log('   → img 태그 경로 수동 수정 완료');
} else {
  console.log('   → next/image 사용중. basePath 자동 적용됨 (수정 불필요)');
}

// ── 4. next.config.ts 확인 ──
const configPath = path.join(base, 'next.config.ts');
const config = fs.readFileSync(configPath, 'utf8');
console.log('4. next.config.ts basePath 설정:', config.includes('basePath') ? '있음' : '없음 ← 문제!');
console.log('   내용 미리보기:', config.substring(0, 300));

// ── 5. tailwind.config.ts 확인 ──
const twPath = path.join(base, 'tailwind.config.ts');
const tw = fs.readFileSync(twPath, 'utf8');
console.log('5. tailwind.config.ts content 경로 확인:');
const contentMatch = tw.match(/content:\s*\[([\s\S]*?)\]/);
if (contentMatch) console.log('   ', contentMatch[0]);

// ── 6. globals.css 확인 ──
const cssPath = path.join(base, 'src/styles/globals.css');
const css = fs.readFileSync(cssPath, 'utf8');
console.log('6. globals.css 처음 3줄:', css.split('\n').slice(0,3).join(' | '));

// ── 7. layout.tsx globals.css import 확인 ──
const layoutPath = path.join(base, 'src/app/layout.tsx');
const layout = fs.readFileSync(layoutPath, 'utf8');
console.log('7. layout.tsx globals import:', layout.includes('globals') ? '있음' : '없음 ← 문제!');
console.log('   처음 5줄:', layout.split('\n').slice(0,5).join(' | '));

// ── 8. solutions 하위 페이지 목록 ──
const solDir = path.join(base, 'src/app/[locale]/solutions');
if (fs.existsSync(solDir)) {
  const files = fs.readdirSync(solDir, { withFileTypes: true });
  console.log('8. solutions 하위 폴더:', files.map(f => f.name).join(', '));
} else {
  console.log('8. solutions 폴더 없음!');
}

console.log('\n완료! 이제 npm run build 하세요.');
