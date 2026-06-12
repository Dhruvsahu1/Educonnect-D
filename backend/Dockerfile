FROM node:18-alpine

# ---- Set working directory ----
WORKDIR /app

# ---- Copy package files first (cache-friendly) ----
COPY package*.json ./

# ---- Install only production dependencies ----
RUN npm install --omit=dev

# ---- Copy application source ----
COPY . .

# ---- Environment ----
ENV NODE_ENV=production

# 👤 ---- Set Secure Non-Root User (Fixes USER error) ----
USER node

# 🏥 ---- Healthcheck Gate (Fixes HEALTHCHECK error) ----
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# ---- Expose API port ----
EXPOSE 5000

# ---- Start backend ----
CMD ["npm", "start"]
