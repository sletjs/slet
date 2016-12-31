import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

// all express jsonp test done!

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

test.cb('when given primitives', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp8')

  sletTest(app)
  .get('/8')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, 'null',  t.end);
})

test.cb('when given an array', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp9')

  sletTest(app)
  .get('/9')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, '["foo","bar","baz"]', t.end);
})

test.cb('when given an object', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp10')

  sletTest(app)
    .get('/10')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, '{"name":"tobi"}', t.end);
})


test.cb('should respond with json for null', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp8')

  sletTest(app)
    .get('/8')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, 'null', t.end);
})

test.cb('should respond with json for Number', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp11')

  sletTest(app)
    .get('/11')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, '300', t.end);
})

test.cb('should respond with json for String', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp12')

  sletTest(app)
    .get('/12')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, '"str"', t.end);
})

test.cb('should be passed to JSON.stringify()', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp13')

  sletTest(app)
    .get('/13')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, '{"name":"tobi"}', t.end);
})

test.cb('should be passed to JSON.stringify()', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp14')

  sletTest(app)
    .get('/14')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, '{\n  "name": "tobi",\n  "age": 2\n}', t.end);
})

test.cb('should respond with json and set the .statusCode', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp15')

  sletTest(app)
    .get('/15')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(201, '{"id":1}', t.end);
})

test.cb('should respond with json and set the .statusCode for backwards compat', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp16')

  sletTest(app)
    .get('/16')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(201, '{"id":1}', t.end);
})

test.cb('should use status as second number for backwards compat', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp17')

  sletTest(app)
    .get('/17')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(201, '200', t.end);
})

test.cb('should not override previous Content-Types', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/jsonp17')

  sletTest(app)
    .get('/17')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(201, '200', t.end);
})
