# slet

## Controller

- 分类
    - api：直接返回json或其他内容
    - view：返回tpl和data，如果无，从this变量上获取

- 方法：支持2种
    - 默认的httpverb（methods模块支持的都支持）
    - 自定义的，比如upload等

## Router

第一种，暴露path和controller（controller内部不需要path）

```
app.router('/', require('./ctrl') )  
```

第二种，将path写到controller里

```
app.router(require('./viewctrl') )  
```

第三种，指定路径加载

```
app.routerDir('app/controller' )  
```


## Config

默认


```
app.routerDir('app/controller' )  
```