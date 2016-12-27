'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/refer'
  }
  
  post (req, res) {
    res.send(req.get('Referer'))
  }
}