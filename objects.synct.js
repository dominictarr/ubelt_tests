var objects = require('ubelt/objects')
  , it = require('it-is')

exports ['merge'] = function (){
  it(objects.merge({a: 1}, {b: 2})).deepEqual({a: 1, b: 2})
}
exports ['merge N'] = function (){
  it(objects.merge({a: 1}, {b: 2}, {c: 3})).deepEqual({a: 1, b: 2, c: 3})
}
exports ['merge override from left'] = function (){
  it(objects.merge({a: 1}, {a: 2, b: 2})).deepEqual({a: 2, b: 2})
}
exports ['merge override from left N'] = function (){
  it(objects.merge({a: 1}, {a: 2, b: 2}, {b: 0, c: 3})).deepEqual({a: 2, b: 0, c: 3})
}
exports ['merge single arg'] = function (){
  it(objects.merge({a: 2, b: 2})).deepEqual({a: 2, b: 2})
}
exports ['merge null'] = function (){
  it(objects.merge()).equal(null)
  it(objects.merge(null)).equal(null)
  it(objects.merge(null, null, null)).equal(null)
}

exports ['merge with null'] = function (){
  it(objects.merge({x: 1}, null)).deepEqual({x: 1})
  it(objects.merge(null, {x: 1})).deepEqual({x: 1})
}

exports ['deep merge'] = function () {

 it(objects.deepMerge({a: {x: 1} }, {a: {y: 2} })).deepEqual({a: {x: 1, y: 2}})
 
}

exports ['non overlapping'] = function () {
//oh oops. deep merge takes only 2 args, not N. alse it copies. when merge mutates.
//immutable is better because it's easier to reason about.
 it(objects.deepMerge({a: 2}, {b: 'x' })).deepEqual({a: 2, b: 'x'})
 
}


exports ['each'] = function (){
  var on = {a: 1,b: 2, c: 3}, count = 0
  objects.each(on, function(v,k){
    it(v).equal(on[k])
    count ++
  })
  it(count).equal(3)
}
exports ['map'] = function (){

  var on = {a: 1,b: 2, c: 3}, count = 0
  var off = 
    objects.map(on, function(v,k){
      it(v).equal(on[k])
      count ++
      return v * 2
    })
  it(count).equal(3)
  it(off).deepEqual({
    a: 2, b: 4,c: 6
  })
}

exports ['map -- {}'] = function (){

  var on = {}, count = 0
  var off = 
    objects.map(on, function(v,k){
      count ++
    })
  it(count).equal(0)
  it(off).deepEqual({})
}

exports ['map -- {}'] = function (){

  var on = {}, count = 0
  var off = 
    objects.map(on, function(v,k){
      count ++
    })
  it(count).equal(0)
  it(off).deepEqual({})
}

exports ['map on numbers -- start at 1'] = function () {
  
  var seven = objects.map(7, function (n) {
      return n
  })

  it(seven).deepEqual([1,2,3,4,5,6,7])
  
}

exports ['map on numbers: 0 - 8'] = function () {
  
  var seven = objects.map(0, 8, function (n) {
      return n
  })

  it(seven).deepEqual([0,1,2,3,4,5,6,7,8])

}

exports ['map even numbers: 2,4...12'] = function () {
  
  var seven = objects.map(2, 4, 12, function (n) {
      return n
  })

  it(seven).deepEqual([2,4,6,8,10,12])
}

exports ['map even numbers: 12, 10...2 in reverse'] = function () {
  
  var seven = objects.map(12, 10, 2, function (n) {
      return n
  })

  it(seven).deepEqual([2,4,6,8,10,12].reverse())

}


exports ['filter'] = function (){
  
  var on = {a: 1,b: 2, c: 3, d:4, e:5, f:6, g:7}, count = 0
 
  it(objects.filter(on, function (x){
    return !(x % 2)
  })).deepEqual({b: 2, d:4, f:6})
}

exports ['filter with regexp'] = function (){
  
  var on = [ '.git',
    'test',
    'objects.js',
    'index.js',
    'package.json',
    'types.js',
    'readme.markdown',
    '.gitignore',
    'arrays.js' ], count = 0
 
  it(objects.filter(on, /^.*\.js$/))
  .deepEqual([ 
    'objects.js',
    'index.js',
    'types.js',
    'arrays.js' ])
}

exports ['mapKeys -- create a object from a list of keys and a function'] = function (){

  var keys = ['foo','bar','xux']
  
  it(objects.mapKeys(keys, function (k){
      return k.toUpperCase()
  })).deepEqual({foo: 'FOO', bar: 'BAR', xux: 'XUX'})

}

exports ['mapToArray'] = function (){

  var on = {a: 1,b: 2, c: 3, d:4, e:5, f:6, g:7}, count = 0

  it(objects.mapToArray(on,function (v){
    return v
  })).deepEqual([1,2,3,4,5,6,7])
  
}

exports ['find'] = function () {

  //
  // sometime need to stop before the end, find is like that 
  //

  var numbers = [3, 5, 3, 7, 77, 21, 4]

  it(objects.find(numbers, function (e) { return !(e % 2)})).equal(4)
  it(objects.findKey(numbers, function (e) { return !(e % 2)})).equal(6)
  it(objects.findReturn(numbers, function (e) { return !(e % 2)})).equal(true)

  it(objects.find([], function () {})).equal(null)
  it(objects.find(null, function () {})).equal(null)

}

exports ['path'] = function () {

  var a1 = {A: 1}
  
  it(objects.path(a1, ['A'])).equal(1)
  it(objects.path({A: {B: 4}}, ['A', 'B'])).equal(4)
  it(objects.path({A: {B: 4}}, ['A', 'C'])).strictEqual(undefined)
  it(objects.path(null, ['A', 'C'])).strictEqual(undefined) 
  it(objects.path({Z: [0, 1, 2]}, ['Z', 2])).strictEqual(2) 
  it(objects.path({Z: [0, 1, 2]}, ['Z', 0])).strictEqual(0) 
  it(objects.path({Z: [0, 1, 2]}, ['Z', 0, 'T'])).strictEqual(undefined) 
  it(objects.path({Z: null}, ['Z', 0, 'T'])).strictEqual(undefined) 
  it(objects.path({Z: null}, ['Z'])).strictEqual(null) 

}

exports ['has'] = function () {
  var x = {A: 1, B: 2}
  
  it(objects.has(x, {A: 1})).equal(true)
  it(objects.has(x, {B: 2})).equal(true)
  it(objects.has(x, {})).equal(true)
  it(objects.has(x, {C: 3})).equal(false)

  var y = {A: 1, B: 2, D: {C: 3}}
  it(objects.has(y, {A: 1})).equal(true)
  it(objects.has(y, {B: 2})).equal(true)
  it(objects.has(y, {D: {}})).equal(true)
  it(objects.has(y, {D: {C: 3}})).equal(true)
  it(objects.has(y, {D: {C: 3, E: false}})).equal(false)

}

exports ['setPath'] = function () {

  var x = {}
    , c = Math.random()
    , z = Math.random()
  objects.setPath(x, ['a','b','c'], c)
  it.equal(x.a.b.c, c)
  objects.setPath(x, ['z'], z)
  it.equal(x.z, z)
}