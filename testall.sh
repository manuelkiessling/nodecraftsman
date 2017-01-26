#!/usr/bin/env bash

cd ./ch03_test-driven_nodejs_development
rm -rf node_modules
docker run --rm -ti -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
cd -

cd ./ch06_using_and_creating_event_emitters
rm -rf ./creating_event_emitters/node_modules
docker run --rm -ti -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
cd -

cd ./ch07_optimizing_code_performance_and_control_flow_management_using_the_async_library
rm -rf ./node_modules
docker run --rm -ti -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
cd -

cd ./ch08_nodejs_and_mysql
rm -rf node_modules
docker stop nam-mysql
docker run --rm --name nam-mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true -d mysql:5.6
until docker run --rm -it --link nam-mysql:mysql mysql:5.6 sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -uroot -e "CREATE DATABASE are_we_ready_yet;"'
do
    echo "Trying again to create MySQL database 'are_we_ready_yet'..."
done
docker run --rm -ti --link nam-mysql:mysql -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
docker stop nam-mysql
cd -

cd ./ch09_nodejs_and_mongodb
rm -rf node_modules
docker stop nam-mongo
docker run --rm --name nam-mongo -p 27017:27017 -d mongo:3.4
until docker run --rm -ti -v "$PWD":/opt/source -w /opt/source --link nam-mongo:mongo mongo:3.4 sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test" /opt/source/mongoConnectionTest.js'
do
    echo "Waiting for MongoDB to come up..."
done
docker run --rm -ti --link nam-mongo:mongo -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
docker stop nam-mongo
cd -

cd ./ch10_building_a_complete_web_application_with_nodejs_and_angularjs
rm -rf node_modules
rm -rf src/frontend/bower_components
docker stop bacwawnaa-mysql
docker run --rm --name bacwawnaa-mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true -d mysql:5.6
until docker run --rm -it --link bacwawnaa-mysql:mysql mysql:5.6 sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -uroot -e "CREATE DATABASE keyword_wrangler;"'
do
    echo "Trying again to create MySQL database 'keyword_wrangler'..."
done
docker run --rm -ti --link bacwawnaa-mysql:mysql -v "$PWD":/opt/source -w /opt/source node:7.4.0 /bin/bash ./test.sh
docker stop bacwawnaa-mysql
cd -
