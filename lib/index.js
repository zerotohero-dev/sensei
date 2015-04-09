'use strict';

/*
 * sensei — The Sensu API Wrapper
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var request = require('./request'),
    util = require('./util');

function Sensu(options) {
    this.url = options.url;
    this.credentials = {
        username: options.username,
        password: options.password
    };

    if (!this.url) {
        throw new Error(
            'API url is required. ' +
            'Format: "http://127.0.0.1:4567". See the Sensu docs.'
        );
    }

    this.url = this.url.replace(/\/$/, '');
}

Sensu.prototype.getChecks = function(name) {
    return request.send(
        this.url + '/checks/' + name || '',
        this.credentials,
        {}
    );
};

Sensu.prototype.getClients = function(options) {
    var opt = util.objectify(options),
        url = this.url + '/clients/';

    if (opt.name) {
        url += opt.name;
    }

    if (opt.history) {
        url += '/history';
    }

    return request.send(
        url,
        this.credentials,
        opt
    );
};

Sensu.prototype.getEvents = function(options) {
    var opt = util.objectify(options),
        url = this.url + '/events/';

    if (opt.client) {
        url += opt.client;
    }

    if (opt.check) {
        url = url + '/' + opt.check;
    }

    return request.send(
        url,
        this.credentials,
        opt
    );
};

Sensu.prototype.getHealth = function(options) {
    return request.send(
        this.url + '/health',
        this.credentials,
        util.objectify(options)
    );
};

Sensu.prototype.getInfo = function() {
    return request.send(
        this.url + '/info',
        this.credentials,
        {}
    );
};

Sensu.prototype.getStashes = function(options) {
    return request.send(
        this.url + '/stashes',
        this.credentials,
        util.objectify(options)
    );
};

/**
 * This is the public interface.
 */
exports.create = function(options) {
    return new Sensu(options);
};
