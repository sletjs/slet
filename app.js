'use strict';

const Koa = require('koa');
const app = new Koa();

class MainController {
  constructor(ctx, next){
    this.ctx = ctx;
    this.query = ctx.query
    this.next = next; 
  }
  get(){
    
    var a = this.query.a
    
    return {
      a:1,
      b: a
    }
  }
  
}
// response
app.use( (ctx,next) => {
  console.log(ctx.request.method)
  var a = new MainController(ctx, next)
  
  switch(ctx.request.method){
    case 'GET': ctx.body = a.get(ctx,next);
    case 'POST': ctx.body = a.post(ctx,next);
  }
  
  // ctx.body = a[ctx.request.method].apply(this, ctx, next)
});

app.listen(3000);