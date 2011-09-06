
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

exports ['fallthrough passes it\' args to the callback + null error param'] = function (test){
  async.fallthrough(1,2,3, function () {
    var args = [].slice.call(arguments)
    it(args).deepEqual([null,1,2,3])
    test.done()
  })
}


var _err = new Error ('INTENSIONAL ERROR')

function willThrow () { 
  var callback = [].pop.call(arguments)
  callback (_err)
}

function expectThrow (err,callback) {
  it(err).equal(_err)    
  callback(null, 'success')
}


exports ['tryCatchPass call catch on error'] = function (test) {

  async.tryCatchPass(
    willThrow,
    expectThrow,
    null)
  (function (err,suc) {
    it(err).equal(null)
    it(suc).equal('success')
    test.done()
  })

}

exports ['safe catches sync throws'] = function (test) {
    var _err = new Error('SYNC ERROR')
  async.safe(function () {
    throw _err
  })
  (async.delay(function (err) {
    it(err).equal(_err)
    test.done() 
  }))

}

exports ['safe prevents double callback'] = function (test) {
    var _err = new Error('SYNC ERROR')
  async.safe(function (callback) {
    console.log('ignore double call message')
    callback()
    callback(_err)
  })
  (async.delay(function (err) {
    it(err).equal(null)
    test.done() 
  }))
}

exports ['tryCatchPass call pass on no error'] = function (test) {

  async.tryCatchPass(
    function (callback) {
      callback(null, 'success')
    },
    null,
    function (suc, callback) {
      it(suc).equal('success')
      callback(null, 'success')
    })
  (function (err,suc) {
    it(err).equal(null)
    it(suc).equal('success')
    test.done()
  })

}

exports ['tryCatchPass methods are async safe (throws)'] = function (test) {

  async.tryCatchPass(
    function (callback) {
      callback(null, 'success')
    },
    null,
    function (suc, callback) {
      throw _err
    })
  (function (err) {
    it(err).equal(_err)
    test.done()
  })

}

exports ['tryCatchPass methods are async safe (double calls)'] = function (test) {

  async.tryCatchPass(
    function (callback) {
      callback(null, 'success')
    },
    null,
    function (suc, callback) {
      console.log('ignore double call message')
      callback(null, 'success')
      callback(_err)
    })
  (function (err, suc) {
    it(err).equal(null)
    it(suc).equal('success')
    test.done()
 })

}

exports[ 'toAsync: convert sync function to async'] = function (test) {

  async.toAsync(Math.random)(function(err, r) {
    it(0 <= r && r <= 1).equal(true)
    test.done()
  })

}