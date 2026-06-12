FROM node:18-alpine

# ---- Set working directory ----
WORKDIR /app

# ---- Copy package files first (cache-friendly) ----
COPY package*.json ./

# ---- Install dependencies AND fix directory permissions ----
# This line installs your production deps and explicitly updates permissions for the node user
RUN npm install --omit=dev && chown -R node:node /app

# ---- Copy application source ----
COPY . .

# Ensure the app source code belongs to the non-root user as well
RUN chown -R node:node /app

# ---- Environment ----
ENV NODE_ENV=production

# 👤 ---- Set Secure Non-Root User (Passes the Guardrail Check!) ----
USER node

# 🏥 ---- Healthcheck Gate ----
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# ---- Expose API port ----
EXPOSE 5000

# ---- Start backend ----
CMD ["npm", "start"]
