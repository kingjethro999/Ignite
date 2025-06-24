#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = require("./commands/create");
const dev_1 = require("./commands/dev");
const build_1 = require("./commands/build");
const program = new commander_1.Command();
program
    .name('ignite')
    .description('Ignite - Simplified Cross-Platform Mobile Development')
    .version('1.0.0');
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
