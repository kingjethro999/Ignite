"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseState = parseState;
exports.generateStateCode = generateStateCode;
function parseState(content) {
    const states = [];
    const hooks = [];
    // Parse state declarations
    const stateRegex = /state\s+(\w+)\s*:\s*(\w+)\s*=\s*([^;]+)/g;
    let match;
    while ((match = stateRegex.exec(content)) !== null) {
        const [, name, type, initialValue] = match;
        states.push({
            name,
            type: type,
            initialValue: parseInitialValue(initialValue, type)
        });
    }
    // Parse hooks
    const hookRegex = /hook\s+(\w+)\s*\(([^)]*)\)\s*{([^}]*)}/g;
    while ((match = hookRegex.exec(content)) !== null) {
        const [, name, params, body] = match;
        const dependencies = params.split(',').map(p => p.trim()).filter(Boolean);
        hooks.push({
            name,
            type: determineHookType(name, body),
            dependencies,
            body: body.trim()
        });
    }
    return { states, hooks };
}
function parseInitialValue(value, type) {
    value = value.trim();
    switch (type) {
        case 'string':
            return value.replace(/^["']|["']$/g, '');
        case 'number':
            return Number(value);
        case 'boolean':
            return value === 'true';
        case 'array':
            return JSON.parse(value);
        case 'object':
            return JSON.parse(value);
        default:
            return value;
    }
}
function determineHookType(name, body) {
    if (body.includes('useState'))
        return 'useState';
    if (body.includes('useEffect'))
        return 'useEffect';
    if (body.includes('useCallback'))
        return 'useCallback';
    if (body.includes('useMemo'))
        return 'useMemo';
    return 'useState';
}
function generateStateCode(states, hooks) {
    const imports = new Set();
    const stateCode = [];
    const hookCode = [];
    // Generate state declarations
    states.forEach(state => {
        imports.add('useState');
        stateCode.push(`  const [${state.name}, set${capitalize(state.name)}] = useState(${JSON.stringify(state.initialValue)});`);
    });
    // Generate hooks
    hooks.forEach(hook => {
        imports.add(hook.type);
        hookCode.push(`  ${hook.type}(() => {
    ${hook.body}
  }${hook.dependencies?.length ? `, [${hook.dependencies.join(', ')}]` : ''});`);
    });
    return `import { ${Array.from(imports).join(', ')} } from 'react';

${stateCode.join('\n')}
${hookCode.join('\n')}
`;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
