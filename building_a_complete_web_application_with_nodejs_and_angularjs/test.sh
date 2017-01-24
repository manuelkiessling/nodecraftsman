#!/usr/bin/env bash

npm install

cd src/frontend
../../node_modules/.bin/bower install --allow-root install
cd -

./node_modules/.bin/db-migrate up --env test
./node_modules/.bin/jasmine-node --verbose --captureExceptions ./spec/
