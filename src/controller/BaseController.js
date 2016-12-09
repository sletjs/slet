'use strict';

module.exports = class BaseController {
  constructor(ctx, next) {
    this.ctx = ctx
    this.query = ctx.query
    this.next = next

    this.global_filter = ['koa-bodyparser']
  }
}
