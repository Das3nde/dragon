/**
 * ES5 code for compatibility with Jasmine
 *
 * See jasmine.babel.js for ES6 code
 */

require('babel-core/register');
module.exports = require('./jasmine.babel').default;
