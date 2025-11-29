#!/bin/bash

# EC2 Connection Helper Script
# This script helps you connect to your EC2 instance

echo "🔌 EC2 Connection Helper"
echo "========================"
echo ""

# Check if key file exists
echo "Step 1: Looking for your key file..."

# Default key file path
DEFAULT_KEY_PATH="/Users/yazanalnajjar/Desktop/TourismApp/Amazon Crediential/tourism-app.pem"

# Check default location first
if [ -f "$DEFAULT_KEY_PATH" ]; then
    KEY_PATH="$DEFAULT_KEY_PATH"
    echo "✅ Found key file at default location: $KEY_PATH"
else
    # Check Downloads folder
    KEY_FILES=$(find ~/Downloads -name "*.pem" 2>/dev/null)
    
    if [ -z "$KEY_FILES" ]; then
        echo "❌ No .pem key file found in default location or Downloads folder"
        echo ""
        echo "Default location checked: $DEFAULT_KEY_PATH"
        echo ""
        echo "Please provide the path to your .pem key file:"
        read -p "Key file path: " KEY_PATH
        
        if [ ! -f "$KEY_PATH" ]; then
            echo "❌ File not found: $KEY_PATH"
            exit 1
        fi
    else
        echo "✅ Found key file(s) in Downloads:"
        echo "$KEY_FILES" | nl
        echo ""
        if [ $(echo "$KEY_FILES" | wc -l) -eq 1 ]; then
            KEY_PATH="$KEY_FILES"
            echo "Using: $KEY_PATH"
        else
            echo "Multiple key files found. Please select one:"
            read -p "Enter the full path: " KEY_PATH
        fi
    fi
fi

echo ""
echo "Step 2: Setting correct permissions..."
chmod 400 "$KEY_PATH"
echo "✅ Permissions set"

echo ""
echo "Step 3: Getting instance details..."
echo ""

# Default EC2 details
DEFAULT_EC2_IP="16.171.230.133"
DEFAULT_EC2_USER="ec2-user"

echo "Please provide the following information:"
read -p "EC2 Public IP address [$DEFAULT_EC2_IP]: " EC2_IP
EC2_IP=${EC2_IP:-$DEFAULT_EC2_IP}

read -p "Username (ec2-user for Amazon Linux, ubuntu for Ubuntu) [$DEFAULT_EC2_USER]: " EC2_USER
EC2_USER=${EC2_USER:-$DEFAULT_EC2_USER}

echo ""
echo "Step 4: Connecting to EC2 instance..."
echo "Command: ssh -i $KEY_PATH $EC2_USER@$EC2_IP"
echo ""
echo "Connecting now..."
echo ""

# Connect to EC2
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_IP"

