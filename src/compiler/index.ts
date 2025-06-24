import fs from 'fs-extra';
import path from 'path';
import { parseIgniteContent } from './parser';
import { generateReactNativeCode } from './generator';
import { generateRouterConfig } from './router';

export interface RouteDefinition {
  path: string;
  component: string;
  screenFile: string;
  options?: {
    title?: string;
    headerShown?: boolean;
    isTabScreen?: boolean;
    tabOrder?: number;
    tabIcon?: string;
  };
}

export class IgniteCompiler {
  private projectRoot: string;
  private appDir: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.appDir = path.join(projectRoot, 'app');
  }

  async compile(): Promise<void> {
    if (!await fs.pathExists(this.appDir)) {
      throw new Error('App directory not found');
    }

    const igniteFiles = await this.findIgniteFiles(this.appDir);
    const routes: RouteDefinition[] = [];

    for (const file of igniteFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const parsed = parseIgniteContent(content);

      let relativePath = path.relative(this.appDir, file);
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
        outputPath = path.join(
          this.projectRoot,
          '.ignite',
          'screens',
          '(tabs)',
          path.dirname(pathWithoutTabs)
        );
      } else {
        // For non-tab screens, maintain their original directory structure
        outputPath = path.join(
          this.projectRoot,
          '.ignite',
          'screens',
          path.dirname(screenPath)
        );
      }

      await generateReactNativeCode(parsed, outputPath, path.basename(screenPath), routes);
      
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

    generateRouterConfig(this.projectRoot, routes);
  }

  private async findIgniteFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await this.findIgniteFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.ignite')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  private getComponentName(filePath: string): string {
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