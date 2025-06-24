"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const child_process_1 = require("child_process");
const path_1 = require("path");
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const node_fetch_1 = __importDefault(require("node-fetch"));
// Cloudinary URLs
const CLOUDINARY_IMAGES = {
    icon: 'https://res.cloudinary.com/dcrh78d8z/image/upload/v1749708860/ignite_zzafoh.png',
    adaptiveIcon: 'https://res.cloudinary.com/dcrh78d8z/image/upload/v1749708860/ignite_zzafoh.png',
    splash: 'https://res.cloudinary.com/dcrh78d8z/image/upload/v1749708860/ignite_zzafoh.png'
};
const CLOUDINARY_SCREENS = {
    home: 'https://res.cloudinary.com/dcrh78d8z/raw/upload/v1750042388/index_zwi6rv.ignite',
    about: 'https://res.cloudinary.com/dcrh78d8z/raw/upload/v1750042428/index_mmtcyu.ignite',
    developers: 'https://res.cloudinary.com/dcrh78d8z/raw/upload/v1750042454/index_uwsehe.ignite'
};
async function downloadFile(url, outputPath) {
    try {
        const response = await (0, node_fetch_1.default)(url);
        if (!response.ok)
            throw new Error(`Failed to download ${url}`);
        const content = await response.text();
        (0, fs_1.writeFileSync)(outputPath, content, 'utf8');
    }
    catch (error) {
        console.error(`Error downloading ${url}:`, error);
        throw error;
    }
}
async function downloadImage(url, outputPath) {
    try {
        const response = await (0, node_fetch_1.default)(url);
        if (!response.ok)
            throw new Error(`Failed to download ${url}`);
        const buffer = await response.buffer();
        (0, fs_1.writeFileSync)(outputPath, buffer);
    }
    catch (error) {
        console.error(`Error downloading image ${url}:`, error);
        throw error;
    }
}
async function downloadAppAssets(projectRoot) {
    const assetsDir = (0, path_1.join)(projectRoot, 'assets');
    (0, fs_1.mkdirSync)(assetsDir, { recursive: true });
    console.log(chalk_1.default.blue('Downloading app assets...'));
    // Download images
    await Promise.all([
        downloadImage(CLOUDINARY_IMAGES.icon, (0, path_1.join)(assetsDir, 'icon.png')),
        downloadImage(CLOUDINARY_IMAGES.adaptiveIcon, (0, path_1.join)(assetsDir, 'adaptive-icon.png')),
        downloadImage(CLOUDINARY_IMAGES.splash, (0, path_1.join)(assetsDir, 'splash.png'))
    ]);
    console.log(chalk_1.default.green('✓ App assets downloaded'));
}
async function downloadScreenFiles(projectRoot) {
    console.log(chalk_1.default.blue('Downloading screen files...'));
    // Create (tabs) directory
    (0, fs_1.mkdirSync)((0, path_1.join)(projectRoot, 'app/(tabs)'), { recursive: true });
    // Download screen files into (tabs) directory
    await Promise.all([
        downloadFile(CLOUDINARY_SCREENS.home, (0, path_1.join)(projectRoot, 'app/(tabs)/Home/index.ignite')),
        downloadFile(CLOUDINARY_SCREENS.about, (0, path_1.join)(projectRoot, 'app/(tabs)/About/index.ignite')),
        downloadFile(CLOUDINARY_SCREENS.developers, (0, path_1.join)(projectRoot, 'app/(tabs)/Developers/index.ignite'))
    ]);
    console.log(chalk_1.default.green('✓ Screen files downloaded'));
}
async function createApp(name) {
    const currentDir = process.cwd();
    let appDir = currentDir;
    let appName = name;
    if (name !== '.') {
        appDir = (0, path_1.join)(currentDir, name);
        appName = name;
        if ((0, fs_1.existsSync)(appDir)) {
            throw new Error(`Directory '${name}' already exists.`);
        }
        (0, fs_1.mkdirSync)(appDir, { recursive: true });
        process.chdir(appDir);
    }
    else {
        appName = (0, path_1.basename)(currentDir);
        if ((0, fs_1.existsSync)((0, path_1.join)(currentDir, 'package.json'))) {
            throw new Error('Cannot create Ignite app in a non-empty directory. Please use a new directory or specify a new app name.');
        }
    }
    console.log(chalk_1.default.blue(`Creating new Ignite app: ${appName} in ${appDir}`));
    // Initialize package.json with bottom tab navigation dependencies
    const packageJson = {
        name: appName,
        version: '1.0.0',
        main: 'node_modules/expo/AppEntry.js',
        scripts: {
            start: 'expo start',
            android: 'expo start --android',
            ios: 'expo start --ios',
            web: 'expo start --web'
        },
        dependencies: {
            "expo": "^53.0.0",
            "expo-status-bar": "~2.2.3",
            "react": "19.0.0",
            "react-dom": "19.0.0",
            "react-native": "^0.79.0",
            "react-native-gesture-handler": "~2.24.0",
            "react-native-safe-area-context": "5.4.0",
            "react-native-screens": "~4.11.1",
            "@react-navigation/native": "^6.1.9",
            "@react-navigation/stack": "^6.3.20",
            "@react-navigation/bottom-tabs": "^6.5.11",
            "@expo/vector-icons": "^14.0.2"
        },
        devDependencies: {
            "@babel/core": "^7.20.0",
            "@types/react": "~19.0.10",
            "typescript": "^5.4.5"
        },
        private: true
    };
    (0, fs_1.writeFileSync)('package.json', JSON.stringify(packageJson, null, 2));
    // Create app structure
    (0, fs_1.mkdirSync)('app', { recursive: true });
    (0, fs_1.mkdirSync)('app/(tabs)', { recursive: true });
    (0, fs_1.mkdirSync)('app/(tabs)/Home', { recursive: true });
    (0, fs_1.mkdirSync)('app/(tabs)/About', { recursive: true });
    (0, fs_1.mkdirSync)('app/(tabs)/Developers', { recursive: true });
    (0, fs_1.mkdirSync)('.ignite', { recursive: true });
    // Download screen files from Cloudinary
    await downloadScreenFiles(appDir);
    // Create babel.config.js
    (0, fs_1.writeFileSync)('babel.config.js', `module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo']
  };
};`);
    // Create app.config.js for Expo
    const appConfig = `export default {
  name: "${appName}",
  slug: "${appName.toLowerCase()}",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  }
};`;
    (0, fs_1.writeFileSync)('app.config.js', appConfig);
    // Create App.js
    const appJs = `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './.ignite/router';

export default function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}`;
    (0, fs_1.writeFileSync)('App.js', appJs);
    // Create ignite.json
    const igniteConfig = {
        name: appName,
        version: '1.0.0',
        type: 'ignite-app'
    };
    (0, fs_1.writeFileSync)('ignite.json', JSON.stringify(igniteConfig, null, 2));
    // Download assets
    await downloadAppAssets(appDir);
    // Install dependencies
    console.log(chalk_1.default.blue('\nInstalling dependencies...'));
    try {
        (0, child_process_1.execSync)('npm install', { stdio: 'inherit' });
        console.log(chalk_1.default.green('✨ Dependencies installed successfully!'));
    }
    catch (error) {
        console.log(chalk_1.default.yellow('⚠️  Failed to install dependencies automatically.'));
        console.log(chalk_1.default.yellow('Please run "npm install" manually.'));
    }
    console.log(chalk_1.default.green(`\n✨ Successfully created ${appName}!`));
    console.log(chalk_1.default.blue('\nTo get started:'));
    if (name !== '.') {
        console.log(chalk_1.default.yellow(`  cd ${appName}`));
    }
    console.log(chalk_1.default.yellow('  ignite dev'));
}
