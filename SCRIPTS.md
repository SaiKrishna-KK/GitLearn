# GitLearn Setup Scripts

Automated setup scripts for GitLearn that handle all dependencies and configuration.

## 📋 Overview

We provide two automated setup scripts:
- `setup-mac.sh` - For macOS/Linux systems
- `setup-windows.bat` - For Windows systems

These scripts automatically:
- ✅ Check for required dependencies (Git, Node.js)
- ✅ Install missing dependencies (macOS only - auto-installs via Homebrew)
- ✅ Install project dependencies via npm
- ✅ Check port availability (finds alternative if 3000 is busy)
- ✅ Start the development server
- ✅ Provide colored, informative logging

## 🍎 macOS Setup Script

### Prerequisites
- macOS 10.14+ (Mojave or later)
- Internet connection
- Terminal access

### Usage
```bash
# Method 1: Direct execution
chmod +x setup-mac.sh
./setup-mac.sh

# Method 2: Via bash
bash setup-mac.sh
```

### What it does automatically:
1. **Installs Homebrew** (if not present)
2. **Installs Git** via Homebrew (if not present)
3. **Installs Node.js** via Homebrew (if not present)
4. **Updates Node.js** if version is too old (<16)
5. **Installs npm dependencies**
6. **Finds available port** (3000-3010 range)
7. **Starts development server**

### Sample Output:
```
==================================
🌿 GitLearn macOS Setup Script 🌿
==================================
[GitLearn Setup] Starting automatic setup for GitLearn...
[SUCCESS] Homebrew is already installed.
[SUCCESS] Git is already installed (git version 2.39.0).
[SUCCESS] Node.js is already installed (v18.17.0).
[SUCCESS] npm is available (9.6.7).
[GitLearn Setup] Installing project dependencies...
[SUCCESS] Dependencies installed successfully!
[SUCCESS] Port 3000 is available.
[SUCCESS] 🚀 GitLearn will be available at: http://localhost:3000
==================================
🎉 Setup Complete! Starting app...
==================================
```

## 🪟 Windows Setup Script

### Prerequisites
- Windows 10 or later
- Internet connection
- Command Prompt or PowerShell

### Usage
```cmd
:: Method 1: Double-click the file in File Explorer
setup-windows.bat

:: Method 2: Run from Command Prompt
cd "path\to\gitlearn"
setup-windows.bat
```

### What it does:
1. **Checks for Git** (provides install instructions if missing)
2. **Checks for Node.js** (provides install instructions if missing)
3. **Installs npm dependencies**
4. **Finds available port** (3000-3010 range)
5. **Starts development server**

**Note**: Unlike macOS, Windows script cannot auto-install Git/Node.js due to system restrictions. It will provide download links and pause for manual installation.

### Sample Output:
```
===========================================
   GitLearn Windows Setup Script   
===========================================

[GitLearn Setup] Starting automatic setup for GitLearn...
[SUCCESS] Git is already installed (git version 2.41.0.windows.1)
[SUCCESS] Node.js is already installed (v18.17.0)
[SUCCESS] npm is available (9.6.7)
[SUCCESS] Dependencies installed successfully!
[SUCCESS] Port 3000 is available.
[SUCCESS] GitLearn will be available at: http://localhost:3000
===========================================
          Setup Complete! Starting app...
===========================================
```

## 🔧 Port Management

Both scripts intelligently handle port conflicts:

### Default Behavior:
- Primary port: `3000`
- If busy, checks ports `3001` through `3010`
- Uses first available port
- Updates environment variable automatically

### Manual Port Override:
```bash
# macOS
PORT=3005 ./setup-mac.sh

# Windows - set before running
set PORT=3005
setup-windows.bat
```

## 🐛 Troubleshooting

### Common Issues:

#### Script Permission Denied (macOS)
```bash
# Fix permissions
chmod +x setup-mac.sh

# Or run with bash
bash setup-mac.sh
```

#### Git/Node.js Not Found (Windows)
The script will pause and show install instructions:
1. Download from provided links
2. Install with default settings
3. Restart Command Prompt
4. Run script again

#### npm Install Fails
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json  # macOS
rmdir /s node_modules & del package-lock.json  # Windows
```

#### Port Range Exhausted
If ports 3000-3010 are all busy:
1. Close other development servers
2. Or set custom port: `PORT=4000 ./setup-mac.sh`

## 🔄 Script Updates

To update the scripts:
```bash
# Pull latest changes
git pull origin main

# Scripts are automatically updated
./setup-mac.sh  # or setup-windows.bat
```

## 🚀 What Happens After Setup

Once the script completes:
1. **Browser opens automatically** to `http://localhost:PORT`
2. **Development server runs** with hot-reload
3. **Application is ready** for learning Git!

To stop the server: `Ctrl+C` in the terminal

To restart later:
```bash
cd gitlearn-directory
npm start
```

## 💡 Tips

### For Developers:
- Scripts are safe to run multiple times
- They skip already-installed dependencies
- Use `npm run build` for production builds

### For Instructors:
- Scripts work great in classroom settings
- Students can focus on learning, not setup
- Consistent environment across all machines

### For Offline Use:
- Run scripts once with internet
- After setup, GitLearn works offline
- Only initial dependency download requires internet

---

**Need manual setup instead?** See [setup.md](./setup.md) for detailed instructions. 