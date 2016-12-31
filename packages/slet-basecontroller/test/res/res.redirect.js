import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

test.cb('should default to a 302 redirect', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/redirect')

  sletTest(app)
    .get('/')
    .expect('Location', 'http://google.com')
    .expect(302, t.end);
})
