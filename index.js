function Ttl(storage, opt) {
    opt = opt || {};

    var ttl = opt.ttl || 0;

    var old_get = storage.get;
    var old_set = storage.set;

    storage.get = function(key, cb) {
        return old_get.call(storage, key, function(err, value) {
            if (err) {
                return cb(err);
            }

            if (!value) {
                return cb();
            }

            var is_fresh = value.t > Date.now();
            var data = value.d;

            if (is_fresh) {
                return cb(null, data, value.t);
            }

            cb();
        });
    };

    storage.set = function(key, value, cb) {
        var data = {
            t: Date.now() + ttl,
            d: value
        };

        return old_set.call(storage, key, data, cb);
    };

    return storage;
};

module.exports = Ttl;

