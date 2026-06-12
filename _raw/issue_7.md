# 007题:call,apply,bind的实现

[#6](https://github.com/bruce4code/js-interview/issues/6) 006题中提到了实现call 这里就不再累述,讲下apply,和bind的实现

- 在 JavaScript中，call 和 apply 都是为了改变函数体内部 this 的指向,那么是如何改变的呢?
- call 与 apply 的区别就是入参的不同,apply的第二个参数传的是数组.

```js
Function.prototype.myApply = function(obj,arr){
    obj = obj ? Object(obj) : window;
   const fn = Symbol('fn')
   obj [fn] = this
   let result;
   if (!arr) {
        result = obj.fn();
    } else {
        result = obj.fn(...arr);
    };
    delete obj.fn
    return result;
}
// 我们一起来测试一下

testObj = {name:'茶叶蛋'}
function Agg() {}
Agg.prototype = {
    name : "蛋",
    say: function() {
        console.log("My name is " + this.name);
    }
}
var agg= new Agg ;
agg.say();
agg.say.call(testObj );

My name is 蛋
My name is 茶叶蛋
```

为了巩固加深记忆，下面列举一些 call/apply 常用用法

- 判断数据类型
Object.prototype.toString.call(obj) === '[object Object]'

- 获取最大数
const numbers = [1,2,3,666,888 ];
const maxNum= Math.max.apply(Math, numbers)
console.log('最大数=>',maxNum)

- 类数组使用数组的方法
Array.prototype.slice.call(arguments,1)

### 趁热打铁,我们通过一道面试题,运用下 apply 和 call 。

定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：

```js
function myLog(msg){
console.log(msg)
}
```

### 这里只能解决基本需求,如果参数个数不确定的情况下

```js
function myLog(){
console.log.apply(console,arguments)
}
```

### 测试下

```
myLog()
undefined
myLog(1)
VM1416:2 1
undefined
myLog(1,2)
VM1416:2 1 2
undefined
myLog([5,59,6])
VM1416:2 (3) [5, 59, 6]
```

### 在上述的题中,要求是给每一个 myLog消息添加一个"(茶叶蛋)"的前辍

```js
function myLog(){
var args = Array.prototype.slice.call(arguments); //上面提过,类数组调用数组的方法
args.unshift('(茶叶蛋)');
console.log.apply(console, args);
};
```

### 至此,我们了解call与apply的实现与简单应用, bind的话实现有点区别,我们再开个文章来聊聊 ,老铁们不见不散 ^_^ [#8](https://github.com/bruce4code/js-interview/issues/8)

参考:[https://www.cnblogs.com/coco1s/p/4833199.html](https://www.cnblogs.com/coco1s/p/4833199.html)