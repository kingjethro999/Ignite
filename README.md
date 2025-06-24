# Ignite - A Custom React Native DSL Framework

## About the Project

Ignite is a domain-specific language (DSL) and compiler framework designed to simplify React Native development by providing a more declarative, XML-like syntax for building mobile applications. It transforms custom `.ignite` files into standard React Native components, complete with navigation, state management, and styling.

## What Inspired This Project

The inspiration for Ignite came from the complexity of setting up and maintaining React Native applications, especially for developers who prefer a more declarative approach similar to HTML/XML. Traditional React Native development requires extensive boilerplate code for navigation setup, state management, and component structure. Ignite aims to bridge this gap by providing:

- **Simplified Syntax**: Write UI components using familiar XML-like tags
- **Automatic State Management**: Built-in state binding without manual useState setup
- **Seamless Navigation**: Simple navigation declarations that generate proper React Navigation code
- **Convention over Configuration**: Sensible defaults for common patterns
- **Flexible Package Support**: Use any npm package or custom component seamlessly

## How I Built the Project

The Ignite framework consists of four main components:

### 1. **Parser (`parser.ts`)**
The parser is the heart of the system, responsible for:
- Converting `.ignite` files into an Abstract Syntax Tree (AST)
- Extracting screen metadata (titles, navigation options, tab configurations)
- Parsing import statements (default, named, namespace imports)
- Handling state declarations with type inference
- Preserving stylesheets and handling component hierarchy
- Supporting complex prop parsing including state bindings and navigation actions

```typescript
// Example of parsing imports and custom components
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'

state user=null
state loading=false

<LinearGradient colors={['#ff6b6b', '#4ecdc4']} style="gradient">
  <Text>Hello World</Text>
</LinearGradient>
```

### 2. **Generator (`generator.ts`)**
The generator transforms parsed AST into valid React Native code:
- Maps custom components to React Native equivalents (`Button` → `TouchableOpacity`)
- Generates automatic state management with proper TypeScript types
- Handles complex prop transformations (style references, navigation bindings)
- Creates complete functional components with hooks and imports
- Supports any npm package or custom component

### 3. **Router System (`router.ts`)**
Automatically generates navigation configuration:
- Creates tab navigators for screens marked as tab screens
- Builds stack navigators for modal and push screens
- Handles screen options like titles and header visibility
- Supports custom tab icons and ordering

### 4. **Compiler (`index.ts`)**
The main orchestrator that:
- Discovers all `.ignite` files in the project
- Manages the compilation pipeline
- Handles file system operations and directory structure
- Coordinates between parser, generator, and router

## What I Learned

Building Ignite taught me several valuable lessons:

### **Language Design Complexity**
Creating a DSL involves careful consideration of syntax choices. I learned that:
- Familiar syntax (XML-like) reduces the learning curve
- Implicit behaviors (automatic state generation) can be powerful but need clear documentation
- Error handling and debugging become crucial when abstracting away complexity

### **AST Manipulation and Code Generation**
Working with Abstract Syntax Trees deepened my understanding of:
- How to preserve source code structure while transforming it
- The importance of maintaining proper indentation and formatting in generated code
- Balancing flexibility with opinionated defaults

### **React Native Architecture**
The project required deep knowledge of:
- React Navigation patterns and best practices
- State management patterns in functional components
- Component mapping and prop transformation strategies
- File system organization for React Native projects

### **Toolchain Integration**
Building a compiler taught me about:
- File watching and incremental compilation
- Managing output directories and build artifacts
- Integration with existing React Native development workflows

## Challenges I Faced

### **Complex Prop Parsing**
One of the biggest challenges was handling the variety of prop types and formats:
- Boolean attributes (`multiline` vs `multiline="true"`)
- Style references (`style="container"` → `style={styles.container}`)
- Navigation bindings (`onPress="go('/path')"`)
- State bindings (`bind="username"`)
- Custom expressions (`{value}`, `{styles.container}`)

**Solution**: Implemented a character-by-character parser that handles quotes, braces, and different value types appropriately.

### **State Management Inference**
Automatically generating the right state types based on component usage:
- Switch components should generate boolean states
- Numeric inputs should generate number states
- Text inputs should generate string states
- Theme switches needed special handling

**Solution**: Created a type inference system that analyzes component types and prop combinations to determine appropriate state types.

### **Navigation Integration**
React Navigation has complex setup requirements that needed to be abstracted:
- Tab navigators vs stack navigators
- Screen options and configurations
- Deep linking and route parameters

**Solution**: Built a route analysis system that categorizes screens and generates appropriate navigator structures.

### **File System Management**
Managing the relationship between source `.ignite` files and generated React Native files:
- Maintaining directory structures
- Handling file dependencies
- Cleaning up old generated files

**Solution**: Implemented a systematic approach using the `.ignite` output directory and careful path mapping.

## Technical Innovations

### **Component Mapping System**
```typescript
const COMPONENT_MAP: Record<string, string> = {
  View: 'View',
  Text: 'Text',
  Button: 'TouchableOpacity', // Custom mapping
  Input: 'TextInput',
  // ... more mappings
};
```

### **Automatic State Generation**
```typescript
// From: <Input bind="username" />
// Generates: const [username, setUsername] = useState('');
```

### **Smart Navigation Handling**
```typescript
// From: onPress="go('/settings')"
// Generates: onPress={() => navigation.navigate('SettingsIndex')}
```

### **Flexible Import System**
```typescript
// Supports any npm package
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'
import * as Three from 'three'
```

## Version Comparison

| Feature | v0.1.0 | v0.2.0 |
|---------|--------|--------|
| **Basic Components** | ✅ View, Text, Button, Input | ✅ All v0.1.0 + Pressable, Modal, SafeAreaView |
| **State Management** | ✅ Basic state binding | ✅ Advanced state types (string, number, boolean, object, array) |
| **Navigation** | ✅ Basic tab/stack navigation | ✅ Enhanced navigation with custom options |
| **Styling** | ✅ StyleSheet integration | ✅ Advanced style expressions and references |
| **Import System** | ❌ Hardcoded imports only | ✅ **Flexible imports (default, named, namespace)** |
| **Custom Components** | ❌ Limited to predefined components | ✅ **Any component or npm package** |
| **Function Support** | ❌ No custom functions | ✅ **Async and regular functions** |
| **Package Support** | ❌ React Native only | ✅ **Any npm package (Firebase, Expo, etc.)** |
| **Expression Support** | ❌ Limited expressions | ✅ **Full JSX expression support** |
| **Type Safety** | ❌ Basic type inference | ✅ **Advanced type inference and validation** |
| **Error Handling** | ❌ Basic error messages | ✅ **Comprehensive error handling** |
| **Documentation** | ❌ Basic README | ✅ **Complete documentation with examples** |

## Installation

```bash
npm install ignite
```

## Usage

1. Create `.ignite` files in your app directory:

```xml
<!-- app/home/index.ignite -->
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'

screen title="Home" isTabScreen="true" tabOrder="1" tabIcon="home"

state user=null
state loading=false

async handleLogin() {
  const result = await firebase.auth().signInWithEmailAndPassword(email, password)
  setUser(result.user)
  go('/profile')
}

<View style="container">
  <LinearGradient colors={['#ff6b6b', '#4ecdc4']} style="gradient">
    <Text style="title">Welcome to Ignite</Text>
    <Input bind="username" placeholder="Enter username" />
    <Button onPress="handleLogin()">Login</Button>
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
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
  },
});
```

2. Compile your project:

```bash
npx ignite dev
```

3. The framework generates React Native components in the `.ignite` directory.

## Features

- **Declarative Syntax**: XML-like component definitions
- **Automatic State Management**: Smart state inference and generation
- **Built-in Navigation**: Simple navigation with automatic route generation
- **Style Integration**: Seamless stylesheet handling
- **Hot Reloading**: Real-time compilation during development
- **Advanced State Management**: Integration with Redux or Zustand
- **Tab Navigation**: Easy tab-based navigation setup
- **Type Safety**: Generated code with proper TypeScript support
- **Flexible Imports**: Support for any npm package (default, named, namespace imports)
- **Custom Components**: Use any React Native component or third-party library
- **Function Support**: Write async and regular functions directly in `.ignite` files
- **Expression Support**: Full JSX expression support with curly braces
- **Package Integration**: Seamless integration with Firebase, Expo, and other popular libraries

## Advanced Examples

### Firebase Integration
```xml
import firebase from 'firebase'

state user=null
state messages=[]

async loadMessages() {
  const snapshot = await firebase.firestore().collection('messages').get()
  setMessages(snapshot.docs.map(doc => doc.data()))
}

<List data={messages} renderItem="renderMessage" />
```

### Custom Components
```xml
import MyCustomButton from './components/MyCustomButton'

<MyCustomButton onPress="handlePress()" customProp="value">
  Click me
</MyCustomButton>
```

### Complex State Management
```xml
state user={}
state settings={darkMode: false, notifications: true}
state items=[]

async updateSettings(newSettings) {
  setSettings({...settings, ...newSettings})
  await AsyncStorage.setItem('settings', JSON.stringify(settings))
}
```

## Project Structure

```
your-project/
├── app/
│   ├── home/
│   │   └── index.ignite
│   ├── (tabs)/
│   │   ├── profile/
│   │   │   └── index.ignite
│   │   └── settings/
│   │       └── index.ignite
│   └── components/
│       └── MyCustomButton.ignite
└── .ignite/
    ├── screens/
    ├── router.js
    └── ...generated files
```

## Future Enhancements

The Ignite framework could be extended with:
- **TypeScript Support**: Generate TypeScript instead of JavaScript
- **Custom Component Libraries**: Support for third-party component mapping
- **Documentation Generation**: Auto-generated component documentation
- **Visual Editor**: Drag-and-drop interface for building `.ignite` files
- **Plugin System**: Extensible architecture for custom transformations

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Conclusion

Ignite represents a unique approach to React Native development that prioritizes developer experience and rapid prototyping. While it abstracts away some of the complexity of React Native, it maintains the power and flexibility needed for real-world applications. The project demonstrates how thoughtful language design can significantly improve developer productivity while maintaining the underlying platform's capabilities.

The framework successfully bridges the gap between simple declarative syntax and complex React Native applications, making mobile development more accessible to developers from web backgrounds while providing powerful features for experienced React Native developers.