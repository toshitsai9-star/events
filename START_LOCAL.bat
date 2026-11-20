@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo        ADHI REDDY - Wi-Fi Website
echo ========================================
echo.

where node.exe >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed or is not available on PATH.
    echo Install Node.js, reopen this terminal, and run this file again.
    pause
    exit /b 1
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
    echo ERROR: npm is not installed or is not available on PATH.
    echo Repair your Node.js installation, reopen this terminal, and retry.
    pause
    exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
    echo Dependencies are missing. Installing from package-lock.json...
    call npm ci
    if errorlevel 1 (
        echo ERROR: Dependency installation failed.
        pause
        exit /b 1
    )
)

echo.
echo Starting the development server for devices on the same Wi-Fi.
echo Share the Network URL printed by Vite, not the localhost URL.
echo If port 3000 is busy, Vite will select and display another available port.
echo Windows Firewall may ask to allow Node.js on Private networks. Allow it
echo only on your trusted home or office Wi-Fi network.
echo Press Ctrl+C to stop the server.
echo.
call npm run dev:lan

echo.
echo The development server has stopped.
pause
endlocal
