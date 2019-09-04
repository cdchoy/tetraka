#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
PURP='\033[0;35m'
NC='\033[0m' # No Color

command -v node >/dev/null 2>&1 || { echo -e >&2 "${RED}ERR: Node not installed. ${NC}"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo -e >&2 "${RED}ERR: Npm not installed. ${NC}"; exit 1; }

# Install package dependencies
npm ci;
cd react-ui/; npm ci; cd ..

# Generate the React build directory
cd react-ui/; npm run build; cd ..

# Termination message
echo -e "${GREEN}SETUP COMPLETE!${NC} Run ${PURP}npm start${NC} to run the server locally."
