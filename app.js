'use strict';

const Slet = require('./packages/slet');
const app = new Slet({
    root: __dirname,
    debug: true,
    "views" :{
        "path" : __dirname,
        "option": { "map": {"html": "nunjucks" }}
    }
});

const BaseViewController = require('./packages/slet-basecontroller')
console.log(BaseViewController)

class MyController extends BaseViewController {
  get() { 
    var a = this.query.a

    return `hello world ${a}`
  } 
}

app.router('/', MyController)


app.start(3000) 

