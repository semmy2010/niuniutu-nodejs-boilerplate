import * as log4js from 'koa-log4';

export function getLogger(category?: string) {
    const logger = log4js.getLogger(category);
    return logger;
}
export function getKoaLogger() {
    return log4js.koaLogger(getLogger('http'), { level: 'auto' });
}
