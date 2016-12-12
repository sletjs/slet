import test from 'ava'
 
// ### 第一种，暴露path和controller
// （controller内部不需要path）

// ```
// app.router('/', require('./ctrl') )  
// ```

// or

// ```
// app.router('/', './ctrl')  
// ```
const axios = require('axios')
const Slet = require('../..');
const app = new Slet({
    root: __dirname,
    debug: false,
    "views" :{
        "path" : __dirname + '/fixtures',
        "option": { "map": {"html": "nunjucks" }}
    }
});

test.cb('GET　/r?a=１ return json', t => {
  return app.identifyDept().then(function(r){
    
    console.log("r")
    
    // t.true(app.scanedControllerArray.length > 0)

    t.pass();
    t.end() 
  })
})