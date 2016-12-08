'use strict';
var debug = require('debug')('slet')

const fs = require('fs')
const resolve = require('path').resolve
const Koa = require('koa');
const methods = require('methods');
const slice = Array.prototype.slice;
const router = require('koa-router')();
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const compose = require('koa-compose')

// local
const ApiController = require('./controller/ApiController')
const ViewController = require('./controller/ViewController')
const defaultConfig = require('./config')

class Slet {
  constructor(opts) {
    this.opts = Object.assign(defaultConfig, opts);

    this.viewPath = resolve(this.opts.root, this.opts.views.path)

    //
    this.app =  new Koa();
    this.routes = []
    this.middlewares = {}

    if (this.opts.debug === true) {
      console.log(this.opts)
    }

    this.routerDir(this.opts.automount.path)
    this.initMiddleware()
  }
  
  initMiddleware() {
    this.middlewares['koa-bodyparser'] = bodyParser()
    this.middlewares['koa-views'] = views(this.viewPath, this.opts.views.option)
  }
  
  routerDir(dir) {
    this.routerPath = resolve(this.opts.root, dir)

    if (fs.existsSync(this.routerPath) === false) {
      console.log('router path is not exists: ' + this.routerPath)
      return;
    }

    var requireDir = require('require-dir');
    var controllers = requireDir(this.routerPath, this.opts.automount.option);
    
    for(let i in controllers) {
      if (controllers[i].path) this.router(controllers[i])      
    }
  }

  router() {
    let self = this
    let path, controller

    if (arguments.length == 1) {
      // (controller)
      // path = arguments[0] from controller.path
      controller = arguments[0]
    } else if (arguments.length >= 2) {
      // (path, controller)
      path = arguments[0]
      controller = arguments[1]
    } else {
      console.log('error')
    }
    
    var Controller = controller
    if (typeof controller === 'string') {
      // 注意.ctrl && ctrl
      // file.exists
      let file = resolve(this.opts.root, controller)
      // console.log(file) 
      Controller =  require(file)
    }

    if (!path) {
      path = Controller.path
    }
    
    var mockCtx = new Controller({}, function(){})
    if (this.opts.debug) {
      var m = this._avaiableMethods(mockCtx)
      let t
      if(mockCtx instanceof ApiController) {
        t = 'Api'
      }
      
      if(mockCtx instanceof ViewController) {
        t = 'View'
      }

      this.routes.push({
        path: path, 
        class: controller,
        avaiableMethods: m,
        type: t,
        middlewares: mockCtx.middlewares
      })
    }
    
    var _middlewares  =  []
    
    for (var i in mockCtx.middlewares) {
      _middlewares.push(self.middlewares[mockCtx.middlewares[i]])
    }
    
    if (mockCtx.get_filter) {
      for (var i in mockCtx.get_filter) {
        _middlewares.push(mockCtx.get_filter[i])
      }
    }
    
    router.all(path, compose(_middlewares), function (ctx, next) {
      console.log(ctx.request.method)
      console.log(ctx.request.path)
      var ctrl = new Controller(ctx, next)
      
      debug(_middlewares)
      
      if(ctrl instanceof ApiController) {
        return ctx.body = ctrl[ctx.request.method.toLowerCase()].apply(ctrl, slice.call(arguments, 1));
      }
      
      if(ctrl instanceof ViewController) {
        var result = ctrl[ctx.request.method.toLowerCase()].apply(ctrl, slice.call(arguments, 1));

        var obj = {
          data: ctrl.data,
          tpl: ctrl.tpl
        }
        Object.assign(obj, result);

        return ctx.render(obj.tpl, obj.data) 
      }

      return ctx.body = "ctrl instanceof Controller error"
    });
  }

  _avaiableMethods(obj) {
    let m = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    m.shift()

    let re= []
    // methods
    m.forEach(function(method){
      var a = methods.find(function(n){
        return n === method
      })
      re.push(a)
    })

    return re
  }

  start(port=3000) {
    if (this.opts.debug) {
      console.log(this.routes)
    }
    
    this.app
      .use(router.routes())
      .use(router.allowedMethods());

    this.app.listen(port)
  }
}

Slet.Api = ApiController
Slet.View = ViewController

module.exports = Slet 
