@echo off
cd /d "%~dp0bude-presentations-next"
echo Removing BUDE Global Tech Presentations server autostart...
powershell -ExecutionPolicy Bypass -File scripts\remove-autostart.ps1
pause
