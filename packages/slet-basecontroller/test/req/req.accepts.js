import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

const app = new Slet({
  root: __dirname,
  debug: false
})

app.router('fixtures/reqaccepts')
// app.router('/', __dirname  + '/fixtures/req.accepts')


test.cb('should return true when Accept is not present', t => {
  sletTest(app)
    .get('/')
    .expect('yes', t.end);
})


//     it('should return true when present', function(done){
//       var app = express();
//
//       app.use(function(req, res, next){
//         res.end(req.accepts('json') ? 'yes' : 'no');
//       });
//
//       request(app)
//       .get('/')
//       .set('Accept', 'application/json')
//       .expect('yes', done);
//     })
test.cb('should return true when present', t => {
  sletTest(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect('yes', t.end);
})

//     it('should return false otherwise', function(done){
//       var app = express();
//
//       app.use(function(req, res, next){
//         res.end(req.accepts('json') ? 'yes' : 'no');
//       });
//
//       request(app)
//       .get('/')
//       .set('Accept', 'text/html')
//       .expect('no', done);
//     })
//   })
test.cb('should return false otherwise', t => {
  sletTest(app)
    .get('/')
    .set('Accept', 'text/html')
    .expect('no', t.end);
})

//   it('should accept an argument list of type names', function(done){
//     var app = express();
//
//     app.use(function(req, res, next){
//       res.end(req.accepts('json', 'html'));
//     });
//
//     request(app)
//     .get('/')
//     .set('Accept', 'application/json')
//     .expect('json', done);
//   })

// app.defineController(require('../..'))
 

test.cb('should accept an argument list of type names', t => {
  app.router('fixtures/reqaccepts2')
  
  sletTest(app)
    .get('/2')
    .set('Accept', 'application/json')
    .expect('json', t.end);
})

//     it('should return the first when Accept is not present', function(done){
//       var app = express();
//
//       app.use(function(req, res, next){
//         res.end(req.accepts(['json', 'html']));
//       });
//
//       request(app)
//       .get('/')
//       .expect('json', done);
//     })
test.cb('should return the first when Accept is not present', t => {
  app.router('fixtures/reqaccepts2')
  
  sletTest(app)
    .get('/2')
    // .set('Accept', 'application/json')
    .expect('json', t.end);
})

//     it('should return the first acceptable type', function(done){
//       var app = express();
//
//       app.use(function(req, res, next){
//         res.end(req.accepts(['json', 'html']));
//       });
//
//       request(app)
//       .get('/')
//       .set('Accept', 'text/html')
//       .expect('html', done);
//     })

test.cb('should return the first acceptable type', t => {
  app.router('fixtures/reqaccepts2')
  
  sletTest(app)
    .get('/2')
    .set('Accept', 'text/html')
    .expect('html', t.end);
})



//     it('should return false when no match is made', function(done){
//       var app = express();
//
//       app.use(function(req, res, next){
//         res.end(req.accepts(['text/html', 'application/json']) ? 'yup' : 'nope');
//       });
//
//       request(app)
//       .get('/')
//       .set('Accept', 'foo/bar, bar/baz')
//       .expect('nope', done);
//     })
test.cb('should return false when no match is made', t => {
  app.router('fixtures/reqaccepts3')
  
  sletTest(app)
    .get('/3')
    .set('Accept', 'foo/bar, bar/baz')
    .expect('nope', t.end);
})

//     it('should take quality into account', function(done){
//       var app = express();
//
//       app.use(function(req, res, next){
//         res.end(req.accepts(['text/html', 'application/json']));
//       });
//
//       request(app)
//       .get('/')
//       .set('Accept', '*/html; q=.5, application/json')
//       .expect('application/json', done);
//     })


test.cb('should take quality into account', t => {
  app.router('fixtures/reqaccepts4')
  
  sletTest(app)
    .get('/4')
    .set('Accept', '*/html; q=.5, application/json')
    .expect('application/json', t.end);
})

//     it('should return the first acceptable type with canonical mime types', function(done){
//       var app = express();
//
//       app.use(function(req, res, next){
//         res.end(req.accepts(['application/json', 'text/html']));
//       });
//
//       request(app)
//       .get('/')
//       .set('Accept', '*/html')
//       .expect('text/html', done);
//     })

test.cb('should return the first acceptable type with canonical mime types', t => {
  app.router('fixtures/reqaccepts4')
  
  sletTest(app)
    .get('/4')
    .set('Accept', '*/html')
    .expect('text/html', t.end);
})
