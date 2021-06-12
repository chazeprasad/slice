import { Base } from '@slicejs/core';
import { ApiError } from './ApiError';
import { IRescueProp } from './IRescueProp';
import { IRescueResultProp } from './IRescueResultProp';

export class BaseExceptionHandler extends Base {
    public list: IRescueProp[] = [];

    static handle(error: ApiError, list: IRescueProp[]): IRescueResultProp {
        for (let i = 0; i < list.length; i++) {
            const prop = list[i];
            if (error instanceof prop.rescueFrom) {
                return prop.with.apply(null, [error]);
            }
        }

        return {
            message: 'Unknown Error',
            status: 500,
        };
    }
}
