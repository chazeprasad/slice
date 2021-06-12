import { IBeforeActionProps } from './IBeforeActionProps';
import { IAfterActionProps } from './IAfterActionProps';

const ProcessBeforeAction =
    (skip: boolean) =>
    (param: Function | (IBeforeActionProps | Function)[], actions?: Pick<IBeforeActionProps, 'except' | 'only'>) => {
        return function (target: any) {
            const proto = target.prototype;
            let hookList: IBeforeActionProps[] = skip
                ? target.prototype.beforeActionSkipList
                : target.prototype.beforeActionList;
            let list: IBeforeActionProps[];
            let props: IBeforeActionProps;
            if (Array.isArray(param)) {
                list = (param as Array<any>).map(x => {
                    return x instanceof Function ? { hook: x } : x;
                });
                hookList = hookList ? hookList.concat(list) : list;
            } else if (param instanceof Function) {
                props = {
                    ...actions,
                    hook: param,
                };

                hookList = hookList ? hookList.concat([props]) : [props];
            } else {
                throw new Error('Param must be Function or Array');
            }

            if (skip) {
                target.prototype.beforeActionSkipList = hookList;
            } else {
                target.prototype.beforeActionList = hookList;
            }
        };
    };

const ProcessAfterAction =
    (skip: boolean) =>
    (param: Function | (IAfterActionProps | Function)[], actions?: Pick<IAfterActionProps, 'except' | 'only'>) => {
        return function (target: any) {
            const proto = target.prototype;
            let hookList: IAfterActionProps[] = skip
                ? target.prototype.afterActionSkipList
                : target.prototype.afterActionList;
            let list: IAfterActionProps[];
            let props: IAfterActionProps;
            if (Array.isArray(param)) {
                list = (param as Array<any>).map(x => {
                    return x instanceof Function ? { hook: x } : x;
                });
                hookList = hookList ? hookList.concat(list) : list;
            } else if (param instanceof Function) {
                props = {
                    ...actions,
                    hook: param,
                };

                hookList = hookList ? hookList.concat([props]) : [props];
            } else {
                throw new Error('Param must be Function or Array');
            }

            if (skip) {
                target.prototype.afterActionSkipList = hookList;
            } else {
                target.prototype.afterActionList = hookList;
            }
        };
    };

const BeforeAction = ProcessBeforeAction(false);
const SkipBeforeAction = ProcessBeforeAction(true);
const AfterAction = ProcessAfterAction(false);
const SkipAfterAction = ProcessAfterAction(true);

export { BeforeAction, SkipBeforeAction, AfterAction, SkipAfterAction };
