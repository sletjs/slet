'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/6'
  }
  
  get (req, res) {
    res.jsonp({ str: '\u2028 \u2029 woot' });
  }
}