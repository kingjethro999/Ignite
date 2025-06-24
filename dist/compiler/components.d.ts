export declare const COMPONENT_MAP: Record<string, string>;
export declare const DEFAULT_RN_COMPONENTS: Set<string>;
export declare const PACKAGE_COMPONENTS: Record<string, {
    package: string;
    import: string;
    type: 'default' | 'named';
}>;
export declare function isCustomComponent(componentName: string): boolean;
export declare function getComponentName(componentName: string): string;
export declare function detectRequiredImports(componentNames: string[]): {
    reactNative: string[];
    packages: Array<{
        package: string;
        imports: string[];
        type: 'default' | 'named';
    }>;
    custom: string[];
};
export declare const STYLE_PROPS: Set<string>;
export declare const COMPONENT_PROPS: Record<string, Set<string>>;
