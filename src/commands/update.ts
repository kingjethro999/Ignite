import { execSync } from 'child_process';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

export async function update(): Promise<void> {
  try {
    console.log(chalk.blue('🔍 Checking for Ignite CLI updates...'));
    
    // Get current version
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    const currentVersion = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).version;
    
    console.log(chalk.gray(`Current version: ${currentVersion}`));
    
    // Check for latest version
    console.log(chalk.blue('📡 Fetching latest version from npm...'));
    
    try {
      const latestVersion = execSync('npm view the-ignite version', { encoding: 'utf8' }).trim();
      
      if (latestVersion === currentVersion) {
        console.log(chalk.green('✅ You are already using the latest version of Ignite CLI!'));
        return;
      }
      
      console.log(chalk.yellow(`📦 New version available: ${latestVersion}`));
      console.log(chalk.blue('🔄 Updating Ignite CLI...'));
      
      // Update the package
      execSync('npm install -g the-ignite@latest', { stdio: 'inherit' });
      
      console.log(chalk.green('✅ Ignite CLI updated successfully!'));
      console.log(chalk.blue(`📋 Version ${latestVersion} is now installed.`));
      
    } catch (error) {
      console.log(chalk.red('❌ Failed to check for updates.'));
      console.log(chalk.gray('This might be due to network issues or npm registry problems.'));
      console.log(chalk.blue('💡 You can try updating manually with: npm install -g the-ignite@latest'));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Update failed:'), error);
    console.log(chalk.blue('💡 You can try updating manually with: npm install -g the-ignite@latest'));
  }
} 