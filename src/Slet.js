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
const BaseController = require('./controller/BaseController')
const ViewController = require('./controller/ViewController')
const defaultConfig = require('./config')
const _ctx = require('./mockCtx')
const _next = function(){}

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
    this._initMiddleware()
  }
  
  _initMiddleware() {
    this.middlewares['koa-bodyparser'] = bodyParser()
    this.middlewares['koa-views'] = views(this.viewPath, this.opts.views.option)
  }
  
  defineMiddleware(name, fn) {
    this.middlewares[name] = fn
  }

  routerDir(dir) {
    this.routerPath = resolve(this.opts.root, dir)

    if (fs.existsSync(this.routerPath) === false) {
      if (this.opts.debug === true) console.log('router path is not exists: ' + this.routerPath)
      return;
    }

    var requireDir = require('require-dir');
    var controllers = requireDir(this.routerPath, this.opts.automount.option);
    
    for(let i in controllers) {
      let Controller = controllers[i]
      let mockCtx = new Controller(_ctx, _next)
      // 兼容static.path
      if (Controller.path) this.router(Controller)
      // 兼容object.path 
      else if (mockCtx.path) this.router(Controller)  
      // warn log
      else console.warn('[WARNING] routerDir at ' + this.routerPath + ' no path config in ' + Controller) 
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
    
    var mockCtx = new Controller(_ctx, _next)
    var avaiableMethods = this._avaiableMethods(mockCtx)

    // 如果attr controller this.path =xxx
    if (!path && mockCtx.path) {
      path = mockCtx.path
    }

    // 如果static controller.path =xxx
    if (!path) {
      path = Controller.path
    } 
    
    if (!path) {
      console.log("you must spec a path to controller")
    }

    if (this.opts.debug) {
      let t
      if(mockCtx instanceof BaseController) {
        t = 'Api'
      }
      
      if(mockCtx instanceof ViewController) {
        t = 'View'
      }

      this.routes.push({
        path: path, 
        class: controller,
        avaiableMethods: avaiableMethods,
        type: t,
        global_filter: mockCtx.global_filter
      })
    }

    router.all(path, function (ctx, next) {
      let verb = ctx.request.method.toLowerCase();
      var ctrl = new Controller(ctx, next)
      debug(ctx.request.method)
      debug(ctx.request.path)

      var match = avaiableMethods.find(function(n){
        return n === verb
      })
      if (!match) {
        console.log(path + ' ' + (Controller + "").split(' extends')[0] + " #" + verb + '() not impl')
        return ctx.body = {
          code: 1,
          msg : {
            "text": path + " " + verb + ' not impl',
            "controller": (Controller + "").split(' extends')[0]
          }
        }
      }
          
      var _middlewares  =  []
      
      for (var i in ctrl.global_filter) {
        _middlewares.push(self.middlewares[ctrl.global_filter[i]])
      }      

      debug(_middlewares)

      let filter = ctrl[verb + '_filter']||[]
      for (var i in filter) {
        _middlewares.push(filter[i])
      }

      debug(_middlewares)
      
      _middlewares.push(function last(ctx, next) {
        let arg = slice.call(arguments, 1)

        // alias this.xxx
        ctrl = require('./alias')(ctrl, ctx)

        if(ctrl instanceof BaseController) { 
          return ctx.body = ctrl[verb].apply(ctrl, arg);
        }
        
        if(ctrl instanceof ViewController) {
          var result = ctrl[verb].apply(ctrl, arg);

          var obj = {
            data: ctrl.data,
            tpl: ctrl.tpl
          }
          Object.assign(obj, result);

          return ctx.render(obj.tpl, obj.data) 
        }

        return ctx.body = "ctrl instanceof Controller error"
      })

      debug(_middlewares)

      return compose(_middlewares)(ctx, next)
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
      if (a) re.push(a)
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

Slet.Base = BaseController
Slet.View = ViewController

module.exports = Slet 
