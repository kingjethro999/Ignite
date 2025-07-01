'use client'

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import DocsSidebar from '../../components/DocsSidebar';
import CodeBlock from '../../components/CodeBlock';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import rehypeRaw from 'rehype-raw';

const docSections = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'cli', title: 'CLI & Commands' },
  { id: 'project-structure', title: 'Project Structure' },
  { id: 'usage', title: 'Usage' },
  { id: 'features', title: 'Features' },
  { id: 'components', title: 'Components' },
  { id: 'state-management', title: 'State Management' },
  { id: 'navigation', title: 'Navigation' },
  { id: 'advanced', title: 'Advanced' },
  { id: 'examples', title: 'App Examples' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
];

const gettingStartedContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Install Ignite Globally</h3>
    <CodeBlock code={`npm install -g the-ignite`} />
    <p>The Ignite CLI provides everything you need to create, develop, and build cross-platform mobile apps using declarative .ignite syntax.</p>
    
    <h3>Create a New Project</h3>
    <CodeBlock code={`ignite create my-app\ncd my-app`} />
    <p>This command creates a new Expo project with:</p>
    <ul>
      <li>Pre-configured React Navigation with bottom tabs</li>
      <li>Sample .ignite files in the app/(tabs) directory</li>
      <li>Assets (app icon, splash screen, adaptive icon) downloaded from Cloudinary</li>
      <li>Complete Expo setup with TypeScript support</li>
      <li>Dependencies: Expo, React Navigation, React Native Gesture Handler, and more</li>
    </ul>
    
    <h3>Start Development Server</h3>
    <CodeBlock code={`ignite dev`} />
    <p>This starts the complete development workflow:</p>
    <ul>
      <li>Compiles all .ignite files to React Native components</li>
      <li>Starts file watcher for automatic recompilation</li>
      <li>Launches Expo development server</li>
      <li>Provides hot reloading for instant feedback</li>
    </ul>
    
    <h3>Platform-Specific Development</h3>
    <CodeBlock code={`ignite dev --android    # or -a\nignite dev --ios        # or -i`} />
    
    <h3>Edit Your App</h3>
    <p>Your app structure will look like this:</p>
    <CodeBlock code={`my-app/\n├── app/\n│   └── (tabs)/\n│       ├── Home/\n│       │   └── index.ignite       # Your main screen\n│       ├── About/\n│       │   └── index.ignite       # About screen\n│       └── Developers/\n│           └── index.ignite       # Developers screen\n├── assets/\n│   ├── icon.png                   # App icon\n│   ├── adaptive-icon.png          # Android adaptive icon\n│   └── splash.png                  # Splash screen image\n├── .ignite/\n│   ├── screens/                   # Generated React Native components\n│   └── router.js                  # Generated navigation config\n├── App.js                         # Main app entry point\n├── app.config.js                  # Expo configuration\n├── babel.config.js                 # Babel configuration\n├── package.json                    # Dependencies and scripts\n└── ignite.json                     # Ignite project configuration`} />
    
    <h3>Build for Production</h3>
    <CodeBlock code={`ignite build --android\nignite build --ios`} />
    
    <h3>Your First .ignite File</h3>
    <p>Edit app/(tabs)/Home/index.ignite:</p>
    <CodeBlock code={`import { LinearGradient } from 'expo-linear-gradient'

screen title="Home" isTabScreen="true" tabOrder="1" tabIcon="home"

state count=0
state message="Hello World"

handleIncrement() {
  setCount(count + 1)
}

<View style="container">
  <LinearGradient colors={['#ff6b6b', '#4ecdc4']} style="gradient">
    <Text style="title">{message}</Text>
    <Text style="counter">Count: {count}</Text>
    <Button onPress="handleIncrement()">Increment</Button>
  </LinearGradient>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  counter: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});`} />
  <p>Changes are automatically compiled and hot-reloaded in your Expo app!</p>
  </div>
);

const cliContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>CLI Commands</h3>
    <p>Ignite provides a powerful command-line interface built with Commander.js for creating, developing, and building your applications.</p>
    
    <h4>Core Commands</h4>
    <table className="table-auto w-full text-left mb-6 border-collapse">
      <thead>
        <tr className="border-b border-ignite-darkred/20">
          <th className="pr-4 pb-2 text-ignite-orange">Command</th>
          <th className="pr-4 pb-2 text-ignite-orange">Description</th>
          <th className="pb-2 text-ignite-orange">Usage</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-ignite-darkred/10">
          <td className="pr-4 py-2"><code>ignite create &lt;name&gt;</code></td>
          <td className="pr-4 py-2">Create a new Ignite app with Expo setup</td>
          <td className="py-2"><code>ignite create my-app</code></td>
        </tr>
        <tr className="border-b border-ignite-darkred/10">
          <td className="pr-4 py-2"><code>ignite dev</code></td>
          <td className="pr-4 py-2">Start development server with compilation</td>
          <td className="py-2"><code>ignite dev</code></td>
        </tr>
        <tr className="border-b border-ignite-darkred/10">
          <td className="pr-4 py-2"><code>ignite dev --android</code></td>
          <td className="pr-4 py-2">Start development server for Android</td>
          <td className="py-2"><code>ignite dev -a</code></td>
        </tr>
        <tr className="border-b border-ignite-darkred/10">
          <td className="pr-4 py-2"><code>ignite dev --ios</code></td>
          <td className="pr-4 py-2">Start development server for iOS</td>
          <td className="py-2"><code>ignite dev -i</code></td>
        </tr>
        <tr className="border-b border-ignite-darkred/10">
          <td className="pr-4 py-2"><code>ignite build</code></td>
          <td className="pr-4 py-2">Build app for production</td>
          <td className="py-2"><code>ignite build</code></td>
        </tr>
        <tr className="border-b border-ignite-darkred/10">
          <td className="pr-4 py-2"><code>ignite build --android</code></td>
          <td className="pr-4 py-2">Build for Android platform</td>
          <td className="py-2"><code>ignite build -a</code></td>
        </tr>
        <tr className="border-b border-ignite-darkred/10">
          <td className="pr-4 py-2"><code>ignite build --ios</code></td>
          <td className="pr-4 py-2">Build for iOS platform</td>
          <td className="py-2"><code>ignite build -i</code></td>
        </tr>
        <tr className="border-b border-ignite-darkred/10">
          <td className="pr-4 py-2"><code>ignite -v</code></td>
          <td className="pr-4 py-2">Show version information</td>
          <td className="py-2"><code>ignite v</code></td>
        </tr>
      </tbody>
    </table>
    
    <h4>What Happens During ignite create</h4>
    <ol className="space-y-2 mb-4">
      <li><strong>Project Setup:</strong> Creates Expo project with TypeScript support</li>
      <li><strong>Directory Structure:</strong> Sets up app/(tabs) directory structure</li>
      <li><strong>Dependencies:</strong> Installs Expo, React Navigation, React Native Gesture Handler, and more</li>
      <li><strong>Assets Download:</strong> Downloads app icon, splash screen, and adaptive icon from Cloudinary</li>
      <li><strong>Screen Files:</strong> Downloads sample Home, About, and Developers .ignite files</li>
      <li><strong>Configuration:</strong> Sets up babel.config.js, app.config.js, and ignite.json</li>
      <li><strong>Main App:</strong> Creates App.js with NavigationContainer and Router</li>
    </ol>
    
    <h4>What Happens During ignite dev</h4>
    <ol className="space-y-2 mb-4">
      <li><strong>Project Validation:</strong> Checks for ignite.json and app/ directory</li>
      <li><strong>Initial Compilation:</strong> Compiles all .ignite files to React Native components</li>
      <li><strong>File Watcher:</strong> Starts watching for changes in .ignite files</li>
      <li><strong>Router Generation:</strong> Creates navigation configuration based on file structure</li>
      <li><strong>Expo Server:</strong> Launches Expo development server</li>
      <li><strong>Platform Launch:</strong> Optionally launches Android/iOS app</li>
    </ol>
    
    <h4>Development Workflow</h4>
    <ol className="space-y-2 mb-4">
      <li><strong>Edit .ignite files</strong> in your app/ directory</li>
      <li><strong>File watcher detects changes</strong> and triggers recompilation</li>
      <li><strong>Generated components</strong> are saved to .ignite/ directory</li>
      <li><strong>Expo hot reloads</strong> your app with changes</li>
      <li><strong>See results instantly</strong> on your device/simulator</li>
    </ol>
    
    <h4>Troubleshooting CLI Issues</h4>
    <ul className="space-y-2 mb-4">
      <li><strong>"This is not an Ignite project":</strong> Ensure you're in a directory with ignite.json</li>
      <li><strong>"App directory not found":</strong> Create an app/ directory with .ignite files</li>
      <li><strong>"Failed to install dependencies":</strong> Run npm install manually</li>
      <li><strong>Build failures:</strong> Check Expo configuration and platform setup</li>
      <li><strong>Permission errors:</strong> May need to run with sudo (not recommended) or fix npm permissions</li>
    </ul>
  </div>
);

const projectStructureContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Project Structure</h3>
    <p>When you create a new Ignite project, you get a complete Expo/React Native structure with automatic setup:</p>
    
    <h4>Complete Project Layout</h4>
    <CodeBlock code={`my-app/
├── app/                            # Source .ignite files
│   └── (tabs)/                     # Tab navigation screens
│       ├── Home/
│       │   └── index.ignite        # Home screen definition
│       ├── About/
│       │   └── index.ignite        # About screen definition
│       └── Developers/
│           └── index.ignite        # Developers screen definition
├── assets/                         # App assets (downloaded from Cloudinary)
│   ├── icon.png                    # App icon (512x512)
│   ├── adaptive-icon.png           # Android adaptive icon
│   └── splash.png                  # Splash screen image
├── .ignite/                        # Generated React Native components
│   ├── screens/
│   │   ├── (tabs)/
│   │   │   ├── Home/
│   │   │   │   └── HomeIndex.js    # Generated Home component
│   │   │   ├── About/
│   │   │   │   └── AboutIndex.js   # Generated About component
│   │   │   └── Developers/
│   │   │       └── DevelopersIndex.js  # Generated Developers component
│   │   └── router.js               # Generated navigation config
├── node_modules/                   # Dependencies
├── App.js                          # Main app entry point
├── app.config.js                   # Expo configuration
├── babel.config.js                 # Babel transpilation config
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Locked dependency versions
└── ignite.json                     # Ignite project configuration`} />
    
    <h4>Key Directories Explained</h4>
    <ul className="space-y-2 mb-4">
      <li><strong>app/:</strong> Your source .ignite files with declarative syntax</li>
      <li><strong>app/(tabs)/:</strong> Tab navigation screens (automatically detected)</li>
      <li><strong>assets/:</strong> Images, icons, and other static resources</li>
      <li><strong>.ignite/:</strong> Generated React Native components (auto-generated, don't edit)</li>
      <li><strong>.ignite/screens/:</strong> Compiled React Native components from your .ignite files</li>
      <li><strong>.ignite/router.js:</strong> Auto-generated navigation configuration</li>
    </ul>
    
    <h4>Generated package.json</h4>
    <p>Each Ignite project includes these dependencies:</p>
    <CodeBlock code={`{
  "dependencies": {
    "expo": "^53.0.0",
    "expo-status-bar": "~2.2.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "^0.79.0",
    "react-native-gesture-handler": "~2.24.0",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "~4.11.1",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@expo/vector-icons": "^14.0.2"
  },
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}`} />
    
    <h4>File Structure Conventions</h4>
    <ul className="space-y-2 mb-4">
      <li><strong>index.ignite:</strong> Main screen files in each directory</li>
      <li><strong>(tabs) folder:</strong> Indicates tab navigation screens</li>
      <li><strong>Component naming:</strong> Generated components follow PascalCase (HomeIndex, AboutIndex, etc.)</li>
      <li><strong>Route generation:</strong> Navigation routes are auto-generated from file structure</li>
      <li><strong>Tab ordering:</strong> Use tabOrder property to control tab sequence</li>
    </ul>
    
    <h4>ignite.json Configuration</h4>
    <CodeBlock code={`{
  "name": "my-app",
  "version": "1.0.0",
  "type": "ignite-app"
}`} />
    
    <h4>Directory Structure Best Practices</h4>
    <ul className="space-y-2 mb-4">
      <li><strong>Keep .ignite files organized:</strong> Use descriptive folder names</li>
      <li><strong>Tab screens:</strong> Place in (tabs) folder for automatic tab navigation</li>
      <li><strong>Stack screens:</strong> Place outside (tabs) for stack navigation</li>
      <li><strong>Don't edit .ignite/ folder:</strong> It's auto-generated and will be overwritten</li>
      <li><strong>Assets organization:</strong> Keep images and icons in assets/ folder</li>
    </ul>
  </div>
);

const usageContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Writing .ignite Files</h3>
    <p>Ignite uses a custom DSL (Domain Specific Language) that compiles to React Native components. Here's how to write effective .ignite files:</p>
    
    <h4>Basic .ignite File Structure</h4>
    <CodeBlock code={`import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'

screen title="Home" isTabScreen="true" tabOrder="1" tabIcon="home"

state user=null
state loading=false
state count=0

async handleLogin() {
  setLoading(true)
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password)
    setUser(result.user)
    go('/profile')
  } catch (error) {
    console.log('Login failed:', error)
  }
  setLoading(false)
}

handleIncrement() {
  setCount(count + 1)
}

<View style="container">
  <LinearGradient colors={['#ff6b6b', '#4ecdc4']} style="gradient">
    <Text style="title">Welcome {user?.name || 'Guest'}</Text>
    <Text style="counter">Count: {count}</Text>
    <Button onPress="handleIncrement()">Increment</Button>
    <Button onPress="handleLogin()" disabled={loading}>
      {loading ? 'Loading...' : 'Login'}
    </Button>
  </LinearGradient>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  counter: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});`} />
    
    <h4>Import Statements</h4>
    <p>Ignite supports flexible import patterns:</p>
    <CodeBlock code={`// Default imports
import React from 'react'
import firebase from 'firebase'

// Named imports
import { View, Text, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

// Namespace imports
import * as Three from 'three'

// Simple imports (converted to default)
firebase
expo-linear-gradient`} />
    
    <h4>Screen Declaration</h4>
    <p>Configure screen properties:</p>
    <CodeBlock code={`screen title="Home" isTabScreen="true" tabOrder="1" tabIcon="home" headerShown="true"`} />
    <ul className="space-y-1 mb-4">
      <li><strong>title:</strong> Screen title for navigation</li>
      <li><strong>isTabScreen:</strong> Boolean indicating tab navigation</li>
      <li><strong>tabOrder:</strong> Order in tab bar (1, 2, 3, etc.)</li>
      <li><strong>tabIcon:</strong> Icon name for tab bar</li>
      <li><strong>headerShown:</strong> Whether to show navigation header</li>
    </ul>
    
    <h4>State Management</h4>
    <p>Declare state with automatic type inference:</p>
    <CodeBlock code={`state user=null          // object type
state loading=false      // boolean type
state count=0            // number type
state name=""            // string type
state items=[]           // array type
state config={}          // object type`} />
    
    <h4>Function Declaration</h4>
    <p>Write functions with async support:</p>
    <CodeBlock code={`// Regular function
handleIncrement() {
  setCount(count + 1)
}

// Async function
async handleLogin() {
  setLoading(true)
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password)
    setUser(result.user)
  } catch (error) {
    console.log('Error:', error)
  }
  setLoading(false)
}

// Navigation function
goToProfile() {
  go('/profile')
}`} />
    
    <h4>Component Usage</h4>
    <p>Use familiar React Native components with enhanced syntax:</p>
    <CodeBlock code={`<View style="container">
  <Text style="title">{user?.name || 'Guest'}</Text>
  <Input 
    bind="email" 
    placeholder="Email" 
    keyboardType="email-address"
  />
  <Button 
    onPress="handleLogin()" 
    disabled={loading}
  >
    {loading ? 'Loading...' : 'Login'}
  </Button>
</View>`} />
    
    <h4>Styling</h4>
    <p>Include StyleSheet definitions:</p>
    <CodeBlock code={`const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});`} />
    
    <h4>Development Workflow</h4>
    <ol className="space-y-2 mb-4">
      <li><strong>Edit .ignite files</strong> in your app/ directory</li>
      <li><strong>Save changes</strong> - file watcher detects modifications</li>
      <li><strong>Automatic compilation</strong> generates React Native components</li>
      <li><strong>Hot reload</strong> updates your app instantly</li>
      <li><strong>See results</strong> on device/simulator in real-time</li>
    </ol>
  </div>
);

const featuresContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Core Features</h3>
    <p>Ignite provides a comprehensive set of features for simplified cross-platform mobile development:</p>
    
    <h4>🔥 Declarative .ignite Syntax</h4>
    <ul className="space-y-1 mb-4">
      <li>XML-like component definitions with familiar React Native elements</li>
      <li>Custom DSL that compiles to optimized React Native components</li>
      <li>Support for complex JSX expressions in curly braces</li>
      <li>Automatic component mapping (Button → TouchableOpacity, Input → TextInput)</li>
    </ul>
    
    <h4>🚀 Automatic State Management</h4>
    <ul className="space-y-1 mb-4">
      <li>Smart state inference from initial values</li>
      <li>Automatic useState hook generation with proper TypeScript types</li>
      <li>Support for all JavaScript types: string, number, boolean, object, array</li>
      <li>Automatic setter function generation (setUser, setLoading, etc.)</li>
    </ul>
    
    <h4>🧭 Built-in Navigation</h4>
    <ul className="space-y-1 mb-4">
      <li>Automatic React Navigation setup with NavigationContainer</li>
      <li>Tab navigation support with tabOrder and tabIcon properties</li>
      <li>Stack navigation for non-tab screens</li>
      <li>Route generation based on file structure and directory names</li>
      <li>Navigation functions like go('/path') for easy screen transitions</li>
    </ul>
    
    <h4>📦 Package Integration</h4>
    <ul className="space-y-1 mb-4">
      <li>Flexible import system supporting default, named, and namespace imports</li>
      <li>Seamless integration with Firebase, Expo, and third-party packages</li>
      <li>Simple package name imports automatically converted to default imports</li>
      <li>Support for complex packages like Three.js, React Native community packages</li>
    </ul>
    
    <h4>⚡ Development Experience</h4>
    <ul className="space-y-1 mb-4">
      <li>Hot reloading with file watching for instant feedback</li>
      <li>Real-time compilation during development</li>
      <li>Comprehensive error handling and validation</li>
      <li>Generated code cleanup and optimization</li>
      <li>TypeScript support throughout the compilation pipeline</li>
    </ul>
    
    <h4>🛠️ CLI Tools</h4>
    <ul className="space-y-1 mb-4">
      <li>Powerful command-line interface built with Commander.js</li>
      <li>Project scaffolding with complete Expo setup</li>
      <li>Asset management with Cloudinary integration</li>
      <li>Platform-specific development and building</li>
      <li>Version management and project validation</li>
    </ul>
    
    <h4>📱 Cross-Platform Support</h4>
    <ul className="space-y-1 mb-4">
      <li>iOS and Android support through Expo</li>
      <li>Web support with Expo Web</li>
      <li>Platform-specific optimizations</li>
      <li>Consistent UI across all platforms</li>
    </ul>
    
    <h4>🎨 Styling & Assets</h4>
    <ul className="space-y-1 mb-4">
      <li>StyleSheet.create integration with automatic imports</li>
      <li>Asset management with automatic downloading</li>
      <li>Support for app icons, splash screens, and adaptive icons</li>
      <li>Flexible styling with inline styles and stylesheet references</li>
    </ul>
  </div>
);

const componentsContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Component Mapping</h3>
    <p>Ignite maps your declarative components to React Native/Expo components. Example:</p>
    <CodeBlock code={`const COMPONENT_MAP = {
  View: 'View',
  Text: 'Text',
  Button: 'TouchableOpacity',
  Input: 'TextInput',
  // ...more
}`} />
    <ul className="space-y-2 mb-4">
      <li className="pb-2"><b>Button</b> → <code>TouchableOpacity</code></li>
      <li className="pb-2"><b>Input</b> → <code>TextInput</code></li>
      <li className="pb-2">Supports any npm or custom component</li>
    </ul>
  </div>
);

const stateManagementContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Automatic State Management</h3>
    <p>State is declared at the top of your <code>.ignite</code> file and automatically inferred:</p>
    <CodeBlock code={`state user=null
state loading=false
state count=0`} />
    <p>Generates:</p>
    <CodeBlock code={`const [user, setUser] = useState(null)
const [loading, setLoading] = useState(false)
const [count, setCount] = useState(0)`} />
    <ul className="space-y-2 mb-4">
      <li className="pb-2">Type inference for string, number, boolean, object, array</li>
      <li className="pb-2">Smart defaults for common UI patterns</li>
    </ul>
  </div>
);

const navigationContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Navigation</h3>
    <p>Ignite generates navigation automatically from your <code>.ignite</code> files:</p>
    <CodeBlock code={`screen title="Home" isTabScreen="true" tabOrder="1" tabIcon="home"`} />
    <ul className="space-y-2 mb-4">
      <li className="pb-2">Tab and stack navigation supported</li>
      <li className="pb-2">Custom tab icons and ordering</li>
      <li className="pb-2">Screen options: titles, header visibility, etc.</li>
    </ul>
    <p>Navigation actions:</p>
    <CodeBlock code={`onPress="go('/settings')" // → navigation.navigate('SettingsIndex')`} />
  </div>
);

const advancedContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Advanced</h3>
    <ul className="space-y-2 mb-4">
  <li className="pb-2"><b>Flexible Imports:</b> Any npm package, default/named/namespace imports</li>
  <li className="pb-2"><b>Custom Functions:</b> Async and regular functions in <code>.ignite</code></li>
  <li className="pb-2"><b>Complex Expressions:</b> Full JSX support in curly braces</li>
  <li className="pb-2"><b>File System Management:</b> Maintains directory structure, cleans up old files</li>
  <li className="pb-2"><b>Error Handling:</b> Comprehensive error messages and validation</li>
</ul>
    <CodeBlock code={`import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'
import * as Three from 'three'`} />
  </div>
);

const troubleshootingContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Troubleshooting</h3>
    <ul className="space-y-2 mb-4">
  <li className="pb-2"><b>"This is not an Ignite project"</b>: Check for <code>ignite.json</code> in project root.</li>
  <li className="pb-2"><b>"App directory not found"</b>: Ensure <code>app/</code> exists with <code>.ignite</code> files.</li>
  <li className="pb-2"><b>Build failures</b>: Check EAS Build config, Expo account, and dependencies.</li>
  <li className="pb-2">See generated files in <code>.ignite/</code> for debugging.</li>
  <li className="pb-2">Review Expo docs for platform-specific issues.</li>
  <li className="pb-2">Ensure all dependencies are installed with <CodeBlock code={`npm install`} /></li>
</ul>
  </div>
);

export default function DocsPage() {
  const [currentSection, setCurrentSection] = useState('getting-started');
  const [examplesMarkdown, setExamplesMarkdown] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const offsets: { id: string; top: number }[] = docSections.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.getBoundingClientRect().top } : null;
      }).filter((o): o is { id: string; top: number } => Boolean(o));
      let activeId = currentSection;
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (offsets[i].top < 120) {
          activeId = offsets[i].id;
          break;
        }
      }
      if (activeId !== currentSection) setCurrentSection(activeId);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  useEffect(() => {
    fetch('/igniteexamples.md')
      .then((response) => response.text())
      .then((text) => setExamplesMarkdown(text));
  }, []);

  // Split markdown into sections at each '## N.' heading
  const exampleSections = React.useMemo(() => {
    if (!examplesMarkdown) return [];
    const parts = examplesMarkdown.split(/\n(?=## \d+\.)/g);
    // The first part is the intro, keep it if not empty
    return parts.filter(Boolean);
  }, [examplesMarkdown]);

  // Helper to get preview (first 5 lines or 300 chars)
  function getPreview(md: string) {
    const lines = md.split('\n');
    return lines.slice(0, 5).join('\n') + (lines.length > 5 ? '\n...' : '');
  }

  // Modal component
  function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-ignite-charcoal rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative p-6">
          <button onClick={onClose} className="absolute top-2 right-2 text-ignite-orange text-2xl font-bold hover:text-ignite-yellow">×</button>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ignite-charcoal">
      <NavBar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto pt-28 pb-20 px-4 sm:px-6 lg:px-8 md:gap-8">
        <DocsSidebar currentSection={currentSection} />
        <main className="flex-1 min-w-0 mt-8 md:mt-0">
          {docSections.map(({ id, title }) => (
            <motion.section
              key={id}
              id={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">{title}</h2>
              <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg md:text-xl space-y-4 md:space-y-6">
                {id === 'getting-started' && gettingStartedContent}
                {id === 'cli' && cliContent}
                {id === 'project-structure' && projectStructureContent}
                {id === 'usage' && usageContent}
                {id === 'features' && featuresContent}
                {id === 'components' && componentsContent}
                {id === 'state-management' && stateManagementContent}
                {id === 'navigation' && navigationContent}
                {id === 'advanced' && advancedContent}
                {id === 'examples' && (
                  <div className="space-y-8">
                    {/* Render intro/title section as normal markdown, not as a preview/modal */}
                    {exampleSections[0] && !exampleSections[0].trim().startsWith('##') && (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {exampleSections[0]}
                      </ReactMarkdown>
                    )}
                    {/* Only show preview/modal for sections that start with '##' */}
                    {exampleSections.map((section, idx) => (
                      section.trim().startsWith('##') && (
                        <div key={idx} className="relative bg-ignite-charcoal/80 border border-ignite-darkred/20 rounded-lg p-6 shadow-md">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                              code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {getPreview(section)}
                          </ReactMarkdown>
                          <button
                            className="absolute left-1/2 -translate-x-1/2 bottom-2 flex flex-col items-center group text-ignite-orange hover:text-ignite-yellow text-2xl font-bold focus:outline-none"
                            onClick={() => { setModalContent(section); setModalOpen(true); }}
                            title="Read more"
                          >
                            <span className="animate-bounce">↓</span>
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-7 mb-2 px-2 py-1 rounded bg-ignite-charcoal text-xs text-ignite-offwhite opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-10">
                              Read more
                            </span>
                          </button>
                        </div>
                      )
                    ))}
                    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {modalContent}
                      </ReactMarkdown>
                    </Modal>
                  </div>
                )}
                {id === 'troubleshooting' && troubleshootingContent}
              </div>
            </motion.section>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
} 