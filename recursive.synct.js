var it = require('it-is').style('colour')
  , ops = require('ubelt/objects')

exports ['merge two levels'] = function () {
  var add = [
    /*A - B = C*/
    [{A: {}}, {}, {A: {}}]
  , [{A: {B: 2}}, {B: 1}, {A: {B:2}, B: 1}] 
  , [{A: {C: 3}}, {A: {B: 1}}, {A: {B: 1, C: 3}}]
  ]

  it(add).every(function (x) {
    console.log(x, ops.deepMerge(x[0], x[1]), x[2])
    
    it(
      ops.deepMerge(x[0], x[1])
    ).deepEqual(x[2])
    console.log(x)
  })

}

  var sub = [
    //OLD diff NEW = CHANGE
    { OLD:  {A: {}}, 
      NEW:  {}, 
      DIF:  {A: null} }
  , {
      OLD: {A: {B: 2}, C: 3}, 
      NEW: {A: {B: 1}, C: 3}, 
      DIF: {A: {B:1}}
    }
  , {
      OLD: {A: {C: 3}}, 
      NEW: {A: {B: 1}}, 
      DIF: {A: {B: 1, C: null}}
    }
  , {
      OLD: {A: {C: {X: 3}, D: 7}}, 
      NEW: {A: {C: {X: 37}, D: 7}, E: 0},
      DIF: {A: {C: {X: 37}}, E: 0}
    }
  ]

exports ['diff two level'] = function () {

  it(sub).every(function (x) {
    console.error(x.OLD, 'diff', x.NEW, '==', ops.diff(x.OLD, x.NEW) ) 
    it(ops.diff(x.OLD, x.NEW)).deepEqual(x.DIF)
  })

}


exports ['patch a diff, one level'] = function () {

 it(sub).every(function (x) {
    console.error(x.OLD, 'patch', x.DIF, '==', ops.patch(x.OLD, x.DIF))  
    it(ops.patch(x.OLD, x.DIF)).deepEqual(x.NEW)
 })

}

exports ['patch and diff are consistant'] = function () {

  it(sub).every(function (x) {

    //OLD patch (OLD diff NEW) == NEW
    //NEW patch (NEW diff OLD) == OLD

    //DO
    it(ops.patch(x.OLD, ops.diff(x.OLD, x.NEW))).deepEqual(x.NEW)
    //UNDO
    it(ops.patch(x.NEW, ops.diff(x.NEW, x.OLD))).deepEqual(x.OLD)
  })


}
//*/
