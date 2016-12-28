import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

// it('should return true when X-Requested-With is xmlhttprequest', function(done){
//   var app = express();
//
//   app.use(function(req, res){
//     req.xhr.should.be.true;
//     res.end();
//   });
//
//   request(app)
//   .get('/')
//   .set('X-Requested-With', 'xmlhttprequest')
//   .expect(200)
//   .end(function(err, res){
//     done(err);
//   })
// })

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
