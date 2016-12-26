'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/'
  }
  
  get (req, res) { 
    req.acceptsEncodings('gzip')
    req.acceptsEncodings('deflate')
    res.end();
  }
}