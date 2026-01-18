k apply -f frontend-deployment.yaml
k apply -f frontend-service.yaml
k apply -f backend-deployment.yaml
k apply -f backend-service.yaml
k apply -f mongo-pvc.yaml
k apply -f mongo-deployment.yaml
k apply -f mongo-service.yaml

