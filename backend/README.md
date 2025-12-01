# EduConnect Backend API

RESTful API for EduConnect built with Node.js, Express, and MongoDB.

## Features

- JWT authentication with refresh tokens
- Role-based access control (Student/Admin)
- File uploads to AWS S3
- Nested comment threads
- Pagination and filtering
- Input validation
- Rate limiting
- Security headers (Helmet)
- Error handling

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get paginated posts (query: page, limit, college)
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post (multipart/form-data: content, image, type)
- `POST /api/posts/:id/like` - Toggle like on post
- `DELETE /api/posts/:id` - Delete post

### Certifications
- `GET /api/certifications` - Get user certifications (query: userId, page, limit)
- `GET /api/certifications/:id` - Get certification by ID
- `POST /api/certifications` - Create certification (multipart/form-data)
- `DELETE /api/certifications/:id` - Delete certification
- `GET /api/certifications/admin/all` - Admin: Get all certifications (query: college, page, limit)

### Comments
- `GET /api/comments/:postId` - Get comments for post (nested structure)
- `POST /api/comments/:postId` - Create comment (body: content, parentCommentId)
- `DELETE /api/comments/:id` - Delete comment

### Materials
- `GET /api/materials` - Get materials (query: college, page, limit)
- `GET /api/materials/:id` - Get material by ID
- `POST /api/materials` - Admin: Upload material (multipart/form-data)
- `PUT /api/materials/:id` - Admin: Update material
- `DELETE /api/materials/:id` - Admin: Delete material

### Admin
- `POST /api/admin/colleges` - Create college
- `GET /api/admin/colleges` - Get all colleges
- `GET /api/admin/colleges/:id` - Get college by ID
- `PUT /api/admin/colleges/:id` - Update college
- `DELETE /api/admin/colleges/:id` - Delete college
- `GET /api/admin/users` - Get users (query: role, college, page, limit)
- `DELETE /api/admin/users/:id` - Delete user

## Environment Variables

See `.env.example` for all required environment variables.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from `.env.example` and fill in values

3. Seed database (optional):
   ```bash
   npm run seed
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Start production server:
   ```bash
   npm start
   ```

## Authentication

The API uses JWT tokens for authentication:
- Access tokens are sent in the `Authorization` header: `Bearer <token>`
- Refresh tokens are stored in httpOnly cookies or can be sent in request body
- Access tokens expire in 15 minutes (configurable)
- Refresh tokens expire in 7 days (configurable)

## File Uploads

Files are uploaded to AWS S3. Supported formats:
- Images: JPEG, PNG, GIF
- Documents: PDF, PPTX, DOCX, DOC

Maximum file size: 10MB

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

