import { ServiceDecoratorUtil } from './ServiceDecoratorUtil';

export const Service = () => {
    return target => {
        target.prototype.injectable = true;
        ServiceDecoratorUtil.configureInject(target);
    };
};
