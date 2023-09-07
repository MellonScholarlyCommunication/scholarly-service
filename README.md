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
npm run server
```

## Usage

### Adding a LDES event

To store a new event in the LDES, you can send a POST request to the `/ldes/` endpoint of the Ingest service.
By default, this service runs on `http://localhost:8080/`.
This means that you could add a new event to the LDES using the following command:

```bash
curl --location 'http://localhost:8080/ldes/' \
--header 'Content-Type: application/ld+json' \
--data-raw '{
    "@context": "https://www.w3.org/ns/activitystreams",
    "id": "urn:uuid:3ba92ea8-5416-458a-96ce-5773b556c875",
    "type": "Announce",
    "published": "2018-03-26",
    "actor": {
        "id": "https://scholexplorer.openaire.eu/#about",
        "name": "OpenAIRE ScholeXplorer",
        "inbox": "https://scholexplorer.openaire.eu/inbox/",
        "type": "Organization"
    },
    "origin": {
        "id": "https://mellonscholarlycommunication.github.io/about#us",
        "name": "UGent/Mellon JSON-LD/AS2 Notification Generator for Scholix",
        "type": "Application"
    },
    "object": {
        "id": "urn:uuid:2fe6dd1f-39c4-47e8-b0a0-ab6ab79e0749",
        "type": "Relationship",
        "relationship": "http://www.scholix.org/IsReferencedBy",
        "subject": "https://dx.doi.org/10.5281/zenodo.2630550",
        "object": "http://aclweb.org/anthology/N18-1140"
    },
    "context": "http://aclweb.org/anthology/N18-1140",
    "target": {
        "id": "https://bellow2.ugent.be/test/scholix/antwerpen/aclweb.org/about#us",
        "inbox": "https://bellow2.ugent.be/test/scholix/antwerpen/aclweb.org/inbox/",
        "type": "Organization"
    }
}'
```

or use a command line tool:

```
bin/post.sh demo/announce.jsonld
```

#### Supported Content-Types
There are multiple supported Content-Types for the POST request:
- `application/ld+json`
- `text/turtle`
- `application/n-triples`
- `application/n-quads`

### Retrieving the LDES

To retrieve the LDES, you can send a GET request to the `/ldes/` endpoint of the Solid Server.
By default, this service runs on `http://localhost:3000/`.
This means that you could retrieve the LDES using the following command:

```bash
curl http://localhost:3000/ldes/
```

### Cleanup 

To stop the MongoDB instance run: 

```
docker-compose stop
```

To stop and remove containers, networks of MongoDB run:

```
docker-compose down
```
