# Quick Start - MongoDB Verification

## Quick Check Commands

### 1. Check if MongoDB is Running
```bash
# Check process
ps aux | grep mongod | grep -v grep

# Check port
lsof -i :27017

# Try to connect
mongosh
```

### 2. Install MongoDB (if not installed)

**macOS (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Docker:**
```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

**MongoDB Atlas (Cloud - Free):**
- Visit https://www.mongodb.com/cloud/atlas
- Create free account and cluster
- Get connection string
- Update `.env` file

### 3. Test MongoDB Connection

**Option A: Using the test script**
```bash
npm install  # Install dependencies first
npm run test:mongodb
```

**Option B: Using mongosh directly**
```bash
mongosh "mongodb://localhost:27017" --eval "db.adminCommand('ping')"
```

**Option C: Start your NestJS app**
```bash
npm run start:dev
```
Look for "✅ MongoDB connected successfully" in the logs.

### 4. Verify Connection from Your App

When you start your NestJS app, you should see:
```
✅ MongoDB connected successfully
📊 Database: tourism_db
```

If you see errors:
- ❌ Connection refused → MongoDB is not running
- ❌ Authentication failed → Check credentials
- ❌ Timeout → MongoDB is not accessible

## Common Solutions

### MongoDB Not Running
```bash
# Start MongoDB (Homebrew)
brew services start mongodb-community

# Or check status
brew services list | grep mongodb
```

### Port Already in Use
```bash
# Find what's using port 27017
lsof -i :27017

# Kill the process
kill -9 <PID>
```

### Connection String Issues
Make sure your `.env` file has:
```
MONGODB_URI=mongodb://localhost:27017/tourism_db
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tourism_db
```

## Next Steps

1. ✅ Install MongoDB (if not installed)
2. ✅ Start MongoDB service
3. ✅ Test connection: `npm run test:mongodb`
4. ✅ Start your app: `npm run start:dev`
5. ✅ Check logs for connection confirmation

For detailed setup instructions, see `MONGODB_SETUP.md`

