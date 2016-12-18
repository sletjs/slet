'use strict';

const BasicController = require('../../../../slet-basecontroller')

module.exports = class MainController extends BasicController {
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
