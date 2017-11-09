```bash
# login to azure
az login 

# create resource group
az group create -n nintex -l "westus2" 

# create container registry
az acr create --name nintexregistry --resource-group nintex --sku Basic
az acr login --name nintexregistry
az acr list --resource-group nintex --query "[].{acrLoginServer:loginServer}" --output table # return nintexregistry.azurecr.io

# register necessary services
az provider register -n Microsoft.ContainerService
az provider register -n Microsoft.Compute 
az provider register -n Microsoft.Network
az provider show -n Microsoft.ContainerService --query "registrationState"
az provider show -n Microsoft.Compute --query "registrationState"
az provider show -n Microsoft.Network --query "registrationState"

# create azure container service
az aks create --resource-group nintex --name shorten --agent-count 1 --generate-ssh-keys
az aks install-cli
az aks get-credentials --resource-group nintex --name shorten
kubectl get nodes

# build docker locally
docker build -t shorten-server ./server
docker build -t shorten-web ./web

# tag
docker tag shorten-server nintexregistry.azurecr.io/shorten-server
docker tag shorten-web nintexregistry.azurecr.io/shorten-web

# push to azure image registry
docker push nintexregistry.azurecr.io/shorten-server
docker push nintexregistry.azurecr.io/shorten-web

# apply to azure
kubectl apply -f ./shorten-deploy.yml
 

# optional
az webapp deployment user set --user-name ronliu --password <password> # creae a deployment user

```

