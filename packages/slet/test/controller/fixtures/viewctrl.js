'use strict';

const BasicController = require('./base')

module.exports = class MyController extends BasicController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
  }
  
  get() { 
    var a = this.query.a
    
    // if this.renderType = 'view'
    //
    // return {
    //   tpl: 'index',
    //   data: {
    //     title: 'ssddssdd a= '+a
    //   }
    // }
    
    // if this.render, make this.renderType = 'view' 
    // use default
    // return this.render()
    // use tpl
    // return this.render('tpl')
    // use tpl && data
    // return this.render('tpl', {
    //   a:1
    // })

    return this.render('index', {
      title: 'ssddssdd a= '+a
    })

  } 
}
