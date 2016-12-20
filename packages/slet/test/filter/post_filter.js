import test from 'ava'

const exec = require('child_process').exec;
const axios = require('axios')
const fs = require('fs')

fs.writeFileSync( process.cwd() + '/post_filter.log', "")

exec('node ' + __dirname + '/fixtures/postapp > ' + process.cwd() + '/post_filter.log', (err, stdout, stderr) => {
  if (err) {
    // console.log(err);
  }

  // console.log(stdout);
  // console.log(stderr);
});

// var app = require('./fixtures/postapp')

test.cb('POST　use this.log before 1 after', t => {
  axios.post('http://127.0.0.1:6006/c',{
    a:1
  })
  .then(function (response) {
    // console.log(response);
    t.true(response.status === 200)
    t.is(response.data.dddd, 1)
    // t.end()
    setTimeout(function() {
      var c = fs.readFileSync( process.cwd() + '/post_filter.log').toString().split(/\r?\n/ig)
      // console.log(c)
      // t.is(c[0], 'before')
      // t.is(c[1], '1')
//       t.is(c[2], 'after')

      t.end() 
    }, 200)
  })
  .catch(function (error) {
    // console.log(error);
    t.fail();
    t.end() 
  });
})