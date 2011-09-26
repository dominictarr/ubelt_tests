
var objects = require('ubelt/objects')
  , arrays = require('ubelt/arrays')
  , types = require('ubelt/types')
  , u = require('ubelt')
  , it = require('it-is').style('colour')
  , fs = require('fs')
  , path = require('path')

exports ['has all the methods from all the modules'] = function (){

  var d_dir = require.resolve('ubelt')
  var ls = fs.readdirSync(path.dirname(d_dir))  
  var lsjs = objects.map(objects.filter(ls,/^.*\.js$/),/^(.*)\.js$/)

  objects.mapKeys(lsjs, function (m){
    var mod = require('ubelt/' + m)
    return it(u).has(objects.map(mod, function (){
      return it.isFunction()
    }))
 
  })
}
