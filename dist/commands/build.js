"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = build;
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const compiler_1 = require("../compiler");
async function build(options = {}) {
    // Determine platform based on options
    let platform = 'all';
    if (options.android && !options.ios) {
        platform = 'android';
    }
    else if (options.ios && !options.android) {
        platform = 'ios';
    }
    console.log(chalk_1.default.blue(`Building Ignite app for ${platform}...`));
    // Get the current working directory (project root)
    const projectRoot = process.cwd();
    // Check if we're in an Ignite project by looking for ignite.json
    const igniteJsonPath = path_1.default.join(projectRoot, 'ignite.json');
    const igniteConfigPath = path_1.default.join(projectRoot, '.ignite');
    if (!(0, fs_1.existsSync)(igniteJsonPath) && !(0, fs_1.existsSync)(igniteConfigPath)) {
        throw new Error('This is not an Ignite project. Run this command from an Ignite project directory.');
    }
    // Check if app directory exists
    if (!(0, fs_1.existsSync)(path_1.default.join(projectRoot, 'app'))) {
        throw new Error('App directory not found. Make sure you have an "app" directory with .ignite files.');
    }
    try {
        // First, compile the Ignite files
        console.log(chalk_1.default.blue('📦 Compiling Ignite files before build...'));
        const compiler = new compiler_1.IgniteCompiler(projectRoot);
        await compiler.compile();
        console.log(chalk_1.default.green('✅ Ignite compilation complete.'));
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Error during Ignite compilation:'), error);
        process.exit(1);
    }
    // Build for the specified platform(s)
    const platforms = platform === 'all' ? ['android', 'ios'] : [platform];
    // Check if EAS is configured
    const easJsonPath = path_1.default.join(projectRoot, 'eas.json');
    if (!(0, fs_1.existsSync)(easJsonPath)) {
        console.log(chalk_1.default.yellow('⚠️  EAS Build is not configured yet.'));
        console.log(chalk_1.default.blue('Creating EAS Build configuration...'));
        // Create eas.json with the correct configuration
        const easConfig = {
            "cli": {
                "version": ">= 5.9.1"
            },
            "build": {
                "development": {
                    "developmentClient": true,
                    "distribution": "internal"
                },
                "preview": {
                    "distribution": "internal"
                },
                "production": {}
            },
            "submit": {
                "production": {}
            }
        };
        (0, fs_1.writeFileSync)(easJsonPath, JSON.stringify(easConfig, null, 2));
        console.log(chalk_1.default.green('✅ EAS Build configured successfully!'));
    }
    for (const targetPlatform of platforms) {
        if (targetPlatform === 'web') {
            console.log(chalk_1.default.blue(`\nBuilding for web...`));
            console.log(chalk_1.default.gray(`Running: npx expo export:web`));
            const webBuildProcess = (0, child_process_1.spawn)('npx', ['expo', 'export:web'], {
                stdio: 'inherit',
                shell: true,
                cwd: projectRoot
            });
            await new Promise((resolve, reject) => {
                webBuildProcess.on('close', (code) => {
                    if (code === 0) {
                        console.log(chalk_1.default.green(`Successfully built for web!`));
                        resolve();
                    }
                    else {
                        reject(new Error(`Build for web failed with code ${code}`));
                    }
                });
                webBuildProcess.on('error', (error) => {
                    reject(error);
                });
            });
            continue;
        }
        console.log(chalk_1.default.blue(`\nBuilding for ${targetPlatform}...`));
        // Use EAS Build with the correct profile
        const buildCommand = ['eas', 'build', '--platform', targetPlatform, '--profile', 'preview'];
        console.log(chalk_1.default.gray(`Running: npx ${buildCommand.join(' ')}`));
        const buildProcess = (0, child_process_1.spawn)('npx', buildCommand, {
            stdio: 'inherit',
            shell: true,
            cwd: projectRoot
        });
        // Handle process events
        buildProcess.on('error', (error) => {
            console.error(chalk_1.default.red(`Failed to build for ${targetPlatform}:`), error);
            process.exit(1);
        });
        await new Promise((resolve, reject) => {
            buildProcess.on('close', (code) => {
                if (code === 0) {
                    console.log(chalk_1.default.green(`Successfully built for ${targetPlatform}!`));
                    resolve();
                }
                else {
                    reject(new Error(`Build for ${targetPlatform} failed with code ${code}`));
                }
            });
        });
    }
    console.log(chalk_1.default.green('\n🎉 Build completed successfully!'));
    console.log(chalk_1.default.blue('\nBuild artifacts should be available in your Expo dashboard or local build directory.'));
}
