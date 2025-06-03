# GitLearn 🌿 - Interactive Git & GitHub Learning Platform

A beautiful, modern web application designed to teach Git and GitHub from beginner to professional level through interactive tutorials, hands-on practice, and real-world projects.

![GitLearn](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)
![Material--UI](https://img.shields.io/badge/Material--UI-5+-purple.svg)

## ✨ Features

### 🎓 **Comprehensive Learning Path**
- **Interactive Tutorials**: 6 progressive lessons from Git basics to advanced workflows
- **Step-by-Step Practice**: Guided challenges with instant feedback and progress tracking
- **Real Terminal Simulation**: Practice with 50+ Git commands in a safe environment
- **Python Project**: Build your own Git version control system from scratch

### 🎨 **Beautiful Modern UI**
- Stunning gradient backgrounds with glassmorphism effects
- Smooth animations powered by Framer Motion
- Responsive design that works on all devices
- Dark theme optimized for learning

### 🚀 **Interactive Features**
- Real-time code syntax highlighting
- Progress tracking across all tutorials
- Visual Git repository state simulation
- Smart hint system with attempt tracking
- Solution reveals after failed attempts

## 📚 What You'll Learn

### **Beginner Track**
1. **Git Fundamentals**: What is version control and why it matters
2. **Environment Setup**: Installing and configuring Git
3. **Repository Basics**: Creating and managing repositories
4. **Branching & Merging**: Parallel development workflows
5. **Remote Repositories**: Collaborating with GitHub

### **Advanced Track**
6. **Professional Workflows**: Git Flow, feature branches, code review
7. **Team Collaboration**: Pull requests, conflict resolution, CI/CD integration
8. **Custom Git System**: Build a complete Git clone in Python

## 🚀 Quick Start

### 📋 System Requirements

**Minimum Requirements:**
- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 2GB free space
- **Internet**: Stable connection for downloading dependencies

### 🛠️ Step 1: Install Git

#### **For Windows:**

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

#### **For macOS:**

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

### 🟢 Step 2: Install Node.js

#### **For Windows:**

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

#### **For macOS:**

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

### 📦 Step 3: Clone and Set Up GitLearn

#### **For Windows (Command Prompt or Git Bash):**

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

#### **For macOS (Terminal):**

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

### 🌐 Step 4: Open in Browser

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
```

### Production Deployment
```bash
# Build for production
npm run build

# Serve the production build locally
npx serve -s build

# Deploy to your preferred hosting platform
# (Netlify, Vercel, GitHub Pages, etc.)
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### **Issue: "git is not recognized" (Windows)**
```cmd
# Solution: Add Git to your PATH
# 1. Search for "Environment Variables" in Windows
# 2. Edit the PATH variable
# 3. Add: C:\Program Files\Git\bin
# 4. Restart Command Prompt
```

#### **Issue: "node is not recognized" (Windows)**
```cmd
# Solution: Reinstall Node.js with "Add to PATH" checked
# Or manually add to PATH: C:\Program Files\nodejs\
```

#### **Issue: Permission errors during npm install (macOS/Linux)**
```bash
# Solution: Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### **Issue: Port 3000 already in use**
```bash
# Solution: Use a different port
npm start -- --port 3001
# Or kill the process using port 3000
```

#### **Issue: Installation taking too long**
```bash
# Solution: Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Still Having Issues?

1. **Check our Issues page**: [https://github.com/SaiKrishna-KK/GitLearn/issues](https://github.com/SaiKrishna-KK/GitLearn/issues)
2. **Create a new issue** with:
   - Your operating system
   - Node.js version (`node --version`)
   - Git version (`git --version`)
   - Error messages (screenshots help!)

## 📁 Project Structure

```
GitLearn/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Main application pages
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎯 Learning Path Recommendation

### For Complete Beginners
1. Start with **Home** page to understand the project
2. Go through **Tutorials** in order (1-6)
3. Practice each concept in **Interactive Demo**
4. Attempt the **Python Project** when comfortable

### For Developers New to Git
1. Quick overview of tutorials 1-3
2. Focus on **Interactive Demo** for hands-on practice
3. Deep dive into tutorials 4-6 for advanced concepts
4. Build the **Python Project** to understand Git internals

## 🚀 Deployment Options

### Option 1: Development Mode (Recommended for Learning)
- Run `npm start` for the development server
- Perfect for learners who want to experiment and modify code
- Hot reloading for instant feedback
- **Note**: The "development build not optimized" message is normal and expected!

### Option 2: Production Build
- Run `npm run build` to create optimized production files
- Serve with any static file server
- Best for hosting on platforms like Netlify, Vercel, or GitHub Pages

### Option 3: Docker (Advanced)
```bash
# Build Docker image
docker build -t gitlearn .

# Run container
docker run -p 3000:3000 gitlearn
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Add tutorials, fix bugs, improve UI
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Areas for Contribution
- Additional Git commands in the terminal simulator
- More practice challenges and tutorials
- UI/UX improvements
- Mobile responsiveness enhancements
- Additional language support

**Read our full [Contributing Guide](CONTRIBUTING.md) for detailed instructions.**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- UI components from [Material-UI](https://mui.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Code highlighting by [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/SaiKrishna-KK/GitLearn/issues) page
2. Create a new issue if your problem isn't already reported
3. Include details about your environment and the steps to reproduce

---

**Happy Learning! 🚀** Start your Git journey today and master version control like a pro!
