# How to Start the Server

## Why Postman Needs the Server Running

Postman sends HTTP requests to your API server. If the server isn't running, you'll get:
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

This means Postman tried to connect to `localhost:3000` but nothing is listening on that port.

## Steps to Start the Server

### 1. Install Dependencies (First Time Only)
```bash
npm install
```

### 2. Make Sure MongoDB is Running
```bash
# Check MongoDB status
brew services list | grep mongodb

# If not running, start it
brew services start mongodb/brew/mongodb-community
```

### 3. Start the NestJS Server
```bash
npm run start:dev
```

You should see:
```
✅ MongoDB connected successfully
📊 Database: tourism_db
Application is running on: http://localhost:3000
Swagger documentation: http://localhost:3000/api
```

### 4. Now Use Postman
Once you see the server running message, you can use Postman to test the APIs.

## Quick Start Command

```bash
# In one terminal, start MongoDB (if not already running)
brew services start mongodb/brew/mongodb-community

# In another terminal, start the server
cd /Users/yazanalnajjar/Desktop/TourismApp/Tourism-BE
npm install  # Only if not installed
npm run start:dev
```

## Verify Server is Running

1. **Check terminal output** - Should show "Application is running on: http://localhost:3000"
2. **Test in browser** - Visit http://localhost:3000/api (Swagger docs)
3. **Test in Postman** - Run "Health Check" request

## Common Issues

### Port 3000 Already in Use
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in .env file
PORT=3001
```

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
brew services start mongodb/brew/mongodb-community

# Test connection
npm run test:mongodb
```

### Dependencies Missing
```bash
npm install
```

