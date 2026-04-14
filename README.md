
---

[![🦂 ZAP Security (DAST - Zero Trust)](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/dast.yaml/badge.svg)](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/dast.yaml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Dhruvsahu1/Educonnect-D/badge)](https://securityscorecards.dev/viewer/?uri=github.com/Dhruvsahu1/Educonnect-D)
![CI](https://img.shields.io/github/actions/workflow/status/Dhruvsahu1/Educonnect-D/ci.yml?label=CI%20Pipeline)
![CodeQL](https://img.shields.io/badge/Security-CodeQL-blueviolet?logo=github)
[![SonarQube Cloud](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/build.yaml/badge.svg)](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/build.yaml)
![Trivy Scan](https://img.shields.io/badge/Trivy-Image%20Scan-blue?logo=aquasecurity)
![SBOM](https://img.shields.io/badge/SBOM-CycloneDX-informational)
![Docker](https://img.shields.io/badge/Docker-Build%20%26%20Push-2496ED?logo=docker)
![Container Security](https://img.shields.io/badge/Container%20Security-Trivy-informational)
![Cloud Native](https://img.shields.io/badge/Cloud--Native-Kubernetes-326CE5?logo=kubernetes)

---

# EduConnect - Social + Academic Web Application

EduConnect is a full-stack web application that connects students and college administrators in a social and academic environment. Students can share posts, showcase certifications, interact through comments, and access study materials. Administrators can manage colleges, upload study materials, and moderate content.
## Hashnode Articles:
<a href="https://hardik0811arora.hashnode.dev/educonnect-a-deep-dive-into-cloud-native-security-k3s-orchestration">
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png" width="30" height="30" alt="Hashnode Article"/>
  🛡️ EduConnect: A Deep Dive into Cloud-Native Security & K3s Orchestration
</a><br>

<a href="https://hardik-arora.hashnode.dev/from-localhost-to-production-my-journey-debugging-mongodb-and-nodejs-on-k3s">
  <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png" width="30" height="30" alt="Hashnode Article"/>
From "Localhost" to Production: My Journey Debugging🛠️ MongoDB🛢️ and Node.js on k3s☸️</a>
---


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
- Hosted On K3s over VM
- Frontend and Backend Deployments and services exposed over Nginx ingress
- MongoDB Running as StatefulSet in cluster
  

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

Checkout [Infrastructure/README.md(branch-production)](https://github.com/barbaria888/Educonnect/tree/production/infrastructure)

## Security

- JWT tokens with secure refresh token rotation
- Rate limiting on authentication endpoints
- Helmet.js for security headers
- Input validation with express-validator
- CORS whitelist configuration
- S3 bucket policies with least privilege access

## License

MIT

