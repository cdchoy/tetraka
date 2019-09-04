#!/usr/bin/env bash

# push master branch's tetrisgod/ appdir to heroku remote

cd ..
git subtree push --prefix tetrisgod heroku master
#git push heroku `git subtree split --prefix tetrisgod master`:master --force
