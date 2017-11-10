```bash
# login to azure
az login 

# create resource group
az group create -n nintex -l "Australia SouthEast" 

# create container registry
az acr create --name nintexregistry --resource-group nintex --sku Basic
az acr login --name nintexregistry
az acr list --resource-group nintex --query "[].{acrLoginServer:loginServer}" --output table # return nintexregistry.azurecr.io 

# create web app
az appservice plan create --name shortenServicePlan --resource-group nintex --sku FREE
az webapp create --name web-app-shorten --resource-group nintex --plan shortenServicePlan --deployment-local-git



# optional
az webapp deployment user set --user-name ronliu --password <password> # creae a deployment user

```

