'use strict';

/*
 * sensei — The Sensu API Wrapper
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

// TODO: use the `request` module instead.
var request = require('superagent'),
    Q = require('q'),

    util = require('./util'),

    GENERIC_ERROR_MESSAGE = 'Unknown API error!';

exports.send = function(url, sensu, opt) {
    var deferred = Q.defer();

    request
        .get(url)
        .auth(sensu.username, sensu.password)
        .query(util.objectify(opt))
        .end(function(err, res) {
            var result = {};
            if (err) {
                deferred.reject(GENERIC_ERROR_MESSAGE);

                return;
            }

            if (res.status === 200) {
                result = util.tryParseJson(res.text);

                if (!result) {
                    deferred.reject(GENERIC_ERROR_MESSAGE);

                    return;
                }

                deferred.resolve(result);
            }

            if (res.status === 204) {
                deferred.resolve(true);

                return;
            }

            deferred.reject(GENERIC_ERROR_MESSAGE);
        });

    return deferred.promise;
};
