'use strict'

const BasicController = require('../../')

module.exports = class MyParamsController extends BasicController {
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
