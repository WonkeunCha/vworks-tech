const fs = require('fs');
const path = require('path');

const base = process.argv[2];
if (!base) { console.error('Usage: node fix_vworks.js <project_path>'); process.exit(1); }

// 1. src/app/[locale]/page.tsx → 진짜 홈 페이지로 교체
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
console.log('✅ 1. [locale]/page.tsx → 홈 컴포넌트로 교체 완료');

// 2. src/app/page.tsx → 클라이언트 리다이렉트
const rootPage = `"use client";
import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    window.location.replace("/vworks-tech/ko/");
  }, []);
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/vworks-tech/ko/" />
      </head>
      <body />
    </html>
  );
}
`;
fs.writeFileSync(path.join(base, 'src/app/page.tsx'), rootPage, 'utf8');
console.log('✅ 2. src/app/page.tsx → 클라이언트 리다이렉트 완료');

// 3. tailwind.config.ts content 경로 확인 및 수정
const twConfig = `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
`;
fs.writeFileSync(path.join(base, 'tailwind.config.ts'), twConfig, 'utf8');
console.log('✅ 3. tailwind.config.ts content 경로 수정 완료');

// 4. postcss.config.mjs 확인
const postCss = `const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
`;
fs.writeFileSync(path.join(base, 'postcss.config.mjs'), postCss, 'utf8');
console.log('✅ 4. postcss.config.mjs 재작성 완료');

console.log('\n🎉 모든 수정 완료! 이제 npm run build 실행하세요.');
