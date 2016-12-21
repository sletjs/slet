'use strict'

const BaseController = require('../../')

module.exports = class MyParamsController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/redirect'
  }

  post () {
    return this.redirect('http://baidu.com');
  }
  
  get () {
    return this.redirect('back', '/index.html');
  }
}
