export class Injector {
    private static _Map: any = {};

    static add(target, key) {
        Injector._Map[key] = target;
    }

    static resolve(key) {
        return Injector._Map[key];
    }

    static map() {
        return Injector._Map;
    }
}
