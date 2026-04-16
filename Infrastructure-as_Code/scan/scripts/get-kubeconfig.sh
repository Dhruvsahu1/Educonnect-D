#!/bin/bash

VM_IP=$1

scp azureuser@$VM_IP:/etc/rancher/k3s/k3s.yaml ./kubeconfig

sed -i "s/127.0.0.1/$VM_IP/g" kubeconfig

echo "KUBECONFIG ready!"
