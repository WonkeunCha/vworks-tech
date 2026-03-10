# ================================================================
# VAST Data 브레드크럼 삭제 스크립트
# ================================================================

$f = "src\app\[locale]\solutions\vast-data\page.tsx"

if (-not (Test-Path -LiteralPath $f)) {
    Write-Error "파일을 찾을 수 없습니다: $f"
    exit 1
}

$c = Get-Content -LiteralPath $f -Raw -Encoding UTF8

# 브레드크럼 블록 정확 패턴으로 제거
# gap: 8, marginBottom: 20 으로 시작하는 div ~ </div> 까지
$pattern = '(?s)\s{12,}<div style=\{\{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20[^}]*\}\}>\s*<Link[^>]*>홈</Link>\s*<Link[^>]*>솔루션</Link>\s*<span[^>]*>VAST Data</span>\s*</div>'
$newC = $c -replace $pattern, ''

if ($newC -eq $c) {
    Write-Host "⚠️  패턴 불일치. 직접 줄 삭제로 시도합니다..." -ForegroundColor Yellow
    
    # 대안: 홈/솔루션/VAST Data 링크가 포함된 줄들 찾아서 해당 div 블록 제거
    $lines = $c -split "`n"
    $result = [System.Collections.Generic.List[string]]::new()
    $i = 0
    while ($i -lt $lines.Count) {
        $line = $lines[$i]
        # 브레드크럼 div 시작 감지
        if ($line -match 'gap: 8' -and $line -match 'marginBottom: 20' -and $line -match 'letterSpacing') {
            # 다음 4줄(홈, 솔루션, VAST Data, </div>) 스킵
            $i += 5
            continue
        }
        $result.Add($line)
        $i++
    }
    $newC = $result -join "`n"
}

Set-Content -LiteralPath $f -Value $newC -Encoding UTF8 -NoNewline
$orig = ($c -split "`n").Count
$after = ($newC -split "`n").Count
Write-Host "✅ 브레드크럼 삭제 완료! ($orig → $after 줄)" -ForegroundColor Green
