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
- Use Express or Koa req && res api

## Usages

### Use Promise

```js
'use strict'

const Slet = require('slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  get (req, res) { 
    let username = req.query.username

    return res.send(`hello world ${username}`)
  } 
}

app.router('/', MyController)

app.start(3000) 

```

### Use Async/Await
you can also use Async function in Controller

```js
'use strict'

const Slet = require('./packages/slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  async get (req, res) { 
    // logic
    await this.sleep(300)
    
    // send to browser
    res.send({a:1})
  }
  
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

app.router('/', MyController)

app.start(3006) 

```

## work

- [express req 已经整理完成](http://sletjs.com/zh-cn/api/request.html)
- [express res 已经整理完成](http://sletjs.com/zh-cn/api/response.html)
