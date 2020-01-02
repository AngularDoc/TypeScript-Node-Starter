# TypeScript Node Starter

This is a simple API service that demonstrates two mongo builds that can be used for the data store.

## Building and pushing the docker image to GCP
Run the following command:
```
npm run gcp
```

## Deploying the app to GCP

### Native MongoDB
Run the following commands to deploy the API service using the mongo image:
```
gcloud compute disks create --size=200GB --zone=us-west1-c mongo-disk
kubectl apply -k install/mongo-native
```

### GCP-built MongoDB
Run the following commands to deploy the API service using launcher.gcr.io/google/mongodb3:
```
gcloud compute disks create --size=200GB --zone=us-west1-c mongo-disk
kubectl apply -k install/mongo-gcp
```
