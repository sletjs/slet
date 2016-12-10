'use strict';

const ApiController = require('../../../').BasicController

class PathController extends ApiController {
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
}

PathController.path = '/path/a'

module.exports = PathController