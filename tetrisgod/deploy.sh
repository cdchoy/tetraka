#!/usr/bin/env bash

npm run build
cd ..
git subtree push --prefix tetrisgod/build heroku master
cd tetrisgod/