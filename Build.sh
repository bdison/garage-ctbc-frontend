#!/bin/sh
echo Building ctbc-frontend

docker build -t ctbc-frontend . -f Dockerfile.build
docker create --name extract ctbc-frontend
docker cp extract:. ./app
docker rm -f extract

echo Run ctbc-frontend

docker build --no-cache -t ctbc-frontend . -f Dockerfile.run
rm ./app