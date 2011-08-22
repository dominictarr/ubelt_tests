
var async = require('d-utils/async')
  , it = require('it-is')

//delay will delay the invocation a function by it's second args

exports ['delay'] = function (test) {
  var checked = false
    , done = 
  async.delay(function () {
    it(checked).ok()
    it([].slice.call(arguments)).deepEqual([1,2,3])
    test.done()
  })
  it(done).function()
  checked = true
  done(1,2,3)
}

exports ['compose'] = function (test) {
  var called = 0
    , go =
  async.compose(function (x, callback) {
    called ++
    it(x).equal(7)
    callback(36)
  }, function (y, callback) {
    called += 10
    it(y).equal(36)
    callback()
  })
  
  go(7, function () {
    it(called).equal(11)
    test.done()
  })
}

exports ['compose 3 async functions'] = function (test) {
  var called = 0
    , go =
  async.compose(function (x, callback) {
    called ++
    it(x).equal(7)
    callback(36)
  }, function (y, callback) {
    called += 10
    it(y).equal(36)
    callback(23)
  }, function (z, callback) {
    called += 100
    it(z).equal(23)
    callback()
  })
  
  go(7, function () {
    it(called).equal(111)
    test.done()
  })

}