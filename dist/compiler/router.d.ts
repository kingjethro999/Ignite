interface Route {
    path: string;
    component: string;
    screenFile: string;
    options?: {
        title?: string;
        headerShown?: boolean;
        tabBarIcon?: string;
        isTabScreen?: boolean;
        tabOrder?: number;
    };
}
export declare function generateRouterConfig(projectRoot: string, routes: Route[]): void;
export {};
