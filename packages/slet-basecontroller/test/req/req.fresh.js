import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

const app = new Slet({
  root: __dirname,
  debug: false
})

// it('should return true when the resource is not modified', function(done){
//     var app = express();
//     var etag = '"12345"';

//     app.use(function(req, res){
//       res.set('ETag', etag);
//       res.send(req.fresh);
//     });

//     request(app)
//     .get('/')
//     .set('If-None-Match', etag)
//     .expect(304, done);
//   })
test.cb('should return true when the resource is not modified', t => {
  app.router('fixtures/reqfresh')
  
  let etag = '"12345"';

  sletTest(app)
    .get('/')
    .set('If-None-Match', etag)
    .expect(304, t.end);
})

// it('should return false when the resource is modified', function(done){
//       var app = express();

//       app.use(function(req, res){
//         res.set('ETag', '"123"');
//         res.send(req.fresh);
//       });

//       request(app)
//       .get('/')
//       .set('If-None-Match', '"12345"')
//       .expect(200, 'false', done);
//     })

test.cb('should return false when the resource is modified', t => {
  app.router('fixtures/reqfresh2')

  sletTest(app)
    .get('/2')
    .set('If-None-Match', '"12345"')
    .expect(200, 'false', t.end)
})

// it('should return false without response headers', function(done){
//       var app = express();

//       app.use(function(req, res){
//         res._headers = null;
//         res.send(req.fresh);
//       });

//       request(app)
//       .get('/')
//       .expect(200, 'false', done);
//     })

test.cb('should return false without response headers', t => {
  app.router('fixtures/reqfresh3')

  sletTest(app)
    .get('/3')
    .expect(200, 'false', t.end)
})
