/**
 * @author Semmy
 *
 */
import fetch from 'node-fetch';

import EnvConstant from './env-constant';
import { getLogger } from './utils';

const logger = getLogger();
const apiDomain = EnvConstant.API_DOMAIN;

const TIME_OUT = 10 * 1000;

export default class Http {
    static defaultHeader = {
        Accept: '*/*',
        'Content-Type': 'application/json;charset=UTF-8'
    };
    static defaultParams = {
        _: Date.now()
    };

    private static _replaceParam(url, params) {
        let result = /\$\{(.+?)\}/.exec(url);
        while (result) {
            if (params[result[1]] !== undefined) {
                url = url.replace(/\$\{(.+?)\}/, params[result[1]]);
                delete params[result[1]];
            }
            result = /\$\{(.+?)\}/.exec(url);
        }
        return { url: /^http:\/\//.test(url) ? url : apiDomain + url, params: params };
    }
    private static _toQueryString(obj) {
        return obj
            ? Object.keys(obj)
                  .sort()
                  .map(function(key) {
                      var val = obj[key];
                      if (Array.isArray(val)) {
                          return val
                              .sort()
                              .map(function(val2) {
                                  return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                              })
                              .join('&');
                      }

                      return encodeURIComponent(key) + '=' + encodeURIComponent(val);
                  })
                  .join('&')
            : '';
    }
    private static _fetch(reqPromise, timeout) {
        let timeoutFn = null;
        const timeoutPromise = new Promise((resolve, reject) => {
            timeoutFn = function() {
                reject(new Error('请求超时'));
            };
        });

        const fetchPromise = Promise.race([reqPromise, timeoutPromise]);
        setTimeout(function() {
            timeoutFn();
        }, timeout);

        return fetchPromise;
    }

    private static _get(url: string, params = {}, header?: any) {
        let option = {
            credentials: 'include',
            method: 'get',
            headers: Object.assign({}, Http.defaultHeader, header)
        };
        const result = Http._replaceParam(url, params);
        const queryString = Http._toQueryString(result.params);
        result.url = `${result.url}${queryString == '' ? '' : '?' + queryString}`;

        logger.debug('发送get请求[%s]', result.url);
        return fetch(result.url, option)
            .then(res => {
                return res.json();
            })
            .catch(err => {
                logger.warn('网络请求失败[%s][%s]', result.url, err);
            });
    }

    private static _post(url: string, params = {}, header?: any) {
        const result = Http._replaceParam(url, params);

        const option = {
            credentials: 'include',
            method: 'post',
            headers: Object.assign({}, Http.defaultHeader, header),
            body: JSON.stringify(result.params)
        };

        logger.debug('发送post请求[%s]', result.url);
        return fetch(result.url, option)
            .then(res => {
                return res.json();
            })
            .catch(err => {
                logger.warn('网络请求失败[%s][%s]', result.url, err);
            });
    }

    static setDefaultHeader(header: any) {
        Object.assign(Http.defaultHeader, header);
    }

    static get(url: string, params = {}, header?: any) {
        return Http._fetch(Http._get(url, params, header), TIME_OUT).catch(err => {
            logger.warn('请求超时出错[%s][%s]', url, JSON.stringify(params));
        });
    }

    /**
     * 同时发起多个请求
     * @param {*} reqs 多个请求的参数，
     * 数据结构：
     * {url:'url',params:{}}
     */
    static getAll(reqs = []) {
        if (reqs.length === 0) {
            return {};
        }
        let option = {
            credentials: 'include',
            method: 'get',
            headers: Http.defaultHeader
        };
        for (let req of reqs) {
            let { url, params } = Http._replaceParam(req.url, req.params);
            const queryString = Http._toQueryString(params);
            req.url = `${url}${queryString == '' ? '' : '?' + queryString}`;
            req.params = null;
        }
        return Promise.all(reqs.map(req => fetch(req.url, option).then(res => res.json()))).then(results => {
            return results;
        });
    }

    static post(url: string, params = {}, header?: any) {
        return Http._fetch(Http._post(url, params, header), TIME_OUT).catch(err => {
            logger.warn('请求超时出错[%s]', url);
        });
    }

    static formPost(url, params = {}, header) {
        const result = Http._replaceParam(url, params);

        let formData = new FormData();
        for (let key in result.params) {
            formData.append(key, result.params[key]);
        }
        const option = {
            credentials: 'include',
            method: 'post',
            headers: Object.assign({}, Http.defaultHeader, { 'Content-Type': 'multipart/form-data' }, header),
            body: formData
        };

        logger.debug('发送post请求[%s]', result.url, option);
        return fetch(result.url, option)
            .then(res => {
                return res.json();
            })
            .catch(err => {
                logger.warn('网络请求失败[%s][%s]', result.url, err);
            });
    }

    static postAll(reqs = []) {
        if (reqs.length === 0) {
            return {};
        }
        for (let req of reqs) {
            let { url, params } = Http._replaceParam(req.url, req.params);
            req.url = url;
            req.params = params;
            req.option = {
                credentials: 'include',
                method: 'post',
                headers: Http.defaultHeader,
                body: JSON.stringify(params)
            };
        }

        return Promise.all(reqs.map(req => fetch(req.url, req.option).then(res => res.json()))).then(results => {
            return results;
        });
    }
}
