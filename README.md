# Cloud Application Project (BWO Subject Completion)

> **Project for course completion: "Budowa i wdrażanie aplikacji w chmurze" ("Building and Deploying Cloud Applications")**

## Overview

This project is designed as a practical assignment for building and deploying a cloud-based application. It features:

- **Frontend:** Developed in [Angular](https://angular.io/) (TypeScript)
- **Backend:** You can choose to run either:
  - [Express.js](https://expressjs.com/) (Node.js)
  - [Flask](https://flask.palletsprojects.com/) (Python)
- **Database:** [MySQL](https://www.mysql.com/) database named `Hardware_OAnkiewicz`

---

## Screenshots

**Frontend:**

<p align="center">
  <img src="https://i.imgur.com/RYUbt2k.png" alt="Frontend Screenshot 1" width="350"/>
  <img src="https://i.imgur.com/4IL4Cbc.png" alt="Frontend Screenshot 2" width="350"/>
</p>

---

## Features

- **Product Table:** Displays initial product data including columns for promotions and inflation (see details in included PDF documentation).
- **Form:** Simple form for product entry/modification.
- **CRUD Operations:** The application supports full Create, Read, Update, and Delete (CRUD) functionality for managing products in the database via the web interface.

---

## Database Schema & Initial Data

The application uses a `products` table with the following schema:

| Column      | Type            | Description                                  |
|-------------|-----------------|----------------------------------------------|
| id          | INT AUTO_INCREMENT | Unique product ID (primary key)        |
| name        | VARCHAR(100)       | Product name                            |
| producent   | VARCHAR(100)       | Manufacturer                            |
| category    | VARCHAR(50)        | Product category                        |
| price       | DECIMAL(10,2)      | Price (up to 2 decimal places)           |

**SQL Script:**

```sql
CREATE DATABASE Hardware_OAnkiewicz;
ALTER DATABASE Hardware_OAnkiewicz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE Hardware_OAnkiewicz;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    producent VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, producent, category, price) VALUES
('RTX 4080 Super', 'NVIDIA', 'Karty Graficzne', 4999.00),
('Core i9-14900K', 'Intel', 'Procesory', 2750.00),
('Trident Z5 32GB', 'G.Skill', 'Pamięci RAM', 620.00),
('Fury Renegade 2TB', 'Kingston', 'Dyski SSD', 780.00);
```

## Backend Connection Configuration

Depending on the backend server, use the appropriate configuration below for connecting to the database:

### **Express.js** (`db/baza_conn.js`)
```javascript
const mysql = require('mysql2');

const link = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Hardware_OAnkiewicz'
});
```

### **Flask** (`app.py`)
```python
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'Hardware_OAnkiewicz'
```

---

## PDF Documentation

Please refer to the included `*.pdf` file in the repository for specification details, especially for columns "promocje" (promotions) and "inflacja" (inflation).

---

## Technologies Used

- Angular (TypeScript)
- HTML, CSS
- JavaScript
- Python (Flask)
- Express.js (Node.js)
- MySQL

---

## Getting Started

1. Clone the repository.
2. Set up MySQL database using the SQL script above.
3. Choose backend: configure either Express.js or Flask for database connection.
4. Start frontend Angular app.
5. Start backend server (Express.js or Flask).
6. Access product table and forms via web UI.

---

## Author & Course Info

Course: Budowa i wdrażanie aplikacji w chmurze  
Purpose: Final assignment / project completion
