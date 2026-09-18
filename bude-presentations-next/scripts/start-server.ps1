$ErrorActionPreference = "Stop"
$projectDir = "C:\Github\bude-global-tech-presentations\bude-presentations-next"
$outDir = Join-Path $projectDir "out"

# Check if build exists
if (-not (Test-Path $outDir)) {
    Write-Host "Build output not found. Running npm run build first..." -ForegroundColor Yellow
    Push-Location $projectDir
    npm run build
    Pop-Location
}

# Check if port 9000 is already in use
$running = Get-NetTCPConnection -LocalPort 9000 -ErrorAction SilentlyContinue
if ($running) {
    Write-Host "Server is already running on port 9000." -ForegroundColor Green
    Write-Host "URL: http://localhost:9000" -ForegroundColor Cyan
    exit 0
}

Write-Host "Starting BUDE Global Tech Presentations server on port 9000 in background..." -ForegroundColor Cyan
Start-Process -FilePath "node" -ArgumentList "scripts\serve-local.js" -WorkingDirectory $projectDir -WindowStyle Hidden
Start-Sleep -Seconds 2

$check = Get-NetTCPConnection -LocalPort 9000 -ErrorAction SilentlyContinue
if ($check) {
    Write-Host "Server started successfully!" -ForegroundColor Green
    Write-Host "URL: http://localhost:9000" -ForegroundColor Cyan
} else {
    Write-Host "Server process launched. Please check http://localhost:9000 and server.log" -ForegroundColor Yellow
}
