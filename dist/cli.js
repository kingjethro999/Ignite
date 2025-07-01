#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = require("./commands/create");
const dev_1 = require("./commands/dev");
const build_1 = require("./commands/build");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const program = new commander_1.Command();
// Dynamically read version from package.json
const packageJsonPath = path.resolve(__dirname, '../package.json');
const version = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).version;
program
    .name('ignite')
    .description('Ignite - Simplified Cross-Platform Mobile Development')
    .version(version);
program
    .command('v')
    .description('Show Ignite CLI version')
    .action(() => {
    console.log(version);
});
program
    .option('-v', 'Show Ignite CLI version', () => {
    console.log(version);
    process.exit(0);
});
program
    .command('create')
    .description('Create a new Ignite app')
    .argument('<name>', 'name of the app')
    .action(create_1.createApp);
program
    .command('dev')
    .description('Start the development server')
    .option('-a, --android', 'run on Android')
    .option('-i, --ios', 'run on iOS')
    .action(dev_1.dev);
program
    .command('build')
    .description('Build the app for production')
    .option('-a, --android', 'build for Android')
    .option('-i, --ios', 'build for iOS')
    .action(build_1.build);
program.parse();
