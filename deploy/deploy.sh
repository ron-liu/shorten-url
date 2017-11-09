echo 1>&2 "deploy version: $1"
## clean
rm -rf ../node_modules
rm -rf ../server/node_modules
rm -rf ../web/node_modules
rm -rf ../web/static-server/node_modules
rm -rf ../server/dist/
rm -rf ../web/static-server/build

## build docker locally
docker build -t shorten-server:$1 ../server
docker build -t shorten-web:$1 ../web

# tag
docker tag shorten-server:$1 nintexregistry.azurecr.io/shorten-server:$1
docker tag shorten-web:$1 nintexregistry.azurecr.io/shorten-web:$1
#
## push to azure image registry
az acr login --name nintexregistry
docker push nintexregistry.azurecr.io/shorten-server:$1
docker push nintexregistry.azurecr.io/shorten-web:$1

## apply to azure
kubectl apply -f ./shorten-deploy.yml

