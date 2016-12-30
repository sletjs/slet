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

// it('should allow renaming callback', function(done){
//   var app = express();
//
//   app.set('jsonp callback name', 'clb');
//
//   app.use(function(req, res){
//     res.jsonp({ count: 1 });
//   });
//
//   request(app)
//   .get('/?clb=something')
//   .expect('Content-Type', 'text/javascript; charset=utf-8')
//   .expect(200, /something\(\{"count":1\}\);/, done);
// })


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
