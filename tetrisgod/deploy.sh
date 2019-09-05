#!/usr/bin/env bash
# Script to push tetrisgod/tetrisgod/ directory onto heroku remote

BRANCH=$(git rev-parse --abbrev-ref HEAD)
RED='\033[0;31m'
NC='\033[0m' # No Color


if [[ "${PWD##*/tetrisgod/}" != "tetrisgod" ]]; then
	echo -e >&2 "${RED}ERROR: Deploy script must be executed from its own directory.${NC}"
	echo >&2 "Aborting..."
	exit 1;
fi

if [[ "$BRANCH" != "master" ]]; then
  echo -e >&2 "${RED}ERROR: We should only deploy from the master branch version to production!${NC}";
  echo >&2 'Aborting...';
  exit 1;
fi

cd ..
git subtree push --prefix tetrisgod heroku master

# If you're getting a weird issue with branch tips, you can run...
# git push heroku `git subtree split --prefix tetrisgod master`:master --force
