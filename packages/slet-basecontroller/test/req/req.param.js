import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')



// escribe('.param(name, default)', function(){
// it('should use the default value unless defined', function(done){
//   var app = express();
//
//   app.use(function(req, res){
//     res.end(req.param('name', 'tj'));
//   });
//
//   request(app)
//   .get('/')
//   .expect('tj', done);
// })

test.cb('.param(name, default) should use the default value unless defined', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/param')

  sletTest(app)
    .post('/')

    .expect('tj', t.end);
})


  // describe('.param(name)', function(){
  //   it('should check req.query', function(done){
  //     var app = express();
  //
  //     app.use(function(req, res){
  //       res.end(req.param('name'));
  //     });
  //
  //     request(app)
  //     .get('/?name=tj')
  //     .expect('tj', done);
  //   })
    
test.cb('.param(name) should check req.query', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })

  app.router('fixtures/param2')

  sletTest(app)
    .post('/?name=tj')
    .expect('tj', t.end);
})



//
//     it('should check req.body', function(done){
//       var app = express();
//
//       app.use(bodyParser.json());
//
//       app.use(function(req, res){
//         res.end(req.param('name'));
//       });
//
//       request(app)
//       .post('/')
//       .send({ name: 'tj' })
//       .expect('tj', done);
//     })
//

test.cb('.param(name) should check req.body', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })

  app.router('fixtures/param2')

  sletTest(app)
    .post('/')
    .send({ name: 'tj' })
    .expect('tj', t.end);
})


//     it('should check req.params', function(done){
//       var app = express();
//
//       app.get('/user/:name', function(req, res){
//         res.end(req.param('filter') + req.param('name'));
//       });
//
//       request(app)
//       .get('/user/tj')
//       .expect('undefinedtj', done);
//     })
//   })
// })

test.cb('.param(name) should check req.params', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })

  app.router('fixtures/param3')

  sletTest(app)
    .post('/user/tj')
    .expect('undefinedtj', t.end);
})

