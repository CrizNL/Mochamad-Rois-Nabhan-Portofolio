@echo off
echo =========================================
echo Starting Dynamic Corporate Portfolio
echo =========================================

echo.
echo [1/2] Starting Backend (FastAPI)...
start cmd /k "cd backend && if not exist venv (python -m venv venv) && call venv\Scripts\activate.bat && pip install -r requirements.txt && uvicorn main:app --reload --port 8000"

echo.
echo [2/2] Starting Frontend (React + Vite)...
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo Both servers are starting up in separate windows!
echo Once the frontend window says "Local: http://localhost:5173", open that link in your browser.
pause
