#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createApp } from './commands/create';
import { dev } from './commands/dev';
import { build } from './commands/build';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

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
  .action(createApp);

program
  .command('dev')
  .description('Start the development server')
  .option('-a, --android', 'run on Android')
  .option('-i, --ios', 'run on iOS')
  .action(dev);

program
  .command('build')
  .description('Build the app for production')
  .option('-a, --android', 'build for Android')
  .option('-i, --ios', 'build for iOS')
  .action(build);

program.parse(); 