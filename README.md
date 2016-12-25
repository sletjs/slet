# slet

> slet = servlet in Node.js 4.x+

[![NPM version](https://img.shields.io/npm/v/slet.svg?style=flat-square)](https://www.npmjs.com/package/slet)
[![Build](https://travis-ci.org/sletjs/slet.svg?branch=master)](https://travis-ci.org/sletjs/slet)
[![codecov.io](https://codecov.io/github/sletjs/slet/coverage.svg?branch=master)](https://codecov.io/github/sletjs/slet?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

- slet
- slet-basecontroller

## Features

- Micro Kernel
- Pluggable Controller
- Build-in Router && Auto-mount Router
- Auto-inject Controller Dependency
- Custom View Render
- Convention over Configuration
- Use Expressjs-like req && res api

## Usages

```js
'use strict'

const Slet = require('slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  get (req, res) { 
    var a = req.query.a

    return res.body = `hello world ${a}`
  } 
}

app.router('/', MyController)

app.start(3000) 

```

## work

- express req 已经整理完成