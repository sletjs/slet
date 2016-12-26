'use strict'

const Slet = require('./packages/slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  get (req, res) { 
    var a = req.query.a

    // return res.body = `hello world ${a}`
    res.send(`hello world ${a}`)
  }
  
  post(req, res) {
    var a = this.pp.a
    
    return res.body = "ssss" +a
  } 
}

app.router('/:id', MyController)

app.start(3000) 
