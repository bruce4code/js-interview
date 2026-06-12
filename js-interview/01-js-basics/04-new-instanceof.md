# new 与 instanceof

> **English**: new & instanceof — How `new` works internally and how `instanceof` checks the prototype chain.

## new 的实现

### 描述（摘于 MDN）

new 关键字会进行如下的操作：
1. 创建一个空的简单 JavaScript 对象（即 `{}`）
2. 链接该对象（设置该对象的 constructor）到另一个对象
3. 将步骤 1 新创建的对象作为 this 的上下文
4. 如果该函数没有返回对象，则返回 this

按照上面的描述我们试着实现：

```js
function create() {
    let obj = {}
    // 获得构造函数
    let con = [].shift.call(arguments)
    // 链接到原型
    obj.__proto__ = con.prototype
    // 改变 this 指向
    let result = con.apply(obj, arguments)
    // 判断执行构造函数返回的是否为对象，是则使用
    return result instanceof Object ? result : obj
}
```

### 优化写法

```js
function newOperator(ctor, ...args) {
    if (typeof ctor !== 'function' && typeof ctor !== 'Function') {
        throw new TypeError('Type Error')
    }
    const obj = Object.create(ctor.prototype) // 把上面实现中的 1.1 和 1.2 简化成一句
    const res = ctor.apply(obj, args)
    const isObj = typeof res === 'object' && res !== null
    const isFunc = typeof res === 'Function' || typeof res === 'function'
    return isObj || isFunc ? res : obj
}
```

## instanceof 的实现

instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中，是不是能找到类型的 prototype。

```js
function myInstanceof(left, right) {
    let prototype = right.prototype
    let proto = left.__proto__
    // ES5 的方法，可以获得对象的原型
    // let proto = Object.getPrototypeOf(left);
    while (true) { // 沿着原型链遍历
        if (proto === null || proto === undefined) {
            return false
        }
        if (prototype === proto) {
            return true
        }
        proto = proto.__proto__ // 关键代码
    }
}

const obj1 = new Object()
myInstanceof(obj1, Object)
```

### 总结

- Object 是所有对象的爸爸，所有对象都可以通过 `__proto__` 找到它
- Function 是所有函数的爸爸，所有函数都可以通过 `__proto__` 找到它
- Function.prototype 和 Object.prototype 是两个特殊的对象，他们由引擎来创建
- 除了以上两个特殊对象，其他对象都是通过构造器 new 出来的
- 函数的 prototype 是一个对象，也就是原型
- 对象的 `__proto__` 指向原型，`__proto__` 将对象和原型连接起来组成了原型链

### 更多

```js
console.log(Object.prototype.__proto__ === null) // true
```

引用阮一峰老师的《undefined 与 null 的区别》：
http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html

null 表示"没有对象"，即该处不应该有值。
undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。

```js
function Foo() {}
// function 就是个语法糖
// 内部等同于 new Function()

let a = { b: 1 }
// 这个字面量内部也是使用了 new Object()
```