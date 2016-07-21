#!/bin/sh
echo "testing with" $1
./node_modules/.bin/protractorprotractor-sauce.conf.js --capabilities.browserName=$1
# --capabilities.build=$JENKINS_BUILD_NUMBER
