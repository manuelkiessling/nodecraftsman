#!/usr/bin/env bash

cd ./test-driven_nodejs_development/
docker run --rm -ti -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
