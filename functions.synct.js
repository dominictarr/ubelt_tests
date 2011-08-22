
var funx = require('d-utils/functions')
  , it = require('it-is')

exports ['identity function'] = function () {

  var a = []

  it(funx.id(1)).equal(1)
  it(funx.id(null)).equal(null)
  it(funx.id(a)).equal(a)
  it(funx.id(funx.id)).equal(funx.id)

}