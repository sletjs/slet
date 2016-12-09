import test from 'ava'

const exec = require('child_process').exec;
const axios = require('axios')
const fs = require('fs')

fs.writeFileSync( process.cwd() + '/get_filter.log', "")

exec('node ' + __dirname + '/fixtures/app > ' + process.cwd() + '/get_filter.log', (err, stdout, stderr) => {
  // if (err) {
  //   console.log(err);
  // }

  // console.log(stdout);
  // console.log(stderr);
});

test.cb('GET　use this.log before 1 after', t => {
  axios.get('http://127.0.0.1:6000/c?a=1')
  .then(function (response) {
    // console.log(response);
    t.true(response.status === 200)
    t.is(response.data.a, 1)

    setTimeout(function() {
      var c = fs.readFileSync( process.cwd() + '/get_filter.log').toString().split(/\r?\n/ig)
      t.is(c[0], 'before')
      t.is(c[1], '1')
      t.is(c[2], 'after')

      t.end() 
    }, 200)
  })
  .catch(function (error) {
    console.log(error);
    t.fail();
    t.end() 
  });
})