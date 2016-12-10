# slet

> slet = servlet in Node.js

[![NPM version](https://img.shields.io/npm/v/slet.svg?style=flat-square)](https://www.npmjs.com/package/slet)
[![Build](https://travis-ci.org/sletjs/slet.svg?branch=master)](https://travis-ci.org/sletjs/slet)
[![codecov.io](https://codecov.io/github/sletjs/slet/coverage.svg?branch=master)](https://codecov.io/github/sletjs/slet?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Features

- Micro Kernel
- Pluggable
- Build-in Router
- Convention over Configuration

## Getting Start

### 安装slet模块

```
$ npm i -S slet
```

### 从app.js开始

```
'use strict';

const Slet = require('slet');
const app = new Slet({
    root: __dirname,
    debug: true
});

app.router('/', require('./basicctrl') )  

app.start(3000)
```

### 编写basicctrl.js

```
'use strict';

const BasicController = require('slet').BasicController

module.exports = class MyBasicController extends BasicController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
  }
  
  get() { 
    let a = this.query.a
    // this.renderType='view'
    return {
      a: 'this is a',
      b: {
        c: 'ssddssdd a= ' + a
      }
    }
  } 
}

```

### 启动server

最后，执行app.js，启动server

```
$ node app.js
```

### 查验结果

在浏览器中打开 http://127.0.0.1:3000/?a=2

### 更多示例

- [example-basic](https://github.com/sletjs/example-basic)
- [example-basic-autorouter](https://github.com/sletjs/example-basic-autorouter)
- [example-view](https://github.com/sletjs/example-view)

## Controller

- 分类
    - base: 所有controller的基类
      - [BaseController](https://github.com/sletjs/BaseController)
    - basic：直接返回json或其他内容
      - [BasicController](https://github.com/sletjs/BasicController)
    - view：返回tpl和data，如果无，从this变量上获取
      - [ViewController](https://github.com/sletjs/ViewController)
    - upload：上传文件
      - [UploadController](https://github.com/sletjs/UploadController)
      - [UploadViewController](https://github.com/sletjs/UploadViewController)
    - session：返回tpl和data，如果无，从this变量上获取

- 方法：支持2种
    - 默认的httpverb（methods模块支持的都支持）
    - 自定义的，比如upload等

### 生命周期

在src/Slet.js中，调用如下

```
// before
ctrl.before()

// alias this.xxx
ctrl.alias()

// execute {verb}()
ctrl.get()

// after
ctrl.after()
```

- before 是{verb}()之前调用的
- after 是{verb}()之后调用的
- alias 是用于定义别名的


alias 别名定义：如果支持bodyparser，那么把this.ctx.request.body简化为this.pp，避免特别长的方法调用。

```
 alias() {
    if (this.ctx.request.body) {
        this.pp = this.ctx.request.body
    }
  }
```

### BaseController

```
module.exports = class BaseController {
  constructor(app, ctx, next) {
    this.app = app
    this.ctx = ctx
    this.next = next
    this.renderType = 'default'
    this.data = {}
    this.tpl = 'index'
    
    this.result = '{verb}() call result'
  }

  // lifecycle
  before() {
    
  }
  
  alias() {
    if (this.ctx.request.body) {
        this.pp = this.ctx.request.body
    }
  }
  
  after() {
    
  }
}
```

说明

- renderType：default | view

### 扩展controller

定义自己的controller，

- 一定要注意名字，它会被用于子类继承，所以一定要见名之意。
- 继承自BaseController
- 可选实现上面的生命周期方法

```
'use strict';

const BaseController = require('slet-basecontroller')

module.exports = class BasicController extends BaseController{
  constructor(app, ctx, next) {
    super(app, ctx, next)
    
    this.query = ctx.query

    this.global_filter = ['koa-bodyparser']
  }
}
```

在app.js中使用defineController方法加载这个控制器

```
app.defineController(require('slet-basiccontroller'))
```

然后，在自己的类中

```
'use strict';

const BasicController = require('../../../').BasicController

module.exports = class SomeController extends BasicController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
  }
  
  get() { 
    var a = this.query.a
    
    return {
      a:1,
      b: a
    }
  } 
}

```

## Router

### 第一种，暴露path和controller
（controller内部不需要path）

```
app.router('/', require('./ctrl') )  
```

or

```
app.router('/', './ctrl')  
```

已测

### 第二种，将path写到controller里

```
app.router(require('./pathctrl') )  
```

or

```
app.router('./pathctrl')  
```

已测

pathctrl代码

```
'use strict';

const ApiController = require('..').Base

class PathController extends ApiController {
  constructor(ctx, next) {
    super(ctx, next)
    
    this.path = '/c'
  }
  
  get() {
    var a = this.query.a
    console.log(a)
    return {
      dddd:1,
      b: a
    }
  } 
}

PathController.path = '/b'

module.exports = PathController
```

优先级

> app.router('/d', './controller/a')  >　this.path= '/ｃ' > Controller.path='/b'

亦即

> '/d' > '/c' > '/b


### 第三种，指定路径加载

```
app.routerDir('app/controller' )  
```

此种情况会默认加载某个目录下的controller，请确保你的controller里有path，无论是属性，还是static属性方式都行。

已测

## Filter

### 分类

- app.use 和koa的use用法是一样的
- global_filter 从全局的middlewares里按照名字取，一般定义在base类里，如果需要子类也可以重写
  - 示例this.global_filter = ['koa-bodyparser', 'koa-views']
- {verb}_filter 是特定请求verb之的拦截器，仅限于当前verb
  - 示例this.get_filter = [this.log]

### 加载顺序

> app.use > global_filter（父类默认继承） > {verb}_filter （当前文件） > {verb}() （当前文件）

### app.use 

和Koa 2.x的use用法是一样的，参数Koa 2.x的中间件，只能用于加载app级别的filter

参见 https://github.com/koajs/koa/tree/v2.x

###  global_filter说明

通过app.defineMiddleware()方法定义custom_filter（也可以写到配置里，稍后实现）

```
app.defineMiddleware('custom_filter', function(ctx, next){
    console.log('a before')
    return next().then(function(){
      console.log('a after')
    })    
})
```

或者

```
app.middlewares['koa-views'] = views(this.viewPath, this.opts.views.option)
```

然后在对应的类中

```
class PathController extends BaseController {
  constructor(ctx, next) {
    super(ctx, next)
    
    this.path = '/c'
    this.global_filter.push('custom_filter')
  }

  ...
}
```

至此，完成了自定义global filter功能。

其实this.global_filter是数组，如果想调整顺序也可以的。

### {verb}_filter说明

在构造函数里指定filter，所谓的filter即Koa 2.x的中间件，规则是verb + '_filter'

举例：

- this.get_filter = [] 已测
- this.post_filter = [] 已测

此filter是请求发起之后才生效，所以测试请发起http请求。

```
'use strict';

const ApiController = require('..').Base

class PathController extends ApiController {
  constructor(ctx, next) {
    super(ctx, next)
    
    this.get_filter = [this.log]
  }
  
  log(ctx, next){
    console.log('before')
    return next().then(function(){
      console.log('after')
    })
  }

  get() {
    var a = this.query.a
    console.log(a)
    return {
      dddd:1,
      b: a
    }
  } 
}

PathController.path = '/b'

module.exports = PathController
```

这里log即Koa 2.x中间件经典写法

``` 
 log(ctx, next){
    console.log('before')
    return next().then(function(){
      console.log('after')
    })
  }
```

在处理get之前，会走next()方法之前的内容。在处理完get之后，会有next后的then部分。可以有效的拦截前后2种，所以filter无需分前后，一个即可。

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

## 扩展

### controller扩展

- db
- session
- upload
- uploadCdn

每个都继承相应的Controller即可，最好是作为单独模块，发布到npm上。可以非常好的复用。

### filter扩展

通过filter方式，实现扩展。所有的扩展都是Koa 2.x标准中间件，可以更好的复用已有的中间件


## 集成

第三方集成

### supertest

supertest是express和koa里常用的api测试工具，非常简单，方便，如果在slet中想集成supertest也是非常简单的，原因是slet的listen和run方法返回的koa的app.listen，所以集成方式是一样的。

```
'use strict'

const request = require('supertest')
request(app.listen())
```
