'use strict';

const ApiController = require('../../../').Base

class PathController extends ApiController {
  constructor(ctx, next) {
    super(ctx, next)
  }
  
  get() { 
    var a = this.query.a
    
    return {
      a:1,
      b: a
    }
  } 
}

PathController.path = '/path/a'

module.exports = PathController