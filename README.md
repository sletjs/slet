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
    - api：直接返回json或其他内容
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

const ApiController = require('.').Api

class PathController extends ApiController {
  constructor(ctx, next) {
    super(ctx, next)
  }
  
  get() { 
    var a = this.query.a
    
    return {
      a:1,
      b: a
    }
  } 
}

PathController.path = '/path/a'

module.exports = PathController
```

第三种，指定路径加载

```
app.routerDir('app/controller' )  
```

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

