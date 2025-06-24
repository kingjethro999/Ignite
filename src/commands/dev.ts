import { spawn } from 'child_process';
import { existsSync } from 'fs';
import chalk from 'chalk';
import { IgniteCompiler } from '../compiler';
import { IgniteWatcher } from '../compiler/watcher';

interface DevOptions {
  android?: boolean;
  ios?: boolean;
}

export const dev = async (options: DevOptions = {}): Promise<void> => {
  console.log(chalk.blue('🔥 Starting Ignite development server...'));

  // Check if this is an Ignite project
  if (!existsSync('ignite.json')) {
    console.error(chalk.red('❌ This is not an Ignite project. Run this command from an Ignite project directory.'));
    process.exit(1);
  }

  // Check if app directory exists
  if (!existsSync('app')) {
    console.error(chalk.red('❌ App directory not found. Make sure you have an "app" directory with .ignite files.'));
    process.exit(1);
  }

  const projectRoot = process.cwd();
  const compiler = new IgniteCompiler(projectRoot);
  const watcher = new IgniteWatcher(projectRoot);

  console.log(chalk.gray(`Project root: ${projectRoot}`));
  console.log(chalk.gray(`App directory: ${projectRoot}/app`));

  try {
    // Initial compilation
    console.log(chalk.blue('📦 Compiling Ignite files...'));
    await compiler.compile();
    console.log(chalk.green('✅ Ignite compilation complete.'));

    // Start file watcher
    console.log(chalk.blue('👀 Starting Ignite file watcher...'));
    await watcher.start();
    
  } catch (error) {
    console.error(chalk.red('❌ Error during Ignite compilation or watcher setup:'), error);
    process.exit(1);
  }

  // Start Expo development server
  console.log(chalk.blue('🚀 Starting Expo development server...'));
  const expo = spawn('npx', ['expo', 'start'], { 
    stdio: 'inherit',
    shell: true
  });

  expo.on('error', (error) => {
    console.error(chalk.red('❌ Failed to start Expo:'), error);
    watcher.stop();
    process.exit(1);
  });

  // If platform flag is provided, run the platform-specific command
  if (options.android || options.ios) {
    const platform = options.android ? 'android' : 'ios';
    console.log(chalk.blue(`📱 Starting ${platform} app...`));
    
    const app = spawn('npm', ['run', platform], {
      stdio: 'inherit',
      shell: true
    });

    app.on('error', (error) => {
      console.error(chalk.red(`❌ Failed to start ${platform} app:`), error);
      expo.kill();
      watcher.stop();
      process.exit(1);
    });
  }

  // Graceful shutdown handlers
  const shutdown = () => {
    console.log(chalk.yellow('\n🛑 Shutting down...'));
    
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
  console.log(chalk.green('\n🎉 Ignite development server is running!'));
  console.log(chalk.gray('- Edit your .ignite files in the app/ directory'));
  console.log(chalk.gray('- Changes will be compiled automatically'));
  console.log(chalk.gray('- Press Ctrl+C to stop'));
};