import * as path from 'path';
import { writeFileSync, readFileSync, existsSync } from 'fs';

import { writeFileSync as writeJsonSync, readFileSync as readJsonSync } from 'fs';
import { parseIgniteContent } from './parser';
import * as readline from 'readline';

interface Route {
  path: string;
  component: string;
  screenFile: string;
  options?: {
    title?: string;
    headerShown?: boolean;
    tabBarIcon?: string;
    isTabScreen?: boolean;
    tabOrder?: number;
  };
}

export function generateRouterConfig(projectRoot: string, routes: Route[]): void {
  // Sort routes based on folder structure and tabOrder
  const sortedRoutes = [...routes].sort((a, b) => {
    // First, check if both are tab screens
    const aIsTab = a.options?.isTabScreen;
    const bIsTab = b.options?.isTabScreen;
    
    if (aIsTab && !bIsTab) return -1;
    if (!aIsTab && bIsTab) return 1;
    
    // If both are tab screens, sort by tabOrder
    if (aIsTab && bIsTab) {
      const aOrder = a.options?.tabOrder ?? Infinity;
      const bOrder = b.options?.tabOrder ?? Infinity;
      return aOrder - bOrder;
    }
    
    // For non-tab screens, maintain folder structure order
    return a.path.localeCompare(b.path);
  });

  // Separate tab and non-tab routes
  const tabRoutes = sortedRoutes.filter(route => route.options?.isTabScreen);
  const otherRoutes = sortedRoutes.filter(route => !route.options?.isTabScreen);

  // --- Custom Tab Style Injection ---
  const tabsDir = path.join(projectRoot, 'app', '(tabs)');
  const styleFileNames = [
    'tabs.style', 'tab.style', 'tabs@style', 'tab@style',
    'tabs_styles', 'tab_styles', 'tabs.styles', 'tab.styles'
  ];
  const foundStyleFiles = styleFileNames
    .map(fname => path.join(tabsDir, fname))
    .filter(fpath => existsSync(fpath));

  let customTabStyles: Record<string, any> = {};
  let selectedStyleFile = '';

  const igniteJsonPath = path.join(projectRoot, 'ignite.json');
  let igniteConfig: any = {};
  if (existsSync(igniteJsonPath)) {
    try {
      igniteConfig = JSON.parse(readJsonSync(igniteJsonPath, 'utf8'));
    } catch {}
  }

  let lastTabStyleFile = igniteConfig.lastTabStyleFile;

  if (foundStyleFiles.length > 1) {
    // If lastTabStyleFile exists and is present, use it as default selection
    let selectedIdx = 0;
    if (lastTabStyleFile) {
      const idx = foundStyleFiles.findIndex(f => path.basename(f) === lastTabStyleFile);
      if (idx !== -1) selectedIdx = idx;
    }
    // Prompt user to select which style file to use
    console.log('\nMultiple tab style files found:');
    foundStyleFiles.forEach((f, i) => {
      console.log(`  [${i + 1}] ${path.basename(f)}`);
    });
    function renderPrompt() {
      process.stdout.write('\nUse arrow keys to select, then press Enter:\n');
      foundStyleFiles.forEach((f, i) => {
        process.stdout.write(`${selectedIdx === i ? '> ' : '  '}${path.basename(f)}\n`);
      });
    }
    function onKeypress(str: string, key: any) {
      if (key.name === 'up') {
        selectedIdx = (selectedIdx - 1 + foundStyleFiles.length) % foundStyleFiles.length;
        readline.cursorTo(process.stdout, 0);
        readline.clearScreenDown(process.stdout);
        renderPrompt();
      } else if (key.name === 'down') {
        selectedIdx = (selectedIdx + 1) % foundStyleFiles.length;
        readline.cursorTo(process.stdout, 0);
        readline.clearScreenDown(process.stdout);
        renderPrompt();
      } else if (key.name === 'return') {
        process.stdin.removeListener('keypress', onKeypress);
        selectedStyleFile = foundStyleFiles[selectedIdx];
        // Save to ignite.json
        igniteConfig.lastTabStyleFile = path.basename(selectedStyleFile);
        writeJsonSync(igniteJsonPath, JSON.stringify(igniteConfig, null, 2));
        proceed();
      }
    }
    process.stdin.on('keypress', onKeypress);
    renderPrompt();
    function proceed() {
      useStyleFile(selectedStyleFile);
    }
    return; // Wait for user selection before proceeding
  } else if (foundStyleFiles.length === 1) {
    selectedStyleFile = foundStyleFiles[0];
    // Save to ignite.json
    igniteConfig.lastTabStyleFile = path.basename(selectedStyleFile);
    writeJsonSync(igniteJsonPath, JSON.stringify(igniteConfig, null, 2));
    useStyleFile(selectedStyleFile);
  } else if (lastTabStyleFile) {
    // If no style files found but config exists, clear it
    delete igniteConfig.lastTabStyleFile;
    writeJsonSync(igniteJsonPath, JSON.stringify(igniteConfig, null, 2));
    generateRouter();
  } else {
    generateRouter();
  }
  function useStyleFile(styleFile: string) {
    const styleContent = readFileSync(styleFile, 'utf8');
    const match = styleContent.match(/@?\.?_?styles\s*\{([\s\S]*)\}/i);
    if (match) {
      try {
        // eslint-disable-next-line no-eval
        customTabStyles = eval('({' + match[1] + '})');
      } catch (e) {
        console.warn('Could not parse custom tab styles:', e);
      }
    }
    generateRouter();
  }
  if (foundStyleFiles.length === 0) {
    generateRouter();
  }
  function getStyleProp(prop: string, fallback: any) {
    return (customTabStyles && customTabStyles[prop]) ? customTabStyles[prop] : fallback;
  }

  // Helper function for name cleaning (for codegen only)
  function cleanName(componentName: string): string {
    return componentName.endsWith('Index') ? componentName.slice(0, -5) : componentName;
  }

  // Generate the router configuration code
  function generateRouter() {
    const routerCode = `import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

${routes.map(route => `import ${route.component} from './screens/${route.screenFile}';`).join('\n')}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Helper function to clean component names
function getCleanComponentName(componentName) {
  return componentName.endsWith('Index') ? componentName.slice(0, -5) : componentName;
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const routeConfig = ${JSON.stringify(tabRoutes)};
          const currentRoute = routeConfig.find(r => getCleanComponentName(r.component) === route.name);
          const iconName = currentRoute?.options?.tabIcon || 'ellipse';
          return <Ionicons name={focused ? iconName : \`\${iconName}-outline\`} size={size} color={color} />;
        },
        tabBarActiveTintColor: ${JSON.stringify(getStyleProp('tabBarActiveTintColor', '#007AFF'))},
        tabBarInactiveTintColor: ${JSON.stringify(getStyleProp('tabBarInactiveTintColor', 'gray'))},
        tabBarStyle: ${JSON.stringify(getStyleProp('tabBarStyle', {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: 5,
          height: 60,
        }))},
        tabBarLabelStyle: ${JSON.stringify(getStyleProp('tabBarLabelStyle', {
          fontSize: 12,
          fontWeight: '600',
        }))},
        headerShown: false,
      })}
    >
      ${tabRoutes.map(route => {
        const name = cleanName(route.component);
        return `<Tab.Screen 
          name="${name}" 
          component={${route.component}}
          options={{
            title: "${route.options?.title || name}",
            headerShown: ${route.options?.headerShown === undefined ? true : route.options.headerShown}
          }}
        />`;
      }).join('\n      ')}
    </Tab.Navigator>
  );
}

export default function Router() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      ${otherRoutes.map(route => {
        const name = cleanName(route.component);
        return `<Stack.Screen
          name="${name}"
          component={${route.component}}
          options={{
            title: "${route.options?.title || name}",
            headerShown: ${route.options?.headerShown === undefined ? true : route.options.headerShown}
          }}
        />`;
      }).join('\n      ')}
    </Stack.Navigator>
  );
}
`;

  // Write the router configuration to the .ignite directory
  writeFileSync(path.join(projectRoot, '.ignite', 'router.js'), routerCode);
  }
}