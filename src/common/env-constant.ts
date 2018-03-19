/**
 * @author Semmy
 *
 */
//常量
const Constant = {
    ENV: {
        DEBUG: 'DEBUG',
        TEST: 'TEST',
        PREP: 'PREP',
        RELEASE: 'RELEASE'
    },
    SERVER_PORT: {
        DEBUG: 3000,
        TEST: 3000,
        PREP: 3000,
        RELEASE: 3000
    },
    API_DOMAIN: {
        DEBUG: 'http://test.cn/api',
        TEST: 'http://test.cn/api',
        PREP: 'http://preprod.cn/api',
        RELEASE: 'https://release.cc/api'
    },
    HTTP_LOG_LEVEL: {
        DEBUG: 'debug',
        TEST: 'debug',
        PREP: 'debug',
        RELEASE: 'warn'
    },
    DEFAULT_LOG_LEVEL: {
        DEBUG: 'debug',
        TEST: 'debug',
        PREP: 'debug',
        RELEASE: 'warn'
    }
};

// 环境常量:DEBUG/TEST/PREP/RELEASE
const ENV = Constant.ENV.DEBUG;
const EnvConstant = {
    IS_PRODUCTION_ENV: ENV === Constant.ENV.RELEASE,
    SERVER_PORT: Constant.SERVER_PORT[ENV],
    API_DOMAIN: Constant.API_DOMAIN[ENV],
    HTTP_LOG_LEVEL: Constant.HTTP_LOG_LEVEL[ENV],
    DEFAULT_LOG_LEVEL: Constant.DEFAULT_LOG_LEVEL[ENV]
};
export default EnvConstant;
