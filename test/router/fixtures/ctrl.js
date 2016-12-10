'use strict';

const ApiController = require('../../../').Base

module.exports = class MainController extends ApiController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
  }
  
  get() { 
    var a = this.query.a
    
    return {
      a:1,
      b: a
    }
  } 

  post(){
    return {
      a:1
    }
  }
}
