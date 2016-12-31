'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/'
  }
  
  get (req, res) {
    res.end(Object.keys(res.locals).join(""));
  }
  
  post (req, res) {
    res.locals.foo = 'bar';
    res.json(res.locals)
  }
  
}