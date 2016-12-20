'use strict';

const BasicController = require('../../../../../slet-basecontroller')

class PathController extends BasicController {
  get() { 
    return {
      a:1
    }
  } 
}

PathController.path = '/path/a'

module.exports = PathController