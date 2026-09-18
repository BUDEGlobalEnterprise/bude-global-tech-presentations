$conns = Get-NetTCPConnection -LocalPort 9000 -ErrorAction SilentlyContinue
if ($conns) {
    $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
    Write-Host "Server is RUNNING on port 9000 (PID: $($pids -join ', '))" -ForegroundColor Green
    Write-Host "URL: http://localhost:9000" -ForegroundColor Cyan
} else {
    Write-Host "Server is STOPPED (port 9000 is free)." -ForegroundColor Yellow
}
