/**
 * @file interface.ts
 * @description Strategy
 * @author Yuyi Liang <liang.pearce@gmail.com>
 */

import * as util from '../lib/util';

enum EProtocolStatus {
    INITING = 1,
    INITED= 2,
    FAILED= 4,
}

abstract class Interface {
    private namespace: string;
    constructor(namespace: string) {
        this.namespace = namespace;
    }

    public static INIT(database: string): boolean {
        return true;
    }

    public static TRANS_TIME_FORMAT(time: any, relative?: any): number {
        // if falsy value or timestamp already, pass it through directly,
        if (!time || /^\d{13}$/.test(time)) {
            return +time;
        }
        // incase relative time isn't unix timestamp format,
        // neither a falsy value which will turned out to be Date.now()
        if (relative && !/^\d{13}$/.test(relative)) {
            throw new TypeError('relative time should be standard unix timestamp');
        }

        return (relative || Date.now()) - time.replace(/d$/, '') * 24 * 3600 * 1000;
    }

    public static GET(from, to, readyFn): void {
        util.throwError('method get is not implemented.');
    }

    /**
     * clean logs = keep limited logs
     * @method keep
     * @static
     * @param {Number} daysToMaintain - keep logs within days
     */
    public static keep(daysToMaintain) {
        util.throwError('method keep is not implemented.');
    }

    /**
     * delete log database
     * @method clean
     * @static
     */
    public static clean() {
        util.throwError('method clean is not implemented.');
    }

    /**
     * add a log record
     * @method _reocrd
     * @private
     * @parma {String} level - log level
     * @param {String} descriptor - to speed up search and improve understanding
     * @param {Mixed} [data] - additional data
     */
    public _record(level, descriptor, data) {
        util.throwError('method _record is not implemented.');
    }

    /**
     * add a level-info record
     * @method info
     * @param {String} descriptor - to speed up search and improve understanding
     * @param {Mixed} [data] - additional data
     */
    public info(...args) {
        this._record('info', ...args);
    }

    /**
     * add a level-warn record
     * @method warn
     * @param {String} descriptor - to speed up search and improve understanding
     * @param {Mixed} [data] - additional data
     */
    public warn(...args) {
        this._record('warn', ...args);
    }

    /**
     * add a level-error record
     * @method error
     * @param {String} descriptor - to speed up search and improve understanding
     * @param {Mixed} [data] - additional data
     */
    public error(...args) {
        this._record('error', ...args);
    }

    /**
     * add a level-critical record
     * @method critical
     * @param {String} descriptor - to speed up search and improve understanding
     * @param {Mixed} [data] - additional data
     */
    public critical(...args) {
        this._record('critical', ...args);
    }
}

export {
    Interface
};
