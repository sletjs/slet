import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

test.cb('should be empty by default', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/locals')

  sletTest(app)
    .get('/')
    .expect(200, '', t.end);
})

test.cb('should work when mounted', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/locals')

  sletTest(app)
    .post('/')
    .expect(200, '{"foo":"bar"}', t.end);
})
