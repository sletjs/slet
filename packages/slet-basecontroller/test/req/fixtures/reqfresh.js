'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/'
  }
  
  get (req, res) { 
    let etag = '"12345"'
    res.etag = etag
    console.log(req.fresh)
    
    res.send(req.fresh)
  }
}