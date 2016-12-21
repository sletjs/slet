'use strict'

const BaseController = require('../../')

module.exports = class MyParamsController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/base2'
  }

  get () {
    // matches "GET /base"
    // this.end()
    // return ssssaaaa
    this.ctx.status = 404

    this.write('ssss')
    this.end('aaaa')
  }
}
