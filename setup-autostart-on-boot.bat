@echo off
cd /d "%~dp0bude-presentations-next"
echo Setting up BUDE Global Tech Presentations server to run automatically on boot...
powershell -ExecutionPolicy Bypass -File scripts\setup-autostart.ps1
pause
