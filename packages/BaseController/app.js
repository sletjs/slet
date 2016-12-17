'use strict'

const Slet = require('slet')

const app = new Slet({
  root: __dirname,
  debug: true
})

// app.defineController(require('.'))

app.router('test/fixtures/basectrl')

app.router('test/fixtures/postctrl')

app.router('test/fixtures/allctrl')

app.start(4005)
