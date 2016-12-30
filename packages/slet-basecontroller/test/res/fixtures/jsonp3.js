'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/3'
    this.jsonp_callback_name = 'clb'
  }
  
  get (req, res) {
    res.jsonp({ count: 1 });
  }
}