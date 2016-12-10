'use strict';

module.exports = class BaseController {
  constructor(app, ctx, next) {
    this.app = app
    this.ctx = ctx
    this.query = ctx.query
    this.next = next

    this.global_filter = ['koa-bodyparser']
  }
}
