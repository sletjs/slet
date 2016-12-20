import test from 'ava'
 
var sletTest = require('slettest') 
const Slet = require('../../..');

const app = new Slet({
    root: __dirname,
    debug: false
});

app.routerDir('fixtures', '/prefix')

test.cb('GET /hello/foo', t => {
  sletTest(app)
    .get('/prefix/path/a?a=1')
    .expect(200, function (err, res) {
      // console.log(res)
      t.ifError(err)
      t.is(res.body.a, 1, 'res.text == Hello foo!')
      t.end()
    })
})

