'use strict';

module.exports = class ViewController {
  constructor(ctx, next) {
    this.ctx = ctx
    this.query = ctx.query
    this.next = next
    this.tpl = ''
    this.data = {}
  }
}
  