'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/7'
  }
  
  get (req, res) {
    res.type = 'application/vnd.example+json'
    // console.log(res.type)
    res.jsonp({ hello: 'world' })
  }
}