'use strict';

const ApiController = require('../../../').Base

class PathController extends ApiController {
  constructor(app, ctx, next) {
    super(app, ctx, next)

    this.app = app
    this.app.xxxxx = "custom"
    
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