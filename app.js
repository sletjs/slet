'use strict';

const Slet = require('./');
const app = new Slet({
    root: __dirname,
    debug: true
});

// app.defineMiddleware('custom_filter', function(ctx, next){
//     console.log('a before')
//     return next().then(function(){
//       console.log('a after')
//     })    
// })

// // support file path or Controller
// app.router('/', './ctrl' )  

// app.router('/', require('./ctrl') )  

// app.router('/2', require('./viewctrl') )  

// app.router(require('./pathctrl') )  

// app.router('./pathctrl') 

app.routerDir('test/router/fixtures') 


//  app.router('/d', './controller/a') 


app.start() 