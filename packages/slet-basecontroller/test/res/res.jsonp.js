import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

test.cb('should respond with jsonp', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp')

  sletTest(app)
    .get('/?callback=something')
    .expect('Content-Type', 'text/javascript')
    .expect(200, /something\(\{"count":1\}\);/, t.end);
})

test.cb('should use first callback parameter with jsonp', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp')

  sletTest(app)
    .get('/?callback=something&callback=somethingelse')
    .expect('Content-Type', 'text/javascript')
    .expect(200, /something\(\{"count":1\}\);/, t.end);
})

test.cb('should ignore object callback parameter with jsonp', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp')

  sletTest(app)
    .get('/?callback[a]=something')
    .expect('Content-Type', 'application/json')
    .expect(200, '{"count":1}', t.end);
})