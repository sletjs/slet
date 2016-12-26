import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

const app = new Slet({
  root: __dirname,
  debug: false
})

//  it('should be true if encoding accpeted', function(done){
//       var app = express();

//       app.use(function(req, res){
//         req.acceptsEncoding('gzip').should.be.ok;
//         req.acceptsEncoding('deflate').should.be.ok;
//         res.end();
//       });

//       request(app)
//       .get('/')
//       .set('Accept-Encoding', ' gzip, deflate')
//       .expect(200, done);
//     })

test.cb('when Accept-Charset is not present should return true when Accept is not present', t => {
  app.router('fixtures/req.acceptsEncoding')
  
  sletTest(app)
    .get('/')
    .set('Accept-Encoding', ' gzip, deflate')
    .expect('200', t.end);
})


//     it('should be false if encoding not accpeted', function(done){
//       var app = express();

//       app.use(function(req, res){
//         req.acceptsEncoding('bogus').should.not.be.ok;
//         res.end();
//       });

//       request(app)
//       .get('/')
//       .set('Accept-Encoding', ' gzip, deflate')
//       .expect(200, done);
//     })

// test.cb('when Accept-Charset is not present should return true when Accept is not present', t => {
//   app.router('fixtures/req.acceptsCharset')
  
//   sletTest(app)
//     .get('/')
//     .expect('yes', t.end);
// })