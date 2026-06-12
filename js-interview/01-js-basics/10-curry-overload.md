# 柯里化与函数重载

> **English**: Currying & Overloading — Using closures for argument reuse and simulating function overloading in JavaScript.

## 理解柯里化之前我们先来回顾下 bind 的实现

```js
Function.prototype.myBind = function (ctx, ...args) {
    if (typeof this !== 'function') {
        throw new Error("Type Error");
    }
    var self = this ? this : window
    return function F() {
        if (this instanceof F) {
            // 函数调用方式 new
            return new self(...args, ...arguments)
        }
        return self.apply(ctx, [...args, ...arguments])
    }
}
```

## 闭包两大特性：保护与保存

## 柯里化编程思想：预处理思想

也是利用闭包的保存特性（对外面的引用的保存，不被销毁）。

### 柯里化（Currying）的理解

Currying 概念其实很简单，只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

### 实现一个 add 函数

```js
function currying(fn, length) {
    var len = length || fn.length
    return function (...args) {
        if (args.length < len) {
            return currying(fn.bind(null, ...args), len - args.length)
        } else {
            return fn(...args)
        }
    }
}

// 这里最大参数长度 4
var add = function add(a, b, c, d) {
    return a + b + c + d
}
var add = currying(add, 4)

// add(1)           // 1 --- 参数长度小于 4 返回还是函数，达到延迟计算的效果
// add(1)(2)        // 3
// add(1)(2)(3)     // 6
// add(1,2)(3,4)    // 10 --- 参数等于设定的参数长度，返回最后计算结果
```

### 柯里化或偏函数有什么用？

无论是柯里化还是偏应用，我们都能进行部分传值，而传统函数调用则需要预先确定所有实参。如果你在代码某一处只获取了部分实参，然后在另一处确定另一部分实参，这个时候柯里化和偏应用就能派上用场。

另一个最能体现柯里化应用的是，当函数只有一个形参时，我们能够比较容易地组合它们（单一职责原则（Single responsibility principle））。因此，如果一个函数最终需要三个实参，那么它被柯里化以后会变成需要三次调用，每次调用需要一个实参的函数。当我们组合函数时，这种单元函数的形式会让我们处理起来更简单。

归纳下来，主要为以下常见的三个用途：
1. 延迟计算
2. 参数复用
3. 动态生成函数

## 闭包的特性——实现 JS 重载

John Resig 写的《secrets of the JavaScript ninja》中，这种方法充分的利用了闭包的特性！

```js
function addMethod(object, name, fn) {
    var old = object[name]; // 把前一次添加的方法存在一个临时变量 old 里面
    object[name] = function () { // 重写了 object[name] 的方法
        // 如果调用 object[name] 方法时，传入的参数个数跟预期的一致，则直接调用
        if (fn.length === arguments.length) {
            return fn.apply(this, arguments);
        // 否则，判断 old 是否是函数，如果是，就调用 old
        } else if (typeof old === "function") {
            return old.apply(this, arguments);
        }
    }
}

addMethod(window, 'fn', (name) => console.log(`我是${name}`))
addMethod(window, 'fn', (name, age) => console.log(`我是${name},今年${age}岁`))
addMethod(window, 'fn', (name, age, sport) => console.log(`我是${name},今年${age}岁,喜欢运动是${sport}`))
```

实现效果：

```
window.fn('茶叶蛋')
window.fn('茶叶蛋', 18)
window.fn('茶叶蛋', 18, '篮球')
```

## 闭包的应用

- 节流防抖
- 柯里化实现
- 怎么检查内存泄露：performance 面板和 memory 面板可以找到泄露的现象和位置

```js
// for 循环和闭包（号称必刷题）
var data = [];

for (var i = 0; i < 3; i++) {
    data[i] = function () {
        console.log(i);
    };
}

data[0]();
data[1]();
data[2]();
```

### 参考

- https://zhuanlan.zhihu.com/p/31271179
- https://segmentfault.com/a/1190000015929416
- https://juejin.cn/post/7031525301414805518
- https://juejin.cn/post/6937469222251560990