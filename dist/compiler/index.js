"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgniteCompiler = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const parser_1 = require("./parser");
const generator_1 = require("./generator");
const router_1 = require("./router");
class IgniteCompiler {
    constructor(projectRoot) {
        this.projectRoot = projectRoot;
        this.appDir = path_1.default.join(projectRoot, 'app');
    }
    async compile() {
        if (!await fs_extra_1.default.pathExists(this.appDir)) {
            throw new Error('App directory not found');
        }
        const igniteFiles = await this.findIgniteFiles(this.appDir);
        const routes = [];
        for (const file of igniteFiles) {
            const content = await fs_extra_1.default.readFile(file, 'utf-8');
            const parsed = (0, parser_1.parseIgniteContent)(content);
            let relativePath = path_1.default.relative(this.appDir, file);
            relativePath = relativePath.replace(/\\/g, '/');
            const screenPath = relativePath.replace(/\.ignite$/, '');
            const componentName = this.getComponentName(screenPath);
            // Determine if this is a tab screen based on directory structure or screen metadata
            const isTabScreen = screenPath.includes('/(tabs)/') || parsed.screen.isTabScreen;
            const tabOrder = parsed.screen.tabOrder;
            const tabIcon = parsed.screen.tabIcon;
            // Create appropriate output directory structure
            let outputPath;
            if (isTabScreen) {
                // For tab screens, place them in the (tabs) directory
                // Remove the existing (tabs) from the path to avoid duplication
                const pathWithoutTabs = screenPath.replace(/^\(tabs\)\//, '');
                outputPath = path_1.default.join(this.projectRoot, '.ignite', 'screens', '(tabs)', path_1.default.dirname(pathWithoutTabs));
            }
            else {
                // For non-tab screens, maintain their original directory structure
                outputPath = path_1.default.join(this.projectRoot, '.ignite', 'screens', path_1.default.dirname(screenPath));
            }
            await (0, generator_1.generateReactNativeCode)(parsed, outputPath, path_1.default.basename(screenPath), routes);
            routes.push({
                path: componentName,
                component: componentName,
                screenFile: screenPath,
                options: {
                    title: parsed.screen.title,
                    headerShown: parsed.screen.headerShown,
                    isTabScreen,
                    tabOrder,
                    tabIcon
                }
            });
        }
        (0, router_1.generateRouterConfig)(this.projectRoot, routes);
    }
    async findIgniteFiles(dir) {
        const files = [];
        const entries = await fs_extra_1.default.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path_1.default.join(dir, entry.name);
            if (entry.isDirectory()) {
                files.push(...await this.findIgniteFiles(fullPath));
            }
            else if (entry.isFile() && entry.name.endsWith('.ignite')) {
                files.push(fullPath);
            }
        }
        return files;
    }
    getComponentName(filePath) {
        const relativePath = filePath
            .replace(/\\/g, '/')
            .replace(/^app\//, '');
        const nameWithoutIndex = relativePath
            .replace(/\/index\.ignite$/, '')
            .replace(/\.ignite$/, '')
            .replace(/^\(tabs\)\//, ''); // Remove (tabs) prefix
        return nameWithoutIndex
            .split('/')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    }
}
exports.IgniteCompiler = IgniteCompiler;
