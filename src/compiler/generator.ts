import { ParsedIgniteFile, IgniteNode, ImportDeclaration } from './parser';
import { COMPONENT_MAP } from './components';
import { join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';

function generateImports(imports: ImportDeclaration[]): string {
  const importLines: string[] = [];
  
  for (const imp of imports) {
    switch (imp.type) {
      case 'default':
        importLines.push(`import ${imp.imports[0]} from '${imp.from}';`);
        break;
      case 'named':
        importLines.push(`import { ${imp.imports.join(', ')} } from '${imp.from}';`);
        break;
      case 'namespace':
        importLines.push(`import * as ${imp.alias} from '${imp.from}';`);
        break;
    }
  }
  
  return importLines.join('\n');
}

function generateStates(states: Array<{ name: string; initialValue: any; type?: string }>): string {
  return states.map(state => {
    let initialValue = state.initialValue;
    
    // Convert the initial value to proper JavaScript representation
    if (state.type === 'string' && typeof initialValue === 'string') {
      initialValue = `'${initialValue}'`;
    } else if (state.type === 'object') {
      initialValue = JSON.stringify(initialValue);
    } else if (state.type === 'array') {
      initialValue = JSON.stringify(initialValue);
    }
    
    const setterName = `set${state.name.charAt(0).toUpperCase() + state.name.slice(1)}`;
    return `  const [${state.name}, ${setterName}] = useState(${initialValue});`;
  }).join('\n');
}

function generateFunctions(functions: Array<{ name: string; isAsync: boolean; body: string }>): string {
  return functions.map(func => {
    const asyncKeyword = func.isAsync ? 'async ' : '';
    return `  const ${func.name} = ${asyncKeyword}() => {\n    ${func.body.split('\n').join('\n    ')}\n  };`;
  }).join('\n\n');
}

function generateComponent(node: IgniteNode, indent: number = 0, allRoutes: any[] = []): string {
  const spaces = '  '.repeat(indent);
  
  if (node.type === 'text') {
    return `${spaces}${node.text || ''}`;
  }

  // Check if it's a known React Native component or a custom/imported component
  const componentName = COMPONENT_MAP[node.type] || node.type;
  const props: string[] = [];
  
  // Handle props
  for (const [key, value] of Object.entries(node.props)) {
    if (key === 'onPress' && value && typeof value === 'object' && 'type' in value && value.type === 'navigation' && 'value' in value) {
      const navPath = value.value as string;
      const cleanPath = navPath.startsWith('/') ? navPath.slice(1) : navPath;
      const targetRoute = allRoutes.find(r => r.path === cleanPath);
      const targetComponentName = targetRoute ? `${targetRoute.component}Index` : `${cleanPath}Index`;

      props.push(`onPress={() => navigation.navigate('${targetComponentName}')}`);
    } else if (key === 'onPress' && typeof value === 'string') {
      // Handle function calls - check if it includes parentheses
      if (value.includes('(') && value.includes(')')) {
        props.push(`onPress={() => ${value}}`);
      } else {
        props.push(`onPress={${value}}`);
      }
    } else if (key === 'bind' && value && typeof value === 'object' && 'type' in value && value.type === 'state' && 'value' in value) {
      const stateValue = value.value as string;
      const setterName = `set${stateValue.charAt(0).toUpperCase() + stateValue.slice(1)}`;

      if (node.type === 'Switch' || componentName === 'Switch') {
        if (stateValue === 'theme') {
          props.push(`value={${stateValue} === 'dark'}`);
          props.push(`onValueChange={(newValue) => ${setterName}(newValue ? 'dark' : 'light')}`);
        } else {
          props.push(`value={${stateValue}}`);
          props.push(`onValueChange={(newValue) => ${setterName}(newValue)}`);
        }
      } else if (node.type === 'Input' || componentName === 'TextInput') {
        props.push(`value={${stateValue}}`);
        props.push(`onChangeText={(text) => ${setterName}(text)}`);
      } else {
        // For custom components, just pass the value and onChange
        props.push(`value={${stateValue}}`);
        props.push(`onChange={(newValue) => ${setterName}(newValue)}`);
      }
    } else if (key === 'source' && (node.type === 'Image' || componentName === 'Image')) {
      if (typeof value === 'string') {
        if (value.startsWith('http://') || value.startsWith('https://')) {
          props.push(`source={{uri: '${value}'}}`);
        } else {
          props.push(`source={require('${value}')}`);
        }
      }
    } else if (key === 'style') {
      if (typeof value === 'string') {
        let styleValue = value.trim();
        
        if ((styleValue.startsWith('"') && styleValue.endsWith('"')) || 
            (styleValue.startsWith("'") && styleValue.endsWith("'"))) {
          styleValue = styleValue.slice(1, -1);
        }
        
        if (!styleValue.startsWith('styles.') && !styleValue.includes('{') && !styleValue.includes('[')) {
          styleValue = `styles.${styleValue}`;
        }
        
        props.push(`style={${styleValue}}`);
      }
    } else if (typeof value === 'object' && 'type' in value && value.type === 'expression') {
      // Handle JSX expressions from curly braces
      props.push(`${key}={${value.value}}`);
    } else if (key === 'placeholder' && typeof value === 'string') {
      props.push(`placeholder="${value}"`);
    } else if (key === 'secureTextEntry' && (value === true || value === 'true')) {
      props.push(`secureTextEntry={true}`);
    } else if (key === 'keyboardType' && typeof value === 'string') {
      props.push(`keyboardType="${value}"`);
    } else if (key === 'multiline' && (value === true || value === 'true')) {
      props.push(`multiline={true}`);
    } else if (key === 'maxLength' && typeof value === 'number') {
      props.push(`maxLength={${value}}`);
    } else if (key === 'editable' && typeof value === 'boolean') {
      props.push(`editable={${value}}`);
    } else if (key === 'autoCapitalize' && typeof value === 'string') {
      props.push(`autoCapitalize="${value}"`);
    } else if (key === 'autoCorrect' && typeof value === 'boolean') {
      props.push(`autoCorrect={${value}}`);
    } else if (key === 'disabled' && typeof value === 'boolean') {
      props.push(`disabled={${value}}`);
    } else if (key === 'loading' && typeof value === 'boolean') {
      props.push(`loading={${value}}`);
    } else if (key === 'data' && typeof value === 'string') {
      // For FlatList or custom list components
      props.push(`data={${value}}`);
    } else if (key === 'renderItem' && typeof value === 'string') {
      props.push(`renderItem={${value}}`);
    } else if (key === 'keyExtractor' && typeof value === 'string') {
      props.push(`keyExtractor={${value}}`);
    } else if (key === 'onRefresh' && typeof value === 'string') {
      props.push(`onRefresh={${value}}`);
    } else if (key === 'refreshing' && typeof value === 'string') {
      props.push(`refreshing={${value}}`);
    } else if (key === 'onEndReached' && typeof value === 'string') {
      props.push(`onEndReached={${value}}`);
    } else if (typeof value === 'string' && key !== 'bind' && key !== 'source') {
      // Handle other string props - check if they should be treated as expressions
      if (value.startsWith('{') && value.endsWith('}')) {
        props.push(`${key}=${value}`);
      } else {
        props.push(`${key}="${value}"`);
      }
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      props.push(`${key}={${value}}`);
    }
  }

  const propsString = props.length ? ' ' + props.join(' ') : '';
  
  // Handle self-closing components
  if (node.children.length === 0 && !node.text) {
    return `${spaces}<${componentName}${propsString} />`;
  }

  // Handle different component types
  if (node.type === 'Button' || (COMPONENT_MAP[node.type] === 'TouchableOpacity' && node.type === 'Button')) {
    const buttonContent = node.children
      .map((child: IgniteNode) => {
        if (child.type === 'text') {
          return `${spaces}  <Text style={styles.buttonText}>${child.text}</Text>`;
        }
        return generateComponent(child, indent + 1, allRoutes);
      })
      .join('\n');
    
    return `${spaces}<${componentName}${propsString}>\n${buttonContent}\n${spaces}</${componentName}>`;
  } else if (node.type === 'Text' || componentName === 'Text') {
    if (node.text) {
      return `${spaces}<${componentName}${propsString}>${node.text}</${componentName}>`;
    } else if (node.children.length > 0) {
      const textContent = node.children
        .filter(child => child.type === 'text')
        .map(child => child.text)
        .join('');
      
      if (textContent) {
        return `${spaces}<${componentName}${propsString}>${textContent}</${componentName}>`;
      }
      
      // Handle nested components within Text
      const nestedContent = node.children
        .map((child: IgniteNode) => generateComponent(child, indent + 1, allRoutes))
        .filter(content => content.trim())
        .join('\n');
      
      return `${spaces}<${componentName}${propsString}>\n${nestedContent}\n${spaces}</${componentName}>`;
    } else {
      return `${spaces}<${componentName}${propsString} />`;
    }
  } else {
    const childrenContent = node.children
      .map((child: IgniteNode) => generateComponent(child, indent + 1, allRoutes))
      .filter(content => content.trim())
      .join('\n');

    if (!childrenContent.trim()) {
      return `${spaces}<${componentName}${propsString} />`;
    }

    return `${spaces}<${componentName}${propsString}>\n${childrenContent}\n${spaces}</${componentName}>`;
  }
}

export function generateReactNativeCode(parsed: ParsedIgniteFile, outputPath: string, outputFileName: string, allRoutes: any[]): void {
  // Generate import statements
  const customImports = generateImports(parsed.imports);
  
  // Default React Native imports
  const defaultImports = [
    "import React, { useState, useEffect } from 'react';",
    "import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Switch, FlatList, StyleSheet } from 'react-native';",
    "import { useNavigation } from '@react-navigation/native';"
  ];

  // Combine default and custom imports
  const allImports = [
    ...defaultImports,
    ...(customImports ? [customImports] : [])
  ].join('\n');

  // Generate state declarations
  const stateDeclarations = generateStates(parsed.states);

  // Generate functions
  const functionDeclarations = generateFunctions(parsed.functions);

  // Check if any custom functions are used that might need additional imports
  const codeString = JSON.stringify(parsed.nodes);
  const needsLinking = codeString.includes('Linking.') || codeString.includes('openURL');

  // Use the preserved stylesheet or create a default one
  const stylesheetCode = parsed.rawStylesheet || parsed.styles || "const styles = StyleSheet.create({});";

  const componentCode = [
    allImports,
    "",
    "export default function Screen() {",
    "  const navigation = useNavigation();",
    stateDeclarations,
    "",
    ...(functionDeclarations ? [functionDeclarations, ""] : []),
    "  return (",
    parsed.nodes.map(node => generateComponent(node, 2, allRoutes)).join('\n'),
    "  );",
    "}",
    "",
    stylesheetCode
  ];

  const fullCode = componentCode.join('\n');
  
  mkdirSync(outputPath, { recursive: true });
  writeFileSync(join(outputPath, `${outputFileName}.js`), fullCode);
}