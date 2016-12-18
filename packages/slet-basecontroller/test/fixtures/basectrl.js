'use strict'

const BasicController = require('../../')

module.exports = class MyParamsController extends BasicController {
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
