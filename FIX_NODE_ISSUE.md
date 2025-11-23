# Fix Node.js ICU Library Error

## Problem
You're getting an error about Node.js 14 trying to load ICU library version 72, but your system has ICU version 78. This happens because you have an old Node.js 14 installation via Homebrew that's conflicting with your nvm Node.js 20.

## Solution

### Option 1: Remove Homebrew Node 14 (Recommended)

```bash
# Unlink Node 14 from Homebrew
brew unlink node@14

# Or completely remove it
brew uninstall node@14

# Verify nvm Node is being used
which node
# Should show: /Users/yazanalnajjar/.nvm/versions/node/v20.19.5/bin/node

node --version
# Should show: v20.19.5
```

### Option 2: Ensure nvm Node is First in PATH

Add this to your `~/.zshrc` file:

```bash
# Make sure nvm is loaded
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Ensure nvm's node comes before Homebrew's
export PATH="$NVM_DIR/versions/node/$(nvm version)/bin:$PATH"
```

Then reload your shell:
```bash
source ~/.zshrc
```

### Option 3: Use nvm to Set Default Node Version

```bash
# Set Node 20 as default
nvm alias default 20.19.5

# Use it in current shell
nvm use 20.19.5

# Verify
node --version
```

## Quick Fix Command

Run this to fix it immediately:

```bash
# Unlink Homebrew Node 14
brew unlink node@14 2>/dev/null || true

# Ensure nvm Node is used
nvm use 20.19.5

# Verify
which node
node --version
```

## Verify It's Fixed

After fixing, verify:
```bash
node --version  # Should be v20.19.5
which node      # Should point to nvm directory
npm --version   # Should work without errors
```

Then try running your NestJS app again:
```bash
npm run start:dev
```

