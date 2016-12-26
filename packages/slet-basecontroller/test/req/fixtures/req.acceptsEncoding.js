'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/'
  }
  
  get (req, res) { 
    req.acceptsEncoding('gzip')
    req.acceptsEncoding('deflate')
    res.end();
  }
}