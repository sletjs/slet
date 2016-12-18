'use strict';

const Slet = require('./');
const app = new Slet({
    root: __dirname,
    debug: true,
    views:{
      path: '/test/controller/fixtures/', 
      extension: 'html'
    }
});



app.router('/', require('./test/controller/fixtures/viewctrl.js'))
    
// app.router('/r', require('./fixtures/viewctrl'))

app.start(3000) 

