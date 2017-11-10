
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
	* ~~Azure Container Service Plugin~~ 
	* `NodeJs Plugin` 
	* `EnvInject Plugin` *
	* `Deploy to kubernates Plugin` 
	* ~~Deploy to ACS Plugin~~
	* `github-organization-folder`: 
	```
		dir('/new-folder') {
			//...
		}
	```
	* ~~Azure App Service Plugin~~
	* `groovy`
2. Add an Azure service principal to the Jenkins credentials
To create an Azure service principal, use [Azure portal](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal).
On the Jenkins dashboard, select Credentials > System. Then, select Global credentials(unrestricted).
To add a Microsoft Azure service principal, select Add Credentials. Supply values for the Subscription ID, Client ID, Client Secret, and OAuth 2.0 Token Endpoint fields. Set the ID field to mySp. We use this ID in subsequent steps in this article.



## Reference
[Jenkins World 2017: Azure DevOps Open Source Integrations](https://www.youtube.com/watch?v=buQNF1sekq8)
[github repo of the talk above](https://github.com/azure-devops/movie-db-java-on-azure)
[Where is the generated private ssh key](https://stackoverflow.com/questions/44395863/azure-kubernetes-private-key-location)
[Troubleshoot Kubernetes Applications](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application/)
[setup github webhook](https://www.youtube.com/watch?v=ke3f3rcRSc8)