# EduConnect Project Structure

Complete file structure and organization guide.

```
EduConnect/
│
├── backend/                          # Node.js + Express Backend
│   ├── config/                       # Configuration files
│   │   ├── database.js              # MongoDB connection
│   │   └── s3.js                    # AWS S3 configuration
│   │
│   ├── controllers/                 # Request handlers
│   │   ├── adminController.js      # Admin operations
│   │   ├── authController.js       # Authentication
│   │   ├── certificationController.js
│   │   ├── commentController.js
│   │   ├── materialController.js
│   │   └── postController.js
│   │
│   ├── middleware/                  # Express middleware
│   │   ├── auth.js                 # JWT authentication
│   │   ├── errorHandler.js        # Error handling
│   │   └── upload.js               # File upload (multer)
│   │
│   ├── models/                      # Mongoose models
│   │   ├── Certification.js
│   │   ├── College.js
│   │   ├── Comment.js
│   │   ├── Material.js
│   │   ├── Post.js
│   │   └── User.js
│   │
│   ├── routes/                      # API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── certificationRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── materialRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── scripts/                     # Utility scripts
│   │   └── seed.js                 # Database seeding
│   │
│   ├── services/                    # Business logic services
│   │   └── jwtService.js           # JWT token management
│   │
│   ├── validators/                  # Request validation
│   │   ├── adminValidators.js
│   │   ├── authValidators.js
│   │   ├── certificationValidators.js
│   │   ├── commentValidators.js
│   │   ├── materialValidators.js
│   │   └── postValidators.js
│   │
│   ├── Dockerfile                   # Container image
│   ├── package.json                 # Dependencies
│   ├── server.js                   # Express app entry point
│   └── README.md                   # Backend documentation
│
├── frontend/                        # React + Vite Frontend
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   │   ├── admin/             # Admin components
│   │   │   │   ├── CertificationsReview.jsx
│   │   │   │   ├── CollegeManagement.jsx
│   │   │   │   └── MaterialUpload.jsx
│   │   │   ├── CertificationForm.jsx
│   │   │   ├── CommentThread.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── PostComposer.jsx
│   │   │   └── PrivateRoute.jsx
│   │   │
│   │   ├── pages/                  # Page components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Materials.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── store/                  # Redux store
│   │   │   ├── api/               # API service
│   │   │   │   └── api.js        # Axios instance
│   │   │   ├── slices/           # Redux slices
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── certificationsSlice.js
│   │   │   │   ├── materialsSlice.js
│   │   │   │   └── postsSlice.js
│   │   │   └── store.js          # Store configuration
│   │   │
│   │   ├── App.jsx                # Main app component
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # Entry point
│   │
│   ├── index.html                 # HTML template
│   ├── package.json              # Dependencies
│   ├── tailwind.config.js        # TailwindCSS config
│   ├── vite.config.js            # Vite config
│   └── README.md                 # Frontend documentation
│
├── infrastructure/                # AWS Infrastructure
│   ├── cloudformation-template.yaml  # CloudFormation template
│   └── README.md                  # Infrastructure docs
│
├── .github/
│   └── workflows/                 # CI/CD workflows
│       ├── backend-deploy.yml
│       └── frontend-deploy.yml
│
├── README.md                      # Main project README
├── QUICKSTART.md                  # Quick start guide
├── DEPLOYMENT.md                  # Deployment guide
├── PROJECT_STRUCTURE.md          # This file
└── .gitignore                    # Git ignore rules

```

## Key Directories

### Backend
- **controllers/**: Handle HTTP requests and responses
- **models/**: Mongoose schemas and database models
- **routes/**: Define API endpoints
- **middleware/**: Express middleware (auth, error handling, uploads)
- **validators/**: Request validation using express-validator
- **services/**: Business logic services (JWT, etc.)
- **config/**: Configuration files (database, S3)

### Frontend
- **components/**: Reusable React components
- **pages/**: Full page components (routes)
- **store/**: Redux state management
  - **slices/**: Redux Toolkit slices
  - **api/**: API service layer

### Infrastructure
- **cloudformation-template.yaml**: AWS infrastructure as code
- **.github/workflows/**: GitHub Actions CI/CD

## File Naming Conventions

- **Backend**: camelCase (e.g., `authController.js`)
- **Frontend**: PascalCase for components (e.g., `PostCard.jsx`)
- **Models**: PascalCase (e.g., `User.js`)
- **Routes**: camelCase with "Routes" suffix (e.g., `authRoutes.js`)

## Data Flow

1. **Frontend** → API call via `store/api/api.js`
2. **Backend** → Route → Validator → Controller → Service/Model
3. **Response** → Redux slice → Component update

## Key Technologies

- **Backend**: Express, Mongoose, JWT, AWS SDK
- **Frontend**: React, Redux Toolkit, React Router, Axios
- **Styling**: TailwindCSS
- **Build**: Vite (frontend), Node.js (backend)
- **Deployment**: Docker, AWS (EB/ECS, S3, CloudFront)

