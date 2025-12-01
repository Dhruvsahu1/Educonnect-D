# EduConnect Deployment Guide

Complete step-by-step guide for deploying EduConnect to AWS.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [AWS Infrastructure Setup](#aws-infrastructure-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools
- Node.js 18+ and npm
- AWS CLI configured with credentials
- Docker (for containerized deployment)
- MongoDB Atlas account or MongoDB instance
- Git

### AWS Services Needed
- S3 (for file storage and frontend hosting)
- CloudFront (for frontend CDN)
- Elastic Beanstalk or ECS Fargate (for backend)
- IAM (for permissions)
- CloudFormation (for infrastructure as code)

## Local Setup

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend (.env):**
```bash
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/educonnect
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
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

**Frontend (.env):**
```bash
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database

```bash
cd backend
npm run seed
```

### 4. Run Locally

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Access:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## AWS Infrastructure Setup

### Step 1: Create S3 Bucket and IAM Resources

```bash
# Deploy CloudFormation stack
aws cloudformation create-stack \
  --stack-name educonnect-infrastructure \
  --template-body file://infrastructure/cloudformation-template.yaml \
  --parameters \
    ParameterKey=Environment,ParameterValue=production \
    ParameterKey=S3BucketName,ParameterValue=educonnect-uploads \
  --capabilities CAPABILITY_NAMED_IAM

# Wait for stack creation
aws cloudformation wait stack-create-complete \
  --stack-name educonnect-infrastructure

# Get outputs
aws cloudformation describe-stacks \
  --stack-name educonnect-infrastructure \
  --query 'Stacks[0].Outputs'
```

### Step 2: Configure S3 Bucket Policy

Update the bucket policy to allow your application to access it:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:role/EduConnectS3AccessRole-production"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::educonnect-uploads-production/*"
    }
  ]
}
```

## Backend Deployment

### Option A: Elastic Beanstalk (Recommended)

1. **Install EB CLI:**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB:**
   ```bash
   cd backend
   eb init -p docker educonnect-backend --region us-east-1
   ```

3. **Create Environment:**
   ```bash
   eb create educonnect-prod \
     --envvars \
       MONGO_URI=your-mongo-uri,\
       JWT_SECRET=your-secret,\
       JWT_REFRESH_SECRET=your-refresh-secret,\
       AWS_ACCESS_KEY_ID=your-key,\
       AWS_SECRET_ACCESS_KEY=your-secret,\
       AWS_REGION=us-east-1,\
       S3_BUCKET_NAME=educonnect-uploads-production,\
       FRONTEND_URL=https://your-frontend-domain.com,\
       COOKIE_SECURE=true,\
       COOKIE_SAME_SITE=none
   ```

4. **Deploy:**
   ```bash
   eb deploy
   ```

5. **Get URL:**
   ```bash
   eb status
   ```

### Option B: ECS Fargate

1. **Create ECR Repository:**
   ```bash
   aws ecr create-repository --repository-name educonnect-backend
   ```

2. **Build and Push Image:**
   ```bash
   # Get login token
   aws ecr get-login-password --region us-east-1 | \
     docker login --username AWS --password-stdin \
     YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

   # Build
   cd backend
   docker build -t educonnect-backend .

   # Tag
   docker tag educonnect-backend:latest \
     YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/educonnect-backend:latest

   # Push
   docker push \
     YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/educonnect-backend:latest
   ```

3. **Create ECS Cluster and Service** (use AWS Console or Terraform)

## Frontend Deployment

### Step 1: Build Frontend

```bash
cd frontend
npm run build
```

### Step 2: Create S3 Bucket for Frontend

```bash
aws s3 mb s3://educonnect-frontend-production
```

### Step 3: Configure S3 for Static Website Hosting

```bash
aws s3 website s3://educonnect-frontend-production \
  --index-document index.html \
  --error-document index.html
```

### Step 4: Upload Build

```bash
aws s3 sync frontend/dist/ \
  s3://educonnect-frontend-production \
  --delete \
  --cache-control "public, max-age=31536000, immutable"
```

### Step 5: Create CloudFront Distribution

1. Go to CloudFront Console
2. Create Distribution
3. Origin: S3 bucket (educonnect-frontend-production)
4. Default root object: index.html
5. Error pages: 404 -> /index.html (200)
6. Create distribution

### Step 6: Update Frontend Environment

Update `frontend/.env` with production API URL:
```bash
VITE_API_URL=https://your-backend-api.com/api
```

Rebuild and redeploy:
```bash
npm run build
aws s3 sync frontend/dist/ s3://educonnect-frontend-production --delete
```

### Step 7: Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Post-Deployment

### 1. Update CORS Settings

Update backend CORS to allow your production frontend domain:
```javascript
// In backend/server.js
const corsOptions = {
  origin: 'https://your-frontend-domain.com',
  credentials: true,
};
```

### 2. Test Endpoints

```bash
# Health check
curl https://your-backend-api.com/health

# Test authentication
curl -X POST https://your-backend-api.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@educonnect.com","password":"password123"}'
```

### 3. Set Up Monitoring

- CloudWatch Logs for application logs
- CloudWatch Alarms for errors
- S3 access logging
- CloudFront access logs

### 4. Security Hardening

- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Rotate JWT secrets
- [ ] Enable AWS WAF on CloudFront
- [ ] Set up AWS GuardDuty
- [ ] Regular security audits

## Troubleshooting

### Backend Issues

**Issue: Cannot connect to MongoDB**
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check network security groups

**Issue: S3 upload fails**
- Verify IAM role permissions
- Check bucket policy
- Verify AWS credentials

**Issue: CORS errors**
- Update FRONTEND_URL in backend env
- Check CORS configuration in server.js

### Frontend Issues

**Issue: API calls fail**
- Verify VITE_API_URL in .env
- Check CORS settings on backend
- Verify backend is accessible

**Issue: React Router 404s**
- Configure CloudFront error pages
- Set up S3 redirect rules

### General Issues

**Issue: Environment variables not loading**
- Check AWS Systems Manager Parameter Store
- Verify Elastic Beanstalk environment variables
- Check CloudFormation outputs

## CI/CD Setup

See `.github/workflows/` for GitHub Actions workflows.

Required GitHub Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `VITE_API_URL`
- MongoDB URI and JWT secrets (use AWS Secrets Manager)

## Cost Optimization

- Use S3 Intelligent-Tiering
- Enable CloudFront compression
- Set appropriate cache TTLs
- Use ECS Fargate Spot for non-production
- Monitor and optimize database queries
- Use CloudWatch Logs retention policies

## Support

For issues or questions:
1. Check logs in CloudWatch
2. Review AWS service health
3. Verify environment variables
4. Check security group rules
5. Review IAM permissions

