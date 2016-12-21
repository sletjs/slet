'use strict'

const BaseController = require('../../')

module.exports = class MyParamsController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/hello/:name'
  }

  get () {
    // matches "GET /hello/foo" and "GET /hello/bar"
    // params['name'] is 'foo' or 'bar'
    return `Hello ${this.params['name']}!`
  }
}
