# ---------- Dev Image ----------
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY backend ./backend

# Copy frontend
COPY frontend ./frontend

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --legacy-peer-deps

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install --legacy-peer-deps

EXPOSE 5000

WORKDIR /app/backend
CMD ["node", "server.js"]
