import test from 'ava'

var sletTest = require('slettest') 
const Slet = require('../..');

const app = new Slet({
    root: __dirname,
    debug: false
});

app.router('fixtures/post')

test.cb('GET /c', t => {
  sletTest(app)
    .post('/c')
    .send({a:1})
    .expect(200, function (err, res) {
      t.ifError(err)
      t.is(res.text, 'some', 'res.text == Hello foo!')
      t.end()
    })
})