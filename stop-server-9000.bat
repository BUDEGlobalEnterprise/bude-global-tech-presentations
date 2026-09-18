@echo off
cd /d "%~dp0bude-presentations-next"
echo Stopping server on port 9000...
powershell -ExecutionPolicy Bypass -File scripts\stop-server.ps1
pause
