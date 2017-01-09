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
const Slet = require('../..')
const app = new Slet({
    root: __dirname + '/fixtures',
    debug: false,
    views:{
      engine: "nunjucks",
      path: '', 
      extension: 'html'
    }
})

app.start(7001)
// support file path or Controller
app.router('/0', require('./fixtures/v0'))
app.router('/1', require('./fixtures/v1'))
app.router('/2', require('./fixtures/v2'))
app.router('/3', require('./fixtures/v3'))

test.cb('GET　/0?a=1 return view', t => {
  axios.get('http://127.0.0.1:7001/0?a=1')
  .then(function (response) {
    // console.log(response)
    t.true(response.status === 200)
    t.is(response.data, '<h1>ssddssdd a= 1</h1>')
    t.pass()
    t.end()
  })
  .catch(function (error) {
    console.log(error)
    t.fail()
    t.end()
  })
})

test.cb('GET　/1?a=1 return view', t => {
  axios.get('http://127.0.0.1:7001/1?a=1')
  .then(function (response) {
    // console.log(response)
    t.true(response.status === 200)
    t.is(response.data, '<h1>ssddssdd a= 1</h1>')
    t.pass()
    t.end()
  })
  .catch(function (error) {
    console.log(error)
    t.fail()
    t.end()
  })
})

test.cb('GET　/2?a=1 return view', t => {
  axios.get('http://127.0.0.1:7001/2?a=1')
  .then(function (response) {
    // console.log(response)
    t.true(response.status === 200)
    t.is(response.data, '<h1>ssddssdd a= 1</h1>')
    t.pass()
    t.end()
  })
  .catch(function (error) {
    console.log(error)
    t.fail()
    t.end()
  })
})

test.cb('GET　/3?a=1 return view', t => {
  axios.get('http://127.0.0.1:7001/3?a=1')
  .then(function (response) {
    // console.log(response)
    t.true(response.status === 200)
    t.is(response.data, '<h1>ssddssdd a= 1</h1>')
    t.pass()
    t.end()
  })
  .catch(function (error) {
    console.log(error)
    t.fail()
    t.end()
  })
})
