
var funx = require('ubelt/functions')
  , it = require('it-is')

exports ['identity function'] = function () {

  var a = []

  it(funx.id(1)).equal(1)
  it(funx.id(null)).equal(null)
  it(funx.id(a)).equal(a)
  it(funx.id(funx.id)).equal(funx.id)

}

//
// curry(func, args...)
// curry(func, 0) -> function (a) { return func(a) }
// curry(func, 0, 'whatever') -> function (a) { return func(a, 'whatever') }
// curry(func, 0, 'whatever', -1) -> function (a, b) { return func(a, 'whatever', b) }
//

exports['curry'] = function () {
  var called = 0

  it(funx.curry(function (hi) {
    called ++
    return hi
  }, 0)('hello2')).equal('hello2')

  it(funx.curry(function (hi) {
    called ++
    return hi
  }, 'hello3', 0)('ignore')).equal('hello3')
}

exports['curry, with negative indexes'] = function () {
  var called = 0

  it(funx.curry(function (ig, hi) {
    called ++
    return hi
  }, -2, -1)(1, 4, [], 'hello2')).equal('hello2')
  it(funx.curry(function (hi) {
    called ++
    return hi
  }, -2, -1)(1, 4, 'hello2', {})).equal('hello2')

}

exports ['deepCurry merges args'] = function () {

  function returnArgs () {
    return [].slice.call(arguments)
  }
  var r = Math.random()
    , s = Math.random()

  var rand = funx.deepCurry(returnArgs, r)

  it(rand).isFunction()
  it(rand()).equal(r)
  it(rand()).deepEqual([r])
  it(rand(undefined, s)).deepEqual([r, s])

  var hi = funx.deepCurry(returnArgs, {rand:r})

  it(hi({})).deepEqual([{rand: r}])

}

/*
  before returns a function that gets called with the args to another function, 
  and has tha chance to change the args.


*/

exports ['before'] = function () {
  var called = 0
    , A = Math.random()
    , B = Math.random()
    , C = Math.random()
    ;

  function ab (a, b) {
    called ++
    return [a, b]
  }

  var _ab = funx.before(ab, function (args) {
    called ++
    return [args[0], args[2]]
  })

  it(_ab(A,B,C)).deepEqual([A,C])
  it(called).equal(2)
}

exports ['beforeCallback'] = function () {
  var called = 0
    , A = Math.random()
    , B = Math.random()
    , C = Math.random()
    ;

  function async(x, callback) {
    callback (null, B, x, C)
  }

  var _async = funx.beforeCallback(async, function (args) {
    called ++
    return [args[0], args[2]]
  })

  _async (A, function (err, xyz) {
    called ++
    it(xyz).equal(A) 
  })

  it(called).equal(2)
}


exports ['defer'] = function () {

  var called = 0
    , calledWith = []
    ;

  function checker() {
    called ++
    calledWith.push([].slice.call(arguments))
  }

  var defered = funx.defer(checker)
  
  it(called).equal(0)
  defered(1)
  defered(1,2,3)
  defered(['boats'])
  it(called).equal(0)

  defered.flush() //empty 

  it(calledWith).deepEqual([
    [1],
    [1,2,3],
    [['boats']]
  ])
  
  it(called).equal(3)

  defered(777)
  defered(null)
  defered([true, false, undefined])

  it(called).equal(6)

  it(calledWith).deepEqual([
    [1],
    [1,2,3],
    [['boats']],
    [777],
    [null],
    [[true, false, undefined]]
  ])

}