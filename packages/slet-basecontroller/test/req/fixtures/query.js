'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/'
  }
  
  get (req, res) {
    res.send(req.query)
  }
}