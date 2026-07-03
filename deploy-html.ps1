param(
  [string]$LocalOut = "C:\Users\rotjd\AppData\Local\Temp\opencode\seoul-phoenix\out",
  [string]$FtpHost = "ftp://112.175.185.133",
  [string]$User = "soccerline",
  [string]$Pass = "love1004!"
)

$cred = New-Object System.Net.NetworkCredential($User, $Pass)
$ok = 0; $fail = 0

function Ensure-Dir([string]$ftpDir) {
  $parts = $ftpDir -split '/'
  $path = ""
  foreach ($p in $parts) {
    if ($p -eq "") { continue }
    $path = if ($path -eq "") { $p } else { "$path/$p" }
    try {
      $req = [System.Net.WebRequest]::Create("$FtpHost/$path")
      $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
      $req.Credentials = $cred
      $req.GetResponse() | Out-Null
    } catch { }
  }
}

function Upload-File([string]$localPath, [string]$remoteRel) {
  $url = "$FtpHost/$remoteRel"
  try {
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
    Write-Host "FAIL $remoteRel : $_" -ForegroundColor Red
    return $false
  }
}

Write-Host "=== Deploying to /html/ (web root) ===" -ForegroundColor Yellow

# Upload everything from out/ to /html/
Get-ChildItem $LocalOut -Recurse -File | ForEach-Object {
  $rel = $_.FullName.Substring($LocalOut.Length + 1) -replace '\\', '/'
  $remoteRel = "html/$rel"
  # Ensure parent directory exists
  $parent = [System.IO.Path]::GetDirectoryName($remoteRel) -replace '\\', '/'
  Ensure-Dir($parent) | Out-Null
  if (Upload-File $_.FullName $remoteRel) { $ok++ } else { $fail++ }
}

Write-Host "`n=== Done: $ok OK, $fail FAIL ===" -ForegroundColor Yellow
