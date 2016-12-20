import test from 'ava'

'use strict'

const Slet = require('../')

const app = new Slet()

class MyController extends Slet.BaseController {
  get () { 
    return `Hello world`
  } 
}

app.router('/', MyController)

var sletTest = require('slettest') 

test.cb('GET /', t => {
  sletTest(app)
    .get('/')
    .expect(200, function (err, res) {
      t.ifError(err)
      t.is(res.text, 'Hello world', 'res.text == Hello foo!')
      t.end()
    })
})