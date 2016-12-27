import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

const app = new Slet({
  root: __dirname,
  debug: false
})

// it('should return the header field value', function(done){
//   var app = express();
//
//   app.use(function(req, res){
//     assert(req.get('Something-Else') === undefined);
//     res.end(req.get('Content-Type'));
//   });
//
//   request(app)
//   .post('/')
//   .set('Content-Type', 'application/json')
//   .expect('application/json', done);
// })
test.cb('should return the header field value', t => {
  app.router('fixtures/reqget')

  sletTest(app)
    .post('/')
    .set('Content-Type', 'application/json')
    .expect('application/json', t.end);
})


// it('should special-case Referer', function(done){
//   var app = express();
//
//   app.use(function(req, res){
//     res.end(req.get('Referer'));
//   });
//
//   request(app)
//   .post('/')
//   .set('Referrer', 'http://foobar.com')
//   .expect('http://foobar.com', done);
// })

test.cb('should special-case Referer', t => {
  app.router('fixtures/reqget1')

  sletTest(app)
    .post('/refer')
    .set('Referrer', 'http://foobar.com')
    .expect('http://foobar.com', t.end);
})

