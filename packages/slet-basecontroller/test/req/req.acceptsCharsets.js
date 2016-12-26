import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

const app = new Slet({
  root: __dirname,
  debug: false
})

// it('should return true', function(done){
//         var app = express();

//         app.use(function(req, res, next){
//           res.end(req.acceptsCharset('utf-8') ? 'yes' : 'no');
//         });

//         request(app)
//         .get('/')
//         .expect('yes', done);
//       })

test.cb('when Accept-Charset is not present should return true when Accept is not present', t => {
  app.router('fixtures/req.acceptsCharset')
  
  sletTest(app)
    .get('/')
    .expect('yes', t.end);
})


// describe('when Accept-Charset is not present', function(){
//       it('should return true when present', function(done){
//         var app = express();

//         app.use(function(req, res, next){
//           res.end(req.acceptsCharset('utf-8') ? 'yes' : 'no');
//         });

//         request(app)
//         .get('/')
//         .set('Accept-Charset', 'foo, bar, utf-8')
//         .expect('yes', done);
//       })

test.cb('when Accept-Charset is not present should return true when present', t => {
  app.router('fixtures/req.acceptsCharset')
  
  sletTest(app)
    .get('/')
    .set('Accept-Charset', 'foo, bar, utf-8')
    .expect('yes', t.end);
})

//   it('should return false otherwise', function(done){
//     var app = express();

//     app.use(function(req, res, next){
//       res.end(req.acceptsCharset('utf-8') ? 'yes' : 'no');
//     });

//     request(app)
//     .get('/')
//     .set('Accept-Charset', 'foo, bar')
//     .expect('no', done);
//   })
// })

test.cb('when Accept-Charset is not present should return false otherwise', t => {
  app.router('fixtures/req.acceptsCharset')
  
  sletTest(app)
    .get('/')
    .set('Accept-Charset', 'foo, bar')
    .expect('no', t.end);
})