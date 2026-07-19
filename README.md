# E-Commerce Admin Dashboard

Dashboard admin e-commerce dengan React (Vite) + Express + MySQL.

## Struktur
- `client/` — Frontend React Vite
- `server/` — Backend Express API
- `database/ecommerce.sql` — Schema & seed MySQL

## Setup Lokal

### 1. Database
```bash
mysql -u root -p < database/ecommerce.sql
```

### 2. Backend
```bash
cd server
cp .env.example .env   # sesuaikan DB_*, JWT_SECRET, CLIENT_ORIGIN
npm install
npm run dev
```

### 3. Frontend
```bash
cd client
cp .env.example .env   # VITE_API_URL=http://localhost:4000
npm install
npm run dev
```

Buka http://localhost:5173 — login dengan `admin` / `admin123`.

## Deploy

### Backend (Railway)
1. Buat project + MySQL di Railway.
2. Set env: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `CLIENT_ORIGIN` (URL Vercel).
3. Import `database/ecommerce.sql` ke MySQL Railway.
4. Deploy folder `server/`.

### Frontend (Vercel)
1. Import repo, set root directory `client`.
2. Set env `VITE_API_URL` = URL backend Railway.
3. Deploy.

## API Endpoints
- `POST /api/auth/login`
- `GET /api/auth/me` (auth)
- `GET/POST/PUT/DELETE /api/products` (auth)
- `GET/POST/PUT/DELETE /api/categories` (auth)
- `GET/DELETE /api/activities` (auth)
- `GET /api/reports/summary` (auth)
