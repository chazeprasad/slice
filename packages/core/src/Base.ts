import { Logger } from '@slice/logger';
import { Injector } from '@slice/inject';

export class Base {
    public log: any;
    public name: string;
    public injects: Array<any>;
    public injectable: boolean;

    public static NAME: string;

    constructor() {
        this.name = this.constructor.name;
        this.log = msg => Logger.print(msg, undefined, `${this.name}`);

        this.injects = this.injects || [];

        console.log(this.name);
        console.log(this.injects);
        this.injects.map(x => {
            this[x.injectName] = Injector.resolve(x.source.name);
        });

        this.injectable && Injector.add(this, this.name);
    }
}
