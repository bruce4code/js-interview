# 箭头函数与普通函数的区别

> **English**: Arrow vs Regular Functions — Differences in `this` binding, `arguments` object, `new` usage, and prototype.

<!-- zh -->

## 1. 解决 this 指向问题

```js
let normal = {
    name: '茶叶蛋',
    fn: function () {
        setTimeout(function () { this.name }, 10)
        // 这时候 this 指向了 window
    }
}

let arrow = {
    name: '茶叶蛋',
    fn: function () {
        setTimeout(() => { this.name }, 10)
        // 用箭头函数的 this 指向了上一层的 this，也就是 name
    }
}
```

## 2. 箭头函数没有自己的 this

箭头函数本身没有 this，它会捕获其所在上下文的 this 值，作为自己的 this 值。

## 3. 箭头函数不能作为构造函数

箭头函数不能使用 new 关键字来实例化对象，否则会报错。

## 4. 箭头函数没有 arguments 对象

如果需要使用不定参数，可以使用 rest 参数（...）代替。

## 5. 箭头函数不能使用 call/apply/bind 改变 this 指向

因为箭头函数的 this 在定义时就已经确定，无法通过 call/apply/bind 来改变。

## 6. 箭头函数不能使用 yield 关键字

因此箭头函数不能用作 Generator 函数。

## 7. 箭头函数语法更加简洁

```js
// 普通函数
let fn = function (a, b) {
    return a + b
}

// 箭头函数
let fn = (a, b) => a + b
```

<!-- /zh -->

<!-- en -->

## 1. Solving the `this` binding problem

```js
let normal = {
    name: 'tea egg',
    fn: function () {
        setTimeout(function () { this.name }, 10)
        // Here `this` points to window
    }
}

let arrow = {
    name: 'tea egg',
    fn: function () {
        setTimeout(() => { this.name }, 10)
        // Using arrow functions, `this` points to the outer scope's `this`, i.e., name
    }
}
```

## 2. Arrow functions do not have their own `this`

Arrow functions themselves do not have `this`; they capture the `this` value from their enclosing context as their own `this` value.

## 3. Arrow functions cannot be used as constructors

Arrow functions cannot use the `new` keyword to instantiate objects; doing so will throw an error.

## 4. Arrow functions do not have an `arguments` object

If you need to use variable-length arguments, you can use rest parameters (`...`) instead.

## 5. Arrow functions cannot have their `this` changed via call/apply/bind

Because the `this` of an arrow function is determined at definition time, it cannot be changed through call/apply/bind.

## 6. Arrow functions cannot use the `yield` keyword

Therefore, arrow functions cannot be used as Generator functions.

## 7. Arrow function syntax is more concise

```js
// Regular function
let fn = function (a, b) {
    return a + b
}

// Arrow function
let fn = (a, b) => a + b
```

<!-- /en -->