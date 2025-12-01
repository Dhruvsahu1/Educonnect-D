# EduConnect Frontend

React + Vite frontend application for EduConnect.

## Features

- User authentication (Signup/Login/Logout)
- Social feed with posts and certifications
- Nested comment threads
- Profile page
- Study materials browser
- Admin dashboard

## Tech Stack

- React 18
- Vite
- Redux Toolkit
- React Router
- TailwindCSS
- Axios
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create `.env` file:

```bash
VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
npm run dev
```

Access at http://localhost:5173

### Build

```bash
npm run build
```

Output in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── admin/       # Admin-specific components
│   └── ...
├── pages/           # Page components
├── store/           # Redux store and slices
│   ├── api/         # API service
│   └── slices/      # Redux slices
└── App.jsx          # Main app component
```

## Features Overview

### Authentication
- JWT token management
- Automatic token refresh
- Protected routes

### Posts
- Create posts with images
- Like posts
- View feed with pagination

### Certifications
- Add professional certifications
- View certifications in feed and profile

### Comments
- Nested comment threads
- Reply to comments

### Materials
- Browse study materials (college-specific)
- Download materials

### Admin Dashboard
- Upload materials
- Manage colleges
- Review certifications

## API Integration

All API calls are handled through:
- `src/store/api/api.js` - Axios instance with interceptors
- Redux slices for state management

## Styling

- TailwindCSS for utility-first styling
- Custom components in `src/index.css`
- Responsive design

## Deployment

See `DEPLOYMENT.md` for AWS deployment instructions.

