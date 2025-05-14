# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:4-node20-appservice
FROM mcr.microsoft.com/azure-functions/node:4-node20

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

# MinIO Client
RUN curl https://dl.min.io/client/mc/release/linux-amd64/mc \
    --create-dirs \
    -o $HOME/minio-binaries/mc

RUN chmod +x $HOME/minio-binaries/mc
ENV PATH "$PATH:$HOME/minio-binaries/"

# GDAL
RUN apt-get update
RUN apt-get install gdal-bin -y

# Directory for build artifacts
RUN mkdir ~/artifacts

# Azure function setup
WORKDIR /home/site/wwwroot

# Copy package.json and install packages before copying the rest of the code to enable caching
COPY ./package.json package.json
RUN npm install

# Copy the rest of the code
COPY . .
RUN  npm run build
