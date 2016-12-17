'use strict';

const BasicController = require('../../../').BasicController

class PathController extends BasicController {
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