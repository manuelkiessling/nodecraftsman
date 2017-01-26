#!/usr/bin/env bash

node ./server.js &
npm install request@2.79.0 async@2.1.4 >/dev/null 2>&1

node ./client1.js
node ./client2.js
node ./client3.js
node ./client4.js
node ./client5.js
