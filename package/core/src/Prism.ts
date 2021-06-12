import * as express from 'express';
import * as http from 'http';
import { Base } from './Base';
import { AppUtil } from './AppUtil';
import { ServerUtil } from './ServerUtil';

export interface AppConfig {
    appRoot: string | any;
    staticRoot?: string;
    cors?: any;
}

export class Prism extends Base {
    public appConfig: AppConfig;

    public app: express.Application;

    public server: http.Server;

    constructor(config: AppConfig) {
        super();

        this.preInitialize(config);
    }

    preInitialize(config: AppConfig) {
        this.appConfig = config;
        this.app = express();
        AppUtil.configureApp(this.app);
    }

    // initialize() {
    //     AppUtil.configureApp(this.app);
    //     configureController(`${this.appConfig.config.appRoot.path}/src/app/controller`, this.app);
    //     configureExceptionHandler(`${this.appConfig.config.appRoot.path}/src/app/error`, this.app);
    // }

    setup() {
        this.server = http.createServer(this.app);
        ServerUtil.configureServer(this.server);
    }

    startup() {
        // this.initialize();
        this.setup();
        ServerUtil.startServer(this.server);
    }
}
