'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/14'
    this.json_spaces = 2
  }
  
  get (req, res) {
    res.jsonp({ name: 'tobi', age: 2 });
  }
}