#!/bin/bash
# ArgoCD Installation Script - Minimal Fuss
# Usage: ./install-argocd.sh

set -e

NAMESPACE="argocd"
echo "Installing ArgoCD to namespace: $NAMESPACE"

# Install ArgoCD
kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -n "$NAMESPACE" -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD to be ready
echo "Waiting for ArgoCD to be ready..."
kubectl rollout status deployment/argocd-server -n "$NAMESPACE" --timeout=300s
kubectl rollout status deployment/argocd-repo-server -n "$NAMESPACE" --timeout=300s
kubectl rollout status deployment/argocd-application-controller -n "$NAMESPACE" --timeout=300s

# Get initial admin password
echo ""
echo "ArgoCD installed successfully!"
echo "To get the admin password, run:"
echo "  kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath=\"{.data.password}\" | base64 -d"
echo ""
echo "To access ArgoCD UI, run:"
echo "  kubectl port-forward svc/argocd-server -n argocd 8080:443"
echo ""
echo "Then open: https://localhost:8080"
