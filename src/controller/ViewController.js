'use strict';

module.exports = class ViewController {
  constructor(app, ctx, next) {
    this.app = app
    this.ctx = ctx
    this.query = ctx.query
    this.next = next
    this.tpl = ''
    this.data = {}
    
    this.global_filter = ['koa-bodyparser', 'koa-views']
  }
}
  