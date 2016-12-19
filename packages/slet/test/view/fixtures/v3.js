'use strict';

const BaseViewController = require('./base')

module.exports = class MyViewController extends BaseViewController {

  get() { 
    var a = this.query.a
    
    // custom
    this.renderType = 'view'

    return {
      tpl: 'index',
      data: {
        title: 'ssddssdd a= ' + a
      }
    }
  } 
}
