#!/usr/bin/env bash
set -e
rm -rf ./dist/
./node_modules/.bin/ng build --prod
#rsync -a --delete --progress dist/ andranik@petman.io:/var/www/petman-build
rsync -a --delete --progress dist/ andranik@petman.io:/home/andranik/Project/petman-api/client
