import chalk from 'chalk';
import { spawn } from 'child_process';
import path from 'path';
import { existsSync, writeFileSync } from 'fs';
import { IgniteCompiler } from '../compiler';

type Platform = 'android' | 'ios' | 'web' | 'all';

export async function build(options: { android?: boolean; ios?: boolean } = {}) {
  // Determine platform based on options
  let platform: Platform = 'all';
  if (options.android && !options.ios) {
    platform = 'android';
  } else if (options.ios && !options.android) {
    platform = 'ios';
  }
  console.log(chalk.blue(`Building Ignite app for ${platform}...`));

  // Get the current working directory (project root)
  const projectRoot = process.cwd();
  
  // Check if we're in an Ignite project by looking for ignite.json
  const igniteJsonPath = path.join(projectRoot, 'ignite.json');
  const igniteConfigPath = path.join(projectRoot, '.ignite');
  
  if (!existsSync(igniteJsonPath) && !existsSync(igniteConfigPath)) {
    throw new Error('This is not an Ignite project. Run this command from an Ignite project directory.');
  }

  // Check if app directory exists
  if (!existsSync(path.join(projectRoot, 'app'))) {
    throw new Error('App directory not found. Make sure you have an "app" directory with .ignite files.');
  }

  try {
    // First, compile the Ignite files
    console.log(chalk.blue('📦 Compiling Ignite files before build...'));
    const compiler = new IgniteCompiler(projectRoot);
    await compiler.compile();
    console.log(chalk.green('✅ Ignite compilation complete.'));
  } catch (error) {
    console.error(chalk.red('❌ Error during Ignite compilation:'), error);
    process.exit(1);
  }

  // Build for the specified platform(s)
  const platforms = platform === 'all' ? ['android', 'ios'] : [platform];
  
  // Check if EAS is configured
  const easJsonPath = path.join(projectRoot, 'eas.json');
  if (!existsSync(easJsonPath)) {
    console.log(chalk.yellow('⚠️  EAS Build is not configured yet.'));
    console.log(chalk.blue('Creating EAS Build configuration...'));
    
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

    writeFileSync(easJsonPath, JSON.stringify(easConfig, null, 2));
    console.log(chalk.green('✅ EAS Build configured successfully!'));
  }

  for (const targetPlatform of platforms) {
    if (targetPlatform === 'web') {
      console.log(chalk.blue(`\nBuilding for web...`));
      console.log(chalk.gray(`Running: npx expo export:web`));
      
      const webBuildProcess = spawn('npx', ['expo', 'export:web'], {
        stdio: 'inherit',
        shell: true,
        cwd: projectRoot
      });

      await new Promise<void>((resolve, reject) => {
        webBuildProcess.on('close', (code) => {
          if (code === 0) {
            console.log(chalk.green(`Successfully built for web!`));
            resolve();
          } else {
            reject(new Error(`Build for web failed with code ${code}`));
          }
        });
        
        webBuildProcess.on('error', (error) => {
          reject(error);
        });
      });
      
      continue;
    }

    console.log(chalk.blue(`\nBuilding for ${targetPlatform}...`));
    
    // Use EAS Build with the correct profile
    const buildCommand = ['eas', 'build', '--platform', targetPlatform, '--profile', 'preview'];
    
    console.log(chalk.gray(`Running: npx ${buildCommand.join(' ')}`));
    
    const buildProcess = spawn('npx', buildCommand, {
      stdio: 'inherit',
      shell: true,
      cwd: projectRoot
    });

    // Handle process events
    buildProcess.on('error', (error) => {
      console.error(chalk.red(`Failed to build for ${targetPlatform}:`), error);
      process.exit(1);
    });

    await new Promise<void>((resolve, reject) => {
      buildProcess.on('close', (code) => {
        if (code === 0) {
          console.log(chalk.green(`Successfully built for ${targetPlatform}!`));
          resolve();
        } else {
          reject(new Error(`Build for ${targetPlatform} failed with code ${code}`));
        }
      });
    });
  }

  console.log(chalk.green('\n🎉 Build completed successfully!'));
  console.log(chalk.blue('\nBuild artifacts should be available in your Expo dashboard or local build directory.'));
}