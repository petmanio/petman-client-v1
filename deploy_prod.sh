#!/usr/bin/env bash
set -e
rm -rf ./dist/
./node_modules/.bin/ng build --prod
rm -rf /var/www/petman-build
mv ./dist /var/www/petman-build
