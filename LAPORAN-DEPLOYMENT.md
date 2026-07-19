# Laporan Deployment E-Commerce Admin Dashboard
## Hosting di Vercel (Frontend) & Railway (Backend + MySQL)

---

## 1. Ringkasan Proyek

| Komponen | Teknologi | URL |
|----------|-----------|-----|
| Frontend | React + Vite | https://ecommerce-admin-bay-theta.vercel.app |
| Backend | Express.js | https://ecommerce-admin-production-5aee.up.railway.app |
| Database | MySQL | Railway (internal) |
| Repository | GitHub | https://github.com/wishelman/ecommerce-admin |

### Struktur Repository
```
ecommerce-admin/
├── client/          → Frontend (Vite + React)
│   ├── src/
│   │   ├── pages/   → Halaman Login, Dashboard, Products, dll
│   │   ├── services/→ api.js (axios configuration)
│   │   └── components/
│   └── package.json
├── server/          → Backend (Express.js)
│   ├── config/      → db.js (MySQL connection pool)
│   ├── controllers/ → auth, product, category, activity, report
│   ├── models/      → adminModel, productModel, categoryModel, activityModel
│   ├── routes/      → auth, products, categories, activities, reports
│   └── server.js    → Entry point
└── README.md
```

---

## 2. Persiapan Awal

### 2.1 Inisialisasi Repository Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/wishelman/ecommerce-admin.git
git push -u origin main
```

### 2.2 Struktur Code
- **Frontend (client/):** React + Vite dengan axios untuk HTTP requests
- **Backend (server/):** Express.js dengan MySQL2, JWT auth, multer (file upload)
- **Login:** `admin` / `admin123` (plaintext)

---

## 3. Deploy Backend ke Railway

### 3.1 Buat Project Baru
1. Login ke https://railway.app
2. Klik **"New Project"** → pilih **"Empty Project"**
3. Beri nama: `ecommerce-admin`

### 3.2 Tambah MySQL Database
1. Di dashboard project, klik **"New"** → pilih **"MySQL"**
2. Tunggu sampai status **Active** (hijau)
3. Catat variabel MySQL dari tab **Variables**:
   - `MYSQLHOST` = mysql.railway.internal
   - `MYSQLPORT` = 3306
   - `MYSQLUSER` = root
   - `MYSQLPASSWORD` = (otomatis)
   - `MYSQLDATABASE` = railway

### 3.3 Deploy Backend Code
1. Klik **"New"** → pilih **"GitHub Repo"** → pilih `ecommerce-admin`
2. Klik backend service → tab **Settings** → **Root Directory** = `server`
3. Tab **Variables** → tambah manual:

| Key | Value |
|-----|-------|
| DB_HOST | mysql.railway.internal |
| DB_PORT | 3306 |
| DB_USER | root |
| DB_PASSWORD | (dari MySQL Variables) |
| DB_NAME | railway |
| JWT_SECRET | rahasia123 |
| CLIENT_ORIGIN | * |

4. Tab **Deployments** → tunggu **Active**

### 3.4 Generate Public Domain
1. Tab **Settings** → **Networking** → klik **"Generate Service Domain"**
2. Port: `8080`
3. Klik **Generate Domain**
4. Salin URL (contoh: `https://ecommerce-admin-production-5aee.up.railway.app`)

### 3.5 Import Database
Klik MySQL service → tab **Database** → jalankan query satu per satu:

```sql
-- 1. Hapus tabel lama
DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS admins;

-- 2. Buat tabel admins
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert admin default
INSERT INTO admins (username, password, fullname, email)
VALUES ('admin', 'admin123', 'Administrator', 'admin@example.com');

-- 4. Buat tabel categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Insert sample categories
INSERT INTO categories (category_name, description)
VALUES ('Elektronik', 'Barang elektronik'), ('Pakaian', 'Barang fashion'), ('Makanan', 'Barang makanan');

-- 6. Buat tabel products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  category_id INT,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 7. Insert sample products
INSERT INTO products (product_name, description, price, stock, category_id)
VALUES ('Laptop ASUS', 'Laptop gaming', 12000000, 10, 1),
       ('Kaos Polo', 'Kaos casual', 150000, 50, 2),
       ('Indomie', 'Indomie goreng', 5000, 100, 3);

-- 8. Buat tabel activity_logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT,
  activity TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Insert sample activity
INSERT INTO activity_logs (admin_id, activity)
VALUES (1, 'Admin login pertama kali');
```

---

## 4. Deploy Frontend ke Vercel

### 4.1 Import Project
1. Login ke https://vercel.com
2. Klik **"Add New"** → **"Project"**
3. Import repository `wishelman/ecommerce-admin`
4. Framework: **Vite**
5. Root Directory: `client`
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Klik **Deploy**

### 4.2 Set Environment Variable
1. Tab **Settings** → **Environment Variables**
2. Tambah:

| Key | Value |
|-----|-------|
| VITE_API_URL | https://ecommerce-admin-production-5aee.up.railway.app |

**PENTING:** Diawali `https://`, jangan ada slash di akhir

3. **Redeploy** setelah menambah env variable

### 4.3 Update CORS di Railway
1. Backend service → tab **Variables** → edit `CLIENT_ORIGIN`:
```
CLIENT_ORIGIN = https://ecommerce-admin-bay-theta.vercel.app
```
2. Redeploy backend

---

## 5. Troubleshooting yang Dihadapi

### 5.1 CORS Error
**Masalah:** Frontend tidak bisa akses backend karena CORS policy.

**Penyebaban:**
- `CLIENT_ORIGIN` salah atau tidak di-set
- `VITE_API_URL` tidak diawali `https://`

**Solusi:** Set `CLIENT_ORIGIN` = URL Vercel lengkap + `https://`

### 5.2 Tabel Tidak Ada
**Masalah:** `Table 'railway.activity_logs' doesn't exist`

**Penyebaban:** SQL CREATE TABLE menggunakan nama berbeda dari kode.

**Solusi:** Sesuaikan nama tabel dengan yang di kode:
- `activity_logs` (bukan `activities`)
- `product_name` (bukan `name`)
- `category_name` (bukan `name`)
- `stock` (bukan `quantity`)

### 5.3 Port Salah
**Masalah:** Aplikasi tidak bisa diakses.

**Penyebaban:** Port di Generate Service Domain tidak sesuai.

**Solusi:** Cek deployment logs → cari `Server running on port XXXX` → gunakan port itu.

### 5.4 URL Backend Salah
**Masalah:** Request ke URL MySQL service, bukan backend.

**Penyebaban:** `VITE_API_URL` diisi URL MySQL (`mysql-production-xxxx`)

**Solusi:** URL backend seperti `ecommerce-admin-production-xxxx.up.railway.app`

---

## 6. Login Kredensials

| Field | Value |
|-------|-------|
| URL | https://ecommerce-admin-bay-theta.vercel.app |
| Username | admin |
| Password | admin123 |

---

## 7. Fitur Dashboard

- **Dashboard** — Statistik penjualan, grafik, aktivitas terbaru
- **Produk** — CRUD produk (tambah, edit, hapus, cari)
- **Kategori** — CRUD kategori dengan jumlah produk
- **Aktivitas** — Log aktivitas admin
- **Laporan** — Produk terlaris & kurang laris
- **Login/Logout** — Autentikasi session

---

*Laporan ini dibuat pada 20 Juli 2026*
