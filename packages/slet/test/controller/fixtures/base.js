'use strict';

const ViewController = require('../../../../slet-viewcontroller')

module.exports = class MyViewController extends ViewController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
    this.query = ctx.query
    this.tpl = ''
    this.data = {}
    this.renderType = 'view'
    
    // console.log(this.app.opts.views.path)
    // console.log(this.app.opts.views.option)
    // 定义中间件
    
    // 定义global filter
    this.global_filter = ['koa-bodyparser']
    
    // export
  }
  
  // compile (tpl, data) {
  //   const ejs = require('ejs')
  //
  //   let self = this
  //
  //   return new Promise(function(resolve, reject){
  //     ejs.renderFile(tpl, data, {}, function(err, str){
  //         // str => Rendered HTML string
  //         if (err) {
  //           console.log(err)
  //           reject(err)
  //         }
  //
  //         resolve(str)
  //     })
  //   })
  // }

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
