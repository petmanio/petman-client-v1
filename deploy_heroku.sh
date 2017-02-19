#!/usr/bin/env bash
rm -rf ./dist/
./node_modules/.bin/ng build --prod
cd ./dist/
echo "{\
  \"name\": \"walkypet\",\
  \"version\": \"0.0.0\",\
  \"scripts\": {\
    \"start\": \"http-server\"\
  },\
  \"dependencies\": {\
    \"http-server\": \"^0.9.0\"\
  }\
}\
" > package.json
git init;
git remote add heroku https://git.heroku.com/walkypet.git
git add --all
git commit -m "build"
git push heroku master -f
cd ../
rm -rf ./dist/
