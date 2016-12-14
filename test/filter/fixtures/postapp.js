const Slet = require('../../..');
const app = new Slet({
    root: __dirname,
    debug: false
});

// app.defineController(require('slet-basiccontroller'))
// app.defineController(require('slet-viewcontroller'))
// support file path or Controller
app.router('./post')  

app.start(6006)

module.exports = app