'use strict';

const BaseViewController = require('./base')

module.exports = class MyViewController extends BaseViewController {

  get() { 
    var a = this.query.a
  
    // use tpl
    this.data =  {
      title: 'ssddssdd a= ' + a
    }
    return this.render('index')
  } 
}
