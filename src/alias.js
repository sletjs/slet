module.exports = function (clz, ctx) {
    if (ctx.request.body) {
        clz.pp = ctx.request.body
    }

    return clz
}