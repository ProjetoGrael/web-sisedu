#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd $parent_path
cd ../..
npm run prod-postbuild
docker build . -t sisedu.azurecr.io/hmg/web-sisedu:1.0.0
docker push sisedu.azurecr.io/hmg/web-sisedu:1.0.0