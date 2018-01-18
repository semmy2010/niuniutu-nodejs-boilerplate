/**
 * @author Semmy
 *
 * @flow
 */
import path from 'path';
import Koa from 'koa';
import body from 'koa-body';
import session from 'koa-session2';
import log4js from 'koa-log4';
import koaStatic from 'koa-static2';
import cors from 'koa2-cors';
import convert from 'koa-convert';
import views from 'koa-views';
import config from './config';

import routers from './routers';

const logger = log4js.getLogger('app');

const app = new Koa();

//配置日志中间件
app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));

//配置ctx.request.body解析中间件
app.use(
    body({
        multipart: true,
        strict: false,
        jsonLimit: '20mb',
        formLimit: '10mb',
        textLimit: '20mb',
        formidable: {
            ploadDir: path.join(__dirname, './attachment')
        }
    })
);

// 配置静态资源加载中间件
app.use(convert(koaStatic(path.join(__dirname, './public'))));

// 配置服务端模板渲染引擎中间件
app.use(
    views(path.join(__dirname, './views'), {
        extension: 'html'
    })
);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

// 监听启动端口
app.listen(config.PORT);
logger.debug('应用启动成功！！！');
