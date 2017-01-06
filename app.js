'use strict'

const Slet = require('./packages/slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  constructor (app, ctx, next) {
    super(app, ctx, next)

    this.path = '/'
  }
  
  get (req, res) {
    return ({ hello: 'world' })
  }
  
  post(req, res) {
    var a = this.pp.a
    
    return res.body = "ssss" +a
  } 
}

app.router(MyController)

app.start(3000) 

module.exports = app.callback()
