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