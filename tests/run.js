var tape = require('tape')
var log = require('../')
var tests = require('./')

var common = {
  setup: function(t, cb) {
    // make a new log instance on every test
    cb(null, log())
  },
  teardown: function(t, log, cb) {
    cb()
  }
}

tests(tape, common)
