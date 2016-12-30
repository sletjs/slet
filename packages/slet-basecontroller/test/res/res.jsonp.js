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
    .expect('Content-Type', 'text/javascript; charset=utf-8')
    .expect(200, /something\(\{\"count\":1\}\);/, t.end);
})

test.cb('should use first callback parameter with jsonp', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp')

  sletTest(app)
    .get('/?callback=something&callback=somethingelse')
    .expect('Content-Type', 'text/javascript; charset=utf-8')
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
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, '{"count":1}', t.end);
})

test.cb('should allow []', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp2')

  sletTest(app)
    .get('/?callback=callbacks[123]')
    .expect('Content-Type', 'text/javascript; charset=utf-8')
    .expect(200, /callbacks\[123\]\(\{"count":1\}\);/, t.end);
})

test.cb('should ignore object callback parameter with jsonp', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp2')

  sletTest(app)
    .get('/2?clb=something')
    // .expect('Content-Type', 'application/json')
    .expect(200, '{"count":1}', t.end);
})


test.cb('should allow renaming callback', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp3')

  sletTest(app)
    .get('/3?clb=something')
    .expect('Content-Type', 'text/javascript; charset=utf-8')
    .expect(200, /something\(\{"count":1\}\);/, t.end);
})


test.cb('should disallow arbitrary js', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp4')

  sletTest(app)
    .get('/4?callback=foo;bar()')
    .expect('Content-Type', 'text/javascript; charset=utf-8')
    .expect(200, /foobar\(\{\}\);/, t.end);
})


test.cb('should escape utf whitespace', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp5')

  sletTest(app)
  .get('/5?callback=foo')
  .expect('Content-Type', 'text/javascript; charset=utf-8')
  .expect(200, /foo\(\{"str":"\\u2028 \\u2029 woot"\}\);/, t.end);
})

test.cb('should not escape utf whitespace for json fallback', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp6')

  sletTest(app)
  .get('/6')
  .expect('Content-Type', 'application/json; charset=utf-8')
  .expect(200, '{"str":"\u2028 \u2029 woot"}', t.end);
})

test.cb('should include security header and prologue', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp')

  sletTest(app)
  .get('/?callback=something')
  .expect('Content-Type', 'text/javascript; charset=utf-8')
  .expect('X-Content-Type-Options', 'nosniff')
  .expect(200, /^\/\*\*\//, t.end);
})

test.cb('should not override previous Content-Types with no callback', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp7')

  sletTest(app)
  .get('/7')
  .expect('Content-Type', 'application/vnd.example+json')
  // .expect(shouldNotHaveHeader('X-Content-Type-Options'))
  .expect(200, '{"hello":"world"}',  t.end);
})


test.cb('should override previous Content-Types with callback', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp7')

  sletTest(app)
  .get('/7?callback=cb')
  .expect('Content-Type', 'text/javascript; charset=utf-8')
  .expect('X-Content-Type-Options', 'nosniff')
  .expect(200, /cb\(\{"hello":"world"\}\);$/,  t.end);
})
