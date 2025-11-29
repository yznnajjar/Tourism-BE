#!/bin/bash

# Quick connect script for your EC2 instance
# Key file location: ~/Desktop/TourismApp/Amazon Crediential/tourism-app.pem

KEY_FILE="/Users/yazanalnajjar/Desktop/TourismApp/Amazon Crediential/tourism-app.pem"

echo "🔌 Connecting to EC2 Instance"
echo "=============================="
echo ""
echo "Key file: $KEY_FILE"
echo ""

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    echo "❌ Key file not found: $KEY_FILE"
    exit 1
fi

# Set permissions (just in case)
chmod 400 "$KEY_FILE"
echo "✅ Key file permissions set"
echo ""

# Get connection details
echo "Please provide your EC2 instance details:"
echo ""
read -p "EC2 Public IP address: " EC2_IP

if [ -z "$EC2_IP" ]; then
    echo "❌ IP address is required"
    exit 1
fi

echo ""
echo "Username options:"
echo "  1. ec2-user (for Amazon Linux 2023/2)"
echo "  2. ubuntu (for Ubuntu)"
echo ""
read -p "Enter username [ec2-user]: " EC2_USER
EC2_USER=${EC2_USER:-ec2-user}

echo ""
echo "Connecting to: $EC2_USER@$EC2_IP"
echo ""
echo "Command: ssh -i \"$KEY_FILE\" $EC2_USER@$EC2_IP"
echo ""
echo "Connecting now..."
echo ""

# Connect
ssh -i "$KEY_FILE" "$EC2_USER@$EC2_IP"

