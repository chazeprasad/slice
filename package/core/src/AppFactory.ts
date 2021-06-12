import { Prism, AppConfig } from './Prism';

export class AppFactory {
    public static create(appConfig: AppConfig) {
        const prism: Prism = new Prism(appConfig);
        prism.startup();

        return prism.app;
    }
}
