# Portfolio Backend API

A robust Node.js backend API for managing portfolio data with authentication, file uploads, and database management.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 📊 **Database Management** - Prisma ORM with SQLite (easily upgradable to PostgreSQL/MySQL)
- 📁 **File Uploads** - Image upload functionality for projects and profile pictures
- 🛡️ **Security** - Helmet, CORS, rate limiting, and input validation
- 📝 **API Documentation** - Comprehensive REST API endpoints
- 🌱 **Database Seeding** - Pre-populated with sample data

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator, Zod

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=5000
   ```

3. **Set up database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Seed database with sample data
   npx ts-node prisma/seed.ts
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (admin only)
- `PUT /api/skills/:id` - Update skill (admin only)
- `DELETE /api/skills/:id` - Delete skill (admin only)

### Experience
- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create experience (admin only)
- `PUT /api/experiences/:id` - Update experience (admin only)
- `DELETE /api/experiences/:id` - Delete experience (admin only)

### Contact
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin only)
- `PUT /api/contacts/:id/read` - Mark contact as read (admin only)
- `DELETE /api/contacts/:id` - Delete contact (admin only)

### About
- `GET /api/about` - Get about content
- `POST /api/about` - Create about content (admin only)
- `PUT /api/about/:id` - Update about content (admin only)
- `DELETE /api/about/:id` - Delete about content (admin only)

### File Upload
- `POST /api/upload/image` - Upload image (admin only)
- `DELETE /api/upload/:filename` - Delete uploaded file (admin only)

### Health Check
- `GET /api/health` - API health status

## Database Schema

### Models
- **User** - Authentication and user management
- **Project** - Portfolio projects with metadata
- **Skill** - Technical skills with categories and levels
- **Experience** - Work experience and history
- **Contact** - Contact form submissions
- **About** - About section content

### Enums
- **Role** - USER, ADMIN
- **SkillCategory** - FRONTEND, BACKEND, DATABASE, DEVOPS, TOOLS, LANGUAGES

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Default Admin Credentials
- Email: `admin@portfolio.com`
- Password: `admin123`

## File Upload

Images are stored in the `uploads/` directory and served statically at `/uploads/` endpoint.

Supported formats: JPG, PNG, GIF, WebP
Max file size: 5MB

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio for database management

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./dev.db` |
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |
| `MAX_FILE_SIZE` | Max file upload size | `5242880` (5MB) |

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   ```env
   NODE_ENV=production
   DATABASE_URL="your-production-database-url"
   JWT_SECRET="your-production-jwt-secret"
   ```

3. **Start the server**
   ```bash
   npm start
   ```

## Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - Request data validation
- **Password Hashing** - bcrypt for password security
- **JWT** - Stateless authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details 