import debug from 'debug';

const BASE = 'App';

// const COLOUR = {
//     LOG: '#1abc9c',
//     TRACE: '#6ab04c',
//     INFO: '#0abde3',
//     WARN: '#f39c12',
//     ERROR: '#eb3b5a',
// };

const enabled = true; // process.env.NODE_ENV === AppEnv.PRODUCTION

const GenerateMessage = (context, level, message, source) => {
    const namespace = `${context}:${level}`;
    const log = debug(namespace);
    // log.color = COLOUR[level]

    log.enabled = enabled;

    debug.enable(namespace);

    if (source) {
        log(source, message);
    } else {
        log(message);
    }
};

export class Logger {
    public static trace(message, source?, context = BASE) {
        return GenerateMessage(context, 'TRACE', message, source);
    }

    public static log(message, source?, context = BASE) {
        return GenerateMessage(context, 'LOG', message, source);
    }

    public static info(message, source?, context = BASE) {
        return GenerateMessage(context, 'INFO', message, source);
    }

    public static warn(message, source?, context = BASE) {
        return GenerateMessage(context, 'WARN', message, source);
    }

    public static error(message, source?, context = BASE) {
        return GenerateMessage(context, 'ERROR', message, source);
    }

    public static print(message, source?, context = BASE) {
        return GenerateMessage(context, 'INFO', message, source);
    }
}
