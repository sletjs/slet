'use strict'

const Slet = require('./packages/slet')
const BaseViewController = require('./packages/slet-basecontroller')

const app = new Slet({
    root: __dirname
})

class MyController extends BaseViewController {
  get () { 
    var a = this.query.a

    return `hello world ${a}`
  } 
}

app.router('/', MyController)

app.start(3000) 
