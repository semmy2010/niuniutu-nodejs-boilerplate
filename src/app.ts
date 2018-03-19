/**
 * @author Semmy
 *
 */
import * as path from 'path';
import * as Koa from 'koa';
import * as body from 'koa-body';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session2';
import * as koaStatic from 'koa-static2';
import * as cors from 'koa2-cors';
import * as convert from 'koa-convert';
import * as views from 'koa-views';
import 'reflect-metadata';
import { createKoaServer, useKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import './config/log-config';
import EnvConstant from './common/env-constant';
import { getLogger, getKoaLogger } from './common/utils';

useContainer(Container);

const logger = getLogger('app');

//初始化koa
const app = new Koa();
useKoaServer(app, {
    controllers: [path.join(__dirname, '/controllers/*.js')],
    middlewares: [path.join(__dirname, '/middlewares/*.js')],
    interceptors: [path.join(__dirname, '/interceptors/*.js')]
});

//配置http请求log
app.use(getKoaLogger());

//配置ctx.request.body解析中间件
app.use(bodyParser());
app.use(
    body({
        multipart: true,
        strict: false,
        jsonLimit: '20mb',
        formLimit: '10mb',
        textLimit: '20mb',
        formidable: {
            uploadDir: path.join(__dirname, './attachment')
        }
    })
);

// 配置静态资源加载中间件
app.use(convert(koaStatic(path.join(__dirname, '../static'))));

// 配置服务端模板渲染引擎中间件;
app.use(
    views(path.join(__dirname, '../views'), {
        map: { html: 'ejs' },
        extension: 'html'
    })
);

// 监听启动端口
app.listen(EnvConstant.SERVER_PORT);
logger.debug('应用启动成功！！！');
