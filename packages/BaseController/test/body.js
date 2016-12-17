import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../slet')

const app = new Slet({
  root: __dirname,
  debug: false
})

app.router('fixtures/postctrl')

test.cb('POST /post name=foo', t => {
  sletTest(app)
    .post('/post', {name: 'foo'})
    .send({name: 'foo'})
    .expect(200, function (err, res) {
      t.ifError(err)
      // console.log(res)
      t.is(res.text, 'Hello foo!', 'res.text == Hello foo!')
      t.end()
    })
})

test.cb('GET /post name=bar', t => {
  sletTest(app)
    .post('/post')
    .send({name: 'bar'})
    .expect(200, function (err, res) {
      t.ifError(err)
      t.is(res.text, 'Hello bar!', 'res.text == Hello bar!')
      t.end()
    })
})
