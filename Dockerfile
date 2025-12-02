# -----------------------------------------
# 1) Build Frontend
# -----------------------------------------
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci --silent

COPY frontend/ ./
RUN npm run build


# -----------------------------------------
# 2) Build Backend
# -----------------------------------------
FROM node:18-alpine AS backend

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --silent

COPY backend/ ./

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/build ./public

EXPOSE 5000

CMD ["npm", "start"]
