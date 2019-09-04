#!/usr/bin/env bash

npm run build
cd ..
#git subtree push --prefix tetrisgod heroku hosting:master
git push heroku `git subtree split --prefix tetrisgod master`:master --force
