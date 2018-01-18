/**
 * @author Semmy
 *
 * @flow
 */
import fs from 'fs';

export default class Controllers {
    static init() {
        const result = [];
        fs
            .readdirSync(__dirname)
            .filter(f => {
                return f.endsWith('.js') && f !== 'index.js';
            })
            .forEach(f => {
                let mapping = require(__dirname + '/' + f);
                result.push(mapping.default);
            });
        return result;
    }
}
