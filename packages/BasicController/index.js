'use strict';

const BaseController = require('slet-basecontroller')

module.exports = class BasicController extends BaseController{
  constructor(app, ctx, next) {
    super(app, ctx, next)
    
    this.query = ctx.query

    this.global_filter = ['koa-bodyparser']
  }
}
