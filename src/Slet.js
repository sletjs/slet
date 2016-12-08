'use strict';

const resolve = require('path').resolve
const Koa = require('koa');
const methods = require('methods');
var slice = Array.prototype.slice;
const app = new Koa();

var router = require('koa-router')();
var views = require('koa-views');
var bodyParser = require('koa-bodyparser');

const ApiController = require('./controller/ApiController')
const ViewController = require('./controller/ViewController')

class Slet {
  constructor(opts) {
    this.opts = opts
    this.app =  new Koa();
    this.app.use(bodyParser());
    this.app.use(views(opts.root, { map: {html: 'nunjucks' }}))
    this.routes = []
  }

  routerDir(dir) {
    var requireDir = require('require-dir');
    var controllers = requireDir( resolve(this.opts.root, dir), {recurse: true});
    
    for(let i in controllers) {
      if (controllers[i].path) this.router(controllers[i])      
    }
  }

  router() {
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
      console.log(file)
      Controller =  require(file)
    }

    if (!path) {
      path = Controller.path
    }
    
    if (this.opts.debug) {
      var mockCtx = new Controller({}, function(){})
      var m = this._avaiableMethods(mockCtx)
      let t
      if(mockCtx instanceof ApiController) {
        t = 'Api'
      }
      
      if(mockCtx instanceof ViewController) {
        t = 'View'
      }
      console.log(m)
      this.routes.push({
        path: path, 
        class: controller,
        avaiableMethods: m,
        type: t
      })
    }
    router.all(path, function (ctx, next) {
      console.log(ctx.request.method)
      console.log(ctx.request.path)
      var ctrl = new Controller(ctx, next)
      
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
