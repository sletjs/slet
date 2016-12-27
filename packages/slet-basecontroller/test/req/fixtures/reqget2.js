'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/2'
  }
  
  post (req, res) {
    // console.log(req.get())
    res.send(req.get())
  }
}