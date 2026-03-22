#!/bin/bash
# EduConnect K3s Deployment Script (with Ingress-NGINX)
# Run this script on the K3s master node

set -e

echo "=== EduConnect K3s Deployment ==="

# 0️⃣ Verify kubectl
echo "0. Checking kubectl connectivity..."
kubectl get nodes

# 1️⃣ Install ingress-nginx if not present
if ! kubectl get ns ingress-nginx &> /dev/null; then
  echo "1. Installing ingress-nginx..."
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.14.0/deploy/static/provider/k3s/deploy.yaml
  echo "Waiting 30s for ingress pods to start..."
  sleep 30
else
  echo "Ingress namespace exists — skipping install"
fi

# 2️⃣ Patch ingress-nginx service to NodePort
echo "2. Patching ingress-nginx controller to NodePort..."
kubectl patch svc ingress-nginx-controller -n ingress-nginx \
  -p '{"spec":{"type":"NodePort"}}'

NODEPORT_HTTP=$(kubectl get svc ingress-nginx-controller -n ingress-nginx -o jsonpath='{.spec.ports[?(@.port==80)].nodePort}')
NODEPORT_HTTPS=$(kubectl get svc ingress-nginx-controller -n ingress-nginx -o jsonpath='{.spec.ports[?(@.port==443)].nodePort}')

echo "Ingress NodePorts: HTTP=$NODEPORT_HTTP, HTTPS=$NODEPORT_HTTPS"

# 3️⃣ Deploy MongoDB
echo "3. Deploying MongoDB..."
kubectl apply -f mongodb.yaml

# 4️⃣ Deploy Backend
echo "4. Deploying Backend..."
kubectl apply -f backend.yaml

# 5️⃣ Deploy Frontend
echo "5. Deploying Frontend..."
kubectl apply -f frontend.yaml

# 6️⃣ Deploy Ingress
echo "6. Deploying Ingress..."
kubectl apply -f ingress.yaml

# 7️⃣ Wait for deployments to be ready
echo "7. Waiting for deployments to be ready..."
kubectl wait --for=condition=available deployment/mongodb --timeout=180s
kubectl wait --for=condition=available deployment/backend --timeout=180s
kubectl wait --for=condition=available deployment/frontend --timeout=180s

# 8️⃣ Show status
echo "8. Current status:"
kubectl get pods -o wide
kubectl get svc -o wide
kubectl get ingress

# 9️⃣ Print access info
NODE_IP=$(hostname -I | awk '{print $1}')
echo ""
echo "=== Deployment Complete ==="
echo "Frontend URL (HTTP): http://$NODE_IP:$NODEPORT_HTTP/"
echo "Backend API URL: http://$NODE_IP:$NODEPORT_HTTP/api"
echo "Health check: http://$NODE_IP:$NODEPORT_HTTP/health"
