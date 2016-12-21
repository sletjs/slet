'use strict'

const BaseController = require('../../')

module.exports = class MyParamsController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/query'
  }

  get () {
    // matches "GET /base"
    // this.end()
    // return ssssaaaa
    
    return this.query.a
  }
}
