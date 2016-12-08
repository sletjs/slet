'use strict';

const Slet = require('./');
const app = new Slet({
    root: __dirname
});

// support file path or Controller
//app.router('/', './ctrl' )  

app.router('/', require('./ctrl') )  

app.router('/2', require('./viewctrl') )  

app.start()