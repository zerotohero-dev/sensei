'use strict';

/*
 * sensei — The Sensu API Wrapper
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

exports.tryParseJson = function(text) {
    try {
        return JSON.parse(text);
    } catch(ignore) {
        return null;
    }
};

exports.objectify = function(obj) {
    return exports.isObject(obj) ? obj : {};
};

exports.isFunction = function(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
};

exports.isObject = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

exports.detectCallback = function() {
    var i = 0, current;

    for (i = 0; i < arguments.length; i++) {
        current = arguments[i];

        if (exports.isFunction(current)) {
            return current;
        }
    }

    return null;
};
