'use strict';

const Moa = require('./moa');
const app = new Moa();

// support file path or Controller
//app.router('/', './ctrl' )  

app.router('/', require('./ctrl') )  

app.start()