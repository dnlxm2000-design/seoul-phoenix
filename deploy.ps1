param(
    [string]$FtpHost = "112.175.185.133",
    [string]$FtpUser = "soccerline",
    [string]$FtpPass = "love1004!",
    [string]$RemotePath = "/html",
    [switch]$SkipBuild
)

$ProjectRoot = Split-Path -Parent $PSCommandPath
$OutDir = Join-Path $ProjectRoot "out"

# 1. Build
if (-not $SkipBuild) {
    Write-Host "=== Building ===" -ForegroundColor Cyan
    Set-Location -LiteralPath $ProjectRoot
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "Build OK" -ForegroundColor Green
}

# 2. Get all files
$files = Get-ChildItem -Path $OutDir -Recurse -File
$total = $files.Count
$ok = 0
$fail = 0

Write-Host "=== Deploying $total files to FTP ===" -ForegroundColor Cyan
Write-Host ""

foreach ($f in $files) {
    $relative = $f.FullName.Substring($OutDir.Length + 1) -replace '\\', '/'
    $remoteUri = "ftp://${FtpHost}${RemotePath}/${relative}"
    
    try {
        $result = curl.exe -s --ftp-create-dirs -T $f.FullName -u "${FtpUser}:${FtpPass}" $remoteUri -w "%{http_code}" --connect-timeout 10 --max-time 30 2>$null
        if ($result -eq "226") {
            $ok++
            Write-Host "✓ $relative" -ForegroundColor Green
        } else {
            $fail++
            Write-Host "✗ $relative → $result" -ForegroundColor Red
        }
    } catch {
        $fail++
        Write-Host "✗ $relative → ERROR" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Deploy complete: $ok OK, $fail Failed ===" -ForegroundColor Cyan
if ($fail -eq 0) {
    Write-Host "✓ All files deployed successfully" -ForegroundColor Green
}
