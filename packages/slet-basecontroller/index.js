'use strict'

const debug = require('debug')('slet-basecontroller')
const http = require('http')
const merge = require('utils-merge')
const contentDisposition = require('content-disposition')
const koasend = require('slet-send')
const resolve = require('path').resolve
const vary = require('vary')
const statusCodes = http.STATUS_CODES
const slice = Array.prototype.slice

class Base {
  constructor (app, ctx, next) {
    this.app = app
    this.ctx = ctx
    this.res = this.ctx.res
    this.next = next
    this.renderType = 'default'
    this.data = {}
    this.tpl = 'index'
    this.result = '{verb}() call result'
    this.url = 'redirect url'
    this.jsonp_callback_name = 'callback'
    
    //for alias
    this.alias = {
      req: {
        
      },
      res: {}
    }
    
    let self = this
    this.app.defineMiddleware('registerBaseAlias', function registerBaseAlias(ctx, next) {
      if (ctx.request.body) {
        self.reqbody = ctx.request.body
        self.alias.req.body = ctx.request.body
      }

      if (self.ctx.request.query) {
        self.query = ctx.request.query
      }

      // matches "GET /hello/foo" and "GET /hello/bar"
      // self.params['name'] is 'foo' or 'bar'
      if (self.ctx.params) {
        self.params = ctx.params
        self.alias.req.params = ctx.params
      }
  
      if (ctx.response.redirect) {
        self.alias.res.redirect = ctx.response.redirect
        self.redirect = ctx.redirect
      }
      // request
      // cookies
      self.alias.req.cookies = ctx.cookies
      self.alias.res.cookie = ctx.cookies
      self.alias.res.clearCookie = self.clearCookie
      // xhr
      self.alias.req.xhr = self.xhr
      // param
      self.alias.req.param = self.param
      // range
      self.alias.req.range = self.range
      // acceptsCharset
      self.alias.req.acceptsCharset = self.acceptsCharset
      // acceptsEncoding
      self.alias.req.acceptsEncoding = self.acceptsEncoding
      // acceptsLanguage
      self.alias.req.acceptsLanguage = self.acceptsLanguage
      // throw
      self.alias.req.throw = ctx.throw
      self.alias.res.throw = ctx.throw

      // response
      // send
      self.alias.res.send = self.send
      self.alias.res.locals = self.locals
      self.alias.res.sendFile = self.sendFile
      self.alias.res.download = self.download
      self.alias.res.end = self.end
      self.alias.res.write = self.write
      self.alias.res.setStatus = self.setStatus
      self.alias.res.sendStatus = self.sendStatus
      self.alias.res.vary = self.vary
      self.alias.res.links = self.links
      self.alias.res.location = self.location
      self.alias.res.json = self.json
      self.alias.res.jsonp = self.jsonp
      self.alias.res.format = self.format
      self.alias.res.getHeader = self.getHeader
      self.alias.res.setHeader = self.setHeader

      return next()
    })
    
    this.app.defineMiddleware('conditional', require('koa-conditional-get')())
    this.app.defineMiddleware('etag', require('koa-etag')())

    this.global_filter = ['conditional', 'etag', 'koa-bodyparser', 'registerBaseAlias']
  }
  

  before () {

  }
  
  // only for app
  __bindAlias (req, res) {
    for(var k in this.alias.req) {
      let v = this.alias.req[k]
      req[k] = v
    }
    
    for(var k in this.alias.res) {
      let v = this.alias.res[k]
      res[k] = v
    }
  }

  after () {

  }

  write () {
    let write = this.res.write.bind(this.res)
    write.apply(write, arguments)
  }

  end () {
    this.res.statusCode = 200
    this.renderType = 'customEnd'
    let end = this.res.end.bind(this.res)

    if (arguments.length > 0) {
      end.apply(end, arguments)
    } else {
      end.apply(end, [this.ctx.response.status + ''])
    }
  }

  // request
  get xhr () {
    let val = this.getHeader('X-Requested-With') || ''
    return val
    if (val) return val.toLowerCase() === 'xmlhttprequest'
  }

  range (size, options) {
    var range = this.ctx.get('Range')
    if (!range) return
    return require('range-parser')(size, range, options)
  }

  param (name, defaultValue) {
    let params = this.params || {}
    let body = this.body || {}
    let query = this.query || {}

    let args = arguments.length === 1
      ? 'name'
      : 'name, default';
    //console.log('req.param(' + args + '): Use req.params, req.body, or req.query instead')

    if (null != params[name] && params.hasOwnProperty(name)) return params[name]
    if (null != body[name]) return body[name]
    if (null != query[name]) return query[name]

    return defaultValue
  }
  // response
  send (text) {
    return this.ctx.body = text
  }

  get locals () {
    return this.ctx.state
  }

  set locals (val){
    return this.ctx.state = val
  }

  get acceptsCharset () {
    return this.ctx.request.acceptsCharsets
  }

  set acceptsCharset (val) {
    return this.ctx.request.acceptsCharsets = val
  }

  get acceptsEncoding () {
    return this.ctx.request.acceptsEncodings
  }

  set acceptsEncoding (val) {
    return this.ctx.request.acceptsEncodings = val
  }

  get acceptsLanguage () {
    return this.ctx.request.acceptsLanguages
  }

  set acceptsLanguage (val) {
    return this.ctx.request.acceptsLanguages = val
  }  

  clearCookie (name, options) {
    var opts = merge({ expires: new Date(1), path: '/' }, options)

    return this.ctx.cookies(name, '', opts)
  }

  download (path, filename) {
    var name = filename

    // support function as second arg
    if (typeof filename === 'function') {
      done = filename
      name = null
    }

    // set Content-Disposition when file is sent
    var headers = {
      'Content-Disposition': contentDisposition(name || path)
    }

    // Resolve the full path for sendFile
    var fullPath = resolve(path)

    return this.sendFile(fullPath, { headers: headers })
  }

  sendFile (filepath, options) {
    let _filepath = filepath || this.ctx.path
    let _options = options || {}
    return koasend(this.ctx, _filepath, _options)
  }

  getHeader (field) {
    return this.ctx.get[field]
  }

  setHeader (field, value) {
    return this.ctx.set(field, value)
  }
  
  setStatus (code) {
    this.ctx.status= parseInt(code)
    return this
  }

  sendStatus (code) {
    this.ctx.status= parseInt(code)
    let txt = statusCodes[statusCode] || String(statusCode);

    return this.ctx.body = txt
  }

  vary (field) {
    // checks for back-compat
    if (!field || (Array.isArray(field) && !field.length)) {
      console.log('res.vary(): Provide a field name');
      return this;
    }

    vary(this.ctx.response, field);

    return this;
  }

  links (links) {
    var link = this.ctx.response.get('Link') || ''
    if (link) link += ', '
    return this.ctx.response.set('Link', link + Object.keys(links).map(function(rel){
      return '<' + links[rel] + '>; rel="' + rel + '"';
    }).join(', '))
  }

  location (url) {
    const encodeUrl = require('encodeurl')
    var loc = url

    // "back" is an alias for the referrer
    if (url === 'back') {
      loc = this.ctx.request.get('Referrer') || '/'
    }

    // set location
    return this.ctx.response.set('Location', encodeUrl(loc))
  }

  json (obj) {
    if (obj === null){
      obj = {}
    }

    return this.ctx.body = obj
  }

  jsonp (obj) {
    let _body = {}
    if (obj && obj !== null) _body = obj

    const jsonp = require('jsonp-body')
    let query = this.ctx.request.querystring
    let cb = query || this.jsonp_callback_name

    this.ctx.response.set('X-Content-Type-Options', 'nosniff')

    if (cb) {
      this.ctx.response.set('Content-Type', 'text/javascript')
    } else {
      this.ctx.response.set('Content-Type', 'application/json')
    }

    return this.ctx.body = jsonp(_body, cb)
  }

  format (obj) {
    var req = this.ctx.request;
    var next = req.next;

    function acceptParams(str, index) {
      var parts = str.split(/ *; */);
      var ret = { value: parts[0], quality: 1, params: {}, originalIndex: index };

      for (var i = 1; i < parts.length; ++i) {
        var pms = parts[i].split(/ *= */);
        if ('q' === pms[0]) {
          ret.quality = parseFloat(pms[1]);
        } else {
          ret.params[pms[0]] = pms[1];
        }
      }

      return ret;
    }

    function normalizeType(type){
      return ~type.indexOf('/')
        ? acceptParams(type)
        : { value: mime.lookup(type), params: {} };
    }

    function normalizeTypes(types){
      var ret = [];

      for (var i = 0; i < types.length; ++i) {
        ret.push(exports.normalizeType(types[i]));
      }

      return ret;
    }

    var fn = obj.default;
    if (fn) delete obj.default;
    var keys = Object.keys(obj);

    var key = keys.length > 0
      ? req.accepts(keys)
      : false;

    this.ctx.response.vary("Accept");

    let _body = {}
    if (key) {
      this.ctx.response.set('Content-Type', normalizeType(key).value);
      _body = obj[key](req, this.ctx.response, this.next);
    } else if (fn) {
      _body = fn();
    } else {
      var err = new Error('Not Acceptable');
      err.status = err.statusCode = 406;
      err.types = normalizeTypes(keys).map(function(o){ return o.value });
      this.throw(err);
    }
  }

  __execute () {
    let self = this;
    if (this.renderType === 'default') {
      return new Promise(function (resolve, reject) {
        resolve(self.result)
      })
    }

    if (this.renderType === 'view') {
      var obj = {
        data: this.data,
        tpl: this.tpl
      }
      Object.assign(obj, this.result)

      return this.compile(obj.tpl, obj.data).then(function (html) {
        return new Promise(function (resolve, reject) {
          resolve(html ? html : self.result)
        })
      })
    }
    
    // for this.redirect()
    if (this.renderType === 'redirect') {
      return new Promise(function (resolve, reject) {
        resolve(true)
      })
    }
    
    // for this.end()
    if (this.renderType === 'customEnd') {
      return new Promise(function (resolve, reject) {
        resolve(true)
      })
    }
  }
}

module.exports = class BaseController extends Base {
  constructor (app, ctx, next) {
    super(app, ctx, next)
    
    let self = this
    this.app.defineMiddleware('registerBaseControllerAlias', function registerBaseControllerAlias(ctx, next) {
      self.alias.res.render = self.render
      self.alias.res.getTplPath = self.getTplPath
      return next()
    })
    
    this.global_filter.push('registerBaseControllerAlias')
  }
  
  getTplPath (tpl) {
    let self = this
    let viewPath = self.app.opts.root + '/' + self.app.opts.views.path
    return viewPath + '/' + tpl + '.' + self.app.opts.views.extension
  }

  compile (tpl, data) {
    let self = this
    return new Promise(function(resolve, reject){
      resolve(self.result)
    })
  }

  render (tpl, data) {
    this.renderType = 'view'
    let _data = data ? data : this.ctx.state 
    if (tpl) this.tpl = tpl
    if (data) this.data = _data
  }
}