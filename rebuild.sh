#! /bin/sh

LANG=$1

find . -name "*.ngfactory.ts" -delete
find . -name "*.ngsummary.json" -delete
find . -name "*.ngstyle.ts" -delete

./node_modules/.bin/ngc
webpack
mkdir -p final/$LANG
cp -R dist/$LANG/* final/$LANG
node dist/main.js dist/$LANG/index.html final/$LANG /
node dist/main.js dist/$LANG/index.html final/$LANG about
