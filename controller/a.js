'use strict';

const ApiController = require('..').Api

class PathController extends ApiController {
  constructor(ctx, next) {
    super(ctx, next)
    
    this.path = '/c'
    // this.middlewares = []
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
    console.log(a)
    return {
      dddd:1,
      b: a
    }
  } 
  
  post() {
    var a = this.pp.a
    console.log(a)
    return {
      dddd:1
    }
  } 
}

PathController.path = '/b'

module.exports = PathController