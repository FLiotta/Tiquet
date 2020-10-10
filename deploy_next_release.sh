#!/bin/bash

echo -e "\e[93mInitializing.\e[39m"
mkdir -p server/app/templates 
mkdir -p server/app/static 
echo -e "\e[93mPreparing client build.\e[39m"
cd client
npm run bundle
cd ..
echo -e "\e[93mMoving build to server.\e[39m"
mv client/dist/index.html server/app/templates
mv client/dist/* server/app/static
echo -e "\e[93mDeploying version to Heroku.\e[39m"
git add .
git commit -m "Build"
git push heroku heroku-release:master -f
echo -e "\e[93mDone.\e[39m"