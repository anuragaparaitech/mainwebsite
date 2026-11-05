# Company Admin Panel — MERN Stack

A full-featured admin panel for managing your company website content including Careers, Services, Platforms, and Collaborations.

## Project Structure

```
├── backend/          # Node.js + Express + MongoDB API
│   ├── models/       # Mongoose schemas
│   ├── routes/       # REST API routes
│   ├── middleware/   # JWT auth middleware
│   ├── .env          # Environment variables (credentials here)
│   ├── server.js     # Entry point
│   └── seed.js       # Admin account seeder
│
└── frontend/         # React admin panel
    └── src/
        ├── pages/        # Careers, Services, Platforms, Collaborations
        ├── components/   # Layout (Navbar + Sidebar), shared components
        └── context/      # Auth context
```

## Quick Start

### 1. Prerequisites
- Node.js v18+
- MongoDB running locally (or update MONGO_URI to use Atlas)

### 2. Backend Setup

```bash
cd backend
npm install
```

Edit `.env` to set your credentials:
```
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=YourSecurePassword123
MONGO_URI=mongodb://localhost:27017/company_admin
JWT_SECRET=change_this_to_a_random_secret
```

Seed the admin account:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```
Backend runs on: http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

## Login

Use the credentials set in `backend/.env`:
- Email: `admin@company.com`  
- Password: `Admin@123`

## Features

| Section | Add | Edit | Delete | Status Toggle |
|---|---|---|---|---|
| Careers | ✅ | ✅ | ✅ | ✅ |
| Services | ✅ | ✅ | ✅ | ✅ |
| Platforms | ✅ | ✅ | ✅ | ✅ |
| Collaborations | ✅ | ✅ | ✅ | ✅ |

- JWT authentication with persistent sessions
- Collapsible sidebar navigation
- Dashboard with live stats
- Search/filter on all tables
- Confirm dialog before deletes
- Toast notifications
- Fully responsive

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/login | Admin login |
| GET | /api/auth/me | Get current admin |
| GET/POST | /api/careers | List / Create |
| GET/PUT/DELETE | /api/careers/:id | Read / Update / Delete |
| GET/POST | /api/services | List / Create |
| GET/PUT/DELETE | /api/services/:id | Read / Update / Delete |
| GET/POST | /api/platforms | List / Create |
| GET/PUT/DELETE | /api/platforms/:id | Read / Update / Delete |
| GET/POST | /api/collaborations | List / Create |
| GET/PUT/DELETE | /api/collaborations/:id | Read / Update / Delete |
