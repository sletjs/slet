'use strict';

const Koa = require('koa');
const methods = require('methods');
var slice = Array.prototype.slice;
const app = new Koa();



// response
app.use( (ctx,next) => {
  console.log(ctx.request.method)
  console.log(ctx.request.path)
  var Controller =  require('./ctrl')
  var ctrl = new Controller(ctx, next)
  
  ctrl[ctx.request.method.toLowerCase()].apply(ctrl, slice.call(arguments, 1));

});

app.listen(3000);