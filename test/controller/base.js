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
 
app.defineController(require('slet-basiccontroller'))
app.defineController(require('slet-viewcontroller'))

app.start(5000)
// support file path or Controller
app.router('/r', require('./fixtures/ctrl'))  

test.cb('GET　/r?a=１ return json', t => {
  axios.get('http://127.0.0.1:5000/r?a=1')
  .then(function (response) {
    // console.log(response);
    t.true(response.status === 200)
    t.is(response.data.a, 1)
    t.is(parseInt(response.data.b), 1)
    t.pass();
    t.end() 
  })
  .catch(function (error) {
    console.log(error);
    t.fail();
    t.end() 
  });
})