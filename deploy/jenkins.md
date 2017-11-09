
## Setup jenkins server in Azure
```bash
# run all the command under project root path
# follow: https://docs.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-jenkins-github-docker-cicd
az vm create --resource-group nintex \
    --name jenkinsvm \
    --image UbuntuLTS \
    --admin-username ron \
    --generate-ssh-keys \
    --custom-data ./deploy/cloud-init-jenkins.txt
    
az vm open-port --resource-group nintex --name jenkinsvm --port 8080 --priority 1001
az vm open-port --resource-group nintex --name jenkinsvm --port 1337 --priority 1002
az vm show --resource-group nintex --name jenkinsvm -d --query [publicIps] --o tsv # return 52.250.122.107
```

## Add Azure plugins
1. Add `Azure Container Service Plugin` `NodeJs Plugin`
2. Add an Azure service principal to the Jenkins credentials
To create an Azure service principal, use [Azure portal](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal).
On the Jenkins dashboard, select Credentials > System. Then, select Global credentials(unrestricted).
To add a Microsoft Azure service principal, select Add Credentials. Supply values for the Subscription ID, Client ID, Client Secret, and OAuth 2.0 Token Endpoint fields. Set the ID field to mySp. We use this ID in subsequent steps in this article.



