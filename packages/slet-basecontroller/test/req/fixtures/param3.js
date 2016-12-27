'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/user/:name'
  }
  
  post (req, res) {
    res.send(req.param('filter') + req.param('name'));
  }
}