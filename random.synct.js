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