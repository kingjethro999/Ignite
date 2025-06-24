import { readFileSync } from 'fs';

export interface IgniteNode {
  type: string;
  props: Record<string, any>;
  children: IgniteNode[];
  text?: string;
}

export interface ParsedIgniteFile {
  screen: {
    title?: string;
    navigation?: string;
    tabOrder?: number;
    tabIcon?: string;
    isTabScreen?: boolean;
    headerShown?: boolean;
  };
  nodes: IgniteNode[];
  styles?: string; // Raw stylesheet content
  rawStylesheet?: string; // Original stylesheet for preservation
}

export function parseIgniteContent(content: string): ParsedIgniteFile {
  const result: ParsedIgniteFile = {
    screen: {},
    nodes: [],
    styles: undefined,
    rawStylesheet: undefined
  };

  // First, extract and preserve the stylesheet
  const stylesheetMatch = content.match(/const\s+styles\s*=\s*StyleSheet\.create\s*\(\s*{[\s\S]*?}\s*\)\s*;?/);
  if (stylesheetMatch) {
    result.rawStylesheet = stylesheetMatch[0];
    result.styles = stylesheetMatch[0];
    // Remove stylesheet from content to avoid parsing it as components
    content = content.replace(stylesheetMatch[0], '').trim();
  }

  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  // Parse screen declaration with enhanced metadata
  const screenLine = lines.find(line => line.startsWith('screen'));
  if (screenLine) {
    const screenProps = parseProps(screenLine.replace('screen', '').trim());
    result.screen = {
      ...screenProps,
      tabOrder: screenProps.tabOrder ? parseInt(screenProps.tabOrder) : undefined,
      isTabScreen: screenProps.isTabScreen === 'true' || screenProps.isTabScreen === true,
      tabIcon: screenProps.tabIcon,
      // FIX: Properly handle headerShown boolean conversion
      headerShown: screenProps.headerShown === undefined ? true : 
                   screenProps.headerShown === 'false' ? false :
                   screenProps.headerShown === false ? false : 
                   Boolean(screenProps.headerShown)
    };
  }

  // Filter out screen line and empty lines
  const contentLines = lines.filter(line => 
    !line.startsWith('screen') && 
    line.length > 0 &&
    !line.startsWith('const styles') &&
    !line.includes('StyleSheet.create')
  );
  
  // Parse the content
  let i = 0;
  while (i < contentLines.length) {
    const node = parseNode(contentLines, i);
    if (node.node) {
      result.nodes.push(node.node);
    }
    i = node.nextIndex;
  }

  // console.log('Parsed result:', JSON.stringify(result, null, 2));
  return result;
}

function parseNode(lines: string[], startIndex: number): { node: IgniteNode | null, nextIndex: number } {
  if (startIndex >= lines.length) {
    return { node: null, nextIndex: startIndex };
  }

  const line = lines[startIndex];
  
  // Skip lines that are part of stylesheet
  if (line.includes('StyleSheet.create') || line.match(/^\s*["']?\w+["']?\s*:\s*{/)) {
    return { node: null, nextIndex: startIndex + 1 };
  }
  
  // Check if it's a self-closing tag
  const selfClosingMatch = line.match(/^<(\w+)([^>]*)\s*\/?>$/);
  if (selfClosingMatch && line.endsWith('/>')) {
    const [, tagName, propsStr] = selfClosingMatch;
    const props = parseProps(propsStr);
    return {
      node: { type: tagName, props, children: [] },
      nextIndex: startIndex + 1
    };
  }

  // Check if it's an opening tag - IMPROVED REGEX
  const openTagMatch = line.match(/^<(\w+)((?:\s+[^>]*)?)\s*>(.*)$/);
  if (openTagMatch) {
    const [, tagName, propsStr, remainingContent] = openTagMatch;
    const props = parseProps(propsStr);
    const node: IgniteNode = { type: tagName, props, children: [] };

    // Check if there's content on the same line
    if (remainingContent && !remainingContent.startsWith('</')) {
      // Check if it's a complete tag on one line like <Text>Content</Text>
      const sameLineCloseMatch = remainingContent.match(/^(.*)<\/\w+>$/);
      if (sameLineCloseMatch) {
        const textContent = sameLineCloseMatch[1].trim();
        if (textContent) {
          node.children.push({ type: 'text', props: {}, children: [], text: textContent });
        }
        return { node, nextIndex: startIndex + 1 };
      } else {
        // Content continues, treat as text
        node.children.push({ type: 'text', props: {}, children: [], text: remainingContent });
      }
    }

    // Look for children and closing tag
    let currentIndex = startIndex + 1;
    const closingTag = `</${tagName}>`;
    
    while (currentIndex < lines.length) {
      const currentLine = lines[currentIndex];
      
      // Check if this is the closing tag
      if (currentLine === closingTag) {
        return { node, nextIndex: currentIndex + 1 };
      }
      
      // Check if this line contains the closing tag
      if (currentLine.includes(closingTag)) {
        // Extract content before the closing tag
        const beforeClosing = currentLine.substring(0, currentLine.indexOf(closingTag)).trim();
        if (beforeClosing) {
          node.children.push({ type: 'text', props: {}, children: [], text: beforeClosing });
        }
        return { node, nextIndex: currentIndex + 1 };
      }
      
      // Parse child node
      if (currentLine.startsWith('<')) {
        const childResult = parseNode(lines, currentIndex);
        if (childResult.node) {
          node.children.push(childResult.node);
        }
        currentIndex = childResult.nextIndex;
      } else {
        // It's text content
        node.children.push({ type: 'text', props: {}, children: [], text: currentLine });
        currentIndex++;
      }
    }

    return { node, nextIndex: currentIndex };
  }

  // If it's not a tag, treat as text
  return {
    node: { type: 'text', props: {}, children: [], text: line },
    nextIndex: startIndex + 1
  };
}

// Enhanced prop parser with better boolean handling
function parseProps(propsString: string): Record<string, any> {
  const props: Record<string, any> = {};
  
  if (!propsString || !propsString.trim()) {
    return props;
  }

  const trimmed = propsString.trim();
  
  // Handle attributes more carefully by parsing character by character
  let i = 0;
  while (i < trimmed.length) {
    // Skip whitespace
    while (i < trimmed.length && /\s/.test(trimmed[i])) {
      i++;
    }
    
    if (i >= trimmed.length) break;
    
    // Extract attribute name
    let attrName = '';
    while (i < trimmed.length && /[a-zA-Z_-]/.test(trimmed[i])) {
      attrName += trimmed[i];
      i++;
    }
    
    if (!attrName) break;
    
    // Skip whitespace after attribute name
    while (i < trimmed.length && /\s/.test(trimmed[i])) {
      i++;
    }
    
    // Check if there's a value (=)
    if (i < trimmed.length && trimmed[i] === '=') {
      i++; // skip =
      
      // Skip whitespace after =
      while (i < trimmed.length && /\s/.test(trimmed[i])) {
        i++;
      }
      
      // Check for curly brace expressions {styles.container}
      if (i < trimmed.length && trimmed[i] === '{') {
        i++; // skip opening brace
        let value = '';
        let braceCount = 1;
        
        while (i < trimmed.length && braceCount > 0) {
          if (trimmed[i] === '{') {
            braceCount++;
          } else if (trimmed[i] === '}') {
            braceCount--;
          }
          
          if (braceCount > 0) {
            value += trimmed[i];
          }
          i++;
        }
        
        // Handle the curly brace expression
        if (attrName === 'style') {
          props[attrName] = value; // Store as "styles.container" without quotes
        } else {
          // Try to parse as boolean, number, or keep as expression
          if (value === 'true') {
            props[attrName] = true;
          } else if (value === 'false') {
            props[attrName] = false;
          } else if (!isNaN(Number(value)) && value.trim() !== '') {
            props[attrName] = Number(value);
          } else {
            props[attrName] = `{${value}}`;
          }
        }
      }
      // Extract quoted value
      else if (i < trimmed.length && (trimmed[i] === '"' || trimmed[i] === "'")) {
        const quote = trimmed[i];
        i++; // skip opening quote
        
        let value = '';
        while (i < trimmed.length && trimmed[i] !== quote) {
          value += trimmed[i];
          i++;
        }
        
        if (i < trimmed.length) {
          i++; // skip closing quote
        }
        
        // Process the extracted value
        if (attrName === 'onPress' && value && value.startsWith("go('") && value.endsWith("')")) {
          const navPath = value.slice(4, -2); // Remove go(' and ')
          props[attrName] = {
            type: 'navigation',
            value: navPath
          };
        } else if (attrName === 'bind' && value) {
          props[attrName] = {
            type: 'state',
            value: value
          };
        } else if (attrName === 'keyboardType') {
          // Validate keyboard type
          const validTypes = ['default', 'email-address', 'numeric', 'phone-pad', 'number-pad', 'decimal-pad', 'visible-password', 'ascii-capable', 'numbers-and-punctuation', 'url', 'name-phone-pad', 'twitter', 'web-search'];
          props[attrName] = validTypes.includes(value) ? value : 'default';
        } else if (attrName === 'autoCapitalize') {
          // Validate auto capitalize
          const validValues = ['none', 'sentences', 'words', 'characters'];
          props[attrName] = validValues.includes(value) ? value : 'sentences';
        } else if (attrName === 'textContentType') {
          // Handle text content type for iOS
          props[attrName] = value;
        } else if (attrName === 'returnKeyType') {
          // Handle return key type
          props[attrName] = value;
        } else {
          // FIX: Properly handle boolean string values
          if (value === 'true') {
            props[attrName] = true;
          } else if (value === 'false') {
            props[attrName] = false;
          } else {
            props[attrName] = value;
          }
        }
      } else {
        // Unquoted value
        let value = '';
        while (i < trimmed.length && !/\s/.test(trimmed[i])) {
          value += trimmed[i];
          i++;
        }
        
        // FIX: Better type conversion for unquoted values
        if (value === 'true') {
          props[attrName] = true;
        } else if (value === 'false') {
          props[attrName] = false;
        } else if (!isNaN(Number(value)) && value.trim() !== '') {
          props[attrName] = Number(value);
        } else {
          props[attrName] = value;
        }
      }
    } else {
      // Boolean attribute (no value) - defaults to true
      props[attrName] = true;
    }
  }

  return props;
}