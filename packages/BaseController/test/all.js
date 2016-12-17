import test from 'ava'

var sletTest = require('slettest')
const Slet = require('slet')

const app = new Slet({
  root: __dirname,
  debug: false
})

app.router('fixtures/allctrl')

test.cb('GET /all test this.all()', t => {
  sletTest(app)
    .get('/all')
    .expect(404, function (err, res) {
      t.ifError(err)
      // console.log(res)
      t.is(res.text, 'ssssaaaa', 'res.text == ssssaaaa!')
      t.end()
    })
})

