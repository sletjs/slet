'use strict'

const Slet = require('./packages/slet')

const app = new Slet({
    root: __dirname
})

class MyController extends Slet.BaseController {
  get () { 
    var a = this.query.a

    return `hello world ${a}`
  } 
}

app.router('/', MyController)

app.start(3000) 
