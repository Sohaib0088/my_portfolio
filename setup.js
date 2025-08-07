#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Portfolio Backend...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Check if backend directory exists
const backendDir = path.join(__dirname, 'backend');
if (!fs.existsSync(backendDir)) {
  console.error('❌ Backend directory not found. Please make sure you have the complete project structure.');
  process.exit(1);
}

try {
  // Change to backend directory
  process.chdir(backendDir);
  console.log('📁 Changed to backend directory');

  // Install dependencies
  console.log('📦 Installing backend dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');

  // Create .env file if it doesn't exist
  const envFile = path.join(backendDir, '.env');
  const envExampleFile = path.join(backendDir, 'env.example');
  
  if (!fs.existsSync(envFile) && fs.existsSync(envExampleFile)) {
    console.log('🔧 Creating .env file...');
    fs.copyFileSync(envExampleFile, envFile);
    console.log('✅ .env file created');
  }

  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npm run db:generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');

  // Run database migrations
  console.log('🗄️ Running database migrations...');
  execSync('npm run db:migrate', { stdio: 'inherit' });
  console.log('✅ Database migrations completed');

  // Seed database
  console.log('🌱 Seeding database with sample data...');
  execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit' });
  console.log('✅ Database seeded successfully');

  // Create uploads directory
  const uploadsDir = path.join(backendDir, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.log('📁 Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Uploads directory created');
  }

  console.log('\n🎉 Backend setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Start the backend: npm run dev:backend');
  console.log('2. Start the frontend: npm run dev');
  console.log('3. Or start both: npm run dev:full');
  console.log('\n🌐 Access points:');
  console.log('- Frontend: http://localhost:5173');
  console.log('- Backend API: http://localhost:5000');
  console.log('- API Health: http://localhost:5000/api/health');
  console.log('\n🔐 Default admin credentials:');
  console.log('- Email: admin@portfolio.com');
  console.log('- Password: admin123');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
} 