# viewcontroller

- 支持自定义模板引擎
- 多种渲染方式

```
'use strict';

const BasicController = require('./base')

module.exports = class MyController extends BasicController {
  constructor(app, ctx, next) {
    super(app, ctx, next)
  }
  
  get() { 
    var a = this.query.a
    
    // if 
    // this.renderType = 'view'
    
    // return {
    //   tpl: 'index',
    //   data: {
    //     title: 'ssddssdd a= '+a
    //   }
    // }
    
    // if this.render, make this.renderType = 'view' 
    // use default
    // this.tpl = 'index'
    // this.data =  {
    //   title: 'ssddssdd a= '+a
    // }
    // return this.render()
    // use tpl
    //  this.data = {}
    // return this.render('tpl')
    // use tpl && data
    // return this.render('tpl', {
    //   a:1
    // })
    // this.data =  {
    //   title: 'ssddssdd a= '+a
    // }
    // return this.render('index')
    this.tpl = 'index'
    this.data =  {
      title: 'ssddssdd a= '+a
    }
    return this.render()
  } 
}
```