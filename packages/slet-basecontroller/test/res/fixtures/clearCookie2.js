'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/2'
  }
  
  get (req, res) {
    res.clearCookie('sid', { path: '/admin' })
    res.end();
  }
}