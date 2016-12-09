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
    debug: false
});

app.start(4000)
// support file path or Controller
app.router('/', './fixtures/ctrl' )

test.cb('GET　http://127.0.0.1:4000/?a=１', t => {
  axios.get('http://127.0.0.1:4000/?a=1')
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


test.cb('GET http://127.0.0.1:4000/?a=2', t => {
  axios.get('http://127.0.0.1:4000/?a=2')
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
