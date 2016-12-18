'use strict'

const BasicController = require('../../')

module.exports = class MyParamsController extends BasicController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/post'
  }

  post () {
    // matches "POST /post"
    // pp['name'] is 'foo' or 'bar'
    return `Hello ${this.body['name']}!`
  }
}
