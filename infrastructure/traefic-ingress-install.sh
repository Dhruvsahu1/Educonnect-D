#1️⃣ Export KUBECONFIG (do this now)
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml


#Verify:

kubectl get nodes


#If this works → kubeconfig is correct.

# Make it permanent (important)1. Execute the Helm Installer
Run the script you already downloaded. It will automatically move the helm binary to /usr/local/bin.
bash
./get_helm.sh
Use code with caution.

Verify by running: helm version
2. Add Traefik Repository
Before installing, you must tell Helm where to find the Traefik charts.
bash
helm repo add traefik https://traefik.github.io/charts
helm repo update
Use code with caution.

3. Install Traefik
Now run your install command. Note that K3s often has a built-in Traefik; if this command fails with "cannot re-use a name," it means Traefik is already there. 
bash
helm install traefik traefik/traefik \
  --namespace kube-system \
  --create-namespace
Use code with caution.

4. Verify the Deployment
bash
kubectl get pods -n kube-system | grep traefik
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


