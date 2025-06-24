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
    styles?: string;
    rawStylesheet?: string;
}
export declare function parseIgniteContent(content: string): ParsedIgniteFile;
