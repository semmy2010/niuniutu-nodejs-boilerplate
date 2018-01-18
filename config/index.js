/**
 * @author Semmy
 *
 * @flow
 */
import { ENV_CONSTANT } from './env-constant';

// 环境常量:DEBUG RELEASE
const ENV = ENV_CONSTANT.ENV.DEBUG;

const CONFIG = {
    IS_PRODUCTION_ENV: ENV === ENV_CONSTANT.ENV.RELEASE,
    PORT: ENV_CONSTANT.PORT[ENV]
};
export default CONFIG;
