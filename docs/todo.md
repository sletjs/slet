# TODO

- [ ] defineMiddleware从配置里读取
- [x] Controller机制，类似于插件，将依赖移到controller模块里去，精简



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
