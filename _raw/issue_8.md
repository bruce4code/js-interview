# 008题:谈谈bind的实现

[Function.prototype.bind()-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 中这样解释:

- bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

### 以终为始,我们先来看一下bind的用法.

```js
function bar(){
   console.log(this.name)
}
var name = '茶叶蛋'    //这里的name作用域 window 即window.name 可以取到

var obj = {
   name: 'bruce'
}
// 学习过 #7 就比较好理解,this的指向改变
bar()

bar.bind(obj)()
```

### 我们试着实现

```js
Function.prototype.myBind = function(ctx){
 var agrs = [...arguments].slice(1)
 var that = this?this:window
 return function(){
 that.apply(ctx,args)
 }
}
```

bar.myBind(obj)()
// 输出的结果一样

#### 那我们试着多bind几次那么输出会改变吗?

```js
var obj2 = {
  name:'bruce2'
}
var obj3 = {
  name:'bruce3'
}
bar.myBind(obj).myBind(obj2).myBind(obj3 )()
```

根据上面的实现代码,大家觉得这个输出结果会改变吗?

- 输出是一样的

bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的

- 上述的代码是实现了基本功能,参数问题,还没处理,我们要补充下:

```js
Function.prototype.myBind = function(ctx,...args){
   if (typeof this !== 'function') {
     throw new Error("Type Error");
   }
    var self= this ? this : window
     // 考虑new的情况
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

### 最后总结下call apply bind

1. apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
2. apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
3. apply 、 call 、bind 三者都可以利用后续参数传参；
4. bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用

参考:[https://www.cnblogs.com/coco1s/p/4833199.html](https://www.cnblogs.com/coco1s/p/4833199.html)