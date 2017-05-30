#!/usr/bin/env bash
set -e
rm -rf ./dist/
./node_modules/.bin/ng build --prod --env=heroku
cd ./dist/

echo "{\
  \"name\": \"petman-client\",\
  \"version\": \"0.0.0\",\
  \"scripts\": {\
    \"start\": \"superstatic --config superstatic.json --port \$PORT --host 0.0.0.0\"\
  },\
  \"dependencies\": {\
    \"superstatic\": \"^4.0.3\"\
  }\
}\
" > package.json

echo "{\
  \"rewrites\": [\
    {\"source\":\"/**\",\"destination\":\"/index.html\"}\
  ]\
}\
" > superstatic.json

git init;
git remote add heroku https://git.heroku.com/petman.git
git add --all
git commit -m "build"
git push heroku master -f
cd ../
rm -rf ./dist/
