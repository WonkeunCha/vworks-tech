# VWorks Technologies — Website Changelog

## v5.0.0 (2026-03-09)

### 주요 변경
- `next-intl` 완전 제거 — 한국어 단일 언어로 단순화
- `[locale]` 동적 라우팅 제거 → 일반 라우팅으로 변경
- Netlify 배포 호환성 확보 (`netlify.toml` + `@netlify/plugin-nextjs`)
- 모든 URL `/ko/` prefix 제거 → `/`, `/solutions`, `/contact 등

### 파일 구조
```
src/app/
  page.tsx                    ← 홈
  layout.tsx                  ← 루트 레이아웃
  solutions/page.tsx          ← 솔루션 인덱스
  solutions/vast-data/        ← VAST Data
  solutions/hpe-cray/         ← HPE Cray
  solutions/dell-server/      ← Dell PowerEdge
  solutions/network-security/ ← 보안 솔루션
  contact/page.tsx            ← 문의 폼
  api/contact/route.ts        ← SMTP API
src/components/
  layout/Navbar.tsx
  layout/Footer.tsx
```
