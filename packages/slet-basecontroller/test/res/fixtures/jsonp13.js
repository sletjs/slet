'use strict'

const BaseController = require('../../..')

module.exports = class MyController extends BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/13'
    this.json_replacer = function(key, val){
      return '_' == key[0]
        ? undefined
        : val;
    }
  }
  
  get (req, res) {
    res.jsonp({ name: 'tobi', _id: 12345 });
  }
}