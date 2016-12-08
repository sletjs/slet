'use strict';

module.exports = class MainController {
  constructor(ctx, next) {
    this.ctx = ctx;
    this.query = ctx.query
    this.next = next; 
  }
  
  get() { 
    var a = this.query.a
    
    this.ctx.body =  {
      a:1,
      b: a
    }
  } 
}
