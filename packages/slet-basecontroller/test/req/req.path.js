import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

test.cb('.path should return the parsed pathname', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/path')

  sletTest(app)
    .get('/login?redirect=/post/1/comments')
    .expect(200, '/login', t.end);
})
