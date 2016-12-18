'use strict';

const ViewController = require('../../../../slet-viewcontroller')

module.exports = class MyViewController extends ViewController {
  compile (tpl, data) {
    const vt = require('nunjucks')
    console.log(tpl)
    console.log(data)
    let self = this
    
    return new Promise(function(resolve, reject){
      // render = function(name, ctx, cb)
      vt.render(self.getTplPath(tpl), data, function(err, str){
          // str => Rendered HTML string
          if (err) {
            console.log(err)
            reject(err)
          }
         
          resolve(str)
      })
    })
  }
}
