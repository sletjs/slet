# slet

Core

- Controller
- Router
- View
- Config

Extention

- db
- session
- upload
- uploadCdn


## Controller

- 分类
    - base：直接返回json或其他内容
    - view：返回tpl和data，如果无，从this变量上获取

- 方法：支持2种
    - 默认的httpverb（methods模块支持的都支持）
    - 自定义的，比如upload等

## Router

第一种，暴露path和controller（controller内部不需要path）

```
app.router('/', require('./ctrl') )  
```

or

```
app.router('/', './ctrl')  
```

第二种，将path写到controller里

```
app.router(require('./pathctrl') )  
```

or

```
app.router('./pathctrl')  
```

pathctrl代码

```
'use strict';

const ApiController = require('..').Api

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


第三种，指定路径加载

```
app.routerDir('app/controller' )  
```

## Filter

### 分类

- global_filter 从全局的middlewares里按照名字取，一般定义在base类里，如果需要子类也可以重写
  - 示例this.global_filter = ['koa-bodyparser', 'koa-views']
- {verb}_filter 是特定请求verb之的拦截器，仅限于当前verb
  - 示例this.get_filter = [this.log]

### 加载顺序

> global_filter（父类默认继承） > {verb}_filter （当前文件） > {verb}() （当前文件）

###  global_filter说明

通过app.defineMiddleware()方法定义custom_filter

```
app.defineMiddleware('custom_filter', function(ctx, next){
    console.log('a before')
    return next().then(function(){
      console.log('a after')
    })    
})
```

然后在对应的类中

```
class PathController extends ApiController {
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

- this.get_filter = []
- this.post_filter = []

此filter是请求发起之后才生效，所以测试请发起http请求。

```
'use strict';

const ApiController = require('..').Api

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
  
  post() {
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


## 插件

- db
- session
- upload
- uploadCdn

## 可视化

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

