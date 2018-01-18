/**
 * @author Semmy
 *
 * @flow
 */

// 环境常量:DEBUG RELEASE
const ENV = 'DEBUG';

export const constant = {
    PORT: {
        DEBUG: 3000,
        RELEASE: 3000
    }
};

const config = {
    IS_PRODUCTION_ENV: ENV === 'RELEASE',
    PORT: constant.PORT[ENV]
};

export default config;
