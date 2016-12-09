'use strict';

const ApiController = require('../../../').Base

class ThisPathController extends ApiController {
  constructor(ctx, next) {
    super(ctx, next)

    this.path = '/path/this'
  }
  
  get() { 
    var a = this.query.a
    
    return {
      a:1,
      b: a
    }
  } 
}

// ThisPathController.path = '/path/this'
module.exports = ThisPathController
