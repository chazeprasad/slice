import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compress from 'compression';
import * as methodOverride from 'method-override';
import * as expressWinston from 'express-winston';

global.Promise = require('q').Promise;

export class AppUtil {
    static configureApp = (app): express.Application => {
        if (process.env.NODE_ENV === 'development') {
            app.use(logger('dev'));
        }

        // secure apps by setting various HTTP headers
        app.use(helmet());
        // enable CORS - Cross Origin Resource Sharing
        const corsOptions = {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 200,
        };

        // app.options('*', cors(corsOptions))
        app.use(cors(corsOptions));

        app.use(bodyParser.json());
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );

        app.use(cookieParser());
        app.use(compress());
        app.use(methodOverride());

        // enable detailed API logging in dev env
        if (process.env.NODE_ENV === 'development') {
            expressWinston.requestWhitelist.push('body');
            expressWinston.responseWhitelist.push('body');
        }

        return app;
    };
}
