$ErrorActionPreference = "Stop"
$projectDir = "C:\Github\bude-global-tech-presentations\bude-presentations-next"
$startScript = Join-Path $projectDir "scripts\start-server.ps1"
$startupDir = [System.Environment]::GetFolderPath('Startup')
$shortcutPath = Join-Path $startupDir "BudePresentationsServer.lnk"
$regPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
$regName = "BudePresentationsServer"

# 1. Ensure build output exists
$outDir = Join-Path $projectDir "out"
if (-not (Test-Path $outDir)) {
    Write-Host "Build output not found. Running npm run build..." -ForegroundColor Yellow
    Push-Location $projectDir
    npm run build
    Pop-Location
}

# 2. Create shortcut in Windows Startup folder (shell:startup)
$wsh = New-Object -ComObject WScript.Shell
$shortcut = $wsh.CreateShortcut($shortcutPath)
$shortcut.TargetPath = "powershell.exe"
$shortcut.Arguments = "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$startScript`""
$shortcut.WorkingDirectory = $projectDir
$shortcut.Description = "BUDE Global Tech Presentations - Local Server on Port 9000"
$shortcut.WindowStyle = 7 # Minimized/hidden
$shortcut.Save()

Write-Host "Created Startup shortcut:" -ForegroundColor Green
Write-Host "  $shortcutPath"

# 3. Add to Windows Registry Run key for current user (HKCU Run)
$cmdValue = "powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$startScript`""
Set-ItemProperty -Path $regPath -Name $regName -Value $cmdValue -Force
Write-Host "Registered in Windows Auto-Run (HKCU Run key)." -ForegroundColor Green

Write-Host ""
Write-Host "SUCCESS: The server will automatically start on port 9000 whenever your laptop boots or restarts!" -ForegroundColor Green
Write-Host ""

# 4. Start the server right now if not already running
& "$startScript"
