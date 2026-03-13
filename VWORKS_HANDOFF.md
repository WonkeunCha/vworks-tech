# VWorks Technologies 홈페이지 작업 핸드오프

> 마지막 업데이트: 2026-03-14  
> 다음 채팅방에서 이 문서를 참고해 작업을 이어가세요.

---

## 프로젝트 기본 정보

| 항목 | 내용 |
|------|------|
| GitHub | `WonkeunCha/vworks-tech` |
| 로컬 경로 | `C:\Users\aiden\Downloads\vworks-tech-v4\vworks-v4` |
| 배포 URL | `https://www.vworks.tech/ko/` |
| 스택 | Next.js 15 / Tailwind CSS / GitHub Pages static export |
| 배포 방식 | `git push origin main` → GitHub Actions 자동 빌드 |

---

## PowerShell 필수 규칙

```powershell
# ✅ 파일 읽기/쓰기 — 반드시 절대 경로 사용
$file = "C:\Users\aiden\Downloads\vworks-tech-v4\vworks-v4\src\app\[locale]\page.tsx"
$bytes = [System.IO.File]::ReadAllBytes($file)
$code = [System.Text.Encoding]::UTF8.GetString($bytes)

# 수정 후 저장
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($file, $code, $utf8NoBom)

# ❌ 절대 사용 금지 (한글 깨짐 + 경로 오류)
node -e "..."
$content | Set-Content "파일.tsx"
```

---

## 이번 세션 완료 작업

### 1. 홈페이지 Hero 섹션 (`src/app/[locale]/page.tsx`)

**헤드라인 변경**
- `HPC · AI · 스토리지 / [타이핑] / 전문 인프라 기업` → `데이터의 속도로. / 비즈니스의 미래로`
- h1 아래 서브텍스트 추가: `HPC · AI · 스토리지 — [TypeWriter 타이핑]`
- Hero 내 CTA 버튼 2개 제거 (맨 아래 CTA 섹션에만 유지)

**뱃지 수정**
- `VAST Data 공식 총판 · Dell Technologies 파트너` → `VWORKS TECHNOLOGIES · VAST Data 공인 파트너`

**Hero 배경 교체**
- 기존 흰 점 파티클 → `HeroBg()` 인터랙티브 파티클 네트워크
  - 딥 네이비(`#020a1a`) 배경 + 블루 오브 2개
  - 마우스 반발 파티클 110개
  - 마우스 주변 빛나는 오브
  - 130px 이내 파티클끼리 연결선
  - 마우스 가까울수록 파티클 밝아짐

**중복 섹션 제거**
- 슬로건 섹션이 2개 존재하던 것 중 1개 제거

### 2. Navbar 로고 (`src/components/layout/Navbar.tsx`)
- 로고 크기: `h-9 w-auto max-w-[260px] object-contain`

### 3. About 페이지 (`src/app/[locale]/about/page.tsx`)
- Hero h1 `fontWeight: 900` → `fontWeight: 600` (다른 페이지와 통일)

---

## 현재 미완료 / 남은 작업

### 🔴 파티클 배경 전체 페이지 연장 (미완료)
- **목표:** Hero의 파티클 배경이 스크롤해도 Stats Bar, 사업카드 섹션 등 아래까지 이어지도록
- **시도했던 방법:** `canvas`를 `fixed` + `z-index: -1`로 변경 → 실패 (Navbar 깨짐)
- **실패 원인:** 전체 래퍼의 `bg-[#020a1a]`를 제거하면서 Navbar 배경이 투명해짐
- **올바른 접근법:**
  1. `canvas`는 `fixed` + `z-index: -1` 유지
  2. 전체 래퍼 `bg-[#020a1a]`는 **제거하지 말고** 유지
  3. 각 섹션 배경을 `bg-transparent`로만 변경
  4. Navbar는 별도 `bg` 클래스로 보호

### 🟡 현재 홈페이지 section 구조 (진단 완료)
```
section #1 pos=7773  — Hero (슬로건: 데이터의 속도로.)  ✅ 유지
section #2 pos=10150 — Stats Bar (5+, 3PB+, 24×7, 4년+)
section #3 pos=10671 — 3대 핵심 사업 영역
section #4 pos=12194 — Why VWorks
section #5 pos=14391 — 파트너 스트립
section #6 pos=14979 — CTA 섹션
```

### 🟡 HeroBg 상태 (진단 완료)
```
function HeroBg() { ... }  ✅ 정의됨
<HeroBg />                 ✅ JSX에 삽입됨 (이번 세션에서 수정)
canvas position: fixed     ✅ 적용됨
canvas z-index: -1         ✅ 적용됨
```

### 🟡 기타 남은 작업
- Dell 솔루션 페이지 모바일 반응형 수정 (파일: `src/app/[locale]/solutions/dell-server/page.tsx`)
  - 원인: 인라인 `style={{ padding: "20px 72px" }}`이 미디어쿼리 override
  - 전략: 전체 재작성 권장 (증분 패치 실패 이력 있음)
- HPE Cray / 보안 페이지 모바일 반응형 (VAST Data 페이지가 기준)
- 각 솔루션 페이지 문의하기 버튼 `?from=` 파라미터 추가

---

## 주요 파일 경로

```
src/
├── app/[locale]/
│   ├── page.tsx                    ← 홈페이지 (Hero + HeroBg)
│   ├── about/page.tsx              ← 회사소개
│   ├── contact/page.tsx            ← 문의하기
│   ├── solutions/
│   │   ├── vast-data/page.tsx      ← VAST Data (모바일 기준)
│   │   ├── dell-server/page.tsx    ← Dell (모바일 수정 필요)
│   │   ├── hpe-cray/page.tsx       ← HPE Cray
│   │   └── network-security/page.tsx
│   └── dev/wx-viz/page.tsx         ← 기상해양 가시화
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              ← 로고 max-w-[260px]
│   │   └── Footer.tsx
│   └── ui/
│       ├── ContactFormEmailJS.tsx  ← EmailJS 문의폼
│       └── EventPopup.tsx          ← 스타벅스 팝업
└── .github/workflows/deploy.yml   ← 배포 워크플로우
```

---

## EmailJS 설정

| 항목 | 값 |
|------|----|
| Service ID | `service_x5qus0h` |
| Template ID | `template_b9o6ede` |
| Public Key | `17r0XFH17PjAC674T` |

---

## 주요 상수 / 설정값

| 항목 | 값 |
|------|----|
| 본사 주소 | 부산광역시 해운대구 구남로 21번길 33, 3층 |
| 배경색 | `#020a1a` |
| 브랜드 컬러 | teal-400 / cyan-300 / blue-400 |
| CNAME | www.vworks.tech |
| 사업자등록번호 | 184-87-01929 |
| 법인등록번호 | 164711-0113445 |

---

## 다음 채팅방 시작 시 할 일

1. 이 문서를 Claude에게 첨부
2. "파티클 배경 전체 페이지 연장 작업 이어서 해주세요" 요청
3. 진단 명령어 먼저 실행해서 현재 상태 확인:

```powershell
$file = "C:\Users\aiden\Downloads\vworks-tech-v4\vworks-v4\src\app\[locale]\page.tsx"
$bytes = [System.IO.File]::ReadAllBytes($file)
$code = [System.Text.Encoding]::UTF8.GetString($bytes)

Write-Host "HeroBg JSX: $($code.Contains('<HeroBg />'))"
Write-Host "canvas fixed: $($code.Contains('fixed inset-0'))"
Write-Host "래퍼 배경: $($code.Contains('bg-[#020a1a]'))"
```
