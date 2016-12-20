import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../slet')

const app = new Slet({
  root: __dirname,
  debug: false
})

app.router('fixtures/redirect')

test.cb('should redirect to the given url', t => {
  sletTest(app)
    .get('/redirect')
    .expect(204, function (err, res) {
      t.ifError(err)
      // console.log(res)
      t.is(res.header.location, 'http://baidu.com', 'res.text == 1!')
      t.end()
    })
})
