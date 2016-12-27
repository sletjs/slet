import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

const app = new Slet({
  root: __dirname,
  debug: false
})
// it('should return the Host when present', function(done){
//   var app = express();

//   app.use(function(req, res){
//     res.end(req.host);
//   });

//   request(app)
//   .post('/')
//   .set('Host', 'example.com')
//   .expect('example.com', done);
// })

test.cb('should return the Host when present', t => {
  app.router('fixtures/host')

  sletTest(app)
    .post('/')
    .set('Host', 'example.com')
    .expect('example.com', t.end);
})

// it('should strip port number', function(done){
//       var app = express();

//       app.use(function(req, res){
//         res.end(req.host);
//       });

//       request(app)
//       .post('/')
//       .set('Host', 'example.com:3000')
//       .expect('example.com', done);
//     })

test.cb('should strip port number', t => {
  app.router('fixtures/host')

  sletTest(app)
    .post('/')
    .set('Host', 'example.com:3000')
    .expect('example.com:3000', t.end);
})


// it('should return undefined otherwise', function(done){
//   var app = express();

//   app.use(function(req, res){
//     req.headers.host = null;
//     res.end(String(req.host));
//   });

//   request(app)
//   .post('/')
//   .expect('undefined', done);
// })

// in express return undefined
// in koa return ''
test.cb('should return undefined otherwise', t => {
  app.router('fixtures/host2')

  sletTest(app)
    .post('/2')
    .expect('', t.end);
})


// it('should work with IPv6 Host', function(done){
//   var app = express();
//
//   app.use(function(req, res){
//     res.end(req.host);
//   });
//
//   request(app)
//   .post('/')
//   .set('Host', '[::1]')
//   .expect('[::1]', done);
// })
//
test.cb('should work with IPv6 Host', t => {
  app.router('fixtures/host')

  sletTest(app)
    .post('/')
    .set('Host', '[::1]')
    .expect('[::1]', t.end);
})
