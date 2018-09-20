/**
 * @file util
 * @author Yuyi Liang <liang.pearce@gmail.com>
 */

import * as config from './config';

const HAS_CONSOLE: Console = window.console;
const LEVEL_CONSOLE_MAP: any = {
    INFO: 'log',
    WARN: 'warn',
    ERROR: 'error',
    CRITICAL: 'error',
};

// throw out Errors, with global prefix 'ArcTracer: ' ahead of err.message
export function throwError(errMessage: string): void {
    if (HAS_CONSOLE) {
        console.error(`ArcTracer: ${errMessage}`);
    }
}

// print debug info in develper's console
// TODO: if WechatFE/vConsole is detected, will not use %c feature, as it is not well supported
export function debug(namespace: string, level: string, descriptor: string, data: any): void {
    if (HAS_CONSOLE && config.get().verbose) {
        window.console[LEVEL_CONSOLE_MAP[level.toUpperCase()] ||
            LEVEL_CONSOLE_MAP.INFO](`${namespace} ${level.toUpperCase()} ${descriptor}`, data || '');
    }
}

// filter any function in a object
export function filterFunction(obj: Object): any {
    const newObj: Object = {};

    if (typeof obj !== 'object') {
        return obj;
    }
    Object.keys(obj).forEach((key: keyof Object) => {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] !== 'function') {
                newObj[key] = filterFunction(obj[key]);
            }
        }
    });

    return newObj;
}
