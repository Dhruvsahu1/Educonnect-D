#1️⃣ Export KUBECONFIG (do this now)
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml


#Verify:

kubectl get nodes


#If this works → kubeconfig is correct.

# Make it permanent (important)
echo 'export KUBECONFIG=/etc/rancher/k3s/k3s.yaml' >> ~/.bashrc
source ~/.bashrc


#Now both kubectl and helm will always work.

# 3️⃣ Retry Traefik install (this time it will succeed)
helm install traefik traefik/traefik \
  --namespace kube-system \
  --create-namespace

#You should see something like:

#NAME: traefik
#STATUS: deployed

#4️⃣ Verify Traefik is finally alive
kubectl get pods -n kube-system | grep traefik


