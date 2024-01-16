<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://github.com/CinePik/catalog/actions/workflows/ci.yml" target="_blank">
    <img src="https://github.com/CinePik/catalog/actions/workflows/ci.yml/badge.svg" alt="Catalog CI Workflow Status" />
  </a>
  <a href="https://github.com/CinePik/catalog/actions/workflows/cd.yml" target="_blank">
    <img src="https://github.com/CinePik/catalog/actions/workflows/cd.yml/badge.svg" alt="Catalog CD Workflow Status" />
  </a>
</p>

# CinePik Recommendation engine

Node.js microservice for user specific content recommendations.

## Documentation

OpenAPI documentation available at [http://localhost:3003/api](http://localhost:3003/api).  
For accessing secured endpoints add your `access_token` provided to you at login to the `Authorization` header.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Docker

To run the app in a docker container, run the following commands.

```bash
docker network create cinepik-network

docker build -t recommendation-engine .

docker run -d -t --env-file .env --network cinepik-network -p 3001:3001 recommendation-engine
```

To manually upload the image to Docker Hub, run the following commands.

```bash
docker build -t recommendation-engine .

docker tag recommendation-engine:latest <dockerhub_username>/recommendation-engine:latest

docker push <dockerhub_username>/recommendation-engine:latest
```

### Docker Compose

You can also setup the database and application with docker-compose.

```bash
# Run the database and application
docker-compose up --build app

docker-compose down
```

## Kubernetes deployment

### Setup configs

Create a Secret for the Watch this API environment variable in the deployment file.
Replace the value in the <> with the appropriate value. More info [here](https://rapidapi.com/vitalsx-apis-vitalsx-apis-default/api/watchthis).

```bash
kubectl create secret generic recommendation-credentials --from-literal=WATCH_THIS_RAPID_API_KEY=<REPLACE_ME>
```

### Apply changes

We can create the deployment and service.

```bash
kubectl apply -f k8s/recommendation-engine.yml
kubectl apply -f k8s/recommendation-engine-svc.yml
```

### Other useful commands

```bash
kubectl get pods
kubectl delete deployment recommendation-engine-deployment
kubectl delete configmap <configmap name>
kubectl rollout restart deployment/recommendation-engine-deployment
kubectl logs <pod-id>
kubectl describe secret <secret-name>
kubectl get secret <secret-name>
kubectl get service
kubectl describe pods
```
