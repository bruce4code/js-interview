## bind 的实现

> **English**: Full bind Implementation — A complete `bind` polyfill supporting partial application, `new` operator priority, and prototype preservation.

[Function.prototype.bind() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 中这样解释：

> `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

### bind 的用法

```js
function bar(){
   console.log(this.name)
}
var name = '茶叶蛋'

var obj = {
   name: 'bruce'
}

bar()

bar.bind(obj)()
```

### 基本实现

```js
Function.prototype.myBind = function(ctx){
 var agrs = [...arguments].slice(1)
 var that = this?this:window
 return function(){
 that.apply(ctx,args)
 }
}

bar.myBind(obj)()
```

#### 多次 bind 输出会改变吗？

```js
var obj2 = {
  name:'bruce2'
}
var obj3 = {
  name:'bruce3'
}
bar.myBind(obj).myBind(obj2).myBind(obj3 )()
```

输出是一样的。`bind()` 的实现相当于使用函数在内部包了一个 `call` / `apply`，第二次 `bind()` 相当于再包住第一次 `bind()`，故第二次以后的 `bind` 是无法生效的。

### 完整实现（处理参数和 new 的情况）

```js
Function.prototype.myBind = function(ctx,...args){
   if (typeof this !== 'function') {
     throw new Error("Type Error");
   }
    var self= this ? this : window
     // 考虑 new 的情况
    return function F(){
        if(this instanceof F) {
         return new self(...args, ...arguments)
       }
       return  self.apply(ctx, [...args, ...arguments])
   }
}

function foo(x,y){
  return x + y
}
foo.myBind(obj,2,3)()
```

### 总结 call、apply、bind

1. `apply`、`call`、`bind` 三者都是用来改变函数的 `this` 对象的指向的；
2. `apply`、`call`、`bind` 三者第一个参数都是 `this` 要指向的对象，也就是想指定的上下文；
3. `apply`、`call`、`bind` 三者都可以利用后续参数传参；
4. `bind` 是返回对应函数，便于稍后调用；`apply`、`call` 则是立即调用。

参考：
- [https://www.cnblogs.com/coco1s/p/4833199.html](https://www.cnblogs.com/coco1s/p/4833199.html)