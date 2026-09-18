$startupDir = [System.Environment]::GetFolderPath('Startup')
$shortcutPath = Join-Path $startupDir "BudePresentationsServer.lnk"
$regPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
$regName = "BudePresentationsServer"

if (Test-Path $shortcutPath) {
    Remove-Item $shortcutPath -Force
    Write-Host "Removed shortcut from Startup folder." -ForegroundColor Green
}

$exists = Get-ItemProperty -Path $regPath -Name $regName -ErrorAction SilentlyContinue
if ($exists) {
    Remove-ItemProperty -Path $regPath -Name $regName -Force
    Write-Host "Removed entry from Windows Auto-Run Registry." -ForegroundColor Green
}

Write-Host "Auto-start has been completely disabled." -ForegroundColor Green
