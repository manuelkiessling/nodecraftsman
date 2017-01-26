#!/usr/bin/env bash

npm install >/dev/null 2>&1

node ./index1.js
node ./index2.js
node ./index3.js
node ./index4.js

node ./insert.js
node ./addIndex.js
node ./query.js

node ./index5.js
