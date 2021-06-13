import 'reflect-metadata';
import { HttpStatus } from '@slice/status';
import { BaseExceptionHandler } from './BaseExceptionHandler';
import { ApiError } from './ApiError';
import { IRescueProp } from './IRescueProp';
import { IRescueResultProp } from './IRescueResultProp';

export const INJECT_PREFIX = '$$inject_';

export class ErrorUtil {
    public static loadExceptionHandler = (root: string) => {
        const dir = root;
        let list: IRescueProp[] = [];

        try {
            const Handler = require(`${dir}/api.exception`);
            list = Handler.include;
        } catch (error) {
            console.log(error);
        }

        return list;
    };

    public static configureExceptionHandler = (root: string, app?: any) => {
        const handler: IRescueProp[] = ErrorUtil.loadExceptionHandler(root);

        app.all('*', (req, res, next) => {
            res.status(404).json({
                status: 'error',
                message: `Can't find ${req.originalUrl} on this server!`,
            });
        });

        app.use((err: Error, req, res, next) => {
            let result: IRescueResultProp = {
                message: 'Unknown Error',
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            };

            if (err instanceof ApiError) {
                if (handler) {
                    result = BaseExceptionHandler.handle(err, handler);
                } else {
                    result = {
                        message: 'Unknown Error',
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                    };
                }
            } else {
                result = {
                    message: err.message,
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                };
            }

            res.status(result.status).json({
                status: 'error',
                message: result.message,
                stack: process.env.NODE_ENV === 'production' ? {} : err.stack,
            });
        });
    };
}
