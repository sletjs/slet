import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

const app = new Slet({
  root: __dirname,
  debug: false
})

// var app = express();
//
// app.enable('trust proxy');
//
// app.use(function(req, res, next){
//   res.send(req.ip);
// });
//
// request(app)
// .get('/')
// .set('X-Forwarded-For', 'client, p1, p2')
// .expect('client', done);

test.cb('should return the Host when present', t => {
  app.router('fixtures/ip')
  app.proxy = true

  sletTest(app)
    .post('/')
    .set('X-Forwarded-For', 'client, p1, p2')
    .expect('client', t.end);
})
