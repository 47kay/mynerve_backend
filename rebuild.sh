#!/bin/bash

# Navigate to your project directory
cd /home/techtink/erp || exit

# Pull the latest changes from the GitHub repository
git pull origin main

# Stop service
pm2 stop erp

# Rebuild the Node.js application
yarn install
yarn build

# Restart the PM2 instance
pm2 restart erp
pm2 logs erp

