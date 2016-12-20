'use strict'

const BasicController = require('../../')

module.exports = class MyParamsController extends BasicController {
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
