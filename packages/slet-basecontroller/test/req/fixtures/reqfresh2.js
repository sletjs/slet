'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/2'
  }
  
  get (req, res) { 
    res.etag = '"123"'
    res.send(req.fresh)
  }
}