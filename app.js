'use strict'

const Slet = require('./packages/slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  get (req, res) { 
    var a = req.query.a

    return res.body = `hello world ${a}`
  } 
}

app.router('/:id', MyController)

app.start(3000) 
