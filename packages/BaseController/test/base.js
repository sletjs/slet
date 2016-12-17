import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../slet')

const app = new Slet({
  root: __dirname,
  debug: false
})

app.router('fixtures/basectrl')
app.router('fixtures/basectrl2')

test.cb('GET /base test this.end()', t => {
  sletTest(app)
    .get('/base')
    .expect(404, function (err, res) {
      t.ifError(err)
      // console.log(res)
      t.is(res.text, 'ssssaaaa', 'res.text == ssssaaaa!')
      t.end()
    })
})

test.cb('GET /base2 test this.end() && this.write()', t => {
  sletTest(app)
    .get('/base2')
    .expect(404, function (err, res) {
      t.ifError(err)
      // console.log(res)
      t.is(res.text, 'ssssaaaa', 'res.text == ssssaaaa!')
      t.end()
    })
})
