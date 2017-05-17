#! /bin/bash

rsync -r --delete final/ "${DEPLOY_USER}@${DEPLOY_HOST}:www"
