module.exports.noop = function(test, common) {
  test('the test harness runs', function(t) {
    common.setup(test, function(err, log) {
      t.plan(1)
      process.nextTick(function () { t.end() })
    })
  })
}

module.exports.all = function (test, common) {
  module.exports.noop(test, common)
}
