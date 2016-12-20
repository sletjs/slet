'use strict'

const BasicController = require('../../')

module.exports = class MyParamsController extends BasicController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/redirect'
  }

  get () {
    return this.redirect('http://baidu.com')
  }
}
