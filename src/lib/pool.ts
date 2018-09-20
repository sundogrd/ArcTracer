/**
 * @file pool.ts
 * @description 用于log的池子
 * @author Yuyi Liang <liang.pearce@gmail.com>
 */

interface IHandler extends Function {
    context: IContext;
}

interface IContext {
    [key: string]: any;
}

class Pool {
    private pool: IHandler[];
    constructor() {
        this.pool = [];
    }

    public push(handler: IHandler, context: IContext): void {
        handler.context = context;
        this.pool.push(handler);
    }

    public consume(): void {
        let handler: IHandler = this.pool.shift();
        while (handler) {
            handler.call(handler.context);
            handler = this.pool.shift();
        }
    }
}

export {
    IHandler,
    IContext,
    Pool
};
