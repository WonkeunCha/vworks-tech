# VWorks Technologies — Website Changelog

## v4.0.0 (2026-03-09)

### 추가된 파일
- `src/app/[locale]/solutions/dell-server/page.tsx` — Dell PowerEdge 15G/16G 서버 제품군 페이지
  - **15G/16G 현행 제품만** 수록 (14G 이하 미포함)
  - Hero: Dell 공식 파트너 배지, 통계 패널 (16G/15G/모델 수/PCIe5)
  - 네이밍 가이드: R7625 분해 설명
  - **16G 탭 (4탭)**: Rack Intel (R260~R760xd2) / Rack AMD (R6615~R7725 Turin) / Tower (T160~T560) / 4소켓 (R860/R960)
  - **15G 탭 (2탭)**: Rack Intel (R250~R750xa) / Rack AMD (R6515~R7525)
  - 비교 테이블 11개 모델 · 스펙시트 8개 · WHY VWorks 4카드

### 수정된 파일
- `src/app/[locale]/solutions/page.tsx` — Dell 서버 카드 slug 활성화 및 설명 업데이트
- `package.json` — version 4.0.0


## v3.0.0 (2026-03-08)

### 추가된 파일
- `src/app/[locale]/solutions/hpe-cray/page.tsx` — HPE Cray 슈퍼컴퓨팅 시스템 솔루션 페이지
  - Hero: TOP500 #1~#3 배지, Stats 패널 (El Capitan 2.79 ExaFLOPS 등)
  - 시스템 라인업: EX4000 / EX2500 / Cray XD / ClusterStor E1000 (스펙표)
  - 기술 아키텍처: 6계층 소프트웨어 스택 + 핵심 기능 5가지
  - HPE Slingshot 인터커넥트: 200Gb/s · 12.8Tb/s · 3-hop
  - 적용 분야: 국방·기상·AI·R&D + 해군 레퍼런스 배너
  - 왜 VWorks: 4카드 (해군 2건·HPE 파트너·조달·풀스택)

- `src/app/[locale]/solutions/network-security/page.tsx` — 보안 솔루션 페이지 (망연계 + CDS)
  - Hero: 휴네시온 + 씨크랩 공식 총판 배지, Stats 4개
  - 망연계 이유: N²SF C/S/O 등급 대응 설명
  - i-oneNet 제품 탭: i-oneNet / UC / DD / DX (탭 전환)
  - KCDS-Guard 1000 CDS: 직접연동 vs CDS 비교 / 6대 기능 / 레퍼런스 13개 기관

### 수정된 파일
- `src/app/[locale]/solutions/page.tsx` — 솔루션 인덱스 카드 그리드로 교체
  - 6개 솔루션 카드 (VAST Data, HPE Cray, 보안 솔루션, HPC, AI 컴퓨팅, Dell)
  - 완료된 솔루션은 링크 활성화, 준비 중은 비활성 표시
- `src/styles/globals.css` — `.reveal` / `.reveal.visible` scroll reveal 애니메이션 추가
- `package.json` — version 3.0.0

### public 에셋 (V2.0에서 유지)
- `public/logo-white.png`
- `public/logo-black.png`
- `public/favicon.png`

---

## v2.0.0 (2026-03-08)
- VAST Data 솔루션 페이지 추가 (`/solutions/vast-data`)
- 실제 로고 이미지 적용 (logo-white.png, logo-black.png, favicon.png)
- solutions/page.tsx → vast-data로 리다이렉트

## v1.0.0 (2026-03-08)
- Next.js 15 초기 코드베이스
- Navbar, Footer, HeroSection, SolutionsSection, ReferenceSection, PartnersSection
- ContactForm + SMTP API Route
- i18n (ko/en) 설정
- Tailwind CSS v4 + shadcn/ui
