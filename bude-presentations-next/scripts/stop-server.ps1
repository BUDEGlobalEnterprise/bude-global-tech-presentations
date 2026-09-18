$conns = Get-NetTCPConnection -LocalPort 9000 -ErrorAction SilentlyContinue
if ($conns) {
    $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($p in $pids) {
        Stop-Process -Id $p -Force -ErrorAction SilentlyContinue
        Write-Host "Stopped process $p on port 9000." -ForegroundColor Green
    }
} else {
    Write-Host "No active process found listening on port 9000." -ForegroundColor Yellow
}
