'use strict';

const BaseController = require('slet-basecontroller')
console.log(BaseController)

module.exports = class ViewController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

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

  compile (tpl, data) {
    let self = this
    return new Promise(function(resolve, reject){
      resolve(self.result)
    })
  }

  render (tpl, data) {
    this.renderType = 'view'
    if (tpl) this.tpl = tpl
    if (data) this.data = data
  }

  getTplPath (tpl) {
    let self = this
    let viewPath = self.app.opts.root + '/' + self.app.opts.views.path
    return viewPath + '/' + tpl + '.' + self.app.opts.views.extension
  }
  
  execute () {
    let self = this;
    if (this.renderType === 'default') {
      return new Promise(function (resolve, reject) {
        resolve(self.result)
      })
    }

    if (this.renderType === 'view') {
      var obj = {
        data: this.data,
        tpl: this.tpl
      }
      Object.assign(obj, this.result)

      return this.compile(obj.tpl, obj.data).then(function (html) {
        return new Promise(function (resolve, reject) {
          resolve(html ? html : self.result)
        })
      })
    }
  }
}
