import * as path from 'path';
import * as fs from 'fs';
import { Router } from 'express';

export class ControllerUtil {
    static getControllerName(filename) {
        const list = filename.split('-');
        let id = '';
        for (let i = 0; i < list.length; i++) {
            const part = list[i];

            id += part.charAt(0).toUpperCase() + part.slice(1);
        }
        return id;
    }

    static loadController = (root: string) => {
        const list: any[] = [];
        try {
            const dir = root;

            const files = fs.readdirSync(dir);

            for (let i = 0; i < files.length; i++) {
                const filename = path.basename(files[i]);
                const index = filename.indexOf('Controller.');

                if (index !== -1) {
                    const identity = `${ControllerUtil.getControllerName(filename.substring(0, index))}Controller`;

                    // var router = require(dir + '/' + filename).default;
                    const ctrl = require(`${dir}/${filename}`);

                    const c = new ctrl[identity]();
                    const rtr = Router();
                    if (c.routes && c.routes.length > 0) {
                        c.configureRouter(rtr);
                        list.push(c);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
        return list;
    };

    static configureController = (root: string, app: any) => {
        const routes: any[] = ControllerUtil.loadController(root);
        routes.map(route => {
            app.use(route.path, route.router);
            // app.use('/', route.router);
        });
    };
}
