'use strict';

const Slet = require('./');
const app = new Slet({
    root: __dirname,
    debug: true
});

// support file path or Controller
//app.router('/', './ctrl' )  

// app.router('/', require('./ctrl') )  

// app.router('/2', require('./viewctrl') )  

// // app.router(require('./pathctrl') )  

// app.router('./pathctrl') 

// app.routerDir('controller') 

 app.router('/d', './controller/a') 


app.start() 