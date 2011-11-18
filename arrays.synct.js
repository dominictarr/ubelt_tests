
var arrays = require('ubelt/arrays')
  , it = require('it-is')

exports ['api'] = function (){

  it(arrays).has({init: it.isFunction (),last: it.isFunction (),head: it.isFunction (),tail: it.isFunction ()})

}

exports ['init, head, tail, last'] = function (){

var x = [1,2,3,4,5,6,7,8,9,0]

  it(arrays.head(x)).deepEqual(1)
  it(arrays.last(x)).deepEqual(0)

  it(arrays.init(x)).deepEqual([1,2,3,4,5,6,7,8,9])
  it(arrays.tail(x)).deepEqual([2,3,4,5,6,7,8,9,0])

  it(x).deepEqual([1,2,3,4,5,6,7,8,9,0]) //no not mutate the array
}

exports ['empty list behaviour strict'] = function (){

var x = []

  it(function () {arrays.strictHead(x) }).throws()
  it(function () {arrays.strictLast(x) }).throws()
  it(function () {arrays.strictInit(x) }).throws()
  it(function () {arrays.strictTail(x) }).throws()

}
exports ['empty list behaviour easy'] = function (){

var x = []

  it(arrays.head(x)).equal(null)
  it(arrays.last(x)).equal(null)
  it(arrays.tail(x)).deepEqual([])
  it(arrays.init(x)).deepEqual([])

}

exports ['empty'] = function (){
  it(arrays.empty([])).equal(true)
  it(arrays.empty([1])).equal(false)
}

exports ['flatten'] = function () {
 
 it(arrays.flatten([1,2,3])).deepEqual([1,2,3])
 it(arrays.flatten([])).deepEqual([])
 it(arrays.flatten([[]])).deepEqual([])
 it(arrays.flatten([[1]])).deepEqual([1])
 
  var nested = [1,2,3, [2, 4, 9], [], [], [[[4]]]]
  
  it(arrays.flatten(nested)).deepEqual([1,2,3, 2, 4, 9, 4])
}

exports ['union'] = function () {
  it(arrays.union([1,2], [3])).deepEqual([1,2,3])
  it(arrays.union([1,2, 2], [3, 1])).deepEqual([1,2,3])
  it(arrays.union([1,2, 2], [0, 3, 1])).deepEqual([1,2, 0, 3])
  it(arrays.union([], [])).deepEqual([])
  it(arrays.union([1], [])).deepEqual([1])
  it(arrays.union([], [1])).deepEqual([1])
  it(arrays.union([], null)).deepEqual([])
  it(arrays.union(null, [])).deepEqual([])

}