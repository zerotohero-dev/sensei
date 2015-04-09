                                                          _/
         _/_/_/    _/_/    _/_/_/      _/_/_/    _/_/
      _/_/      _/_/_/_/  _/    _/  _/_/      _/_/_/_/  _/
         _/_/  _/        _/    _/      _/_/  _/        _/
    _/_/_/      _/_/_/  _/    _/  _/_/_/      _/_/_/  _/

## About

**sensei** is a minimal **Node.JS** wrapper around the [sensu-api](http://sensuapp.org/docs/0.16/api_overview).

## Installation

It’s easy to install **sensei** via [npm](https://www.npmjs.com/):

```bash
npm install sensei;
```
## Usage

```js
var sensei = require('sensei');

var sensu = sensei.create({
    // your sensu-api url
    url: 'http://152.12.124.37:4567'
    username: 'your sensu-api username',
    password: 'your sensu-api password'
});

sensu.getEvents({
    client: 'name-of-sensu-client',
    check: 'name-of-sensu-check'
}).then(function(data) {
    // Called when the API call successfully finishes.
    // `data` has all the information you need.
    console.log(data)
}, function(error) {
    // Called when an error occurs during the API call; check the `error` object.
});

// Since all sensei methods return a promise you can do all kinds of fancy
// things that involves promises:

var Q = require('q');

Q.all([
    sensu.getHealth({
        consumers: 2,
        messages: 4
    }),
    sensu.getInfo()
]).spread(function(isHealthy, sensuInfo) {
    console.log(isHealthy);
    console.log(sensuInfo);
}).then(function() {
    return sensu.getStashes().then(function(stashes) {
        console.log(stashes);
    })
}, function(err) {
    console.log('oops');
    console.log(err);
}).fin(function() {
    console.log('all done!');
});
```

`sensei.create(options)` is a factory method that creates a **sensei** instance.

`options` should be in the `{url: url, username: username, password: password}` format.

The created object has the following methods:

* `getInfo()` (*returns a `Promise`*)
* `getChecks(name)` (*`name` is optional; returns a `Promise`*)
* `getClients(options)` (*returns a `Promise`*)
* `getEvents(options)` (*returns a `Promise`*)
* `getHealth(options)` (*returns a `Promise`*)
* `getStashes(options)` (*returns a `Promise`*)

The `options` argument that’s passed to the methods expect attribute names, values, and data types that have been described [in the sensu API](http://sensuapp.org/docs/0.16/api_overview).

### Wanna Help?

If you find something missing, [please file an issue](http://sensuapp.org/docs/0.16/api_overview).

If you want to contribute, see **[CONTRIBUTING.md](CONTRIBUTING.md)**.

### Supported Environments

You should be able to use **sensei** in any platform that runs **[Node.JS](http://nodejs.org/)**.

### Backwards Compatibility

The code is in its early alpha; and we **MAY** introduce breaking changes that might be backwards incompatible.

After we hit **version 1.0.0**, we’ll follow [Semantic Versioning Standards](http://semver.org/), and only introduce breaking changes when we update the **MAJOR** version number.

> **Hint**:
>
> You can always install an older version from [npm](https://www.npmjs.com/package/sensei).

### I’ve Found A Bug / I have an Idea!

[Please file an issue](https://github.com/cisco-cloud/sensei/issues).

And also you might want to see **[CONTRIBUTING.md](CONTRIBUTING.md)**.

### Contact Information

* **Project Owner**: [Volkan Özçelik](http://volkan.io/)

### License

MIT-Licensed.

See **[LICENSE.md](LICENSE.md)**.
