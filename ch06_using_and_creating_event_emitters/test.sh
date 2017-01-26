#!/usr/bin/env bash

cd ./using_event_emitters
node ./index.js
cd -

cd ./creating_event_emitters
npm install >/dev/null 2>&1
./node_modules/jasmine-node/bin/jasmine-node ./FilesizeWatcherSpec.js
cd -
