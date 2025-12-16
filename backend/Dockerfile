# ---- Base Image ----
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

# ---- Expose API port ----
EXPOSE 5000

# ---- Start backend ----
CMD ["npm", "start"]
