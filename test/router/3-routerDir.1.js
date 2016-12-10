import test from 'ava'
 
// ### 第三种，指定路径加载

// ```
// app.routerDir('app/controller' )  
// ```

// 此种情况会默认加载某个目录下的controller，请确保你的controller里有path，无论是属性，还是static属性方式都行。
// `

const axios = require('axios')
const Slet = require('../..');
const app = new Slet({
    root: __dirname,
    debug: false
});
app.defineController(require('slet-basiccontroller'))
app.defineController(require('slet-viewcontroller'))
app.start(4004)
// support file path or Controller
app.routerDir('./fixtures' )  

test.cb('GET /path/a?a=１ static.path', t => {
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

test.cb('GET /path/a?a=2 static.path', t => {
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


test.cb('GET /path/this?a=１object.path', t => {
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


test.cb('GET /path/this?a=2 object.path', t => {
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

