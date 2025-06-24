"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgniteWatcher = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const index_1 = require("./index");
const chalk_1 = __importDefault(require("chalk"));
class IgniteWatcher {
    constructor(projectRoot) {
        this.watcher = null;
        this.isCompiling = false;
        this.compileTimeout = null;
        this.projectRoot = projectRoot;
        this.compiler = new index_1.IgniteCompiler(projectRoot);
    }
    async start() {
        console.log(chalk_1.default.blue('Starting Ignite file watcher...'));
        // Check if app directory exists
        const appDir = path_1.default.join(this.projectRoot, 'app');
        if (!fs_1.default.existsSync(appDir)) {
            console.error(chalk_1.default.red(`App directory not found: ${appDir}`));
            return;
        }
        // List existing .ignite files for debugging
        const igniteFiles = this.findIgniteFiles(appDir);
        console.log(chalk_1.default.gray(`Found ${igniteFiles.length} .ignite files:`));
        igniteFiles.forEach(file => {
            console.log(chalk_1.default.gray(`  - ${path_1.default.relative(this.projectRoot, file)}`));
        });
        // Watch the entire app directory for .ignite files
        const watchPaths = [
            path_1.default.join(appDir, '**/*.ignite'),
            // Also watch the app directory itself for new files/folders
            appDir
        ];
        console.log(chalk_1.default.gray(`Watching paths:`));
        watchPaths.forEach(p => console.log(chalk_1.default.gray(`  - ${p}`)));
        this.watcher = chokidar_1.default.watch(watchPaths, {
            ignored: [
                /(^|[\/\\])\../, // ignore dotfiles
                /node_modules/,
                /\.ignite\//, // ignore compiled output directory
            ],
            persistent: true,
            ignoreInitial: true, // Don't trigger events for existing files on startup
            followSymlinks: false,
            depth: 99,
            awaitWriteFinish: {
                stabilityThreshold: 50,
                pollInterval: 10
            },
            // Force polling on some systems where file watching doesn't work reliably
            usePolling: false,
            interval: 100
        });
        // Set up event handlers
        this.watcher
            .on('add', (filePath) => {
            if (filePath.endsWith('.ignite')) {
                console.log(chalk_1.default.green(`[WATCHER] File added: ${path_1.default.relative(this.projectRoot, filePath)}`));
                this.scheduleCompile();
            }
        })
            .on('change', (filePath) => {
            if (filePath.endsWith('.ignite')) {
                console.log(chalk_1.default.yellow(`[WATCHER] File changed: ${path_1.default.relative(this.projectRoot, filePath)}`));
                this.scheduleCompile();
            }
        })
            .on('unlink', (filePath) => {
            if (filePath.endsWith('.ignite')) {
                console.log(chalk_1.default.red(`[WATCHER] File deleted: ${path_1.default.relative(this.projectRoot, filePath)}`));
                this.scheduleCompile();
            }
        })
            .on('error', (error) => {
            console.error(chalk_1.default.red('[WATCHER] Error:'), error);
        })
            .on('ready', () => {
            console.log(chalk_1.default.green('[WATCHER] Ready! Watching for .ignite file changes...'));
            console.log(chalk_1.default.gray('[WATCHER] Try editing a .ignite file now...'));
        });
        // Do initial compilation
        try {
            await this.compiler.compile();
            console.log(chalk_1.default.green('Initial compilation complete.'));
        }
        catch (error) {
            console.error(chalk_1.default.red('Initial compilation failed:'), error);
        }
    }
    findIgniteFiles(dir) {
        const files = [];
        try {
            const entries = fs_1.default.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path_1.default.join(dir, entry.name);
                if (entry.isDirectory()) {
                    files.push(...this.findIgniteFiles(fullPath));
                }
                else if (entry.isFile() && entry.name.endsWith('.ignite')) {
                    files.push(fullPath);
                }
            }
        }
        catch (error) {
            console.error(chalk_1.default.red(`Error reading directory ${dir}:`), error);
        }
        return files;
    }
    scheduleCompile() {
        // Clear any existing timeout
        if (this.compileTimeout) {
            clearTimeout(this.compileTimeout);
        }
        // Schedule compilation with a small debounce
        this.compileTimeout = setTimeout(() => {
            this.doCompile();
        }, 100); // 100ms debounce
    }
    async doCompile() {
        if (this.isCompiling) {
            console.log(chalk_1.default.yellow('[WATCHER] Compilation already in progress, skipping...'));
            return;
        }
        this.isCompiling = true;
        console.log(chalk_1.default.blue('[WATCHER] Compiling...'));
        const startTime = Date.now();
        try {
            await this.compiler.compile();
            const duration = Date.now() - startTime;
            console.log(chalk_1.default.green(`[WATCHER] ✓ Compilation complete in ${duration}ms`));
        }
        catch (error) {
            console.error(chalk_1.default.red('[WATCHER] ✗ Compilation failed:'), error);
        }
        finally {
            this.isCompiling = false;
        }
    }
    stop() {
        console.log(chalk_1.default.blue('[WATCHER] Stopping...'));
        if (this.compileTimeout) {
            clearTimeout(this.compileTimeout);
            this.compileTimeout = null;
        }
        if (this.watcher) {
            this.watcher.close();
            this.watcher = null;
        }
        this.isCompiling = false;
        console.log(chalk_1.default.green('[WATCHER] Stopped.'));
    }
}
exports.IgniteWatcher = IgniteWatcher;
