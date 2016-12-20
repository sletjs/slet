'use strict';

const BasicController = require('../../../../slet-basecontroller')

// console.log(BasicController)

class PathController extends BasicController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
    
    this.path = '/c'
    // this.global_filter.push('custom_filter')
    this.post_filter = [this.log]
  }
  
  log(ctx, next){
    ctx.someText = 'some'
    // console.log('before')
    return next().then(function(){
      // console.log('after')
    })
  }

  post() {
    // console.log(this)
    var a = this.body.a
    
    return this.ctx.someText
  } 
}

module.exports = PathController