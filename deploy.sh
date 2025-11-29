#!/bin/bash
# Deployment script for EC2
# Run this on EC2 after pulling code from GitHub

cd ~/Tourism-BE

echo "🔄 Pulling latest code from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

echo "🔄 Restarting API with PM2..."
pm2 restart tourism-api

echo "✅ Deployment complete!"
echo ""
echo "📊 API Status:"
pm2 status

echo ""
echo "📋 Recent logs:"
pm2 logs tourism-api --lines 20 --nostream

