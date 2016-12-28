'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/:any'
  }
  
  get (req, res) {
    res.send(req.path)
  }
}