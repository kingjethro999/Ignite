"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function update() {
    try {
        console.log(chalk_1.default.blue('🔍 Checking for Ignite CLI updates...'));
        // Get current version
        const packageJsonPath = path.resolve(__dirname, '../../package.json');
        const currentVersion = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).version;
        console.log(chalk_1.default.gray(`Current version: ${currentVersion}`));
        // Check for latest version
        console.log(chalk_1.default.blue('📡 Fetching latest version from npm...'));
        try {
            const latestVersion = (0, child_process_1.execSync)('npm view the-ignite version', { encoding: 'utf8' }).trim();
            if (latestVersion === currentVersion) {
                console.log(chalk_1.default.green('✅ You are already using the latest version of Ignite CLI!'));
                return;
            }
            console.log(chalk_1.default.yellow(`📦 New version available: ${latestVersion}`));
            console.log(chalk_1.default.blue('🔄 Updating Ignite CLI...'));
            // Update the package
            (0, child_process_1.execSync)('npm install -g the-ignite@latest', { stdio: 'inherit' });
            console.log(chalk_1.default.green('✅ Ignite CLI updated successfully!'));
            console.log(chalk_1.default.blue(`📋 Version ${latestVersion} is now installed.`));
        }
        catch (error) {
            console.log(chalk_1.default.red('❌ Failed to check for updates.'));
            console.log(chalk_1.default.gray('This might be due to network issues or npm registry problems.'));
            console.log(chalk_1.default.blue('💡 You can try updating manually with: npm install -g the-ignite@latest'));
        }
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Update failed:'), error);
        console.log(chalk_1.default.blue('💡 You can try updating manually with: npm install -g the-ignite@latest'));
    }
}
