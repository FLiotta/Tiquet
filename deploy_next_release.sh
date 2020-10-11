#!/bin/bash

INIT_TIME=$(($(date +%s%N)/1000000))
BUILD_TIME=0
HEROKU_DEPLOY_TIME=0
TOTAL_TIME=0

echo -e "\e[93mCreating heroku build branch.\e[39m"
BRANCH_NAME="HEROKU_BUILD_BRANCH_${RANDOM}"
git checkout -b "${BRANCH_NAME}" &>/dev/null
echo -e "\e[92mBRANCH: ${BRANCH_NAME}.\e[39m"
echo -e "\e[93mInitializing.\e[39m"
mkdir -p server/app/templates 
mkdir -p server/app/static 
echo -e "\e[93mPreparing client build.\e[39m"
cd client
BUILD_TIME=$(( $(date +%s%N) / 1000000 ))
npm run bundle-heroku &>/dev/null
BUILD_TIME=$(( ($(date +%s%N) / 1000000 - ${BUILD_TIME}) / 1000 ))
cd ..
echo -e "\e[93mMoving build to server.\e[39m"
mv client/dist/index.html server/app/templates
mv client/dist/static/* server/app/static
echo -e "\e[93mDeploying version to Heroku.\e[39m"
git add . &>/dev/null
git commit -m "Build" &>/dev/null
HEROKU_DEPLOY_TIME=$(( $(date +%s%N) / 1000000 ))
git push heroku $BRANCH_NAME:master -f &>/dev/null
HEROKU_DEPLOY_TIME=$(( ($(date +%s%N) / 1000000 - ${HEROKU_DEPLOY_TIME}) / 1000 ))
git checkout heroku_master &>/dev/null
git branch -D $BRANCH_NAME &>/dev/null
TOTAL_TIME=$(( ($(date +%s%N) / 1000000 - ${INIT_TIME}) / 1000 ))
echo -e "\e[93mDone.\e[39m"
echo -e "\n[========STATS========]"
echo -e "Build time: ${BUILD_TIME} seconds"
echo -e "Deploy time: ${HEROKU_DEPLOY_TIME} seconds"
echo -e "Total time: ${TOTAL_TIME} seconds"
