import test from 'ava'

var sletTest = require('slettest')
const Slet = require('../../../slet')
const BaseController = require('../..')

test.cb('should set a cookie passed expiry', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/clearCookie')

  sletTest(app)
    .get('/')
    .end(function(err, res){
      var val = 'sid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly';
      t.regex(res.header['set-cookie'].join(""), /^sid=; path=\/;/)
      t.end();
    })
})

test.cb('should set the given params', t => {
  const app = new Slet({
    root: __dirname,
    debug: false
  })
  
  app.router('fixtures/clearCookie2')

  sletTest(app)
    .get('/2')
    .end(function(err, res){
      var val = 'sid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly';
      t.regex(res.header['set-cookie'].join(""), /^sid=; path=\/admin;/)
      t.end();
    })
})
