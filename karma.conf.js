/**
 * ES5 code for compatibility with Karma
 *
 * See karma.conf.babel.js for ES6 code
 */

require('babel-core/register');
module.exports = require('./karma.conf.babel').default;
