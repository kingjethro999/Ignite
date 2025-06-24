export interface RouteDefinition {
    path: string;
    component: string;
    screenFile: string;
    options?: {
        title?: string;
        headerShown?: boolean;
        isTabScreen?: boolean;
        tabOrder?: number;
        tabIcon?: string;
    };
}
export declare class IgniteCompiler {
    private projectRoot;
    private appDir;
    constructor(projectRoot: string);
    compile(): Promise<void>;
    private findIgniteFiles;
    private getComponentName;
}
