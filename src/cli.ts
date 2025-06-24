#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createApp } from './commands/create';
import { dev } from './commands/dev';
import { build } from './commands/build';

const program = new Command();

program
  .name('ignite')
  .description('Ignite - Simplified Cross-Platform Mobile Development')
  .version('1.0.0');

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