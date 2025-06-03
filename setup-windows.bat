@echo off
setlocal enabledelayedexpansion

:: GitLearn Windows Setup Script
:: This script automatically installs dependencies and runs the GitLearn application

title GitLearn Windows Setup

:: Colors for output (using echo with special characters)
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "NC=[0m"

:: Header
echo ===========================================
echo %BLUE%   GitLearn Windows Setup Script   %NC%
echo ===========================================
echo.
echo %BLUE%[GitLearn Setup]%NC% Starting automatic setup for GitLearn...
echo.

:: Check if running on Windows
ver | find "Windows" >nul
if errorlevel 1 (
    echo %RED%[ERROR]%NC% This script is designed for Windows. Please use setup-mac.sh for macOS.
    pause
    exit /b 1
)

:: Function to check if command exists
set "CHECK_GIT="
set "CHECK_NODE="
set "CHECK_NPM="

:: Check for Git
echo %BLUE%[GitLearn Setup]%NC% Checking for Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo %YELLOW%[WARNING]%NC% Git not found. Please install Git manually.
    echo %YELLOW%[INFO]%NC% 1. Go to: https://git-scm.com/download/win
    echo %YELLOW%[INFO]%NC% 2. Download and install Git for Windows
    echo %YELLOW%[INFO]%NC% 3. Restart this script after installation
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
    echo %GREEN%[SUCCESS]%NC% Git is already installed (!GIT_VERSION!)
)

:: Check for Node.js
echo %BLUE%[GitLearn Setup]%NC% Checking for Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo %YELLOW%[WARNING]%NC% Node.js not found. Please install Node.js manually.
    echo %YELLOW%[INFO]%NC% 1. Go to: https://nodejs.org
    echo %YELLOW%[INFO]%NC% 2. Download and install the LTS version
    echo %YELLOW%[INFO]%NC% 3. Restart this script after installation
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo %GREEN%[SUCCESS]%NC% Node.js is already installed (!NODE_VERSION!)
)

:: Check for npm
echo %BLUE%[GitLearn Setup]%NC% Checking for npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo %RED%[ERROR]%NC% npm not found. Please reinstall Node.js.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo %GREEN%[SUCCESS]%NC% npm is available (!NPM_VERSION!)
)

:: Navigate to project directory
echo %BLUE%[GitLearn Setup]%NC% Navigating to project directory...
cd /d "%~dp0"

:: Check if package.json exists
if not exist "package.json" (
    echo %RED%[ERROR]%NC% package.json not found. Make sure you're running this script from the GitLearn project directory.
    pause
    exit /b 1
)

:: Install project dependencies
echo %BLUE%[GitLearn Setup]%NC% Installing project dependencies...
call npm install
if errorlevel 1 (
    echo %RED%[ERROR]%NC% Failed to install dependencies.
    pause
    exit /b 1
)
echo %GREEN%[SUCCESS]%NC% Dependencies installed successfully!

:: Check port availability
echo %BLUE%[GitLearn Setup]%NC% Checking port availability...
set PORT=3000

:: Check if port 3000 is in use
netstat -an | find ":%PORT%" | find "LISTENING" >nul
if not errorlevel 1 (
    echo %YELLOW%[WARNING]%NC% Port %PORT% is already in use. Finding alternative port...
    
    :: Find next available port
    for /l %%p in (3001,1,3010) do (
        netstat -an | find ":%%p" | find "LISTENING" >nul
        if errorlevel 1 (
            set PORT=%%p
            goto :port_found
        )
    )
    
    echo %RED%[ERROR]%NC% Could not find available port between 3000-3010. Please free up some ports and try again.
    pause
    exit /b 1
    
    :port_found
    echo %YELLOW%[WARNING]%NC% Will use port !PORT! instead.
    set PORT=!PORT!
) else (
    echo %GREEN%[SUCCESS]%NC% Port %PORT% is available.
)

:: Set the PORT environment variable for this session
set PORT=%PORT%

:: Start the development server
echo.
echo %BLUE%[GitLearn Setup]%NC% Starting GitLearn development server...
echo %GREEN%[SUCCESS]%NC% GitLearn will be available at: http://localhost:%PORT%
echo %GREEN%[SUCCESS]%NC% The application will open automatically in your browser!
echo %GREEN%[SUCCESS]%NC% Happy learning Git ^& GitHub!
echo.
echo ===========================================
echo          Setup Complete! Starting app...
echo ===========================================
echo.

:: Start the application
call npm start

:: Keep window open if there's an error
if errorlevel 1 (
    echo.
    echo %RED%[ERROR]%NC% Failed to start the application.
    pause
) 