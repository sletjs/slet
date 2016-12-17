import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../slet')

const app = new Slet({
  root: __dirname,
  debug: false
})

app.router('fixtures/paramctrl')

test.cb('GET /hello/foo', t => {
  sletTest(app)
    .get('/hello/foo')
    .expect(200, function (err, res) {
      t.ifError(err)
      t.is(res.text, 'Hello foo!', 'res.text == Hello foo!')
      t.end()
    })
})

test.cb('GET /hello/bar', t => {
  sletTest(app)
    .get('/hello/bar')
    .expect(200, function (err, res) {
      t.ifError(err)
      t.is(res.text, 'Hello bar!', 'res.text == Hello bar!')
      t.end()
    })
})
