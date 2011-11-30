var it = require('it-is').style('colour')
  , r = require('ubelt/random')
  ;

exports['integer'] = function () {

  var l = 1000

  while (l--) {
  
    var n = r.randomInt(7, 12)
    it(n).betweenOrEqual(7, 12)
    
  }

}

exports['0, 1 inclusive'] = function () {

  var l = 1000
    , zero = false
    , one = false
  while (l--) {
  
    var n = r.randomInt(0, 1)
    if(n == 0)
      zero = true
    if(n == 1)
      one = true    
    it(n).betweenOrEqual(0, 1)
  }
  it(one).ok()
  it(zero).ok()
}

exports['arrays 1'] = function () {

  var l = 10
  var ex = ['x']
  
  while (l--) {
    var n = r.randomOf(ex)
    it(n).equal('x')
  }

}

exports['arrays 2'] = function () {

  var l = 10
  var ex = ['x', 'y']
  
  while (l--) {
    var n = r.randomOf(ex)
    it(n).matches(/x|y/)
  }

}
