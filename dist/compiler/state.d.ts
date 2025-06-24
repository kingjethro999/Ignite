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
export declare function parseState(content: string): {
    states: StateDefinition[];
    hooks: StateHook[];
};
export declare function generateStateCode(states: StateDefinition[], hooks: StateHook[]): string;
export {};
