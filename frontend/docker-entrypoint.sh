#!/bin/sh
set -e

# Get the API URL from environment variable, default to Kubernetes service URL
API_URL=${API_URL:-http://backend:5000/api}

echo "Replacing __API_URL__ with: $API_URL"

# Replace the placeholder in the built JS files
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__API_URL__|${API_URL}|g" {} \;

echo "Starting nginx..."
exec nginx -g "daemon off;"
