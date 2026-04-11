#!/bin/bash

echo "Installing Prometheus & Grafana..."

# Install Helm if not present
command -v helm >/dev/null 2>&1 || {
  echo "Installing Helm..."
  curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
}

# Add repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts >/dev/null 2>&1
helm repo update

# Install stack
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

echo ""
echo "✅ Installed!"

echo ""
echo "👉 Access Grafana:"
echo "kubectl port-forward svc/monitoring-grafana -n monitoring 3000:80"

echo ""
echo "👉 Access Prometheus:"
echo "kubectl port-forward svc/monitoring-kube-prometheus-prometheus -n monitoring 9090:9090"

echo ""
echo "👉 Grafana Login:"
echo "username: admin"
echo "password:"
echo "kubectl get secret monitoring-grafana -n monitoring -o jsonpath='{.data.admin-password}' | base64 -d"
