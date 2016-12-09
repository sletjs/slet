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

app.defineMiddleware('custom_filter', function(ctx, next){
    console.log('a before')
    return next().then(function(){
      console.log('a after')
    })    
})

 app.router('/d', './controller/a') 


app.start() 