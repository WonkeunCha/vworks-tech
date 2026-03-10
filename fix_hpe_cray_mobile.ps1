# ================================================================
# HPE Cray 페이지 모바일 최적화 스크립트
# 실행 방법: 이 파일을 vworks-v4 폴더에 복사 후 PowerShell에서 실행
# ================================================================

$file = "src\app\[locale]\solutions\hpe-cray\page.tsx"

if (-not (Test-Path $file)) {
    Write-Error "파일을 찾을 수 없습니다: $file"
    exit 1
}

$content = Get-Content $file -Raw -Encoding UTF8

# 1. Hero pt-24 → pt-20, pb-20 → pb-12, 중복 md:px 제거
$content = $content -replace 'relative pt-24 pb-20 px-4 md:px-4 md:px-10', 'relative pt-20 pb-12 px-4 md:px-10'

# 2. 모든 섹션 중복 md:px 제거
$content = $content -replace 'px-4 md:px-4 md:px-10', 'px-4 md:px-10'

# 3. Hero h1 text-[72px] → 반응형
$content = $content -replace "font-\['Bebas_Neue'\] text-\[72px\] leading-\[\.92\] tracking-wide mb-5", "font-['Bebas_Neue'] text-[40px] md:text-[56px] lg:text-[72px] leading-[.92] tracking-wide mb-5"

# 4. Hero 부제목 text-[44px] → 반응형
$content = $content -replace "text-\[44px\] text-\[rgba\(200,220,255,\.76\)\] font-\['Noto_Sans_KR'\] font-light tracking-normal", "text-[22px] md:text-[32px] lg:text-[44px] text-[rgba(200,220,255,.76)] font-['Noto_Sans_KR'] font-light tracking-normal"

# 5. h2 text-[52px] → 반응형 (tracking-wide / leading-none 두 패턴 모두)
$content = $content -replace "text-\[52px\] tracking-wide leading-none", "text-[36px] md:text-[44px] lg:text-[52px] tracking-wide leading-none"
$content = $content -replace "text-\[52px\] leading-none", "text-[36px] md:text-[44px] lg:text-[52px] leading-none"

# 6. CTA h2 text-[64px] → 반응형
$content = $content -replace "text-\[64px\] tracking-wide leading-none mb-4", "text-[40px] md:text-[52px] lg:text-[64px] tracking-wide leading-none mb-4"

# 7. whitespace-nowrap → 모바일 줄바꿈 허용
$content = $content -replace 'whitespace-nowrap', 'whitespace-normal md:whitespace-nowrap'

# 8. 중복 그리드 정리
$content = $content -replace 'grid-cols-1 md:grid-cols-1 md:grid-cols-2', 'grid-cols-1 md:grid-cols-2'

# 9. Link href="/contact" → /ko/contact/
$content = $content -replace 'href="/contact"', 'href="/ko/contact/"'

# 저장
Set-Content $file $content -Encoding UTF8 -NoNewline

Write-Host "✅ HPE Cray 페이지 모바일 최적화 완료!" -ForegroundColor Green
Write-Host "📝 수정된 항목:" -ForegroundColor Cyan
Write-Host "   1. Hero pt-24→pt-20, pb-20→pb-12 (Navbar 겹침 방지)" -ForegroundColor White
Write-Host "   2. 중복 md:px-4 md:px-10 → md:px-10 정리" -ForegroundColor White
Write-Host "   3. h1 text-[72px] → text-[40px] md:text-[56px] lg:text-[72px]" -ForegroundColor White
Write-Host "   4. 부제목 text-[44px] → text-[22px] md:text-[32px] lg:text-[44px]" -ForegroundColor White
Write-Host "   5. h2 text-[52px] → text-[36px] md:text-[44px] lg:text-[52px]" -ForegroundColor White
Write-Host "   6. CTA h2 text-[64px] → text-[40px] md:text-[52px] lg:text-[64px]" -ForegroundColor White
Write-Host "   7. whitespace-nowrap → whitespace-normal md:whitespace-nowrap" -ForegroundColor White
Write-Host "   8. 중복 grid-cols 정리" -ForegroundColor White
Write-Host "   9. /contact → /ko/contact/ 경로 수정" -ForegroundColor White
