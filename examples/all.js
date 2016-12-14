'use strict';

const Slet = require('../');
const app = new Slet({
    root: __dirname,
    debug: true,
    auto:true,
    "views" :{
        "path" : __dirname,
        "option": { "map": {"html": "nunjucks" }}
    }
});



app.router('./allctrl')
    

app.start(3000) 

