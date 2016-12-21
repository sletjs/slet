import test from 'ava'

const axios = require('axios')
const Slet = require('../..');
const app = new Slet({
    root: __dirname + '/fixtures',
    debug: false,
    views:{
      path: '/', 
      extension: 'html'
    }
});

app.start(5001)
// support file path or Controller
app.router('/r', require('./fixtures/viewctrl'))

test.cb('GET　/r?a=1 return view', t => {
  axios.get('http://127.0.0.1:5001/r?a=1')
  .then(function (response) {
    // console.log(response);
    t.true(response.status === 200)
    t.is(response.data, '<h1>ssddssdd a= 1</h1>')
    t.pass();
    t.end()
  })
  .catch(function (error) {
    console.log(error);
    t.fail();
    t.end()
  });
})

test.cb('GET　/r?a=2 return view', t => {
  axios.get('http://127.0.0.1:5001/r?a=2')
  .then(function (response) {
    // console.log(response);
    t.true(response.status === 200)
    t.is(response.data, '<h1>ssddssdd a= 2</h1>')
    t.pass();
    t.end()
  })
  .catch(function (error) {
    console.log(error);
    t.fail();
    t.end()
  });
})