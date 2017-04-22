#! /bin/sh

ng build -prod -aot && surge dist angular-translator.surge.sh
