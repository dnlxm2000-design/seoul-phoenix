param(
    [string]$LocalPath = "C:\Users\rotjd\AppData\Local\Temp\opencode\seoul-phoenix\out",
    [string]$FtpHost = "112.175.185.133",
    [string]$FtpUser = "soccerline",
    [string]$FtpPass = "love1004!",
    [string]$RemotePath = "/"
)

# Ensure paths end with /
if (-not $LocalPath.EndsWith("\")) { $LocalPath += "\" }
$FtpRoot = "ftp://$FtpHost"
$RemoteBase = $RemotePath.TrimEnd('/')

Write-Host "=== 서울피닉스 FC FTP Deploy ===" -ForegroundColor Cyan
Write-Host "Server: $FtpHost" -ForegroundColor Yellow
Write-Host "Remote: $RemoteBase" -ForegroundColor Yellow
Write-Host "Local:  $LocalPath`n" -ForegroundColor Yellow

# Collect all files
$files = Get-ChildItem -Path $LocalPath -Recurse -File
$totalFiles = $files.Count
$current = 0

Write-Host "Uploading $totalFiles files..." -ForegroundColor Cyan

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPass)

foreach ($file in $files) {
    $current++
    $relativePath = $file.FullName.Substring($LocalPath.Length)
    $remoteFilePath = "$FtpRoot$RemoteBase/$($relativePath -replace '\\', '/')"
    
    # Percent calculation
    $percent = [math]::Round(($current / $totalFiles) * 100, 1)
    
    Write-Progress -Activity "FTP Upload" -Status "$relativePath" -CurrentOperation "$current / $totalFiles" -PercentComplete $percent
    
    try {
        # Create remote directory if needed
        $remoteDir = [System.IO.Path]::GetDirectoryName($remoteFilePath) -replace '\\', '/'
        
        # Make directory (try to create, ignore if exists)
        try {
            $makeDir = [System.Net.WebRequest]::Create($remoteDir + "/")
            $makeDir.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPass)
            $makeDir.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
            $null = $makeDir.GetResponse()
        } catch {
            # Directory might exist - ignore
        }
        
        # Upload file
        $webclient.UploadFile($remoteFilePath, $file.FullName) | Out-Null
        Write-Host "[$percent%] ✓ $relativePath" -ForegroundColor Green
    } catch {
        Write-Host "[$percent%] ✗ $relativePath - $_" -ForegroundColor Red
    }
}

$webclient.Dispose()
Write-Host "`n=== Upload complete! ===" -ForegroundColor Cyan
