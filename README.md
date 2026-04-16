# RevoBank API 🏦

Banking API built with NestJS and Prisma

## 🌐 Live Demo

https://milestone-4-fakhridhogunawan73-production.up.railway.app/api

## 📋 Features

- User Authentication (Register & Login) with JWT
- User Profile Management
- Bank Account CRUD
- Transactions (Deposit, Withdraw, Transfer)
- API Documentation with Swagger

## 🛠️ Technologies

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger

## 🚀 How to Run Locally

### 1. Clone repository

git clone https://github.com/Revou-FSSE-Oct25/milestone-4-FakhridhoGunawan73.git

### 2. Install dependencies

npm install

### 3. Setup environment

cp .env.example .env

# Fill in your database credentials

### 4. Run migrations

npx prisma migrate dev

### 5. Start application

npm run start:dev

## 📝 API Endpoints

### Auth

- POST /auth/register
- POST /auth/login

### User

- GET /user/profile
- PATCH /user/profile

### Account

- POST /account
- GET /account
- GET /account/:id
- PATCH /account/:id
- DELETE /account/:id

### Transaction

- POST /transaction/deposit
- POST /transaction/withdraw
- POST /transaction/transfer
- GET /transaction
- GET /transaction/:id
