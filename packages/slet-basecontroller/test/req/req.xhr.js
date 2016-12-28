import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

test.cb('.xhr should return true when X-Requested-With is xmlhttprequest', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/xhr')

  sletTest(app)
    .get('/')
    .set('X-Requested-With', 'xmlhttprequest')
    .expect(200, 'true', t.end);
})
