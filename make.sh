#! /bin/sh

ng build -prod -aot && (cd dist && cp index.html 200.html) && surge dist angular-translator.surge.sh
