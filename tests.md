# Description
Manual tests. Copy these into a terminal.


## Boroughs

Run all steps (change each parameter to toggle each step individually)
```sh
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"skipDependencies": false, "skipDependents": false, "skipTiles": false, "skipDownloads": false}' \
  http://localhost:8080/api/boroughs
```
