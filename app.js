'use strict';

const Slet = require('./');
const app = new Slet({
    root: __dirname,
    debug: true,
    auto:true,
    "views" :{
        "path" : __dirname,
        "option": { "map": {"html": "nunjucks" }}
    }
});

// const views = require('koa-views');
//
// var _views = views(__dirname,{ "map": {"html": "nunjucks" }})
// // app.defineMiddleware('koa-views', _views)
//
// app.use(_views)
//
// app.defineController(require('slet-viewcontroller'))
// app.router('/2', require('./viewctrl') )

// app.use(function (ctx, next) {
//   return ctx.render('index', {
//     title : "1"
//   })
// })

//
//
// app.defineController(require('slet-basiccontroller'))
// app.defineController(require('slet-viewcontroller'))

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
app.router('/2', ('./viewctrl') )  

// app.router(require('./pathctrl') )  

// app.router('./pathctrl') 

// app.routerDir('test/controller/fixtures') 
app.routerDir('test/router/fixtures') 


//  app.router('/d', './controller/a') 

  

app.start(3000) 

