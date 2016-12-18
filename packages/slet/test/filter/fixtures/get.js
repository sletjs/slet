'use strict';

const BasicController = require('../../../../slet-basecontroller')

class PathController extends BasicController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
    
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
    }, 100)

    return {a:1}
  } 
}

module.exports = PathController