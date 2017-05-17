#! /bin/sh

find . -name "*.ngfactory.ts" -delete
find . -name "*.ngsummary.json" -delete
find . -name "*.ngstyle.ts" -delete

./node_modules/.bin/ngc
webpack
