# slet

> slet = servlet in Node.js 6+

[![NPM version](https://img.shields.io/npm/v/slet.svg?style=flat-square)](https://www.npmjs.com/package/slet)
[![Build](https://travis-ci.org/sletjs/slet.svg?branch=master)](https://travis-ci.org/sletjs/slet)
[![codecov.io](https://codecov.io/github/sletjs/slet/coverage.svg?branch=master)](https://codecov.io/github/sletjs/slet?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Features

- Micro Kernel
- Pluggable Controller
- Build-in Router && Auto-mount Router
- Auto-inject Controller Dependency
- Convention over Configuration

## Config

```
{
    "debug": false,

    "views" :{
        "path" : ".",
        "option": { "map": {"html": "nunjucks" }}
    },
    "automount": {
        "path": "controllers",
        "option": {
            "recurse": true
        }
    },

    "mockCtx": {
        "request":{
            "body": {

            }
        }
    }
}
```

## 可视化todo

- 全局中间件
- 创建Controller
  - path
  - get|post等方法
  - 方法前后，配置中间件


根据path决定，是否走全局路由，走哪些全局路由

每个请求都有自己的中间件栈

继承api
  - get|post
  - upload
  - sesssion
  - db
继承view
  - 

## 集成

第三方集成

### sletTest

supertest是express和koa里常用的api测试工具，非常简单，方便，如果在slet中想集成supertest也是非常简单的，原因是slet的listen和run方法返回的koa的app.listen，所以集成方式是一样的。为了简单，这里提供slettest简单封装。

```
$ npm i -D slettest
```

app.js

```
'use strict';

const Slet = require('slet');
const app = new Slet({
    root: __dirname,
    debug: true
});

// response
app.use(ctx => {
  ctx.body = 'Hello Koa'
})

module.exports = app
```

测试代码

```
import test from 'ava'

var app = require('./app')
var superkoa = require('.')

test.cb('superkoa()', t => {
  superkoa(app)
    .get('/')
    .expect(200, function (err, res) {
      t.ifError(err)
      t.is(res.text, 'Hello Koa', 'res.text == Hello Koa')
      t.end()
    })
})

test('yield superkoa()', function * (t) {
  let res = yield superkoa(app)
    .get('/')

  t.is(200, res.status)
  t.is(res.text, 'Hello Koa', 'res.text == Hello Koa')
})

test('async superkoa()', async (t) => {
  let res = await superkoa(app)
    .get('/')

  t.is(200, res.status)
  t.is(res.text, 'Hello Koa', 'res.text == Hello Koa')
})

```

更多文档，参见 http://visionmedia.github.io/superagent/