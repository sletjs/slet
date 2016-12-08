'use strict';


const Koa = require('koa');
const methods = require('methods');
var slice = Array.prototype.slice;
const app = new Koa();

var router = require('koa-router')();

module.exports = class MainController {
  constructor(ctx, next) {
    this.app =  new Koa();
  }
  
  router(path, controller) {
    var Controller =  require(controller)
    
    router.get('/', function (ctx, next) {
      console.log(ctx.request.method)
      console.log(ctx.request.path)
      var Controller =  require('./ctrl')
      var ctrl = new Controller(ctx, next)
  
      ctrl[ctx.request.method.toLowerCase()].apply(ctrl, slice.call(arguments, 1));
    });
  }
  
  start(port=3000) {
      this.app
        .use(router.routes())
        .use(router.allowedMethods());
  
      this.app.listen(port)
  }
}
