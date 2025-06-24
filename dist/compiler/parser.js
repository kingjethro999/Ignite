"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIgniteContent = parseIgniteContent;
function parseIgniteContent(content) {
    const result = {
        screen: {},
        imports: [],
        states: [],
        functions: [],
        nodes: [],
        styles: undefined,
        rawStylesheet: undefined
    };
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        // Parse import statements
        if (line.startsWith('import ')) {
            const importDecl = parseImportStatement(line);
            if (importDecl) {
                result.imports.push(importDecl);
            }
            i++;
            continue;
        }
        // Parse simple import statements (just package names)
        if (isSimpleImport(line)) {
            const importDecl = parseSimpleImport(line);
            if (importDecl) {
                result.imports.push(importDecl);
            }
            i++;
            continue;
        }
        // Parse screen declaration
        if (line.startsWith('screen')) {
            const screenProps = parseProps(line.replace('screen', '').trim());
            result.screen = {
                ...screenProps,
                tabOrder: screenProps.tabOrder ? parseInt(screenProps.tabOrder) : undefined,
                isTabScreen: screenProps.isTabScreen === 'true' || screenProps.isTabScreen === true,
                tabIcon: screenProps.tabIcon,
                headerShown: screenProps.headerShown === undefined ? true :
                    screenProps.headerShown === 'false' ? false :
                        screenProps.headerShown === false ? false :
                            Boolean(screenProps.headerShown)
            };
            i++;
            continue;
        }
        // Parse state declarations
        if (line.startsWith('state ')) {
            const stateDecl = parseStateDeclaration(line);
            if (stateDecl) {
                result.states.push(stateDecl);
            }
            i++;
            continue;
        }
        // Parse function declarations
        if (line.startsWith('async ') || line.match(/^\w+\s*\(/)) {
            const funcResult = parseFunctionDeclaration(lines, i);
            if (funcResult.func) {
                result.functions.push(funcResult.func);
            }
            i = funcResult.nextIndex;
            continue;
        }
        // Parse stylesheet
        if (line.startsWith('const styles') || line.includes('StyleSheet.create')) {
            const stylesheetResult = parseStylesheet(lines, i);
            result.rawStylesheet = stylesheetResult.stylesheet;
            result.styles = stylesheetResult.stylesheet;
            i = stylesheetResult.nextIndex;
            continue;
        }
        // Parse JSX nodes
        if (line.startsWith('<')) {
            const nodeResult = parseNode(lines, i);
            if (nodeResult.node) {
                result.nodes.push(nodeResult.node);
            }
            i = nodeResult.nextIndex;
            continue;
        }
        i++;
    }
    return result;
}
function parseImportStatement(line) {
    // Handle: import React from 'react';
    const defaultImportMatch = line.match(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?$/);
    if (defaultImportMatch) {
        return {
            type: 'default',
            imports: [defaultImportMatch[1]],
            from: defaultImportMatch[2]
        };
    }
    // Handle: import { View, Text } from 'react-native';
    const namedImportMatch = line.match(/^import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"];?$/);
    if (namedImportMatch) {
        const imports = namedImportMatch[1].split(',').map(imp => imp.trim());
        return {
            type: 'named',
            imports: imports,
            from: namedImportMatch[2]
        };
    }
    // Handle: import * as Three from 'three';
    const namespaceImportMatch = line.match(/^import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"];?$/);
    if (namespaceImportMatch) {
        return {
            type: 'namespace',
            imports: ['*'],
            from: namespaceImportMatch[2],
            alias: namespaceImportMatch[1]
        };
    }
    return null;
}
function isSimpleImport(line) {
    // Check if line is just a package name (simple import)
    return /^[a-z][a-z0-9-]*(\.[a-z][a-z0-9-]*)*$/.test(line) &&
        !line.includes(' ') &&
        !line.startsWith('<') &&
        !line.includes('=');
}
function parseSimpleImport(line) {
    // Convert simple package names to default imports
    // e.g., "firebase" becomes import firebase from 'firebase'
    if (isSimpleImport(line)) {
        return {
            type: 'default',
            imports: [line],
            from: line
        };
    }
    return null;
}
function parseStateDeclaration(line) {
    // Handle: state count=0, state name="", state items=[], state user={}, state loading=false
    const match = line.match(/^state\s+(\w+)\s*=\s*(.+)$/);
    if (match) {
        const name = match[1];
        const valueStr = match[2];
        let initialValue;
        let type;
        // Parse the initial value
        if (valueStr === 'true' || valueStr === 'false') {
            initialValue = valueStr === 'true';
            type = 'boolean';
        }
        else if (!isNaN(Number(valueStr))) {
            initialValue = Number(valueStr);
            type = 'number';
        }
        else if (valueStr.startsWith('"') && valueStr.endsWith('"')) {
            initialValue = valueStr.slice(1, -1);
            type = 'string';
        }
        else if (valueStr.startsWith("'") && valueStr.endsWith("'")) {
            initialValue = valueStr.slice(1, -1);
            type = 'string';
        }
        else if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
            try {
                initialValue = JSON.parse(valueStr);
                type = 'array';
            }
            catch {
                initialValue = [];
                type = 'array';
            }
        }
        else if (valueStr.startsWith('{') && valueStr.endsWith('}')) {
            try {
                initialValue = JSON.parse(valueStr);
                type = 'object';
            }
            catch {
                initialValue = {};
                type = 'object';
            }
        }
        else {
            // Default to string
            initialValue = valueStr;
            type = 'string';
        }
        return { name, initialValue, type };
    }
    return null;
}
function parseFunctionDeclaration(lines, startIndex) {
    const line = lines[startIndex];
    // Handle async functions: async functionName() {
    const asyncMatch = line.match(/^async\s+(\w+)\s*\([^)]*\)\s*\{?$/);
    if (asyncMatch) {
        const funcName = asyncMatch[1];
        return parseFunctionBody(lines, startIndex, funcName, true);
    }
    // Handle regular functions: functionName() {
    const funcMatch = line.match(/^(\w+)\s*\([^)]*\)\s*\{?$/);
    if (funcMatch) {
        const funcName = funcMatch[1];
        return parseFunctionBody(lines, startIndex, funcName, false);
    }
    return { func: null, nextIndex: startIndex + 1 };
}
function parseFunctionBody(lines, startIndex, name, isAsync) {
    let body = '';
    let braceCount = 0;
    let i = startIndex;
    // Check if opening brace is on the same line
    if (lines[i].includes('{')) {
        braceCount = 1;
        const afterBrace = lines[i].split('{').slice(1).join('{');
        if (afterBrace.trim()) {
            body += afterBrace + '\n';
        }
        i++;
    }
    // Collect function body
    while (i < lines.length && (braceCount > 0 || body === '')) {
        const line = lines[i];
        if (line.includes('{')) {
            braceCount += (line.match(/\{/g) || []).length;
        }
        if (line.includes('}')) {
            braceCount -= (line.match(/\}/g) || []).length;
        }
        if (braceCount > 0) {
            body += line + '\n';
        }
        else if (line.includes('}')) {
            // Include content before the closing brace
            const beforeBrace = line.substring(0, line.lastIndexOf('}'));
            if (beforeBrace.trim()) {
                body += beforeBrace + '\n';
            }
            break;
        }
        i++;
    }
    return {
        func: {
            name,
            isAsync,
            body: body.trim()
        },
        nextIndex: i + 1
    };
}
function parseStylesheet(lines, startIndex) {
    let stylesheet = '';
    let braceCount = 0;
    let i = startIndex;
    while (i < lines.length) {
        const line = lines[i];
        stylesheet += line + '\n';
        if (line.includes('{')) {
            braceCount += (line.match(/\{/g) || []).length;
        }
        if (line.includes('}')) {
            braceCount -= (line.match(/\}/g) || []).length;
        }
        if (braceCount === 0 && stylesheet.includes('StyleSheet.create')) {
            break;
        }
        i++;
    }
    return {
        stylesheet: stylesheet.trim(),
        nextIndex: i + 1
    };
}
function parseNode(lines, startIndex) {
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
    // Check if it's an opening tag
    const openTagMatch = line.match(/^<(\w+)((?:\s+[^>]*)?)\s*>(.*)$/);
    if (openTagMatch) {
        const [, tagName, propsStr, remainingContent] = openTagMatch;
        const props = parseProps(propsStr);
        const node = { type: tagName, props, children: [] };
        // Check if there's content on the same line
        if (remainingContent && !remainingContent.startsWith('</')) {
            const sameLineCloseMatch = remainingContent.match(/^(.*)<\/\w+>$/);
            if (sameLineCloseMatch) {
                const textContent = sameLineCloseMatch[1].trim();
                if (textContent) {
                    node.children.push({ type: 'text', props: {}, children: [], text: textContent });
                }
                return { node, nextIndex: startIndex + 1 };
            }
            else {
                node.children.push({ type: 'text', props: {}, children: [], text: remainingContent });
            }
        }
        // Look for children and closing tag
        let currentIndex = startIndex + 1;
        const closingTag = `</${tagName}>`;
        while (currentIndex < lines.length) {
            const currentLine = lines[currentIndex];
            if (currentLine === closingTag) {
                return { node, nextIndex: currentIndex + 1 };
            }
            if (currentLine.includes(closingTag)) {
                const beforeClosing = currentLine.substring(0, currentLine.indexOf(closingTag)).trim();
                if (beforeClosing) {
                    node.children.push({ type: 'text', props: {}, children: [], text: beforeClosing });
                }
                return { node, nextIndex: currentIndex + 1 };
            }
            if (currentLine.startsWith('<')) {
                const childResult = parseNode(lines, currentIndex);
                if (childResult.node) {
                    node.children.push(childResult.node);
                }
                currentIndex = childResult.nextIndex;
            }
            else {
                node.children.push({ type: 'text', props: {}, children: [], text: currentLine });
                currentIndex++;
            }
        }
        return { node, nextIndex: currentIndex };
    }
    return {
        node: { type: 'text', props: {}, children: [], text: line },
        nextIndex: startIndex + 1
    };
}
function parseProps(propsString) {
    const props = {};
    if (!propsString || !propsString.trim()) {
        return props;
    }
    const trimmed = propsString.trim();
    let i = 0;
    while (i < trimmed.length) {
        // Skip whitespace
        while (i < trimmed.length && /\s/.test(trimmed[i])) {
            i++;
        }
        if (i >= trimmed.length)
            break;
        // Extract attribute name
        let attrName = '';
        while (i < trimmed.length && /[a-zA-Z_-]/.test(trimmed[i])) {
            attrName += trimmed[i];
            i++;
        }
        if (!attrName)
            break;
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
            // Handle curly brace expressions {value}
            if (i < trimmed.length && trimmed[i] === '{') {
                i++; // skip opening brace
                let value = '';
                let braceCount = 1;
                while (i < trimmed.length && braceCount > 0) {
                    if (trimmed[i] === '{') {
                        braceCount++;
                    }
                    else if (trimmed[i] === '}') {
                        braceCount--;
                    }
                    if (braceCount > 0) {
                        value += trimmed[i];
                    }
                    i++;
                }
                // Store the expression as-is for flexible evaluation
                props[attrName] = { type: 'expression', value };
            }
            // Handle quoted values
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
                // Handle special cases
                if (attrName === 'onPress' && value && value.startsWith("go('") && value.endsWith("')")) {
                    const navPath = value.slice(4, -2);
                    props[attrName] = { type: 'navigation', value: navPath };
                }
                else if (attrName === 'bind' && value) {
                    props[attrName] = { type: 'state', value: value };
                }
                else {
                    // Type conversion
                    if (value === 'true') {
                        props[attrName] = true;
                    }
                    else if (value === 'false') {
                        props[attrName] = false;
                    }
                    else if (!isNaN(Number(value)) && value.trim() !== '') {
                        props[attrName] = Number(value);
                    }
                    else {
                        props[attrName] = value;
                    }
                }
            }
            else {
                // Unquoted value
                let value = '';
                while (i < trimmed.length && !/\s/.test(trimmed[i])) {
                    value += trimmed[i];
                    i++;
                }
                if (value === 'true') {
                    props[attrName] = true;
                }
                else if (value === 'false') {
                    props[attrName] = false;
                }
                else if (!isNaN(Number(value)) && value.trim() !== '') {
                    props[attrName] = Number(value);
                }
                else {
                    props[attrName] = value;
                }
            }
        }
        else {
            // Boolean attribute (no value)
            props[attrName] = true;
        }
    }
    return props;
}
