import 'reflect-metadata';
import { INJECT_PREFIX, InjectUtil } from './InjectUtil';

export function Inject(props?: any) {
    return function (target: any, name: string) {
        const tokens = Reflect.getMetadata('design:type', target, name) || [];
        target[`${INJECT_PREFIX}${name}`] = { source: tokens };
    };
}

export const Injectable = () => {
    return target => {
        target.prototype.injectable = true;
    };
};

export const Consumer = (args?: string) => {
    return target => {
        InjectUtil.configureInject(target);
    };
};
