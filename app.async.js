'use strict'

const Slet = require('./packages/slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  async get (req, res) { 
    // logic
    await this.sleep(300)
    
    // send to browser
    res.send({a:1})
  }
  
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

app.router('/', MyController)

app.start(3006) 
