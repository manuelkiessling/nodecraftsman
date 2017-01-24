#!/usr/bin/env bash

cd ./ch03_test-driven_nodejs_development
rm -rf node_modules
docker run --rm -ti -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
cd -

cd ./ch06_using_and_creating_event_emitters
rm -rf ./creating_event_emitters/node_modules
docker run --rm -ti -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
cd -

cd ./ch10_building_a_complete_web_application_with_nodejs_and_angularjs
rm -rf node_modules
rm -rf src/frontend/bower_components
docker stop bacwawnaa-mysql
docker run --rm --name bacwawnaa-mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true -p 3306:3306 -d mysql:5.6
until docker run --rm -it --link bacwawnaa-mysql:mysql mysql:5.6 sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -uroot -e "CREATE DATABASE keyword_wrangler;"'
do
    echo "Trying again to create MySQL database 'keyword_wrangler'..."
done
docker run --rm -ti --link bacwawnaa-mysql:mysql -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
cd -
