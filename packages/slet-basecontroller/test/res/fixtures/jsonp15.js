'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/15'
  }
  
  get (req, res) {
    res.jsonp(201, { id: 1 });
  }
}