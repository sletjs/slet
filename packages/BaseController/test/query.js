import test from 'ava'

var sletTest = require('slettest')
const Slet = require('slet')

const app = new Slet({
  root: __dirname,
  debug: false
})

app.router('fixtures/queryctrl')

test.cb('GET /query?a=1', t => {
  sletTest(app)
    .get('/query?a=1')
    .expect(200, function (err, res) {
      t.ifError(err)
      // console.log(res)
      t.is(res.text, '1', 'res.text == 1!')
      t.end()
    })
})

test.cb('GET /query?a=2', t => {
  sletTest(app)
    .get('/query?a=2')
    .expect(200, function (err, res) {
      t.ifError(err)
      // console.log(res)
      t.is(res.text, '2', 'res.text == 1!')
      t.end()
    })
})
