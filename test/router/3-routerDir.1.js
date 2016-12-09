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

app.start(4004)
// support file path or Controller
app.routerDir('./fixtures' )  

test.cb('GET　http://127.0.0.1:4004/path/a?a=１', t => {
  axios.get('http://127.0.0.1:4004/path/a?a=1')
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


test.cb('GET http://127.0.0.1:4004/path/a?a=2', t => {
  axios.get('http://127.0.0.1:4004/path/a?a=2')
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


test.cb('GET　http://127.0.0.1:4004/path/this?a=１', t => {
  axios.get('http://127.0.0.1:4004/path/this?a=1')
  .then(function (response) {
    // console.log(response);
    t.true(response.status === 200)
    t.is(response.data.a, 1)
    t.is(parseInt(response.data.b), 1)
    t.pass();
    t.end() 
  })
  .catch(function (error) {
    // console.log(error);
    t.fail();
    t.end() 
  });
})


test.cb('GET http://127.0.0.1:4004/path/this?a=2', t => {
  axios.get('http://127.0.0.1:4004/path/this?a=2')
  .then(function (response) {
    // console.log(response.data);
    t.true(response.status === 200)
    t.is(response.data.a, 1)
    t.is(parseInt(response.data.b), 2)
    t.pass();
    t.end() 
  })
  .catch(function (error) {
    // console.log(error);
    t.fail();
    t.end() 
  });
})


// fixtures/ctrl 没有path，所以routerDir不生效的
test.cb('fixtures/ctrl 没有path，所以routerDir不生效的', t => {
  axios.get('http://127.0.0.1:4004/?a=2')
  .then(function (response) {
    // console.log(response);
    t.fail();
    t.end() 
  })
  .catch(function (error) {
    // console.log(error);
    t.pass();
    t.end() 
  });
})

