# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- 
## installing node in both linux and windows
# Install Node.js on Windows

Follow the steps below to install Node.js on your Windows machine.

## 1. Download Node.js
- Visit the official Node.js website: [https://nodejs.org/](https://nodejs.org/)
- Download the **LTS** (Long-Term Support) version (recommended for stability).

## 2. Install Node.js
### a) Open the downloaded installer
- Double-click the `.msi` file to start the installation process.

### b) Follow the installation wizard
- Accept the **license agreement**.
- Choose the **installation location** (the default location is recommended).
- Make sure the **"Add to PATH"** option is selected (this is selected by default and will allow you to run `node` from any command prompt).

### c) Click **Install** and wait for the installation to complete.

## 3. Verify Installation
Once the installation is complete, open **Command Prompt** (cmd) or **PowerShell** and check if Node.js was installed correctly.

Run the following command:

```bash
node -v
```

#  Linux

This guide will walk you through installing Node.js on your Linux machine.

## Prerequisites
- A Linux-based system
- A terminal with sudo privileges

## Installation Steps

### 1. Update Your System
Before installing Node.js, it's a good idea to update your system to make sure all your packages are up to date.

```bash
sudo apt update && sudo apt upgrade -y
```

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
node -v

```
## Setting up client side project
 ```
git clone https://github.com/euginekoyo/wifiClient.git
npm i 
npm run dev
```
