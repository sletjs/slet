'use strict';

const BasicController = require('../../../../slet-basecontroller')

class PathController extends BasicController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
    
    this.path = '/c'

    this.get_filter = [this.log]
  }
  
  log(ctx, next){
    ctx.someText = 'some'
    return next().then(function(){
    })
  }

  get() {
    var a = this.query.a
    // console.log(a)
    setTimeout(function(){
       process.exit(0)
    }, 100)

    return this.ctx.someText
  } 
}

module.exports = PathController