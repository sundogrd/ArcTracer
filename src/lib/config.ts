/**
 * @file config handler
 * @author Yuyi Liang <liang.pearce@gmail.com>
 */

type IConfig = {
    verbose: boolean;
};

const DEFAULT_CONFIG: IConfig = {
    verbose: true,
};

const store: any = {
    ...DEFAULT_CONFIG,
};

export function get(key?: string | symbol): any {
    return key ? store[key] : store;
}

export function set(key: string | symbol, value: any): void {
    const changes: any = {};
    changes[key] = value;
    Object.assign(store, changes);
}
