"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRouterConfig = generateRouterConfig;
const path = __importStar(require("path"));
const fs_1 = require("fs");
function generateRouterConfig(projectRoot, routes) {
    // Sort routes based on folder structure and tabOrder
    const sortedRoutes = [...routes].sort((a, b) => {
        // First, check if both are tab screens
        const aIsTab = a.options?.isTabScreen;
        const bIsTab = b.options?.isTabScreen;
        if (aIsTab && !bIsTab)
            return -1;
        if (!aIsTab && bIsTab)
            return 1;
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
    const getCleanComponentName = (componentName) => {
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
    (0, fs_1.writeFileSync)(path.join(projectRoot, '.ignite', 'router.js'), routerCode);
}
