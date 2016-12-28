'use strict'

const Slet = require('./packages/slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  async get (req, res) {
    let username = req.query.username
    // logic
    await this.sleep(300)
    
    // send to browser
    return res.send(`hello world ${username}`)
  }
  
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

app.router('/', MyController)

app.start(3006) 
