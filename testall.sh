#!/usr/bin/env bash

cd ./test-driven_nodejs_development/
npm install
./node_modules/jasmine-node/bin/jasmine-node spec/greetSpec.js
