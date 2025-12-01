# EduConnect - Social + Academic Web Application

EduConnect is a full-stack web application that connects students and college administrators in a social and academic environment. Students can share posts, showcase certifications, interact through comments, and access study materials. Administrators can manage colleges, upload study materials, and moderate content.

## Project Structure

```
EduConnect/
├── backend/              # Node.js + Express backend
├── frontend/            # React + Vite frontend
├── infrastructure/      # AWS deployment templates
└── scripts/             # Database seed scripts
```

## Tech Stack

### Backend
- Node.js (LTS) + Express
- MongoDB with Mongoose
- JWT Authentication with Refresh Tokens
- AWS S3 for file storage
- Express-validator for validation
- Security: Helmet, Rate Limiting, CORS

### Frontend
- React + JavaScript + Vite
- Redux Toolkit for state management
- TailwindCSS + shadcn/ui components
- Axios for API calls

### Deployment
- AWS S3 + CloudFront (Frontend)
- AWS Elastic Beanstalk or ECS Fargate (Backend)
- MongoDB Atlas (Database)
- CloudFormation/Terraform (Infrastructure as Code)

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account or local MongoDB
- AWS Account with S3 access

### Local Development

1. **Clone and install dependencies:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Configure environment variables:**
   - Copy `backend/.env.example` to `backend/.env` and fill in values
   - Copy `frontend/.env.example` to `frontend/.env` and fill in values

3. **Seed the database:**
   ```bash
   cd backend
   npm run seed
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Default Credentials (from seed script)

- **Admin:** admin@educonnect.com / password123
- **Student:** student@college1.edu / password123

## Features

### Student Features
- User authentication (Signup/Login/Logout)
- Create and view posts with images
- Post professional certifications
- Like and comment on posts (nested replies)
- View personalized feed
- Profile page with posts and certifications
- Browse and download study materials (college-specific)

### Admin Features
- Admin dashboard
- College registration and management
- Upload study materials (PDF, PPTX, DOCX, images)
- Review student certifications
- Content moderation (posts/comments)
- Material management (edit, delete)

## API Documentation

See `backend/README.md` for detailed API endpoints documentation.

## Deployment

See `infrastructure/README.md` for AWS deployment instructions.

## Security

- JWT tokens with secure refresh token rotation
- Rate limiting on authentication endpoints
- Helmet.js for security headers
- Input validation with express-validator
- CORS whitelist configuration
- S3 bucket policies with least privilege access

## License

MIT

