// 'use strict'
//
const BasicController = require('../').BasicController
//
// module.exports = class MyParamsController extends BasicController {
//   constructor (app, ctx, next) {
//     super(app, ctx, next)
//
//     this.path = '/all'
//   }
//
//   all () {
//     // matches "GET /base"
//     // this.end()
//     // return ssssaaaa
//     console.log(this.body)
//     this.ctx.status = 404
//
//     // this.ctx.type = 'text';
//     // this.res.statusCode = 200;
//     this.res.write('ssss')
//
//     this.end('aaaa')
//   }
//
//   get () {
//     // matches "GET /base"
//     // this.end()
//     // return ssssaaaa
//     this.ctx.status = 404
//
//     // this.ctx.type = 'text';
//     // this.res.statusCode = 200;
//     this.res.write('ssss')
//
//     this.end('aaaa')
//   }
//
// }


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
    console.log(this)
    var a = this.body.a
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