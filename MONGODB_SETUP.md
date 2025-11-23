# MongoDB Setup Guide

## Check if MongoDB is Running

### Method 1: Check MongoDB Process
```bash
ps aux | grep mongod | grep -v grep
```
If MongoDB is running, you'll see a process. If not, you'll see nothing.

### Method 2: Check MongoDB Port
```bash
lsof -i :27017
```
If MongoDB is running, you'll see the process using port 27017.

### Method 3: Try to Connect
```bash
mongosh
# or
mongo
```
If MongoDB is running, you'll connect to the MongoDB shell.

### Method 4: Test Connection from Terminal
```bash
mongosh "mongodb://localhost:27017" --eval "db.adminCommand('ping')"
```
This should return `{ ok: 1 }` if MongoDB is running.

## Install MongoDB (macOS)

### Option 1: Using Homebrew (Recommended)
```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Or start manually (runs in foreground)
mongod --config /usr/local/etc/mongod.conf
```

### Option 2: Using MongoDB Atlas (Cloud - Free Tier)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Update your `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tourism_db
   ```

### Option 3: Using Docker
```bash
# Run MongoDB in Docker
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest

# Check if it's running
docker ps | grep mongodb
```

## Verify MongoDB is Working

### 1. Check MongoDB Status (Homebrew)
```bash
brew services list | grep mongodb
```

### 2. Test Connection
```bash
mongosh
# Then in MongoDB shell:
show dbs
exit
```

### 3. Test from Node.js/NestJS
Create a test script or check your application logs when starting.

## Common Issues and Solutions

### Issue: MongoDB not starting
```bash
# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Check if data directory exists and has correct permissions
ls -la /usr/local/var/mongodb
```

### Issue: Port already in use
```bash
# Find what's using port 27017
lsof -i :27017

# Kill the process if needed
kill -9 <PID>
```

### Issue: Permission denied
```bash
# Fix permissions on data directory
sudo chown -R $(whoami) /usr/local/var/mongodb
sudo chown -R $(whoami) /usr/local/var/log/mongodb
```

## Quick Start Commands

```bash
# Start MongoDB (Homebrew)
brew services start mongodb-community

# Stop MongoDB (Homebrew)
brew services stop mongodb-community

# Restart MongoDB (Homebrew)
brew services restart mongodb-community

# Check MongoDB status
brew services list | grep mongodb
```

## Test Your NestJS Connection

Once MongoDB is running, start your NestJS app:
```bash
npm run start:dev
```

You should see a connection message in the logs. If there's an error, check:
1. MongoDB is running
2. Connection string in `.env` is correct
3. MongoDB is accessible on the specified host/port

## MongoDB Connection String Format

### Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/tourism_db
```

### MongoDB with Authentication
```
MONGODB_URI=mongodb://username:password@localhost:27017/tourism_db?authSource=admin
```

### MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tourism_db
```

