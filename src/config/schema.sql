CREATE DATABASE IF NOT EXISTS shestyle;
USE shestyle;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role ENUM('admin', 'customer') DEFAULT 'customer',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS Categories (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL UNIQUE
);

-- Products Table
CREATE TABLE IF NOT EXISTS Products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock INT NOT NULL DEFAULT 0,
category_id INT,
images TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL
);

-- Cart Table
CREATE TABLE IF NOT EXISTS Cart (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
quantity INT NOT NULL CHECK (quantity > 0),
added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);

-- Wishlist Table
CREATE TABLE IF NOT EXISTS Wishlist (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE IF NOT EXISTS Orders (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
total_amount DECIMAL(10,2) NOT NULL,
status ENUM('pending', 'shipped', 'delivered', 'canceled') DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS Order_Items (
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
product_id INT NOT NULL,
quantity INT NOT NULL CHECK (quantity > 0),
price DECIMAL(10,2) NOT NULL,
FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS Reviews (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
rating INT CHECK (rating BETWEEN 1 AND 5),
comment TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);

-- Coupons Table
CREATE TABLE IF NOT EXISTS Coupons (
id INT AUTO_INCREMENT PRIMARY KEY,
code VARCHAR(50) UNIQUE NOT NULL,
discount_percentage DECIMAL(5,2) NOT NULL CHECK (discount_percentage BETWEEN 0 AND 100),
expiry_date DATE NOT NULL
);

-- Orders and Coupons Relationship
CREATE TABLE IF NOT EXISTS Order_Coupons (
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
coupon_id INT NOT NULL,
FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
FOREIGN KEY (coupon_id) REFERENCES Coupons(id) ON DELETE CASCADE
);
