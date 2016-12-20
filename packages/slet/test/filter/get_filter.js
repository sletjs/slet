import test from 'ava'

var sletTest = require('slettest') 
const Slet = require('../..');

const app = new Slet({
    root: __dirname,
    debug: false
});

app.router('fixtures/get')

test.cb('GET /c', t => {
  sletTest(app)
    .get('/c')
    .expect(200, function (err, res) {
      t.ifError(err)
      t.is(res.text, 'some', 'res.text == Hello foo!')
      t.end()
    })
})
//
// test.cb('GET /hello/bar', t => {
//   sletTest(app)
//     .get('/hello/bar')
//     .expect(200, function (err, res) {
//       t.ifError(err)
//       t.is(res.text, 'Hello bar!', 'res.text == Hello bar!')
//       t.end()
//     })
// })
