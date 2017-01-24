#!/usr/bin/env bash

cd ./using_event_emitters
node ./index.js
cd -

cd ./creating_event_emitters
npm install
./node_modules/jasmine-node/bin/jasmine-node ./FilesizeWatcherSpec.js
cd -
