'use strict';

const BaseViewController = require('./base')

module.exports = class MyViewController extends BaseViewController {

  get() { 
    var a = this.query.a
    
    // if 
    // this.renderType = 'view'
    
    // return {
    //   tpl: 'index',
    //   data: {
    //     title: 'ssddssdd a= '+a
    //   }
    // }
    
    // if this.render, make this.renderType = 'view' 
    // use default
    // this.tpl = 'index'
    // this.data =  {
    //   title: 'ssddssdd a= '+a
    // }
    // return this.render()
    // use tpl
    //  this.data = {}
    // return this.render('tpl')
    // use tpl && data
    // return this.render('tpl', {
    //   a:1
    // })
    // this.data =  {
    //   title: 'ssddssdd a= '+a
    // }
    // return this.render('index')
    this.tpl = 'index'
    this.data =  {
      title: 'ssddssdd a= '+a
    }
    return this.render()
  } 
}
