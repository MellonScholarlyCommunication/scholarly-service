# Scholarly Service

This repository contains a Scholarly Service ([Service Node](https://www.eventnotifications.net/#ServiceNode)) which is a [Linked Data Notifications](https://www.w3.org/TR/ldn/) (LDN) inbox. The inbox is used to receive notifications with [ActivityStreams2](https://www.w3.org/TR/activitystreams-core/) payloads from an Agent.
It uses an [LDES](https://w3id.org/ldes/specification) to store the notifications (implemented using the [LDES-Solid-Server](https://github.com/TREEcg/LDES-Solid-Server/tree/master)).

## Installation

First, clone the project and install the dependencies:

```bash
git clone git@github.com:MellonScholarlyCommunication/scholarly-service.git
cd scholarly-service
npm install

# download and install pipeline dependencies
cd node_modules/js-runner
npm install
npm run build

# compile local processor
cd -
npm run build
```

## MongoDB

The Scholarly Service uses MongoDB to store the LDES. You can use Docker-Compose to run a MongoDB instance:

```bash
docker-compose up -d
```

However, any MongoDB instance will do. You can configure the MongoDB connection in the [server.json](server.json) **and** [pipeline.ttl](pipeline.ttl) files.

## Running the Scholarly Service

You can run the Scholarly Service using the following commands:

```bash
# Start the Ingest
npm run ingest

# Start the Solid Server
npm run solid
```
