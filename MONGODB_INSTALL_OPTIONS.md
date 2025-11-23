# MongoDB Installation Options

## ✅ Already Installed (Current Method)
You already have MongoDB installed via Homebrew! This is the recommended method for macOS.

## Installation Methods

### 1. **Homebrew** (✅ Currently Using - Recommended for macOS)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```
**Pros:** Easy, automatic updates, integrates with macOS
**Status:** ✅ Already installed

### 2. **MongoDB Compass** (GUI Tool - Optional)
MongoDB Compass is a GUI application for MongoDB. It's separate from the server but useful for managing data.

**Download:** https://www.mongodb.com/try/download/compass

**Install:**
```bash
# Via Homebrew Cask
brew install --cask mongodb-compass
```

**Features:**
- Visual database browser
- Query builder
- Schema analyzer
- Performance monitoring
- Data import/export

### 3. **MongoDB Atlas** (Cloud - Free Tier Available)
- No installation needed
- Free tier: 512MB storage
- Managed service
- Access from anywhere

**Sign up:** https://www.mongodb.com/cloud/atlas/register

### 4. **Docker** (Container)
```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest
```

### 5. **Direct Download** (Manual Installation)
Download from: https://www.mongodb.com/try/download/community

**For macOS:**
- Download `.tgz` file
- Extract and move to `/usr/local/mongodb`
- Configure manually

## Recommended: MongoDB Compass (GUI Tool)

If you want a visual interface to manage your MongoDB database, install MongoDB Compass:

```bash
brew install --cask mongodb-compass
```

Then open it and connect to: `mongodb://localhost:27017`

## Current Setup Status

✅ MongoDB Server: Installed and running
⚠️ MongoDB Compass: Not installed (optional GUI tool)

## Quick Commands

```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb/brew/mongodb-community

# Stop MongoDB
brew services stop mongodb/brew/mongodb-community

# Connect via command line
mongosh

# Install GUI tool (optional)
brew install --cask mongodb-compass
```

