FROM node:18-alpine

# 📂 ---- Set working directory to backend ----
WORKDIR /backend

# ---- Copy package files first (cache-friendly) ----
COPY package*.json ./

# ---- Create a custom non-root user and install dependencies ----
# FIXED: Changed /app to /backend on line 13 to match our WORKDIR!
RUN adduser -D -g "" appuser && \
    npm install --omit=dev && \
    chown -R appuser:appuser /backend

# ---- Copy application source ----
COPY . .

# Ensure all copied application source files belong to our new user
RUN chown -R appuser:appuser /backend

# ---- Environment ----
ENV NODE_ENV=production

# 👤 ---- Switch to the newly created custom non-root user ----
USER appuser

# 🏥 ---- Healthcheck Gate ----
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# ---- Expose API port ----
EXPOSE 5000

# ---- Start backend ----
CMD ["npm", "start"]
