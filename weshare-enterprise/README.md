# WeShare Enterprise (Django + React)

A minimal, production-friendly starter:
- Backend: Django REST Framework with JWT auth
- Frontend: React (Vite)
- CORS enabled (localhost:5173)
- SQLite by default; easy switch to Postgres

## Local Dev
Backend:
```bash
cd backend
python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Docker (backend + Postgres)
Create `.env` in `/backend` from `.env.example`, then:
```bash
docker compose up --build
```
API will be at `http://localhost:8000`.

## API Summary
- POST `/api/auth/register/` {username, email, password}
- POST `/api/auth/token/` {username, password}
- GET  `/api/auth/me/` (Bearer token)
- GET/POST `/api/shares/`
- GET/PUT/DELETE `/api/shares/{id}/`
