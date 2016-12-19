'use strict';

const BaseViewController = require('./base')

module.exports = class MyViewController extends BaseViewController {

  get() { 
    var a = this.query.a
    
    // use default
    this.tpl = 'index'
    this.data =  {
      title: 'ssddssdd a= ' + a
    }
    
    return this.render()
  } 
}
