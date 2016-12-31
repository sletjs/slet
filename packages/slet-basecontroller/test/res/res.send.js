import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

test.cb('should set body to ""', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/send')

  sletTest(app)
    .get('/')
    .expect(200, '', t.end);
})
