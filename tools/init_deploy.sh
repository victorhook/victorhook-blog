#!/bin/bash

# Set variables from different file
DIR="$( dirname "${BASH_SOURCE[0]}" )"
. ${DIR}/credentials.sh

# Paths
TARGET=${USER}@${REMOTE}
REPO_PATH=${REMOTE_PATH}/${REPO_NAME}
PY_PATH="${REPO_PATH}/${APP_NAME}"
APP_PATH="${REPO_PATH}/${APP_NAME}"

# settings.py file
LOCAL_SETTINGS_PY_FILE="${APP_NAME}/${APP_NAME}/settings.py"
REMOTE_SETTINGS_PY_FILE="${APP_PATH}/${APP_NAME}/settings.py"


echo 'Copying settings.py file'
scp ${LOCAL_SETTINGS_PY_FILE} "${TARGET}:${REMOTE_SETTINGS_PY_FILE}"

echo "Cloning repo..."
ssh ${TARGET} "cd ${REMOTE_PATH} && git clone ${GIT_REPO}"
echo "Installing py env"
echo $PASS | ssh -tt ${TARGET} "
sudo apt update \
&& sudo apt install python3-pip python3-dev \
   default-libmysqlclient-dev build-essential \
&& pip3 install virtualenv \
&& cd ${REPO_PATH} \
&& virtualenv env \
&& source env/bin/activate \
&& pip3 install -r requirements.txt"

echo 'Getting certbot'
echo $PASS | ssh -tt ${TARGET} "
sudo snap install core \
&& sudo snap refresh core \
&& sudo snap install --classic certbot \
&& sudo ln -s /snap/bin/certbot /usr/bin/certbot"

echo '--------------------------------------------'
echo ' '
echo 'Initial build and installation done. You must still do the following:'
echo '1. Place settings.py file in APP/'
echo '2. Ensure wsgi.py file includes application in sys-path'
echo '3. Create .conf file in /etc/apache2/sites-available/ for the application'
echo '4. Create symlink to .conf file in /etc/apache2/sites-enabled/'
echo '5. Activate ssl with certbot, eg: sudo certbot --apache \
        NOTE: for this, you need to comment out WSGIDaemonprocess and \
        WSGIProcessGroup in .conf file and the uncomment after certbot is done.'
echo '6. Enable automatic renew with crontab -e'
