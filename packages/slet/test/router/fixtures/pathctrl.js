'use strict';

const BasicController = require('../../../../slet-basecontroller')

class PathController extends BasicController {
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