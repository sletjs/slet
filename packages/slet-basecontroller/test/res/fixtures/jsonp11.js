'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/11'
  }
  
  get (req, res) {
    res.jsonp(300);
  }
}