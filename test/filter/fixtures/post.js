'use strict';

const BasicController = require('../../../').BasicController

class PathController extends BasicController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
    
    this.path = '/c'
    // this.global_filter.push('custom_filter')
    this.post_filter = [this.log]
  }
  
  log(ctx, next){
    console.log('before')
    return next().then(function(){
      console.log('after')
    })
  }

  post() {
    var a = this.pp.a
    console.log(a)
    setTimeout(function(){
       process.exit(0)
    }, 100)
    
    return {
      dddd:1
    }
  } 
}

module.exports = PathController