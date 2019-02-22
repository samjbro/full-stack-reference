#!/bin/bash

if [[ "$TRAVIS_BRANCH" = "master" && "$TRAVIS_PULL_REQUEST" = false ]] ; then
# Build images
  docker build -t samjbro/full-stack-reference-nginx ./nginx
  docker build -t samjbro/full-stack-reference-client ./client
  docker build -t samjbro/full-stack-reference-api ./api
# Log in to the Docker CLI
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
# Push images to Docker Hub
  docker push samjbro/full-stack-reference-nginx
  docker push samjbro/full-stack-reference-client
  docker push samjbro/full-stack-reference-api
else
  echo "Skipping push to Docker since we're not on the master branch"
fi