import { Base } from '@slicejs/core';
import { IBeforeActionProps, IAfterActionProps } from '@slicejs/hook';

export type Middleware = (req?, res?, next?: any) => any;

class ActionController extends Base {
    public router = undefined;

    public routes;

    public beforeActionList;

    public beforeActionSkipList;

    public afterActionList;

    public afterActionSkipList;

    constructor() {
        super();

        this.routes = this.routes || [];

        console.log(this.routes);

        this.beforeActionList = this.beforeActionList || [];
        this.beforeActionSkipList = this.beforeActionSkipList || [];
        this.afterActionList = this.afterActionList || [];
        this.afterActionSkipList = this.afterActionSkipList || [];
    }

    configureRouter(router) {
        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i];

            const { method, url, actionName } = route;

            const baList = this.getHooksByName(actionName, this.beforeActionList);
            const baSkipList = this.getHooksByName(actionName, this.beforeActionSkipList);
            const finalBAList = this.getFinalHooks(baList, baSkipList);

            const aaList = this.getHooksByName(actionName, this.afterActionList);
            const aaSkipList = this.getHooksByName(actionName, this.afterActionSkipList);
            const finalAAList = this.getFinalHooks(aaList, aaSkipList);

            const action = async (req: any, res: any, next: any) => {
                try {
                    const context = req.context || {};
                    context.body = context.body || req.body;
                    context.params = context.params || req.params;
                    context.query = context.query || req.query;
                    const fn = this[actionName];
                    console.log('actionName');
                    console.log(actionName);
                    console.log(this[actionName]);
                    console.log(context);
                    const [result, status] = await fn.apply(this, [context]);
                    context.result = result;
                    context.status = status;
                    req.context = context;
                } catch (error) {
                    next(error);
                }

                next();
            };

            const beforeActions = finalBAList || [];
            const afterActions = finalAAList || [];
            const middlewares = [beforeActions, action, afterActions];

            router[method](url, ...middlewares, async (req: any, res: any, next: any) => {
                try {
                    const { context } = req;
                    res.status(context.status || 200).json(context.result);
                } catch (error) {
                    next(error);
                }
            });
        }

        this.router = router;
    }

    getFinalHooks(srcList, rmList) {
        const list: Array<any> = srcList && srcList.filter(x => rmList.indexOf(x) === -1);

        return list || [];
    }

    getHooksByName(name: string, actionList) {
        const list: Array<any> = [];
        if (actionList && actionList.length) {
            actionList.map((a: IBeforeActionProps | IAfterActionProps) => {
                if (!a.except && !a.only) {
                    list.push(a.hook);
                } else if (a.only) {
                    if (a.only.indexOf(name) !== -1) {
                        list.push(a.hook);
                    }
                } else if (a.except) {
                    if (a.except.indexOf(name) === -1) {
                        list.push(a.hook);
                    }
                }
            });
        }

        return list;
    }
}

export { ActionController };
