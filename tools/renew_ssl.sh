#!/bin/bash

sudo systemctl stop apache2 && sudo certbot renew && sudo systemctl start apache2