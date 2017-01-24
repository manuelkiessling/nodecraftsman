#!/usr/bin/env bash

cd ./test-driven_nodejs_development
rm -rf node_modules
docker run --rm -ti -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
cd -

cd ./building_a_complete_web_application_with_nodejs_and_angularjs
rm -rf node_modules
rm -rf src/frontend/bower_components
docker run --rm -ti -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
cd -
