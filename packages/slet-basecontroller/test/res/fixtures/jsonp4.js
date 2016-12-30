'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/4'
  }
  
  get (req, res) {
    res.jsonp({});
  }
}