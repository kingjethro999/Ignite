import { ParsedIgniteFile, IgniteNode } from './parser';
import { join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';

const COMPONENT_MAP: Record<string, string> = {
  View: 'View',
  Text: 'Text',
  Button: 'TouchableOpacity',
  Input: 'TextInput',
  Image: 'Image',
  Scroll: 'ScrollView',
  Stack: 'View',
  Switch: 'Switch',
  List: 'FlatList'
};

function generateComponent(node: IgniteNode, indent: number = 0, allRoutes: any[] = []): string {
  const spaces = '  '.repeat(indent);
  
  if (node.type === 'text') {
    return `${spaces}${node.text || ''}`;
  }

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
      // Handle any string onPress value - just wrap it in an arrow function
      props.push(`onPress={() => ${value}}`)
    } else if (key === 'bind' && value && typeof value === 'object' && 'type' in value && value.type === 'state' && 'value' in value) {
      const stateValue = value.value as string;
      const setterName = `set${stateValue.charAt(0).toUpperCase() + stateValue.slice(1)}`;

      if (node.type === 'Switch') {
        if (stateValue === 'theme') {
          props.push(`value={${stateValue} === 'dark'}`);
          props.push(`onValueChange={(newValue) => ${setterName}(newValue ? 'dark' : 'light')}`);
        } else {
          props.push(`value={${stateValue}}`);
          props.push(`onValueChange={(newValue) => ${setterName}(newValue)}`);
        }
      } else if (node.type === 'Input') {
        props.push(`value={${stateValue}}`);
        props.push(`onChangeText={(text) => ${setterName}(text)}`);
      }
    } else if (key === 'source' && node.type === 'Image') {
      // Handle Image source prop - support both URI and local images
      if (typeof value === 'string') {
        if (value.startsWith('http://') || value.startsWith('https://')) {
          // Remote image
          props.push(`source={{uri: '${value}'}}`);
        } else {
          // Local image - assume it's a require statement
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
    } else if (key === 'label') {
      let cleanedLabel = String(value).replace(/={true}/g, '').trim();
      props.push(`label="${cleanedLabel}"`);
    } else if (typeof value === 'string' && key !== 'bind' && key !== 'source') {
      props.push(`${key}="${value}"`);
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
  if (node.type === 'Button') {
    const buttonContent = node.children
      .map((child: IgniteNode) => {
        if (child.type === 'text') {
          return `${spaces}  <Text style={styles.buttonText}>${child.text}</Text>`;
        }
        return generateComponent(child, indent + 1, allRoutes);
      })
      .join('\n');
    
    return `${spaces}<${componentName}${propsString}>\n${buttonContent}\n${spaces}</${componentName}>`;
  } else if (node.type === 'Text') {
    if (node.text) {
      return `${spaces}<${componentName}${propsString}>${node.text}</${componentName}>`;
    } else if (node.children.length > 0) {
      const textContent = node.children
        .filter(child => child.type === 'text')
        .map(child => child.text)
        .join('');
      return `${spaces}<${componentName}${propsString}>${textContent}</${componentName}>`;
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
  // Collect states with better type inference
  const states: { name: string; defaultValue: string; type: 'text' | 'boolean' | 'number' }[] = [];

  function collectStates(node: IgniteNode) {
    if (node.props && node.props.bind && typeof node.props.bind === 'object' && 'type' in node.props.bind && node.props.bind.type === 'state' && 'value' in node.props.bind) {
      const stateName = node.props.bind.value as string;
      let defaultValue: string;
      let stateType: 'text' | 'boolean' | 'number' = 'text';

      if (node.type === 'Switch') {
        if (stateName === 'theme') {
          defaultValue = "'light'";
          stateType = 'text';
        } else if (stateName.includes('Mode') || stateName.includes('Enabled') || stateName.includes('Services')) {
          defaultValue = "false";
          stateType = 'boolean';
        } else {
          defaultValue = "false";
          stateType = 'boolean';
        }
      } else if (node.type === 'Input') {
        if (node.props.keyboardType === 'numeric' || node.props.keyboardType === 'number-pad' || stateName.toLowerCase().includes('interval') || stateName.toLowerCase().includes('count')) {
          defaultValue = "0";
          stateType = 'number';
        } else {
          defaultValue = "''";
          stateType = 'text';
        }
      } else {
        defaultValue = "''";
        stateType = 'text';
      }

      if (!states.some(s => s.name === stateName)) {
        states.push({ name: stateName, defaultValue, type: stateType });
      }
    }
    if (node.children) {
      node.children.forEach(collectStates);
    }
  }

  parsed.nodes.forEach(collectStates);

  // Generate useState declarations with proper types
  const useStateDeclarations = states.map(s => {
    return `  const [${s.name}, set${s.name.charAt(0).toUpperCase() + s.name.slice(1)}] = useState(${s.defaultValue});`;
  }).join('\n');

  // Check if any custom functions are used that might need additional imports
  // This is a generic check - users can define their own functions
  const codeString = JSON.stringify(parsed.nodes);
  const needsLinking = codeString.includes('Linking.') || codeString.includes('openURL');

  // Use the preserved stylesheet or create a default one
  const stylesheetCode = parsed.rawStylesheet || parsed.styles || "const styles = StyleSheet.create({});";

  const componentCode = [
    "import React, { useState } from 'react';",
    needsLinking 
      ? "import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Switch, FlatList, StyleSheet, Linking } from 'react-native';"
      : "import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Switch, FlatList, StyleSheet } from 'react-native';",
    "import { useNavigation } from '@react-navigation/native';",
    "",
    "export default function Screen() {",
    "  const navigation = useNavigation();",
    useStateDeclarations,
    "",
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