export declare class IgniteWatcher {
    private compiler;
    private watcher;
    private isCompiling;
    private compileTimeout;
    private projectRoot;
    constructor(projectRoot: string);
    start(): Promise<void>;
    private findIgniteFiles;
    private scheduleCompile;
    private doCompile;
    stop(): void;
}
