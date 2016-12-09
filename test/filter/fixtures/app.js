const Slet = require('../../..');
const app = new Slet({
    root: __dirname,
    debug: false
});

app.start(6000)

// support file path or Controller
app.router('./get')  