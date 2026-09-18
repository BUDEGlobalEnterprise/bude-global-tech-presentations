@echo off
cd /d "%~dp0bude-presentations-next"
powershell -ExecutionPolicy Bypass -File scripts\status-server.ps1
pause
