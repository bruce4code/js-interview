## call、apply、bind 的实现

在 JavaScript 中，`call` 和 `apply` 都是为了改变函数体内部 `this` 的指向。`call` 与 `apply` 的区别就是入参的不同，`apply` 的第二个参数传的是数组。

### 实现 apply

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

// 测试
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

### call/apply 常用用法

- **判断数据类型**
  ```js
  Object.prototype.toString.call(obj) === '[object Object]'
  ```

- **获取最大数**
  ```js
  const numbers = [1,2,3,666,888 ];
  const maxNum= Math.max.apply(Math, numbers)
  console.log('最大数=>',maxNum)
  ```

- **类数组使用数组的方法**
  ```js
  Array.prototype.slice.call(arguments,1)
  ```

### 面试题：定义一个 log 方法代理 console.log

基础实现：

```js
function myLog(msg){
  console.log(msg)
}
```

参数个数不确定的情况：

```js
function myLog(){
  console.log.apply(console,arguments)
}
```

给每个 myLog 消息添加一个 "(茶叶蛋)" 前缀：

```js
function myLog(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift('(茶叶蛋)');
  console.log.apply(console, args);
};
```

### 总结

1. `apply`、`call`、`bind` 三者都是用来改变函数的 `this` 对象的指向的；
2. `apply`、`call`、`bind` 三者第一个参数都是 `this` 要指向的对象，也就是想指定的上下文；
3. `apply`、`call`、`bind` 三者都可以利用后续参数传参；
4. `bind` 是返回对应函数，便于稍后调用；`apply`、`call` 则是立即调用。

> bind 的实现与 call/apply 有区别，详见下一节。

参考：
- [https://www.cnblogs.com/coco1s/p/4833199.html](https://www.cnblogs.com/coco1s/p/4833199.html)