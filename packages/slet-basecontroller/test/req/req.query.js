import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')



// describe('.query', function(){
//   it('should default to {}', function(done){
//     var app = createApp();
//
//     request(app)
//     .get('/')
//     .expect(200, '{}', done);
//   });

test.cb('.query should default to {}', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/query')

  sletTest(app)
    .get('/')
    .expect(200, '{}', t.end);
})

// it('should default to parse complex keys', function (done) {
//   var app = createApp();
//
//   request(app)
//   .get('/?user[name]=tj')
//   .expect(200, '{"user":{"name":"tj"}}', done);
// });


test.cb('.query should default to parse keys', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/query')

  sletTest(app)
    .get('/?user[name]=tj')
    .expect(200, '{"user[name]":"tj"}', t.end);
})


test.cb('.qs should default to parse complex keys', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/query2')

  sletTest(app)
    .get('/2?user[name]=tj')
    .expect(200, '{"user":{"name":"tj"}}', t.end);
})