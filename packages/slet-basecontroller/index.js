'use strict'

const debug = require('debug')('slet-basecontroller')
const slice = Array.prototype.slice

class Base {
  constructor (app, ctx, next) {
    this.app = app
    this.ctx = ctx
    this.res = this.ctx.res
    this.next = next
    this.renderType = 'default'
    this.data = {}
    this.tpl = 'index'
    this.result = '{verb}() call result'
    this.url = 'redirect url'

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
    
    // for this.redirect()
    if (this.renderType === 'redirect') {
      return new Promise(function (resolve, reject) {
        resolve(true)
      })
    }
    
    // for this.end()
    if (this.renderType === 'customEnd') {
      return new Promise(function (resolve, reject) {
        resolve(true)
      })
    }
  }
  
  redirect (url, alt) {
    this.renderType === 'redirect'

    if (url) this.url = url

    if (alt) {
      this.alt = alt
      debug('this.redirect(back, alt) ' + this.url + ' - ' + this.alt) 
      return this.ctx.redirect(this.url, this.alt)      
    }
    
    debug('this.redirect(url) ' + this.url) 

    return this.ctx.redirect(this.url)      
  }
}

module.exports = class BaseController extends Base {
  getTplPath (tpl) {
    let self = this
    let viewPath = self.app.opts.root + '/' + self.app.opts.views.path
    return viewPath + '/' + tpl + '.' + self.app.opts.views.extension
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
}