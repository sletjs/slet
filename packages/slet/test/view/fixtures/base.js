'use strict';

const BaseController = require('../../../../slet-basecontroller')

const vt = require('nunjucks')

module.exports = class MyViewController extends BaseController {
  // compile (tpl, data) {
//     const vt = require('nunjucks')
//     let self = this
//
//     return new Promise(function(resolve, reject){
//       // render = function(name, ctx, cb)
//       vt.render(self.getTplPath(tpl), data, function(err, str){
//           // str => Rendered HTML string
//           if (err) {
//             console.log(err)
//             reject(err)
//           }
//
//           resolve(str)
//       })
//     })
//   }
}
