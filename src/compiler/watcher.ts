import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';
import fs from 'fs';
import { IgniteCompiler } from './index';
import chalk from 'chalk';

export class IgniteWatcher {
  private compiler: IgniteCompiler;
  private watcher: FSWatcher | null = null;
  private isCompiling: boolean = false;
  private compileTimeout: NodeJS.Timeout | null = null;
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.compiler = new IgniteCompiler(projectRoot);
  }

  async start(): Promise<void> {
    console.log(chalk.blue('Starting Ignite file watcher...'));
    
    // Check if app directory exists
    const appDir = path.join(this.projectRoot, 'app');
    if (!fs.existsSync(appDir)) {
      console.error(chalk.red(`App directory not found: ${appDir}`));
      return;
    }

    // List existing .ignite files for debugging
    const igniteFiles = this.findIgniteFiles(appDir);
    console.log(chalk.gray(`Found ${igniteFiles.length} .ignite files:`));
    igniteFiles.forEach(file => {
      console.log(chalk.gray(`  - ${path.relative(this.projectRoot, file)}`));
    });

    // Watch the entire app directory for .ignite files
    const watchPaths = [
      path.join(appDir, '**/*.ignite'),
      // Also watch the app directory itself for new files/folders
      appDir
    ];

    console.log(chalk.gray(`Watching paths:`));
    watchPaths.forEach(p => console.log(chalk.gray(`  - ${p}`)));
    
    this.watcher = chokidar.watch(watchPaths, {
      ignored: [
        /(^|[\/\\])\../, // ignore dotfiles
        /node_modules/,
        /\.ignite\//,    // ignore compiled output directory
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
      .on('add', (filePath: string) => {
        if (filePath.endsWith('.ignite')) {
          console.log(chalk.green(`[WATCHER] File added: ${path.relative(this.projectRoot, filePath)}`));
          this.scheduleCompile();
        }
      })
      .on('change', (filePath: string) => {
        if (filePath.endsWith('.ignite')) {
          console.log(chalk.yellow(`[WATCHER] File changed: ${path.relative(this.projectRoot, filePath)}`));
          this.scheduleCompile();
        }
      })
      .on('unlink', (filePath: string) => {
        if (filePath.endsWith('.ignite')) {
          console.log(chalk.red(`[WATCHER] File deleted: ${path.relative(this.projectRoot, filePath)}`));
          this.scheduleCompile();
        }
      })
      .on('error', (error) => {
        console.error(chalk.red('[WATCHER] Error:'), error);
      })
      .on('ready', () => {
        console.log(chalk.green('[WATCHER] Ready! Watching for .ignite file changes...'));
        console.log(chalk.gray('[WATCHER] Try editing a .ignite file now...'));
      });

    // Do initial compilation
    try {
      await this.compiler.compile();
      console.log(chalk.green('Initial compilation complete.'));
    } catch (error) {
      console.error(chalk.red('Initial compilation failed:'), error);
    }
  }

  private findIgniteFiles(dir: string): string[] {
    const files: string[] = [];
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...this.findIgniteFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.ignite')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(chalk.red(`Error reading directory ${dir}:`), error);
    }
    return files;
  }

  private scheduleCompile(): void {
    // Clear any existing timeout
    if (this.compileTimeout) {
      clearTimeout(this.compileTimeout);
    }

    // Schedule compilation with a small debounce
    this.compileTimeout = setTimeout(() => {
      this.doCompile();
    }, 100) as unknown as NodeJS.Timeout; // 100ms debounce
  }

  private async doCompile(): Promise<void> {
    if (this.isCompiling) {
      console.log(chalk.yellow('[WATCHER] Compilation already in progress, skipping...'));
      return;
    }

    this.isCompiling = true;
    console.log(chalk.blue('[WATCHER] Compiling...'));
    
    const startTime = Date.now();
    
    try {
      await this.compiler.compile();
      const duration = Date.now() - startTime;
      console.log(chalk.green(`[WATCHER] ✓ Compilation complete in ${duration}ms`));
    } catch (error) {
      console.error(chalk.red('[WATCHER] ✗ Compilation failed:'), error);
    } finally {
      this.isCompiling = false;
    }
  }

  stop(): void {
    console.log(chalk.blue('[WATCHER] Stopping...'));
    
    if (this.compileTimeout) {
      clearTimeout(this.compileTimeout);
      this.compileTimeout = null;
    }
    
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
    
    this.isCompiling = false;
    console.log(chalk.green('[WATCHER] Stopped.'));
  }
}