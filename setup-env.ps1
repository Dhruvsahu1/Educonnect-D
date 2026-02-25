# EduConnect Production Environment Setup Script
Write-Host "Setting up EduConnect PRODUCTION environment files..." -ForegroundColor Green

# =========================
# Backend .env (Production)
# =========================
$backendEnv = @"
PORT=5000
NODE_ENV=production

# MongoDB inside K3s cluster (service name)
MONGO_URI=mongodb://mongo:27017/educonnect

# JWT Secrets (CHANGE THESE!)
JWT_SECRET=super-secure-production-secret-32-chars-minimum
JWT_REFRESH_SECRET=super-secure-refresh-secret-32-chars-minimum
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# AWS Config
AWS_ACCESS_KEY_ID=your-real-aws-access-key
AWS_SECRET_ACCESS_KEY=your-real-aws-secret-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=educonnect-uploads-prod

# Frontend URL (S3 website URL)
FRONTEND_URL=https://educonnect-frontend.s3-website-us-east-1.amazonaws.com

# Cookie settings for cross-origin HTTPS
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
"@

$backendEnv | Out-File -FilePath "backend\.env" -Encoding utf8 -Force
Write-Host "Updated backend/.env" -ForegroundColor Yellow


# =========================
# Frontend .env (Production)
# =========================
$frontendEnv = @"
# Backend exposed via VM IP and NodePort
VITE_API_URL=http://YOUR_VM_IP:30080/api
"@

$frontendEnv | Out-File -FilePath "frontend\.env" -Encoding utf8 -Force
Write-Host "Updated frontend/.env" -ForegroundColor Yellow


Write-Host "`nProduction environment files are ready!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Replace YOUR_VM_IP with your actual VM public IP"
Write-Host "2. Replace AWS credentials"
Write-Host "3. Change JWT secrets"
Write-Host "4. Rebuild frontend: npm run build"
Write-Host "5. Upload dist/ to S3"
Write-Host "6. Redeploy backend in K3s"