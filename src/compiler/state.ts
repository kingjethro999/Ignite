interface StateDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  initialValue: any;
}

interface StateHook {
  name: string;
  type: 'useState' | 'useEffect' | 'useCallback' | 'useMemo';
  dependencies?: string[];
  body?: string;
}

export function parseState(content: string): {
  states: StateDefinition[];
  hooks: StateHook[];
} {
  const states: StateDefinition[] = [];
  const hooks: StateHook[] = [];
  
  // Parse state declarations
  const stateRegex = /state\s+(\w+)\s*:\s*(\w+)\s*=\s*([^;]+)/g;
  let match;
  
  while ((match = stateRegex.exec(content)) !== null) {
    const [, name, type, initialValue] = match;
    states.push({
      name,
      type: type as StateDefinition['type'],
      initialValue: parseInitialValue(initialValue, type as StateDefinition['type'])
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

function parseInitialValue(value: string, type: StateDefinition['type']): any {
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

function determineHookType(name: string, body: string): StateHook['type'] {
  if (body.includes('useState')) return 'useState';
  if (body.includes('useEffect')) return 'useEffect';
  if (body.includes('useCallback')) return 'useCallback';
  if (body.includes('useMemo')) return 'useMemo';
  return 'useState';
}

export function generateStateCode(states: StateDefinition[], hooks: StateHook[]): string {
  const imports = new Set<string>();
  const stateCode: string[] = [];
  const hookCode: string[] = [];
  
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

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
} 