# kayv-ttl

Timeout cache on top of kayv

```js
var kayv = require('kayv');

var db = kayv('prefix');

// items we `set` into the db will expire after 1000 ms (`ttl`)
db = ttl(db, {
    ttl: 1000
});
```

## api

### ttl(db, opt)

* `db` should be an instance of `Db` returned by a call to `kayv`
* `opt` is a plain js object described below

**Options**

* `ttl` timeout in milliseconds before item is considered stale
