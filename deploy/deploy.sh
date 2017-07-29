#! /bin/bash

rsync -r --delete dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:www"
