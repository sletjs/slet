'use strict';

const BaseViewController = require('./base')

module.exports = class MyViewController extends BaseViewController {

  get() { 
    var a = this.query.a

    // use tpl && data
    return this.render('index', {
       title: 'ssddssdd a= ' + a
    })
  } 
}
