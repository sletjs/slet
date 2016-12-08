'use strict';

const _path = require('path')
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
  }

  routerDir(dir) {

  }

  router() {
    let path, controller

    if (arguments.length == 1) {
      // path = arguments[0] from controller.path
      controller = arguments[0]
    } else if (arguments.length >= 2) {
      path = arguments[0]
      controller = arguments[1]
    } else {
      console.log('error')
    }
    
    var Controller = controller
    if (typeof controller === 'string') {
      // 注意.ctrl && ctrl
      // file.exists
      let file = _path.resolve(this.opts.root, controller)
      console.log(file)
      Controller =  require(file)
    }

    if (!path) {
      path = Controller.path
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

  start(port=3000) {
      this.app
        .use(router.routes())
        .use(router.allowedMethods());
  
      this.app.listen(port)
  }
}

Slet.Api = ApiController
Slet.View = ViewController

module.exports = Slet 
