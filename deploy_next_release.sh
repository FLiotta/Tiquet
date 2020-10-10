#!/bin/bash

echo -e "\e[93mCreating heroku build branch.\e[39m"
BRANCH_NAME="HEROKU_BUILD_BRANCH_${RANDOM}"
git checkout -b "${BRANCH_NAME}"
echo -e "\e[92mBRANCH: ${BRANCH_NAME}.\e[39m"
echo -e "\e[93mInitializing.\e[39m"
mkdir -p server/app/templates 
mkdir -p server/app/static 
echo -e "\e[93mPreparing client build.\e[39m"
cd client
npm run bundle-heroku
cd ..
echo -e "\e[93mMoving build to server.\e[39m"
mv client/dist/index.html server/app/templates
mv client/dist/static/* server/app/static
echo -e "\e[93mDeploying version to Heroku.\e[39m"
git add .
git commit -m "Build"
git push heroku $BRANCH_NAME:master -f
git checkout heroku_master
git branch -D $BRANCH_NAME
echo -e "\e[93mDone.\e[39m"