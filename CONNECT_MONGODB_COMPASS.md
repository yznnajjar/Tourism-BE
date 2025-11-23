# How to Connect MongoDB Compass

## Connection Steps

### 1. Open MongoDB Compass
- Open the MongoDB Compass application from your Applications folder
- Or search for "MongoDB Compass" in Spotlight

### 2. Connection String
When MongoDB Compass opens, you'll see a connection screen. Use this connection string:

**For Local MongoDB (Default):**
```
mongodb://localhost:27017
```

**Or click "Fill in connection fields individually" and use:**
- **Hostname:** `localhost`
- **Port:** `27017`
- **Authentication:** None (if you haven't set up authentication)

### 3. Connect
Click the **"Connect"** button

## Connection Details

### Default Local Connection
```
mongodb://localhost:27017
```

### With Database Name (Optional)
```
mongodb://localhost:27017/tourism_db
```

### If Authentication is Enabled
```
mongodb://username:password@localhost:27017/tourism_db
```

## Verify Connection

After connecting, you should see:
- ✅ Connection successful
- 📊 List of databases (including `tourism_db` if you've created it)
- 📁 Collections in each database

## Troubleshooting

### If Connection Fails:

1. **Check MongoDB is Running:**
   ```bash
   brew services list | grep mongodb
   ```
   Should show: `mongodb-community started`

2. **Start MongoDB if not running:**
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```

3. **Check Port:**
   ```bash
   lsof -i :27017
   ```
   Should show MongoDB process

4. **Try Connection String:**
   ```
   mongodb://127.0.0.1:27017
   ```
   (Sometimes `127.0.0.1` works better than `localhost`)

## Quick Reference

**Connection String Format:**
```
mongodb://[username:password@]host[:port][/database][?options]
```

**For your local setup:**
```
mongodb://localhost:27017
```

