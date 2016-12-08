var requireDir = require('require-dir');
var dir = requireDir('./controller', {recurse: true});


console.log(dir)