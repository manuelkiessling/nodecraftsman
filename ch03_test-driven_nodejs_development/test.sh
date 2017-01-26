#!/usr/bin/env bash

npm install >/dev/null 2>&1
./node_modules/jasmine-node/bin/jasmine-node spec/greetSpec.js
