import test from 'ava'

const Slet = require('../..');
const app = new Slet({
    root: __dirname,
    debug: false
});

test('app.identifyDept()', t => {
  return app.identifyDept().then(function(r){

    // console.log(r)
    t.true(r.length > 0)
    t.true(app.scanedControllerArray.length > 0)

    t.pass()
  })
})
