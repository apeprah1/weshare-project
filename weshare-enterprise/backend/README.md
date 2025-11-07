# WeShare Enterprise — Backend (Django + DRF + JWT)

## Quickstart (SQLite)
```bash
python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
JWT endpoints:
- `POST /api/auth/register/` {username, email, password}
- `POST /api/auth/token/` {username, password}
- `GET /api/auth/me/`  (Authorization: Bearer <access>)

Shares endpoints (Authorization required):
- `GET /api/shares/`
- `POST /api/shares/` {"title": "...", "description": "..."}
- `GET/PUT/DELETE /api/shares/{id}/`

## Docker (with Postgres)
A sample `docker-compose.yml` is in project root. Copy `.env.example` to `.env` and adjust as needed.
