# amb-code-quickstart-app
The Ambassador Code Quickstart App assumes you have access to an empty Kubernetes cluster and kubectl access to this cluster.

```
cd k8s-config

kubectl apply -f 1-aes-crds.yml && kubectl wait --for condition=established --timeout=90s crd -lproduct=aes

kubectl apply -f 2-aes.yml && kubectl wait -n ambassador deploy -lproduct=aes --for condition=available --timeout=90s
```

Wait a few moments for an IP address to be assigned to the external load balancer.

```
AMBASSADOR_SERVICE_IP=$(kubectl get service -n ambassador ambassador -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
echo $AMBASSADOR_SERVICE_IP

kubectl apply -f mega-java-app.yaml 

kubectl get svc
NAME                   TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
frontendnodeservice    ClusterIP   10.3.249.212   <none>        3000/TCP   17s
kubernetes             ClusterIP   10.3.240.1     <none>        443/TCP    6m40s
verylargedatastore     ClusterIP   10.3.250.130   <none>        8080/TCP   16s
verylargejavaservice   ClusterIP   10.3.242.72    <none>        8080/TCP   17s

kubectl get pods
NAME                                    READY   STATUS    RESTARTS   AGE
frontendnodeservice-7ff88d444c-k2qcm    1/1     Running   0          55s
verylargedatastore-855c8b8789-d4t8h     1/1     Running   0          53s
verylargejavaservice-7dfddbc95c-bqklf   1/1     Running   0          54s

Access AMBASSADOR_SERVICE_IP/verylargejavaservice in your browser
```

## Setup your local Node development environment

```
cd ../FrontEndNodeService
npm install

node app -c blue
```

Telepresence 

```
telepresence intercept frontendnodeservice --port 3000

Refresh your browser page for AMBASSADOR_SERVICE_IP/verylargejavaservice to see the color and environment change based on the differences in the node service running on your local machine.
```