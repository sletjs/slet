'use strict';

const Slet = require('./');
const app = new Slet({
    root: __dirname+'/test/dept',
    debug: true,
    auto:true,
    "views" :{
        "path" : __dirname,
        "option": { "map": {"html": "nunjucks" }}
    }
});



app.identifyDept().then(function(r){
  console.log(r)
  
})
    

app.start(3000) 

