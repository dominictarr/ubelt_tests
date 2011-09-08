
var funx = require('d-utils/functions')
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
