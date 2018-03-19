import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import { getLogger } from '../common/utils';
import Http from '../common/http';

const logger = getLogger('AuthorizationMiddleware');

@Middleware({ type: 'before' })
export class AuthorizationMiddleware implements KoaMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        Http.setDefaultHeader({ Authorization: context.headers.authorization });
        return next().catch(err => {
            logger.error('系统发生未知错误[%s]', JSON.stringify(err));
        });
    }
}
