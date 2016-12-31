'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/9'
  }
  
  get (req, res) {
    res.jsonp(['foo', 'bar', 'baz'])
  }
}