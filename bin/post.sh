#!/bin/bash

FILE="$1"

if [ "${FILE}" == "" ]; then
    echo "usage: $0 file"
    exit 1
fi

curl --location 'http://localhost:8080/ldes/' \
     --header 'Content-Type: application/ld+json' \
     --data-binary "@${FILE}" 