import test from 'ava'
 
// ### 第二种，将path写到controller里

// ```
// app.router(require('./pathctrl') )  
// ```

// or

// ```
// app.router('./pathctrl')  
// ```

const axios = require('axios')
const Slet = require('../..');
const app = new Slet({
    root: __dirname,
    debug: false
});
app.defineController(require('slet-basiccontroller'))
app.defineController(require('slet-viewcontroller'))
app.start(4003)
// support file path or Controller
app.router('./fixtures/pathctrl')  

test.cb('GET　http://127.0.0.1:4003/path/a?a=１', t => {
  axios.get('http://127.0.0.1:4003/path/a?a=1')
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


test.cb('GET http://127.0.0.1:4003/path/a?a=2', t => {
  axios.get('http://127.0.0.1:4003/path/a?a=2')
  .then(function (response) {
    // console.log(response.data);
    t.true(response.status === 200)
    t.is(response.data.a, 1)
    t.is(parseInt(response.data.b), 2)
    t.pass();
    t.end() 
  })
  .catch(function (error) {
    console.log(error);
    t.fail();
    t.end() 
  });
})
