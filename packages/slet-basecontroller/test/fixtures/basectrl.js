'use strict'

const BaseController = require('../../')

module.exports = class MyParamsController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/base'
  }

  get () {
    // matches "GET /base"
    // this.end()
    // return ssssaaaa
    this.ctx.status = 404

    // this.ctx.type = 'text';
    // this.res.statusCode = 200;
    this.res.write('ssss')

    this.end('aaaa')
  }
}
