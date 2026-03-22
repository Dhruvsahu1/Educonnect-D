#!/bin/bash
# Prometheus & Grafana Installation Script - Minimal Fuss
# Usage: ./install-monitoring.sh

set -e

NAMESPACE="monitoring"
HELM_RELEASE="prometheus"

echo "Installing Prometheus & Grafana to namespace: $NAMESPACE"

# Check if Helm is installed
if ! command -v helm &> /dev/null; then
    echo "Helm not found. Installing Helm..."
    curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
fi

# Add Prometheus community repo if not exists
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts 2>/dev/null || true
helm repo update

# Install kube-prometheus-stack
helm upgrade --install "$HELM_RELEASE" prometheus-community/kube-prometheus-stack \
    --namespace "$NAMESPACE" \
    --create-namespace \
    --wait \
    --timeout 10m \
    --set prometheus.prometheusSpec.retention=7d \
    --set grafana.persistence.enabled=true \
    --set grafana.persistence.size=10Gi

echo ""
echo "Prometheus & Grafana installed successfully!"
echo ""
echo "To access Prometheus UI, run:"
echo "  kubectl port-forward svc/prometheus-kube-prometheus -n $NAMESPACE 9090:9090"
echo "  Then open: http://localhost:9090"
echo ""
echo "To access Grafana, run:"
echo "  kubectl port-forward svc/prometheus-grafana -n $NAMESPACE 3000:80"
echo "  Then open: http://localhost:3000"
echo ""
echo "Grafana default credentials:"
echo "  admin / prom-operator"
echo ""
echo "To get Grafana password, run:"
echo "  kubectl get secret prometheus-grafana -n $NAMESPACE -o jsonpath=\"{.data.admin-password}\" | base64 -d"
