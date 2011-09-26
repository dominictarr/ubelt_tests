var it = require('it-is').style('colour')
  , ops = require('ubelt/objects')

exports ['merge one level'] = function () {
  var add = [
    /*A - B = C*/
    [{}, {}, {}]
  , [{A: 1}, {}, {A: 1}] 
  , [{}, {A: 1}, {A: 1}]        
  ]

  it(add).every(function (x) {
    console.log(x, ops.merge(x[0], x[1]), x[2])
    
    it(
      ops.merge(x[0], x[1])
    ).deepEqual(x[2])
    console.log(x)
  })

}

  var sub = [
    /*OLD diff NEW = CHANGE*/
    { OLD: {}, 
      NEW:{}, 
      DIF:{} }
  , { OLD:{A: 1}, 
      NEW:{}, 
      DIF: {A: null} }
  , { OLD:{}, 
      NEW:{A: 1}, 
      DIF: {A: 1} }
  , {
      OLD: [1,2,3], 
      NEW: [1,2,4],
      DIF: {2: 4} }
  , {
      OLD: [1,2,3],
      NEW: [1,4],
      DIF: {1: 4, 2: null} }
  ]
/*
*/

exports ['diff one level'] = function () {

  it(sub).every(function (x) {
    console.log(x.OLD, 'diff', x.NEW, '==', ops.diff(x.OLD, x.NEW))  
    it(ops.diff(x.OLD, x.NEW)).deepEqual(x.DIF)
  })

}

exports ['patch a diff, one level'] = function () {

 it(sub).every(function (x) {
    console.log(x.OLD, 'patch', x.DIF, '==', ops.patch(x.OLD, x.NEW)) 
      it(ops.patch(x.OLD, x.DIF)).deepEqual(x.NEW)
    if(Array.isArray(x.NEW))
      it(ops.patch(x.OLD, x.DIF)).isArray()
 })

}