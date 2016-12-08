'use strict';

const ApiController = require('..').Api

class PathController extends ApiController {
  constructor(ctx, next) {
    super(ctx, next)
    
    this.get_filter = [this.log]
  }
  
  log(ctx, next){
    console.log('before')
    return next().then(function(){
      console.log('after')
    })
  }

  get() {
    var a = this.query.a
    
    return {
      dddd:1,
      b: a
    }
  } 
}

PathController.path = '/b'

module.exports = PathController