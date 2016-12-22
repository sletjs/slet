'use strict'

const BaseController = require('../../')

module.exports = class MyParamsController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/post'
  }

  post () {
    // matches "POST /post"
    // pp['name'] is 'foo' or 'bar'
    return `Hello ${this.reqbody['name']}!`
  }
}
