'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/2'
  }
  
  get (req, res) {
    res.type = 'application/vnd.example+json'
    res.json({ hello: 'world' });
  }
}