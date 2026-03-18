#!/bin/bash
# EduConnect K3s Deployment Script
# Run this script on the K3s master node

set -e

echo "=== EduConnect K3s Deployment ==="

# Verify kubeconfig
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

echo "1. Checking cluster connectivity..."
kubectl get nodes

echo "2. Deploying MongoDB..."
kubectl apply -f mongodb.yaml

echo "3. Deploying Backend..."
kubectl apply -f backend.yaml

echo "4. Deploying Frontend..."
kubectl apply -f frontend.yaml

echo "5. Deploying Ingress..."
kubectl apply -f ingress.yaml

echo "6. Waiting for deployments to be ready..."
kubectl wait --for=condition=available deployment/mongodb --timeout=120s
kubectl wait --for=condition=available deployment/backend --timeout=120s
kubectl wait --for=condition=available deployment/frontend --timeout=120s

echo "7. Checking status..."
kubectl get pods -o wide
kubectl get services
kubectl get ingress

echo ""
echo "=== Deployment Complete ==="
echo "Frontend: Check ingress IP with: kubectl get ingress"
echo "Backend API: http://<ingress-ip>/api"
echo "Health check: http://<ingress-ip>/health"
