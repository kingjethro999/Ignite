export interface IgniteNode {
    type: string;
    props: Record<string, any>;
    children: IgniteNode[];
    text?: string;
}
export interface ImportDeclaration {
    type: 'default' | 'named' | 'namespace';
    imports: string[];
    from: string;
    alias?: string;
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
    imports: ImportDeclaration[];
    states: Array<{
        name: string;
        initialValue: any;
        type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
    }>;
    functions: Array<{
        name: string;
        isAsync: boolean;
        body: string;
    }>;
    nodes: IgniteNode[];
    styles?: string;
    rawStylesheet?: string;
}
export declare function parseIgniteContent(content: string): ParsedIgniteFile;
