import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')



// it('should return an array of the specified addresses', function(done){
//   var app = express();
//
//   app.enable('trust proxy');
//
//   app.use(function(req, res, next){
//     res.send(req.ips);
//   });
//
//   request(app)
//   .get('/')
//   .set('X-Forwarded-For', 'client, p1, p2')
//   .expect('["client","p1","p2"]', done);
// })

test.cb('should return an array of the specified addresses', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/ips')
  app.proxy = true

  sletTest(app)
    .post('/')
    .set('X-Forwarded-For', 'client, p1, p2')
    .expect('["client","p1","p2"]', t.end);
})

// it('should return an empty array', function(done){
//   var app = express();
//
//   app.use(function(req, res, next){
//     res.send(req.ips);
//   });
//
//   request(app)
//   .get('/')
//   .set('X-Forwarded-For', 'client, p1, p2')
//   .expect('[]', done);
// })
// })

test.cb('should return an empty array', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/ips')
  app.proxy = false

  sletTest(app)
    .post('/')
    .set('X-Forwarded-For', 'client, p1, p2')
    .expect('[]', t.end);
})


//
// describe('when X-Forwarded-For is not present', function(){
//   it('should return []', function(done){
//     var app = express();
//
//     app.use(function(req, res, next){
//       res.send(req.ips);
//     });
//
//     request(app)
//     .get('/')
//     .expect('[]', done);
//   })
// })
//

test.cb('when X-Forwarded-For is not present should return []', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/ips')
  app.proxy = false

  sletTest(app)
    .post('/')
    .expect('[]', t.end);
})
