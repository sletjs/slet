import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

test.cb('should not support jsonp callbacks', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/json')

  sletTest(app)
    .get('/?callback=foo')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect('{"foo":"bar"}', t.end);
})

test.cb('should not override previous Content-Types', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/json2')

  sletTest(app)
    .get('/2')
    .expect('Content-Type', 'application/vnd.example+json')
    .expect(200, '{"hello":"world"}', t.end);
})

