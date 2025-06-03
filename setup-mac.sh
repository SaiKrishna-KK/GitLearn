#!/bin/bash

# GitLearn macOS Setup Script
# This script automatically installs dependencies and runs the GitLearn application

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[GitLearn Setup]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Header
echo "=================================="
echo "🌿 GitLearn macOS Setup Script 🌿"
echo "=================================="
log "Starting automatic setup for GitLearn..."

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    error "This script is designed for macOS. Please use setup-windows.bat for Windows."
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check port availability
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1  # Port is in use
    else
        return 0  # Port is available
    fi
}

# Check and install Homebrew
log "Checking for Homebrew..."
if ! command_exists brew; then
    warning "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == "arm64" ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    
    success "Homebrew installed successfully!"
else
    success "Homebrew is already installed."
fi

# Check and install Git
log "Checking for Git..."
if ! command_exists git; then
    warning "Git not found. Installing Git via Homebrew..."
    brew install git
    success "Git installed successfully!"
else
    success "Git is already installed ($(git --version))."
fi

# Check and install Node.js
log "Checking for Node.js..."
if ! command_exists node; then
    warning "Node.js not found. Installing Node.js via Homebrew..."
    brew install node
    success "Node.js installed successfully!"
else
    NODE_VERSION=$(node --version)
    success "Node.js is already installed ($NODE_VERSION)."
    
    # Check if Node.js version is recent enough (v16+)
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$MAJOR_VERSION" -lt 16 ]; then
        warning "Node.js version is too old ($NODE_VERSION). Updating to latest version..."
        brew upgrade node
        success "Node.js updated successfully!"
    fi
fi

# Verify npm is available
log "Checking for npm..."
if ! command_exists npm; then
    error "npm not found. Please reinstall Node.js."
    exit 1
else
    success "npm is available ($(npm --version))."
fi

# Navigate to project directory
log "Navigating to project directory..."
cd "$(dirname "$0")"

# Install project dependencies
log "Installing project dependencies..."
if [ -f "package.json" ]; then
    npm install
    success "Dependencies installed successfully!"
else
    error "package.json not found. Make sure you're running this script from the GitLearn project directory."
    exit 1
fi

# Check port availability and find alternative if needed
PORT=3000
log "Checking port availability..."

if check_port $PORT; then
    success "Port $PORT is available."
else
    warning "Port $PORT is already in use. Finding alternative port..."
    
    # Find next available port
    while ! check_port $PORT && [ $PORT -lt 3010 ]; do
        PORT=$((PORT + 1))
    done
    
    if [ $PORT -lt 3010 ]; then
        warning "Will use port $PORT instead."
        export PORT=$PORT
    else
        error "Could not find available port between 3000-3010. Please free up some ports and try again."
        exit 1
    fi
fi

# Start the development server
log "Starting GitLearn development server..."
success "🚀 GitLearn will be available at: http://localhost:$PORT"
success "✨ The application will open automatically in your browser!"
success "📚 Happy learning Git & GitHub!"

echo ""
echo "=================================="
echo "🎉 Setup Complete! Starting app..."
echo "=================================="

# Start the application
npm start 