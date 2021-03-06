#!/bin/bash

# Set variables from different file
DIR="$( dirname "${BASH_SOURCE[0]}" )"
. ${DIR}/credentials.sh

# Paths
TARGET=${USER}@${REMOTE}
REPO_PATH=${REMOTE_PATH}/${REPO_NAME}
APP_PATH="${REPO_PATH}/${APP_NAME}"


echo "Pushing repo to git"
git push

echo "Updating git and collectic static files ..."
echo ${PASS} | ssh -tt ${TARGET} "\
sudo apt update \
&& cd ${APP_PATH} \
&& git pull \
&& cd ${REPO_PATH} \
&& source env/bin/activate \
&& cd ${APP_PATH} \
&& pwd \\
&& python3 manage.py collectstatic --no-input
"

echo "Restarting server..."
echo ${PASS} | ssh -tt ${TARGET} "sudo systemctl restart apache2"