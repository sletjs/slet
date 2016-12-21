'use strict';

const BaseController = require('../../../../slet-basecontroller')

class PathController extends BaseController {
  get() { 
    var a = this.query.a
    
    return {
      a:1,
      b: a
    }
  } 
}

PathController.path = '/path/a'

module.exports = PathController