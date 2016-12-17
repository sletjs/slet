'use strict'

// const slice = Array.prototype.slice

module.exports = class BaseController {
  constructor (app, ctx, next) {
    this.app = app
    this.ctx = ctx
    this.res = this.ctx.res
    this.next = next
    this.renderType = 'default'
    this.data = {}
    this.tpl = 'index'

    this.result = '{verb}() call result'

    this.global_filter = ['koa-bodyparser']
  }

  // lifecycle
  before () {

  }

  alias () {
    if (this.ctx.request.body) {
      this.body = this.ctx.request.body
    }

    if (this.ctx.request.query) {
      this.query = this.ctx.request.query
    }

    // matches "GET /hello/foo" and "GET /hello/bar"
    // this.params['name'] is 'foo' or 'bar'
    if (this.ctx.params) {
      this.params = this.ctx.params
    }
  }

  after () {

  }

  write () {
    let write = this.res.write.bind(this.res)
    write.apply(write, arguments)
  }

  end () {
    this.renderType = 'customEnd'
    let end = this.res.end.bind(this.res)
    end.apply(end, arguments)
  }
}
