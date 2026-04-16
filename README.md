# RevoBank API 🏦

Banking API built with NestJS and Prisma

## 🌐 Live Demo

https://milestone-4-fakhridhogunawan73-production.up.railway.app/api

## 📋 Features

- User Authentication (Register & Login) with JWT
- User Profile Management
- Bank Account CRUD
- Transactions (Deposit, Withdraw, Transfer)
- Role-based Access Control (Customer & Admin)
- API Documentation with Swagger

## 🛠️ Technologies

- **NestJS** - Backend framework
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Relational database
- **Supabase** - Cloud database hosting
- **Railway** - Backend deployment platform
- **JWT Authentication** - Secure authentication
- **Swagger** - API documentation

## 🗄️ Database Schema

- **User** - Stores user accounts with roles (CUSTOMER/ADMIN)
- **Account** - Bank accounts (SAVINGS/CHECKING) linked to users
- **Transaction** - Records of DEPOSIT, WITHDRAWAL, and TRANSFER

## 🚀 How to Run Locally

### 1. Clone repository

```bash
git clone https://github.com/Revou-FSSE-Oct25/milestone-4-FakhridhoGunawan73.git
cd milestone-4-FakhridhoGunawan73
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

```bash
cp .env.example .env
```

Fill in your `.env` with your Supabase credentials:

```env
DATABASE_URL="postgresql://postgres.[PROJECT-ID]:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-ID]:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
JWT_SECRET="your-jwt-secret-here"
PORT=3000
```

### 4. Push database schema

```bash
npx prisma db push
```

### 5. Start application

```bash
npm run start:dev
```

## 📝 API Endpoints

### 🔐 Auth

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | /auth/register | Register new user       |
| POST   | /auth/login    | Login and get JWT token |

### 👤 User

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | /user/profile | Get current user profile |
| PATCH  | /user/profile | Update user profile      |

### 🏦 Account

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| POST   | /accounts     | Create bank account    |
| GET    | /accounts     | List all user accounts |
| GET    | /accounts/:id | Get specific account   |
| PATCH  | /accounts/:id | Update bank account    |
| DELETE | /accounts/:id | Delete bank account    |

### 💸 Transaction

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | /transactions/deposit  | Deposit to account        |
| POST   | /transactions/withdraw | Withdraw from account     |
| POST   | /transactions/transfer | Transfer between accounts |
| GET    | /transactions          | List user transactions    |
| GET    | /transactions/:id      | View transaction details  |

## 🚢 Deployment

- **Database**: Supabase (PostgreSQL)
- **Backend**: Railway
