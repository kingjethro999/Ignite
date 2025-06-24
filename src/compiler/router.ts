import * as path from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { parseIgniteContent } from './parser';

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

  // Helper function to clean component name
  const getCleanComponentName = (componentName: string): string => {
    return componentName.endsWith('Index') ? componentName.slice(0, -5) : componentName;
  };

  // Generate the router configuration code
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
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      ${tabRoutes.map(route => `<Tab.Screen 
        name="${getCleanComponentName(route.component)}" 
        component={${route.component}}
        options={{
          title: "${route.options?.title || getCleanComponentName(route.component)}",
          headerShown: ${route.options?.headerShown === undefined ? true : route.options.headerShown}
        }}
      />`).join('\n      ')}
    </Tab.Navigator>
  );
}

export default function Router() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      ${otherRoutes.map(route => `<Stack.Screen
        name="${getCleanComponentName(route.component)}"
        component={${route.component}}
        options={{
          title: "${route.options?.title || getCleanComponentName(route.component)}",
          headerShown: ${route.options?.headerShown === undefined ? true : route.options.headerShown}
        }}
      />`).join('\n      ')}
    </Stack.Navigator>
  );
}
`;

  // Write the router configuration to the .ignite directory
  writeFileSync(path.join(projectRoot, '.ignite', 'router.js'), routerCode);
}