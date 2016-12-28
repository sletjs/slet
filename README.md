# slet

> slet = servlet in Node.js 4.x+

[![NPM version](https://img.shields.io/npm/v/slet.svg?style=flat-square)](https://www.npmjs.com/package/slet)
[![Build](https://travis-ci.org/sletjs/slet.svg?branch=master)](https://travis-ci.org/sletjs/slet)
[![codecov.io](https://codecov.io/github/sletjs/slet/coverage.svg?branch=master)](https://codecov.io/github/sletjs/slet?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

- slet
- slet-basecontroller

## Features

- Micro Kernel
- Pluggable Controller
- Build-in Router && Auto-mount Router
- Auto-inject Controller Dependency
- Custom View Render
- Convention over Configuration
- Use Express or Koa req && res api

## Usages

### Basic

app.js

```js
'use strict'

const Slet = require('slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  get (req, res) { 
    let username = req.query.username

    return res.send(`hello world ${username}`)
  } 
}

app.router('/', MyController)

app.start(3000) 

```

you run it at Node.js 4.0 +

```
$ node app.js
```


### Use Async/Await

you can also use Async function in Controller

you can use it in

- Node.js 7.0 +
- Babel
- Typescript

app.async.js

```js
'use strict'

const Slet = require('slet')

const app = new Slet()

class MyController extends Slet.BaseController {
  async get (req, res) {
    let username = req.query.username
    // logic
    await this.sleep(300)
    
    // send to browser
    return res.send(`hello world ${username}`)
  }
  
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

app.router('/', MyController)

app.start(3006) 

```

start app server in terminal

```
$ node --harmony-async-await app.async.js
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Welcome fork or feedback

- write by `i5ting` i5ting@126.com

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).
