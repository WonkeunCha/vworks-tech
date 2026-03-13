# Navbar.tsx — Dev. 카테고리 추가 패치

## 작업 파일
`src/components/layout/Navbar.tsx`

---

## 1. 파일 최상단에 타입/상태 추가

`useState` import 이미 있는 경우 `useRef`도 추가:
```tsx
import { useState, useRef, useEffect } from "react";
```

---

## 2. 컴포넌트 내 상태 추가 (기존 state 아래에)

```tsx
const [devOpen, setDevOpen] = useState(false);
const devRef = useRef<HTMLDivElement>(null);

// Dev 드롭다운 외부 클릭 닫기
useEffect(() => {
  const handler = (e: MouseEvent) => {
    if (devRef.current && !devRef.current.contains(e.target as Node)) {
      setDevOpen(false);
    }
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
}, []);
```

---

## 3. 네비게이션 링크 목록에 Dev. 드롭다운 추가

기존 nav 링크들 (`솔루션`, `레퍼런스` 등) 뒤에 아래 JSX 삽입:

```tsx
{/* Dev. 드롭다운 */}
<div ref={devRef} className="relative">
  <button
    onClick={() => setDevOpen(!devOpen)}
    className="flex items-center gap-1.5 text-sm transition-colors"
    style={{ color: devOpen ? "#e2e8f0" : "rgba(212,223,240,0.45)" }}
  >
    <span>Dev.</span>
    <span
      className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded"
      style={{
        background: "rgba(0,168,232,0.12)",
        border: "1px solid rgba(0,168,232,0.3)",
        color: "rgba(0,168,232,0.9)",
        letterSpacing: "0.04em",
      }}
    >
      BETA
    </span>
    <svg
      width={11}
      height={11}
      viewBox="0 0 12 12"
      fill="none"
      style={{ transition: "transform 0.2s", transform: devOpen ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>

  {/* 드롭다운 메뉴 */}
  <div
    className="absolute right-0 rounded-xl p-1.5"
    style={{
      top: "calc(100% + 14px)",
      minWidth: 230,
      background: "rgba(7,11,20,0.97)",
      border: "1px solid rgba(255,255,255,0.09)",
      boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,201,177,0.06)",
      backdropFilter: "blur(16px)",
      opacity: devOpen ? 1 : 0,
      pointerEvents: devOpen ? "all" : "none",
      transform: devOpen ? "translateY(0)" : "translateY(-6px)",
      transition: "opacity 0.18s, transform 0.18s",
      zIndex: 200,
    }}
  >
    {/* 섹션 헤더 */}
    <div
      className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1.5"
      style={{ color: "rgba(212,223,240,0.25)" }}
    >
      플랫폼 데모
    </div>

    {/* wx-viz 메뉴 아이템 */}
    <a
      href="/dev/wx-viz/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => setDevOpen(false)}
      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all"
      style={{
        border: "1px solid rgba(0,201,177,0.2)",
        background: "rgba(0,201,177,0.08)",
        textDecoration: "none",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
        style={{ background: "rgba(0,201,177,0.12)" }}
      >
        🌊
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium" style={{ color: "#00C9B1", lineHeight: 1.2 }}>
          기상해양 가시화
        </div>
        <div className="text-[10px] mt-0.5" style={{ color: "rgba(212,223,240,0.35)" }}>
          WRF · Mohid · MOM5 · KMA
        </div>
      </div>
      <span
        className="font-mono text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
        style={{
          background: "rgba(0,201,177,0.1)",
          border: "1px solid rgba(0,201,177,0.25)",
          color: "#00C9B1",
        }}
      >
        LIVE
      </span>
    </a>

    <div className="my-1 mx-0.5 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

    {/* 예정 항목 */}
    <div
      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg"
      style={{ border: "1px solid transparent", opacity: 0.5, cursor: "default" }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        📡
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium" style={{ color: "#d0d8e8", lineHeight: 1.2 }}>
          HPC 모니터링
        </div>
        <div className="text-[10px] mt-0.5" style={{ color: "rgba(212,223,240,0.35)" }}>
          클러스터 상태 대시보드
        </div>
      </div>
      <span
        className="font-mono text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(212,223,240,0.3)",
        }}
      >
        SOON
      </span>
    </div>
  </div>
</div>
```

---

## 4. HTML 파일 배포

`public/dev/wx-viz/index.html` 경로에 `wx-viz_index.html` 파일을 복사:

```powershell
# 폴더 생성 후 파일 복사
New-Item -ItemType Directory -Force -Path "public\dev\wx-viz"
Copy-Item "wx-viz_index.html" "public\dev\wx-viz\index.html"
```

이렇게 하면 GitHub Pages에서 `/dev/wx-viz/` URL로 직접 접근 가능합니다.

---

## 5. 빌드 & 배포

```powershell
cd C:\Users\aiden\Downloads\vworks-tech-v4\vworks-v4
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run build 2>&1 | Select-Object -Last 5
Copy-Item "out\ko\index.html" "out\404.html" -Force
npx gh-pages -d out --dotfiles
```
