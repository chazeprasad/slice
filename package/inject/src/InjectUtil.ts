import 'reflect-metadata';

import * as path from 'path';
import * as fs from 'fs';

export const INJECT_PREFIX = '$$inject_';

export class InjectUtil {
    static getResourceName(filename) {
        const list = filename.split('-');
        let id = '';

        try {
            for (let i = 0; i < list.length; i++) {
                const part = list[i];

                id += part.charAt(0).toUpperCase() + part.slice(1);
            }
        } catch (error) {
            console.log(error);
        }

        return id;
    }

    static loadResource(root: string) {
        const dir = root;
        const list: any[] = [];

        try {
            const files = fs.readdirSync(dir);
            Object.keys(files).map(i => {
                const filename = path.basename(files[i]);
                const index = filename.indexOf('.repository.');

                if (index !== -1) {
                    const identity = `${InjectUtil.getResourceName(filename.substring(0, index))}Resource`;

                    // let router = require(dir + '/' + filename).default;
                    const manager = require(`${dir}/${filename}`);

                    const m = new manager[identity]();
                    list.push(m);
                }
            });
        } catch (error) {
            console.log(error);
        }

        return list;
    }

    static configureInject(target) {
        let injects: any[] = [];
        const proto = target.prototype;

        try {
            injects = Object.getOwnPropertyNames(proto).filter(prop => prop.indexOf(INJECT_PREFIX) === 0);

            injects = injects.map(prop => {
                const injectName = prop.substring(INJECT_PREFIX.length);
                const injectProps = {
                    ...proto[prop],
                    injectName,
                };

                return injectProps;
            });

            target.prototype.injects = target.prototype.injects ? target.prototype.injects.concat(injects) : injects;
        } catch (error) {
            console.log(error);
        }

        return injects;
    }

    static configureResource(root: string, app?: any) {
        InjectUtil.loadResource(root);
    }
}
