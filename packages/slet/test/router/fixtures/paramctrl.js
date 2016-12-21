'use strict'
const BaseController = require('../../../../slet-basecontroller')

module.exports = class MyParamsController extends BaseController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
    
    this.path = '/hello/:name'
  }
  
  alias () {
    this.params = this.ctx.params
  }
  
  get () { 
    // matches "GET /hello/foo" and "GET /hello/bar"
    // params['name'] is 'foo' or 'bar'
    return `Hello ${this.params['name']}!`
  } 
}