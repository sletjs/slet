'use strict';
var debug = require('debug')('slet')

const http = require('http');
const fs = require('fs')
const resolve = require('path').resolve
const Koa = require('koa');
const methods = require('methods');
const slice = Array.prototype.slice;
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const compose = require('koa-compose')

// local
// const BasicController = require('./controller/BasicController')
// const ViewController = require('./controller/ViewController')
const defaultConfig = require('./config')
const _ctx = defaultConfig.mockCtx
const _next = function(){}

class Slet {
  constructor(opts) {
    this.opts = Object.assign(defaultConfig, opts);

    this.viewPath = resolve(this.opts.root, this.opts.views.path)

    //
    this.app =  new Koa();
    this.routes = []
    this.controllers = []
    this.middlewares = {}

    if (this.opts.debug === true) {
      console.log(this.opts)
    }

    this.routerDir(this.opts.automount.path)
    this._initMiddleware()
  }
  
  _initMiddleware() {
    this.middlewares['koa-bodyparser'] = bodyParser()
  }
  
  defineMiddleware(name, fn) {
    this.middlewares[name] = fn
  }
  
  defineController(controller) {
    if (typeof controller === 'function') {
      this.controllers.push(controller)
      this._registerControllerClass(controller)
    } else {
      console.log('please use class Controller')
    }
  }
  
  // global middleware && application filter
  use(middleware) {
    this.app.use(middleware)
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
      let mockCtx = new Controller(this, _ctx, _next)
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
    
    var mockCtx = new Controller(self, _ctx, _next)
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
      let t = (Controller + "").split(' extends')[0]

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
      var ctrl = new Controller(self, ctx, next)
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
        
        // before
        ctrl.before()
        
        // alias this.xxx
        ctrl.alias()
        
        // execute {verb}()
        ctrl.result = ctrl[verb].apply(ctrl, arg)
        
        // renderType: default | view
        // ctrl.render()
        if (ctrl.renderType === 'default') {
          return new Promise(function(resolve, reject){
            resolve(ctx.body = ctrl.result)
          }).then(function(){
            // after
            ctrl.after()
          })
        }

        if (ctrl.renderType === 'view') {
          var obj = {
            data: ctrl.data,
            tpl: ctrl.tpl
          }
          Object.assign(obj, ctrl.result);

          return ctx.render(obj.tpl, obj.data).then(function(){
            // after
            ctrl.after()
          })
        }
   
        // after
        // ctrl.after()
      })
      
      debug(_middlewares)

      return compose(_middlewares)(ctx, next).catch(function(error) {
        console.log(error)
      })
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

  _getControllerName (Controller) {
    let i = (Controller + "").split(' extends')[0]
    let j = i.split('class')[1]
    return i.split('{')[0].replace('class', '').trim()
  }
  
  _registerControllerClass(Controller){
    let clz = this._getControllerName(Controller)
    Slet[clz] = Controller
  }
  
  start() {
    if (this.opts.debug) {
      console.log(this.routes)
    }
    
    this.app
      .use(router.routes())
      .use(router.allowedMethods());
    
    debug('listen');
    const server = http.createServer(this.app.callback());
    return server.listen.apply(server, arguments);
  }
  
  listen() {
    return this.start() 
  }

  run() {
    let self = this
    
    return this.start(function(){
      self.port = this.address().port
      console.log('Slet listening on port', this.address().port);
    }) 
  }
}

// Slet.Base = BaseController
// Slet.View = ViewController

module.exports = Slet 
