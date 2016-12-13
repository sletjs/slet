'use strict'


var A = require('./test/router/fixtures/thispath')
var a = new A({
      request:{
        body: {

        }
      }
    }, function(){})

console.log(a.path)