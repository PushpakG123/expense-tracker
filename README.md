# Expense Tracker — Full-Stack Application

A full-stack personal finance management application built with **Spring Boot**, **React**, **TypeScript**, and **Vite**.

The system allows users to securely authenticate, manage categories, track income & expenses, generate monthly reports, and visualize spending analytics using real backend data.

---

## 🚀 Features

### 🔐 Authentication
- Secure login & registration with **JWT Authentication**
- Access token + refresh token workflow
- Protected API endpoints
- Role-based access (`USER`)

### 💸 Transactions
- Add, edit, and delete income/expense records
- Filter by category, type, and month
- Paginated transaction list
- Linked to authenticated user
- Server-side validation

### 🗂 Categories
- Create custom categories
- Default categories on first login
- Category-based analytics & filtering

### 📊 Dashboard
- Monthly income & expense summary
- Auto-calculated balance
- Donut chart: spending by category
- Line chart: last 6 months history
- Fully dynamic (real backend data)

### 🔁 Recurring Payments
- Add recurring subscriptions (rent, Netflix, etc.)
- Auto-calculated next payment date
- Monthly forecast

### 📑 Reports
- Monthly breakdown
- Category totals
- Aggregated summary queries
- Optimized SQL queries

---

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot 3
- Spring Security (JWT)
- Spring Data JPA
- H2 Database (dev mode)
- Maven

### Frontend
- React (TypeScript)
- Vite
- Axios
- Zustand
- Tailwind CSS
- Recharts

---

## 📁 Project Structure

expense-tracker
├── src
├── frontend
├── screenshots
├── pom.xml
└── README.md
---

## ▶️ How to Run the Project Locally

### 1️⃣ Start the backend

```bash
cd expense-tracker
mvnw.cmd spring-boot:run
Backend runs at:
http://localhost:8080

Windows users must use mvnw.cmd
Mac/Linux users can use ./mvnw spring-boot:run

2️⃣ Start the frontend
cd frontend
npm install
npm run dev


Frontend runs at:
http://localhost:5173

📚 API Overview
Auth

POST /api/auth/register

POST /api/auth/login

POST /api/auth/refresh

Transactions

GET /api/transactions

POST /api/transactions

DELETE /api/transactions/{id}

Categories

GET /api/categories

POST /api/categories

DELETE /api/categories/{id}

Reports

GET /api/reports/monthly?month=YYYY-MM

## 📸 Screenshots

### 🔐 Login
![Login](https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/login.png)  
Link: https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/login.png

### 📊 Dashboard
![Dashboard](https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/dashboard.png)  
Link: https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/dashboard.png

### 💵 Transactions
![Transactions](https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/transactions.png)  
Link: https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/transactions.png

### 🗂 Categories
![Categories](https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/categories.png)  
Link: https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/categories.png

### 📈 Reports
![Reports](https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/reports.png)  
Link: https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/reports.png

### 🔁 Recurring Payments
![Recurring](https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/recurring.png)  
Link: https://raw.githubusercontent.com/elifbugdayy/expense-tracker/main/screenshots/recurring.png



🧪 Testing

Backend unit-level tests

H2 database auto-created

JWT authentication flow tested

📌 Future Improvements

Export reports as PDF / CSV

Recurring payment automation (cron jobs)

Dark / Light theme

Dockerization

PostgreSQL production profile

🎯 Purpose of the Project

This project was built to practice full-stack development using real-world patterns such as authentication, REST API design, state management, and data visualization.

It demonstrates clean architecture, secure backend practices, and a modern frontend UI. 