import * as http from 'http';
import { Logger } from '@slice/logger';

const DefaultPort = 5555;

let PORT: string | number = process.env.PORT || DefaultPort;

function onError(error: NodeJS.ErrnoException): void {
    PORT = process.env.PORT || DefaultPort;

    if (error.syscall !== 'listen') throw error;
    const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

    switch (error.code) {
        case 'EACCES':
            Logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            Logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        case 'SIGTERM':
            Logger.error(error.stack ? error.stack : error.toString());
            process.exit(1);
            break;
        case 'SIGINT':
            Logger.error(error.stack ? error.stack : error.toString());
            process.exit(1);
            break;
        default:
            Logger.log(error.stack ? error.stack : error.toString());
            throw error;
    }
}

function onListening(): void {
    PORT = process.env.PORT || DefaultPort;

    Logger.info(`server started on http://127.0.0.1:${PORT}; press Ctrl-C to terminate.`);
}

export class ServerUtil {
    static configureServer = (server: http.Server) => {
        PORT = process.env.PORT || DefaultPort;

        server.on('error', onError);
        server.on('listening', onListening);

        return server;
    };

    static startServer = (server: http.Server) => {
        PORT = process.env.PORT || DefaultPort;

        server.listen(PORT);
    };
}
