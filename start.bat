@echo off
echo Starting AI Powered Code Debugger...

:: Start Backend in a new window
start cmd /k "cd backend && npm run dev"

:: Start Frontend in a new window
start cmd /k "cd frontend && npm run dev"

:: Wait for a few seconds to let servers start
timeout /t 5 /nobreak >nul

:: Open the browser
start http://localhost:5173
