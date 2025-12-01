# EduConnect Quick Start Guide

Get EduConnect running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works) or local MongoDB
- AWS Account (for S3 - can use local storage for development)

## Step 1: Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Set Up MongoDB

### Option A: MongoDB Atlas (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add your IP to whitelist

### Option B: Local MongoDB

Install MongoDB locally and use: `mongodb://localhost:27017/educonnect`

## Step 3: Configure Environment

### Backend

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/educonnect
JWT_SECRET=dev-secret-key-change-in-production
JWT_REFRESH_SECRET=dev-refresh-secret-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
S3_BUCKET_NAME=educonnect-uploads-dev
FRONTEND_URL=http://localhost:5173
COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
```

**Note:** For local development without AWS, you can use dummy values for AWS keys. File uploads won't work, but the rest of the app will.

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 4: Seed Database

```bash
cd backend
npm run seed
```

This creates:
- Admin user: `admin@educonnect.com` / `password123`
- Student users: `student@college1.edu` / `password123`
- Sample colleges, posts, certifications, and materials

## Step 5: Start Servers

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Backend runs on http://localhost:5000

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173

## Step 6: Access the App

1. Open http://localhost:5173
2. Login with:
   - Email: `admin@educonnect.com`
   - Password: `password123`

Or sign up as a new student!

## Troubleshooting

### MongoDB Connection Error
- Check your MONGO_URI
- Verify IP is whitelisted in MongoDB Atlas
- Check network connectivity

### Port Already in Use
- Change PORT in backend/.env
- Update VITE_API_URL in frontend/.env

### AWS S3 Errors
- For local dev, file uploads require valid AWS credentials
- You can skip file upload features for basic testing

### CORS Errors
- Ensure FRONTEND_URL matches your frontend URL
- Check backend CORS configuration

## Next Steps

- Read `README.md` for full documentation
- Check `DEPLOYMENT.md` for AWS deployment
- Review `backend/README.md` for API documentation

## Development Tips

- Backend auto-reloads with nodemon
- Frontend hot-reloads with Vite
- Check browser console for errors
- Check backend terminal for API logs

Happy coding! 🚀

