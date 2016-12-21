'use strict';

const BaseController = require('../../../../../slet-basecontroller')

class PathController extends BaseController {
  get() { 
    return {
      a:1
    }
  } 
}

PathController.path = '/path/a'

module.exports = PathController