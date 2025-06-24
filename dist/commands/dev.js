"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dev = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const compiler_1 = require("../compiler");
const watcher_1 = require("../compiler/watcher");
const dev = async (options = {}) => {
    console.log(chalk_1.default.blue('🔥 Starting Ignite development server...'));
    // Check if this is an Ignite project
    if (!(0, fs_1.existsSync)('ignite.json')) {
        console.error(chalk_1.default.red('❌ This is not an Ignite project. Run this command from an Ignite project directory.'));
        process.exit(1);
    }
    // Check if app directory exists
    if (!(0, fs_1.existsSync)('app')) {
        console.error(chalk_1.default.red('❌ App directory not found. Make sure you have an "app" directory with .ignite files.'));
        process.exit(1);
    }
    const projectRoot = process.cwd();
    const compiler = new compiler_1.IgniteCompiler(projectRoot);
    const watcher = new watcher_1.IgniteWatcher(projectRoot);
    console.log(chalk_1.default.gray(`Project root: ${projectRoot}`));
    console.log(chalk_1.default.gray(`App directory: ${projectRoot}/app`));
    try {
        // Initial compilation
        console.log(chalk_1.default.blue('📦 Compiling Ignite files...'));
        await compiler.compile();
        console.log(chalk_1.default.green('✅ Ignite compilation complete.'));
        // Start file watcher
        console.log(chalk_1.default.blue('👀 Starting Ignite file watcher...'));
        await watcher.start();
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Error during Ignite compilation or watcher setup:'), error);
        process.exit(1);
    }
    // Start Expo development server
    console.log(chalk_1.default.blue('🚀 Starting Expo development server...'));
    const expo = (0, child_process_1.spawn)('npx', ['expo', 'start'], {
        stdio: 'inherit',
        shell: true
    });
    expo.on('error', (error) => {
        console.error(chalk_1.default.red('❌ Failed to start Expo:'), error);
        watcher.stop();
        process.exit(1);
    });
    // If platform flag is provided, run the platform-specific command
    if (options.android || options.ios) {
        const platform = options.android ? 'android' : 'ios';
        console.log(chalk_1.default.blue(`📱 Starting ${platform} app...`));
        const app = (0, child_process_1.spawn)('npm', ['run', platform], {
            stdio: 'inherit',
            shell: true
        });
        app.on('error', (error) => {
            console.error(chalk_1.default.red(`❌ Failed to start ${platform} app:`), error);
            expo.kill();
            watcher.stop();
            process.exit(1);
        });
    }
    // Graceful shutdown handlers
    const shutdown = () => {
        console.log(chalk_1.default.yellow('\n🛑 Shutting down...'));
        if (expo && !expo.killed) {
            expo.kill();
        }
        watcher.stop();
        setTimeout(() => {
            process.exit(0);
        }, 1000);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    // Keep the process alive and show helpful info
    console.log(chalk_1.default.green('\n🎉 Ignite development server is running!'));
    console.log(chalk_1.default.gray('- Edit your .ignite files in the app/ directory'));
    console.log(chalk_1.default.gray('- Changes will be compiled automatically'));
    console.log(chalk_1.default.gray('- Press Ctrl+C to stop'));
};
exports.dev = dev;
