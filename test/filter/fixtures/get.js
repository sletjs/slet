'use strict';

const Base = require('../../../').Base

class PathController extends Base {
  constructor(ctx, next) {
    super(ctx, next)
    
    this.path = '/c'
    // this.global_filter.push('custom_filter')
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
    setTimeout(function(){
       process.exit(0)
    }, 1000)

    return {a:1}
  } 
  
  post() {
    var a = this.pp.a
    console.log(a)
    return {
      dddd:1
    }
  } 
}

module.exports = PathController