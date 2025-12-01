# EduConnect Environment Setup Script
Write-Host "Setting up EduConnect environment files..." -ForegroundColor Green

# Backend .env
$backendEnv = @"
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/educonnect
JWT_SECRET=dev-secret-key-change-in-production-min-32-chars-12345
JWT_REFRESH_SECRET=dev-refresh-secret-key-change-in-production-min-32-chars-12345
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=educonnect-uploads-dev
FRONTEND_URL=http://localhost:5173
COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
"@

if (-not (Test-Path "backend\.env")) {
    $backendEnv | Out-File -FilePath "backend\.env" -Encoding utf8
    Write-Host "Created backend/.env" -ForegroundColor Yellow
} else {
    Write-Host "backend/.env already exists" -ForegroundColor Gray
}

# Frontend .env
$frontendEnv = @"
VITE_API_URL=http://localhost:5000/api
"@

if (-not (Test-Path "frontend\.env")) {
    $frontendEnv | Out-File -FilePath "frontend\.env" -Encoding utf8
    Write-Host "Created frontend/.env" -ForegroundColor Yellow
} else {
    Write-Host "frontend/.env already exists" -ForegroundColor Gray
}

Write-Host "`nEnvironment files are ready!" -ForegroundColor Green
Write-Host "`nIMPORTANT: Update backend/.env with your MongoDB URI and AWS credentials if needed." -ForegroundColor Yellow
Write-Host "For local development, you can use: mongodb://localhost:27017/educonnect" -ForegroundColor Cyan

