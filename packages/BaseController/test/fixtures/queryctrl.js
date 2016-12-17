'use strict'

const BasicController = require('../../')

module.exports = class MyParamsController extends BasicController {
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
