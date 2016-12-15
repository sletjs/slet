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

## Plugins

已有

- [slet-plugin-static](https://github.com/sletjs/slet-plugin-static)

### 方法1


```
'use strict'

const StaticPlugin = require('slet-plugin-static')

const Slet = require('slet')

// 经典用法
Slet.plugin(StaticPlugin)

const app = new Slet({
  root: __dirname,
  debug: false
})

// lazy load plugin
app.static()

// app.start(3005)
module.exports = app

```

步骤

- 1）const StaticPlugin = require('.')
- 2）Slet.plugin(StaticPlugin)
- 3) app.static()
### 方法2

```
'use strict';

const StaticPlugin = require('slet-plugin-static')

const Slet = require('slet');

// 经典用法
app.plugin(StaticPlugin)

const app = new Slet({
    root: __dirname,
    debug: true
});

app.static()

app.start(3000)
```

### 插件定义方法

```
module.exports = class StaticPlugin {

  static () {
    if (!this.opts.static) {
      this.opts.static = {
        path: this.opts.root + '/public',
        opts: {} // https://github.com/koajs/static#options
      }
    }
    
    this.use(require('koa-static')(this.opts.static.path, this.opts.static.opts));
  }
}
```

说明：

- this.opts是从slet的构造函数里传入的，可以多处改写
- this.use即koa 2.x的use方法，传中间件即可
- 只有用到static()方法的时候，才加载require('koa-static')，懒加载

## 扩展

### controller扩展

- db
- session
- upload
- uploadCdn

每个都继承相应的Controller即可，最好是作为单独模块，发布到npm上。可以非常好的复用。

### filter扩展

通过filter方式，实现扩展。所有的扩展都是Koa 2.x标准中间件，可以更好的复用已有的中间件


### plugin

采用mix的方式将插件挂载进去

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