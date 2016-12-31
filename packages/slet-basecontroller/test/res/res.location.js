import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

test.cb('should set the header', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/location')

  sletTest(app)
    .get('/')
    .expect('Location', 'http://google.com')
    .expect(200, t.end);
})
