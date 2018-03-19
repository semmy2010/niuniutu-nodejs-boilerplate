import * as log4js from 'koa-log4';
import EnvConstant from '../common/env-constant';

log4js.configure({
    appenders: {
        consoleAppender: { type: 'console' },
        dateFileAppender: { type: 'dateFile', filename: './logs/app-server.log' }
    },
    categories: {
        http: { appenders: ['consoleAppender'], level: EnvConstant.HTTP_LOG_LEVEL },
        default: { appenders: ['consoleAppender', 'dateFileAppender'], level: EnvConstant.DEFAULT_LOG_LEVEL }
    }
});
