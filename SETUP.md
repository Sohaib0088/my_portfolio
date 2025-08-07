# Portfolio Admin Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Gmail account with 2FA enabled

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   ```

3. **Set up environment variables**
   
   Create `backend/.env` file:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # Email Configuration
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password-here
   ```

4. **Set up Gmail App Password**
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Generate App Password for "Mail"
   - Use the 16-character password in EMAIL_PASS

5. **Set up database**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

6. **Update admin credentials**
   
   Edit `backend/prisma/seed.ts` and change:
   - `your-email@gmail.com` to your actual email
   - `your-secure-password-here` to your secure password

7. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

## Security Notes
- Never commit `.env` files to version control
- Use strong passwords for admin accounts
- Regularly update dependencies
- Use environment variables for all sensitive data

## Default Admin Credentials
- Email: Set in `backend/prisma/seed.ts`
- Password: Set in `backend/prisma/seed.ts`

## Features
- ✅ OTP Authentication via Email
- ✅ Admin Dashboard
- ✅ Portfolio Management
- ✅ Contact Form
- ✅ File Upload
- ✅ Dark/Light Theme 