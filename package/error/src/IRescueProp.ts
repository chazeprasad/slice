import { ApiError } from './ApiError';
export interface IRescueProp {
    rescueFrom: typeof ApiError;
    with: any;
}
