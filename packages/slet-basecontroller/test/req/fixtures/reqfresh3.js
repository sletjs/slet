'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/3'
  }
  
  get (req, res) { 
    res._headers = null
    res.send(req.fresh)
  }
}