# 🚀 Quick Setup Guide for GitLearn

## For Experienced Developers (TL;DR)

```bash
# Prerequisites: Git and Node.js 16+ installed
git clone https://github.com/SaiKrishna-KK/GitLearn.git
cd GitLearn
npm install
npm start
# Open http://localhost:3000
```

## First Time Setup? Follow the Full Guide

👉 **[Read the Complete Installation Guide in README.md](README.md#-quick-start)**

The README includes:
- ✅ Git installation for Windows & Mac
- ✅ Node.js installation for Windows & Mac  
- ✅ Step-by-step instructions with screenshots
- ✅ Troubleshooting common issues
- ✅ System requirements

## Verification Commands

After installation, verify everything works:

```bash
# Check Git installation
git --version
# Should show: git version 2.x.x

# Check Node.js installation  
node --version
# Should show: v18.x.x or higher

# Check npm installation
npm --version
# Should show: 9.x.x or higher

# Start GitLearn
npm start
# Should open http://localhost:3000
```

## Need Help?

- 📖 **Full Guide**: [README.md](README.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/SaiKrishna-KK/GitLearn/issues)
- 💬 **Questions**: Create a new issue with the "question" label

Happy Learning! 🌟 

# GitLearn - Manual Setup Instructions

This guide provides detailed manual setup instructions for GitLearn. If you prefer automated setup, please use the provided setup scripts instead.

## 📋 System Requirements

**Minimum Requirements:**
- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 2GB free space
- **Internet**: Stable connection for downloading dependencies

## 🛠️ Step 1: Install Git

### **For Windows:**

1. **Download Git for Windows**
   - Visit: [https://git-scm.com/download/win](https://git-scm.com/download/win)
   - Download the latest version (64-bit recommended)

2. **Install Git**
   - Run the downloaded installer
   - **Important Settings During Installation:**
     - ✅ Check "Git Bash Here" and "Git GUI Here"
     - ✅ Select "Use Git from Git Bash only" or "Git from the command line and also from 3rd-party software"
     - ✅ Choose "Use the OpenSSL library"
     - ✅ Select "Checkout Windows-style, commit Unix-style line endings"

3. **Verify Installation**
   ```cmd
   # Open Command Prompt or Git Bash and run:
   git --version
   # Should display: git version 2.x.x
   ```

### **For macOS:**

**Option 1: Using Homebrew (Recommended)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git
brew install git

# Verify installation
git --version
```

**Option 2: Download from Official Site**
1. Visit: [https://git-scm.com/download/mac](https://git-scm.com/download/mac)
2. Download and run the installer
3. Verify: `git --version` in Terminal

**Option 3: Install Xcode Command Line Tools**
```bash
xcode-select --install
git --version
```

## 🟢 Step 2: Install Node.js

### **For Windows:**

1. **Download Node.js**
   - Visit: [https://nodejs.org](https://nodejs.org)
   - Download the **LTS version** (recommended)
   - Choose "Windows Installer (.msi)" for 64-bit

2. **Install Node.js**
   - Run the downloaded .msi file
   - ✅ Check "Automatically install the necessary tools" during installation
   - This will also install npm (Node Package Manager)

3. **Verify Installation**
   ```cmd
   # Open Command Prompt and run:
   node --version
   # Should display: v18.x.x or higher
   
   npm --version
   # Should display: 9.x.x or higher
   ```

### **For macOS:**

**Option 1: Using Homebrew (Recommended)**
```bash
# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

**Option 2: Download from Official Site**
1. Visit: [https://nodejs.org](https://nodejs.org)
2. Download the LTS version for macOS
3. Run the .pkg installer
4. Verify: `node --version` and `npm --version` in Terminal

## 📦 Step 3: Clone and Set Up GitLearn

### **For Windows (Command Prompt or Git Bash):**

```cmd
# Navigate to your desired directory (e.g., Desktop)
cd Desktop

# Clone the repository
git clone https://github.com/SaiKrishna-KK/GitLearn.git

# Navigate to the project directory
cd GitLearn

# Install dependencies (this may take 2-3 minutes)
npm install

# Start the development server
npm start
```

### **For macOS (Terminal):**

```bash
# Navigate to your desired directory (e.g., Desktop)
cd ~/Desktop

# Clone the repository
git clone https://github.com/SaiKrishna-KK/GitLearn.git

# Navigate to the project directory
cd GitLearn

# Install dependencies (this may take 2-3 minutes)
npm install

# Start the development server
npm start
```

## 🌐 Step 4: Open in Browser

After running `npm start`, the application will automatically open in your default browser at:
**http://localhost:3000**

If it doesn't open automatically:
1. Open your browser
2. Go to `http://localhost:3000`
3. Start learning Git! 🚀

## 🛠️ Available Scripts

### Development Commands
```bash
npm start          # Start development server (recommended for learning)
npm test           # Run test suite
npm run build      # Create production build
npm run eject      # Eject from Create React App (advanced users only)
```

## 🔧 Troubleshooting

### Common Issues:

1. **Port 3000 already in use**
   - The app will prompt to use an alternative port
   - Choose 'Y' to use the suggested port

2. **npm install fails**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

3. **Git command not found**
   - Restart your terminal/command prompt after installing Git
   - Add Git to your system PATH manually if needed

4. **Node.js version too old**
   - Update to Node.js 16+ for best compatibility
   - Use Node Version Manager (nvm) for multiple versions

## 🐛 Need Help?

If you encounter any issues:
1. Check our [Issues page](https://github.com/SaiKrishna-KK/GitLearn/issues)
2. Create a new issue with detailed information
3. Join our community discussions

---

**Prefer automated setup?** Use our setup scripts:
- macOS: `./setup-mac.sh`
- Windows: `setup-windows.bat` 