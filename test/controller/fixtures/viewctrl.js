'use strict';

const ViewController = require('../../../').ViewController

module.exports = class MyController extends ViewController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
    
    console.log(app)
  }
  
  get() { 
    var a = this.query.a
    
    return {
      tpl: 'index',
      data: {
        title: 'ssddssdd a= '+a
      }
    }
  } 
}
