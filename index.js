var from = require('from2')

function Log () {
  if (!(this instanceof Log)) return new Log()

  this.entries = []
}

Log.prototype.append = function (value, cb) {
  var idx = this.entries.push(value)
  if (cb) {
    process.nextTick(function () {
      cb(null, idx)
    })
  }
}

Log.prototype.get = function (seq, cb) {
  var value = this.entries[seq]
  if (cb) {
    process.nextTick(function () {
      cb(null, value)
    })
  }
}

Log.prototype.createReadStream = function (opts) {
  opts = opts || {}

  var list = this.entries
  if (opts.reverse) {
    var self = this
    list = this.entries.map(function (entry, idx) {
        return self.entries[self.entries.length - 1 - idx]
      })
  }

  list = list.map(function (entry, idx) {
    return {
      seq: idx,
      value: entry
    }
  })

  return from.obj(list)
}

module.exports = Log
