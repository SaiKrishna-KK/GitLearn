# GitLearn 🌿 - Interactive Git & GitHub Learning Platform

A beautiful, modern web application designed to teach Git and GitHub from beginner to professional level through interactive tutorials, hands-on practice, and real-world projects.

## 🌐 **Live Demo**

**🚀 Try GitLearn now:** [https://saikrishna-kk.github.io/GitLearn](https://saikrishna-kk.github.io/GitLearn)

*No installation required! Start learning Git directly in your browser.*

![GitLearn Homepage](./HomeScreen-GitLearn.png)

![GitLearn](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)
![Material--UI](https://img.shields.io/badge/Material--UI-7+-purple.svg)

## ✨ Features

- **🎓 Interactive Tutorials**: 6 progressive lessons from Git basics to advanced workflows
- **🎯 Hands-on Practice**: 50+ Git commands with instant feedback and progress tracking
- **🚀 Real Terminal Simulation**: Practice in a safe environment
- **🎨 Beautiful Modern UI**: Stunning gradients with glassmorphism effects and smooth animations
- **📱 Responsive Design**: Works perfectly on all devices
- **🌙 Dark Theme**: Optimized for comfortable learning

## 🚀 Quick Start

### 🔥 **Automated Setup (Recommended)**

We've created setup scripts that handle everything automatically:

#### **For macOS:**
- Open the Terminal in this folder.
```bash
# Make the script executable and run it
chmod +x setup-mac.sh
./setup-mac.sh
```

#### **For Windows:**
```cmd
# Double-click the file or run in Command Prompt
setup-windows.bat
```

**That's it!** The scripts will:
- ✅ Check and install Git (macOS only - Windows requires manual install)
- ✅ Check and install Node.js (macOS only - Windows requires manual install) 
- ✅ Install project dependencies
- ✅ Check port availability (auto-finds alternative if 3000 is busy)
- ✅ Start the development server
- ✅ Open the app in your browser

### 📋 **Manual Setup**

Prefer to install everything manually? See our detailed [Setup Guide](./setup.md) for step-by-step instructions.

## 🌐 **Access the Application**

Once setup is complete, GitLearn will be available at:
- **Primary**: `http://localhost:3000`
- **Alternative**: `http://localhost:3001` (if 3000 is busy)
- **Network**: `http://10.0.0.159:3000` (access from other devices)

## 🛠️ **Development Commands**

```bash
npm start          # Start development server
npm run build      # Create production build  
npm test           # Run test suite
npm run deploy     # Deploy to GitHub Pages (maintainers only)
```

## 📚 **What You'll Learn**

### **Beginner Track**
1. **Git Fundamentals** - Version control basics
2. **Environment Setup** - Installing and configuring Git
3. **Repository Basics** - Creating and managing repositories
4. **Branching & Merging** - Parallel development workflows
5. **Remote Repositories** - Collaborating with GitHub

### **Advanced Track**
6. **Professional Workflows** - Git Flow, feature branches, code review
7. **Team Collaboration** - Pull requests, conflict resolution, CI/CD
8. **Custom Git System** - Build your own Git clone in Python

## 🔧 **System Requirements**

- **OS**: Windows 10+, macOS 10.14+, or Linux
- **RAM**: 4GB minimum (8GB recommended)  
- **Storage**: 2GB free space
- **Internet**: Stable connection for dependencies

## 🌍 **Deployment**

GitLearn is automatically deployed to GitHub Pages using GitHub Actions:

- **Live URL**: [https://saikrishna-kk.github.io/GitLearn](https://saikrishna-kk.github.io/GitLearn)
- **Auto-deployment**: Every push to `master` branch triggers a new deployment
- **Build time**: ~2-3 minutes from commit to live
- **CDN**: Served globally via GitHub's CDN for fast loading

### **For Contributors:**
```bash
# Deploy manually (if you have permissions)
npm run deploy

# Or just push to master - GitHub Actions handles the rest!
git push origin master
```

## 🐛 **Troubleshooting**

### **Common Issues:**

1. **Port 3000 busy** → Scripts automatically find alternative ports
2. **Dependencies fail** → Run `npm cache clean --force` and retry
3. **Git/Node not found** → Use manual setup guide or install prerequisites

### **Need Help?**
- 📖 Check the [Setup Guide](./setup.md) for detailed instructions
- 🐛 Report issues on our [GitHub Issues](https://github.com/SaiKrishna-KK/GitLearn/issues)
- 💬 Join our community discussions

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 **Contributing**

Want to contribute? Check out our [Contributing Guide](CONTRIBUTING.md) to get started!

---

**🚀 Ready to master Git? Run the setup script and start learning!**
