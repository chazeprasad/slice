import { ActionDecoratorUtil } from './ActionDecoratorUtil';
import { InjectUtil } from '@slice/inject';

const { ROUTE_PREFIX } = ActionDecoratorUtil;

export interface IRouteProps {
    method: string;
    url: string;
    middlewareList: [];
    actionName: string;
}

export const Route = (args: string) => {
    const ctrlPath = ActionDecoratorUtil.DestructApiDecorator(args).path;

    return target => {
        const proto = target.prototype;

        let routes: any[] = Object.getOwnPropertyNames(proto).filter(prop => prop.indexOf(ROUTE_PREFIX) === 0);
        routes = routes.map(prop => {
            const { method, path, middlewareList } = proto[prop];
            // const url = `${ctrlPath}${path}`;
            const url = `${path}`;
            const actionName = prop.substring(ROUTE_PREFIX.length);
            const routeProps: IRouteProps = {
                method: method === 'del' ? 'delete' : method,
                url,
                middlewareList,
                actionName,
            };

            return routeProps;
        });

        target.prototype.path =
            target.prototype.path && target.prototype.path !== '/' ? target.prototype.path + ctrlPath : ctrlPath;

        target.prototype.routes = routes;

        InjectUtil.configureInject(target);
    };
};

function route(method, ...args) {
    if (typeof method !== 'string') {
        throw new Error('The first argument must be an HTTP method');
    }
    const { path, middlewareList } = ActionDecoratorUtil.DestructRouteDecorator(args);
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        target[`${ROUTE_PREFIX}${name}`] = {
            method,
            path,
            middlewareList,
        };
    };
}

const Head = route.bind(null, 'head');
const Options = route.bind(null, 'options');
const Get = route.bind(null, 'get');
const Post = route.bind(null, 'post');
const Put = route.bind(null, 'put');
const Patch = route.bind(null, 'patch');
const Delete = route.bind(null, 'delete');
const Del = route.bind(null, 'del');
const All = route.bind(null, 'all');

export { Head, Options, Get, Post, Put, Patch, Delete, Del, All };
