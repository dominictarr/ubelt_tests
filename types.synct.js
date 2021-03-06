var types = require('ubelt/types')
  , it = require('it-is')

exports ['can check function,string,object, etc'] = function (){

  it(types).has({
    isFunction: it.isFunction (),
    isString: it.isFunction (),
    isObject: it.isFunction ()
  })

}

exports ['isFunction are correct'] = function (){

  it(types.isFunction(function (){}))
    .equal(true)
  it(types.isFunction('string'))
    .equal(false)
  it(types.isFunction(132))
    .equal(false)

}

exports ['isFunction are correct'] = function (){

  it(types.isObject({}))
    .equal(true)
  it(types.isObject(function (){}))
    .equal(false)
  it(types.isObject(null))
    .equal(false)
  it(types.isObject(undefined))
    .equal(false)

}