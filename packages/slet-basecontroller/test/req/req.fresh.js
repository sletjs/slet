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
