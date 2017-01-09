module.exports = {
    "debug": false,
    "prefix": "",
    "views":{
        "engine": "nunjucks",
        "path": "/", 
        "extension": "html"
    },
    "automount": {
        "path": "controllers",
        "option": {
            "recurse": true
        }
    },
    "mockCtx": {
        "request":{
            "body": {

            }
        }
    },
    "logger": {
      // Define a custom request id function
      genReqId: function (req) { return req.id },

      // Logger level is `info` by default
      useLevel: 'trace'
    }
}