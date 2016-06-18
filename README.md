# append-only-log

> Abstract interface for an append-only log.

Like [abstract-blob-store](https://github.com/maxogden/abstract-blob-store), but
for append-only logs.

## Usage

To use the test suite from this module, use `require('append-only-log/tests')`.

You'll have to implement a setup and teardown function:

```js
var common = {
  setup: function(t, cb) {
    // setup takes a tap/tape compatible test instance in and a callback
    // this method should construct a new blob store instance and pass it to the callback:
    var log = createMyLog()
    cb(null, log)
  },
  teardown: function(t, log, blob, cb) {
    // teardown takes in the test instance, as well as the log instance
    // you can use the log to clean up its data, e.g.
    if (log) {
      var stream = log.createReadStream()
      stream.on('data', function (entry) {
        entry.cleanup()
      })
      stream.on('end', cb)
    } else cb()
    // be sure to call cb() when you are done with teardown
  }
}
```

To run the tests simply pass your test module (tap or tape or any other
compatible modules are supported) and your common methods in:

```js
var appendOnlyLogTests = require('append-only-log/tests')
appendOnlyLogTests(test, common)
```

## API

A valid append-only log should implement the following APIs. There is a
reference in-memory implementation available at `index.js` in this repo.

### log.append(value, cb)

Appends `value` to the end of the log. If a function `cb` is given, it will be
called asynchronously as `function (err, seq)`. `seq` is the sequence number of
the appended entry.

### log.get(seq, cb)

Gets the value with sequence number `seq` from the log asynchronously. `cb` has
the signature `function (err, value)`.

### log.createReadStream(opts)

Returns a Readable stream of values in the append-only log, starting from the
most recently appended. Some implementations may accept `opts.reverse` for
reversed entries, but this is not guaranteed.


## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install append-only-log
```

## Acknowledgments

`append-only-log` was inspired by
[abstract-blob-store](https://github.com/maxogden/abstract-blob-store).

## See Also

- [`noffle/common-readme`](https://github.com/noffle/common-readme)

## License

ISC
