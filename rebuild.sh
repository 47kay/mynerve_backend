#!/bin/bash

# Navigate to your project directory
cd /root/nerve.io || exit

# Pull the latest changes from the GitHub repository
git pull origin main

# Stop service
pm2 stop nerve.io

# Rebuild the Node.js application
yarn install
yarn build

# Restart the PM2 instance
pm2 restart nerve.io
pm2 logs nerve.io

