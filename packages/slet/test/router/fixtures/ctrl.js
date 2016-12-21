'use strict';

const BaseController = require('../../../../slet-basecontroller')

module.exports = class MainController extends BaseController {
  get() { 
    var a = this.query.a
    
    return {
      a:1,
      b: a
    }
  } 

  post(){
    return {
      a:1
    }
  }
}
