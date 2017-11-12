
## Create azure acs
```bash
az group create -n nintexau -l "Australia SouthEast"
az acs create -g nintexau -n shortenau --orchestrator-type kubernetes --agent-count 1 --agent-vm-size Standard_D2_Promo --generate-ssh-keys

# tell the acr registry credential
az acr credential show -n nintexregistry

```

## create container registry
```bash
az acr create --name nintexauregistry --resource-group nintexau --sku Basic
az acr login --name nintexauregistry
az acr list --resource-group nintexau --query "[].{acrLoginServer:loginServer}" --output table # return nintexregistry.azurecr.io

# show acr registry credential, need to input into jenkins in later step
az acr credential show -n nintexregistry
```

## Setup jenkins server in Azure
```bash
# run all the command under project root path
# follow: https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-jenkins-github-docker-cicd
az vm create --resource-group nintex \
    --name jenkins-vm \
    --image UbuntuLTS \
    --admin-username ron \
    --generate-ssh-keys \
    --custom-data ./deploy/cloud-init-jenkins.txt
    
az vm open-port --resource-group nintex --name jenkins-vm --port 8080 --priority 1001
az vm open-port --resource-group nintex --name jenkins-vm --port 1337 --priority 1002
az vm show --resource-group nintex --name jenkins-vm -d --query [publicIps] --o tsv # return 52.250.122.107
```

## Add Azure plugins
1. Add 
	* `NodeJs Plugin` 
	* `EnvInject Plugin` *
	* `Deploy to kubernates Plugin` 
	* `SSH credential plugin`
	* `github-organization-folder`: 
	```
		dir('/new-folder') {
			//...
		}
	```
	* Github plugin
2. Create Azure Container Service credential using `ssh credential`, to retrieve
  * get the azure container service instance dns by run `az acs list`
  * when creating ssh credential providing:
    * user: retrieve by running `az acs list`
    * ssh: refer [Where is the generated private ssh key](https://stackoverflow.com/questions/44395863/azure-kubernetes-private-key-location) 
3. Create Azure Container Registry credential using `username and password` credential, to retrieve run `az acr credential show -n nintexregistry`
4. Create a job with pipeline, config pipeline using `Jenkinsfile` and manually copy `Jenkins.properties` to `EnvInject Plugin` section 
5. Setup github webhook, see [setup github webhook](https://medium.com/@marc_best/trigger-a-jenkins-build-from-a-github-push-b922468ef1ae)     

## Reference
- [Jenkins World 2017: Azure DevOps Open Source Integrations](https://www.youtube.com/watch?v=buQNF1sekq8)
- [github repo of the talk above](https://github.com/azure-devops/movie-db-java-on-azure)
- [Troubleshoot Kubernetes Applications](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application/)