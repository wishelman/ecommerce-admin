-- ecommerce-admin database schema
-- MySQL

CREATE DATABASE IF NOT EXISTS ecommerce_admin;
USE ecommerce_admin;

-- Admins
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    sold INT NOT NULL DEFAULT 0,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Activity logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    activity VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
);

-- Seed default admin (password: admin123)
INSERT INTO admins (username, password, fullname, email)
SELECT 'admin', 'admin123', 'Administrator', 'admin@ecommerce.com'
WHERE NOT EXISTS (SELECT 1 FROM admins WHERE username = 'admin');

-- Seed sample categories
INSERT INTO categories (category_name, description) VALUES
('Elektronik', 'Produk elektronik dan gadget'),
('Pakaian', 'Pakaian dan aksesoris'),
('Makanan', 'Makanan dan minuman')
ON DUPLICATE KEY UPDATE category_name = category_name;

-- Seed sample products
INSERT INTO products (category_id, product_name, description, price, stock, sold, image) VALUES
(1, 'Smartphone X', 'Smartphone terbaru', 5000000, 20, 150, NULL),
(1, 'Laptop Pro', 'Laptop performa tinggi', 12000000, 10, 45, NULL),
(1, 'Headphone Bluetooth', 'Headphone nirkabel', 350000, 50, 200, NULL),
(1, 'Charger Fast', 'Charger cepat 65W', 150000, 80, 12, NULL),
(2, 'Kaos Polos', 'Kaos cotton combed', 75000, 100, 300, NULL),
(2, 'Hoodie Classic', 'Hoodie hangat', 180000, 30, 8, NULL),
(3, 'Kopi Arabika', 'Kopi premium 250gr', 85000, 60, 180, NULL);
