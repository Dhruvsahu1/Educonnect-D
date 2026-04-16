#!/bin/bash

set -e

VM_IP=$1
USER="hardik999"

if [ -z "$VM_IP" ]; then
  echo "Usage: ./get-kubeconfig.sh <VM_IP>"
  exit 1
fi

echo "Fetching kubeconfig from $VM_IP..."

ssh $USER@$VM_IP "sudo cat /etc/rancher/k3s/k3s.yaml" > kubeconfig

echo "Updating server endpoint..."

# Linux
sed -i "s/127.0.0.1/$VM_IP/g" kubeconfig 2>/dev/null || \
# macOS fallback
sed -i '' "s/127.0.0.1/$VM_IP/g" kubeconfig

echo "KUBECONFIG ready!"

echo "Run:"
echo "export KUBECONFIG=$(pwd)/kubeconfig"
