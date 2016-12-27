'use strict'

const Slet = require('./packages/slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  get (req, res) { 
    req.accepts(['json']);
    var a = req.query.a
    // res.status = 200
    return res.send({a:1})

    //  res.locals.user = {a:1}
    // return res.body = `hello world ${a}`
    // res.send(`hello world ${a}`)
    // return res.download('/lerna.json')
    // res.status = 201
    // return res.sendStatus(200)

    return res.format({
      'text/plain': function(){
        res.send('hey');
      },

      'text/html': function(){
        res.send('<p>hey</p>');
      },

      'application/json': function(){
        res.send({ message: 'hey' });
      },

      'default': function() {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    });

    return res.json({a:1})
    return res.jsonp(null)
    return res.location('/foo/bar');

    // return res.setStatus(201).end('sss')
  }
  
  post(req, res) {
    var a = this.pp.a
    
    return res.body = "ssss" +a
  } 
}

app.router('/:id', MyController)

app.start(3000) 
