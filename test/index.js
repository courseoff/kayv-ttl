var assert = require('assert');
var kayv = require('kayv');
var ttl = require('../');

var db = kayv('foobar');

// ttl wrap for a timeout of 500 ms
db = ttl(db, {
    ttl: 500
});

test('set', function(done) {
    db.set('foo', 'bar', done);
});

test('get', function(done) {
    db.get('foo', function(err, val) {
        assert.equal(val, 'bar');
        done();
    });
});

test('wait for ttl', function(done) {
    // wait so that value will become stale
    setTimeout(done, 600);
});

test('get after ttl should result in undefined', function(done) {
    db.get('foo', function(err, val) {
        assert.ifError(err);
        assert.equal(val, undefined);
        done();
    });
});
