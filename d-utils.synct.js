
var objects = require('d-utils/objects')
  , arrays = require('d-utils/arrays')
  , types = require('d-utils/types')
  , u = require('d-utils')
  , it = require('it-is')
  , fs = require('fs')
  , path = require('path')

exports ['has all the methods from all the modules'] = function (){

  var d_dir = require.resolve('d-utils')
  var ls = fs.readdirSync(path.dirname(d_dir))  
  var lsjs = objects.map(objects.filter(ls,/^.*\.js$/),/^(.*)\.js$/)

  console.log(lsjs)

  objects.mapKeys(lsjs, function (m){
    var mod = require('d-utils/' + m)
    return it(u).has(objects.map(mod, function (){
      return it.function()
    }))
 
  })
}
