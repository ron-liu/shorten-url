```bash
az group create -n nintexau -l "Australia SouthEast"
az acs create -g nintexau -n shortenau --orchestrator-type kubernetes --agent-count 1 --agent-vm-size Standard_D2_Promo --generate-ssh-keys

# tell the acr registry credential
az acr credential show -n nintexregistry



```