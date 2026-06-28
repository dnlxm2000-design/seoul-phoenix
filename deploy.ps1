param(
  [string]$LocalOut = "C:\Users\rotjd\AppData\Local\Temp\opencode\seoul-phoenix\out",
  [string]$FtpHost = "ftp://112.175.185.133",
  [string]$User = "soccerline",
  [string]$Pass = "love1004!"
)

$cred = New-Object System.Net.NetworkCredential($User, $Pass)
$ok = 0; $fail = 0

function Create-FtpDir([string]$dir) {
  try {
    $req = [System.Net.WebRequest]::Create("$FtpHost/$dir")
    $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    $req.Credentials = $cred
    $req.GetResponse() | Out-Null
    Write-Host "  CREATED $dir" -ForegroundColor Cyan
    return $true
  } catch {
    # 550 means dir exists or can't create - ignore
    return $false
  }
}

function Upload-File([string]$localPath, [string]$remoteRel) {
  try {
    # Ensure parent dir exists
    $parent = [System.IO.Path]::GetDirectoryName($remoteRel) -replace '\\', '/'
    if ($parent -ne '' -and $parent -ne '.') {
      Create-FtpDir($parent) | Out-Null
    }
    
    $url = "$FtpHost/$remoteRel"
    $req = [System.Net.WebRequest]::Create($url)
    $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $req.Credentials = $cred
    
    $fileBytes = [System.IO.File]::ReadAllBytes($localPath)
    $req.ContentLength = $fileBytes.Length
    
    $stream = $req.GetRequestStream()
    $stream.Write($fileBytes, 0, $fileBytes.Length)
    $stream.Close()
    
    $resp = $req.GetResponse()
    $resp.Close()
    
    Write-Host "OK $remoteRel" -ForegroundColor Green
    return $true
  } catch {
    # If 550, try creating directories and retry
    if ($_.Exception.Message -match "550") {
      $parent = [System.IO.Path]::GetDirectoryName($remoteRel) -replace '\\', '/'
      Create-FtpDir($parent) | Out-Null
      try {
        $url = "$FtpHost/$remoteRel"
        $req = [System.Net.WebRequest]::Create($url)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $req.Credentials = $cred
        $fileBytes = [System.IO.File]::ReadAllBytes($localPath)
        $req.ContentLength = $fileBytes.Length
        $stream = $req.GetRequestStream()
        $stream.Write($fileBytes, 0, $fileBytes.Length)
        $stream.Close()
        $resp = $req.GetResponse()
        $resp.Close()
        Write-Host "OK $remoteRel (retry)" -ForegroundColor Green
        return $true
      } catch {
        Write-Host "FAIL $remoteRel : $_" -ForegroundColor Red
        return $false
      }
    }
    Write-Host "FAIL $remoteRel : $_" -ForegroundColor Red
    return $false
  }
}

Write-Host "=== Deploying static export to $FtpHost ===" -ForegroundColor Yellow

# 1. All _next/ files
Get-ChildItem "$LocalOut\_next" -Recurse -File | ForEach-Object {
  $rel = $_.FullName.Substring($LocalOut.Length + 1) -replace '\\', '/'
  if (Upload-File $_.FullName $rel) { $ok++ } else { $fail++ }
}

# 2. Root files
foreach ($f in @("index.html","index.txt")) {
  $p = "$LocalOut\$f"
  if (Test-Path $p) {
    if (Upload-File $p $f) { $ok++ } else { $fail++ }
  }
}

# 3. News pages
Get-ChildItem "$LocalOut\news" -Recurse -File | ForEach-Object {
  $rel = $_.FullName.Substring($LocalOut.Length + 1) -replace '\\', '/'
  if (Upload-File $_.FullName $rel) { $ok++ } else { $fail++ }
}

# 4. All other top-level directories (about, contact, etc.)
Get-ChildItem "$LocalOut" -Directory | Where-Object { $_.Name -ne '_next' -and $_.Name -ne 'news' } | ForEach-Object {
  $dirName = $_.Name
  Get-ChildItem "$LocalOut\$dirName" -Recurse -File | ForEach-Object {
    $rel = $_.FullName.Substring($LocalOut.Length + 1) -replace '\\', '/'
    if (Upload-File $_.FullName $rel) { $ok++ } else { $fail++ }
  }
}

Write-Host "`n=== Done: $ok OK, $fail FAIL ===" -ForegroundColor Yellow
