@echo off
cd /d "%~dp0bude-presentations-next"
powershell -ExecutionPolicy Bypass -File scripts\start-server.ps1
pause
