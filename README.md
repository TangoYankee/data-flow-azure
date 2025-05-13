# Data flow but for Azure

## Setup Azure Container App function
[Container tutorial](https://learn.microsoft.com/en-us/azure/azure-functions/functions-deploy-container-apps?tabs=acr%2Cbash&pivots=programming-language-typescript)

[Install Azure Function core tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-typescript#install-the-azure-functions-core-tools)

Initialize application from template

```sh
mkdir service-name
func init --worker-runtime node --language typescript --docker
```
