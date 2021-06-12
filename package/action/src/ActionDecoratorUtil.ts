export class ActionDecoratorUtil {
    static ROUTE_PREFIX = '$$route_';

    static GetClassName = (target: any): string => target.constructor.name;

    static DestructRouteDecorator(args) {
        if (args.length === 0) {
            throw new Error('Missing Route path');
        }
        if (typeof args !== 'string' && typeof args[0] !== 'string') {
            throw new Error('Route path must be string');
        }
        const list = args.length > 1 ? args[1] : [];
        const path = typeof args !== 'string' ? args[0] : args;

        return { path, middlewareList: list };
    }

    static DestructApiDecorator(args) {
        if (args.length === 0) {
            throw new Error('Missing Route path');
        }
        if (typeof args !== 'string' && typeof args[0] !== 'string') {
            throw new Error('Route path must be string');
        }

        const path = typeof args !== 'string' ? args[0] : args;
        return { path };
    }
}
