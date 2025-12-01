# EduConnect Infrastructure & Deployment

This directory contains infrastructure as code templates and deployment instructions for EduConnect.

## Contents

- `cloudformation-template.yaml` - AWS CloudFormation template for S3 and IAM resources
- `Dockerfile` (in backend/) - Container image for backend deployment
- GitHub Actions workflows (in `.github/workflows/`)

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI configured
- Docker (for containerized deployment)
- MongoDB Atlas account or MongoDB instance

## Deployment Options

### Option 1: Elastic Beanstalk (Recommended for simplicity)

1. **Create S3 and IAM resources:**
   ```bash
   aws cloudformation create-stack \
     --stack-name educonnect-infrastructure \
     --template-body file://cloudformation-template.yaml \
     --parameters ParameterKey=Environment,ParameterValue=production \
                  ParameterKey=S3BucketName,ParameterValue=educonnect-uploads
   ```

2. **Create Elastic Beanstalk Application:**
   ```bash
   # Install EB CLI
   pip install awsebcli

   # Initialize EB (in backend directory)
   cd backend
   eb init -p docker educonnect-backend --region us-east-1

   # Create environment
   eb create educonnect-prod \
     --envvars MONGO_URI=your-mongo-uri,JWT_SECRET=your-secret,...
   ```

3. **Deploy:**
   ```bash
   eb deploy
   ```

### Option 2: ECS Fargate

1. **Build and push Docker image:**
   ```bash
   # Build image
   docker build -t educonnect-backend:latest ./backend

   # Tag for ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   docker tag educonnect-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/educonnect-backend:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/educonnect-backend:latest
   ```

2. **Create ECS cluster and service** (use AWS Console or Terraform)

### Frontend Deployment (S3 + CloudFront)

1. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Create S3 bucket for frontend:**
   ```bash
   aws s3 mb s3://educonnect-frontend
   aws s3 website s3://educonnect-frontend --index-document index.html
   ```

3. **Upload build:**
   ```bash
   aws s3 sync dist/ s3://educonnect-frontend --delete
   ```

4. **Create CloudFront distribution:**
   - Use AWS Console or CloudFormation
   - Origin: S3 bucket
   - Default root object: index.html
   - Error pages: 404 -> /index.html (for React Router)

5. **Invalidate cache after deployment:**
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id <distribution-id> \
     --paths "/*"
   ```

## Environment Variables

Set these in your deployment platform:

### Backend
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for access tokens
- `JWT_REFRESH_SECRET` - Secret for refresh tokens
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region (e.g., us-east-1)
- `S3_BUCKET_NAME` - S3 bucket name from CloudFormation
- `FRONTEND_URL` - Frontend URL for CORS
- `COOKIE_SECURE` - true for production
- `COOKIE_SAME_SITE` - none for cross-origin

### Frontend
- `VITE_API_URL` - Backend API URL

## Security Checklist

- [ ] Use AWS Secrets Manager for sensitive values
- [ ] Enable HTTPS (CloudFront/ALB)
- [ ] Set CORS whitelist to production domain
- [ ] Use secure cookies in production
- [ ] Rotate JWT secrets regularly
- [ ] Enable S3 bucket versioning
- [ ] Set S3 bucket policies (least privilege)
- [ ] Enable CloudFront WAF rules
- [ ] Set up CloudWatch alarms
- [ ] Enable AWS GuardDuty
- [ ] Regular security audits

## Monitoring

- CloudWatch Logs for application logs
- CloudWatch Metrics for performance
- AWS X-Ray for distributed tracing (optional)
- S3 access logs

## Cost Optimization

- Use S3 Intelligent-Tiering
- Enable CloudFront compression
- Set appropriate cache TTLs
- Use ECS Fargate Spot for non-production
- Monitor and optimize database queries

