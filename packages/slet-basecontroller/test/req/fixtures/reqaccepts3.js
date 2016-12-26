'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/3'
  }
  
  get (req, res) { 
    res.end(req.accepts(['text/html', 'application/json']) ? 'yup' : 'nope');
  }
}