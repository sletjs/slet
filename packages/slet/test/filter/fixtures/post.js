'use strict';

const BaseController = require('../../../../slet-basecontroller')

// console.log(BasicController)

class PathController extends BaseController {
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

  post(req, res) {
    console.log(this.ctx.someText)
    var a = this.reqbody.a
    
    return res.body = this.ctx.someText
  } 
}

module.exports = PathController