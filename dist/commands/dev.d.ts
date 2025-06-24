interface DevOptions {
    android?: boolean;
    ios?: boolean;
}
export declare const dev: (options?: DevOptions) => Promise<void>;
export {};
