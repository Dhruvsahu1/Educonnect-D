# ======================================================
# EduConnect Production Environment Setup Script
# ======================================================
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
# Frontend .env (Production / Local fallback)
# =========================
try {
    # Try to get backend-service LoadBalancer IP
    $backendIP = kubectl get svc backend-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
    if (-not $backendIP) {
        Write-Host "Backend LoadBalancer not found, using localhost" -ForegroundColor Yellow
        $backendIP = "localhost"
    }
} catch {
    Write-Host "Error retrieving backend-service IP, using localhost: $_" -ForegroundColor Yellow
    $backendIP = "localhost"
}

$frontendEnv = @"
# Backend URL (dynamic: service or localhost)
VITE_API_URL=http://backend:5000/api
"@

$frontendEnv | Out-File -FilePath "frontend\.env" -Encoding utf8 -Force
Write-Host "Updated frontend/.env with backend URL $backendIP:5000" -ForegroundColor Yellow

# =========================
# Final Message & Next Steps
# =========================
Write-Host "`nProduction environment files are ready!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Replace AWS credentials in backend/.env"
Write-Host "2. Change JWT secrets in backend/.env"
Write-Host "3. Rebuild frontend: npm run build"
Write-Host "4. Upload frontend/dist/ to S3"
Write-Host "5. Redeploy backend in K3s"
Write-Host "6. Test frontend API connectivity"
Write-Host "7. (Optional) For local development, create frontend/.env.local with VITE_API_URL=http://localhost:5000/api"