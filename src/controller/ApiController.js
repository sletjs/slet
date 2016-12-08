'use strict';

module.exports = class ApiController {
  constructor(ctx, next) {
    this.ctx = ctx;
    this.query = ctx.query
    this.next = next; 
    
    this.middlewares = ['koa-bodyparser', 'koa-views']
  }
}
