set -e

API_URL=${VITE_API_URL:-/api}
echo "Replacing __API_URL__ with $API_URL"
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__API_URL__|${API_URL}|g" {} \;

exec nginx -g "daemon off;"
