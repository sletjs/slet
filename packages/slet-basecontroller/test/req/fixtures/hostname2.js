'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/2'
  }
  
  post (req, res) {
    req.headers.host = null;
    res.send(String(req.hostname));
  }
}