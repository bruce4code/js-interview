# 014题: 普通函数与箭头函数的区别

## 1. 解决this指向问题

```js
let normal = {
    name:'茶叶蛋',
    fn: function(){
        setTimeout(function(){this.name},10)
        // 这时候this指向了window
    }
}

let arrow = {
    name:'茶叶蛋',
    fn: function(){
        setTimeout(()=>{this.name},10)
        // 用箭头函数的this指向了上一层的this, 也就是name
    }
}
```

## 2. 箭头函数没有自己的this

箭头函数本身没有this，它会捕获其所在上下文的this值，作为自己的this值。

## 3. 箭头函数不能作为构造函数

箭头函数不能使用new关键字来实例化对象，否则会报错。

## 4. 箭头函数没有arguments对象

如果需要使用不定参数，可以使用 rest 参数（...）代替。

## 5. 箭头函数不能使用call/apply/bind改变this指向

因为箭头函数的this在定义时就已经确定，无法通过call/apply/bind来改变。

## 6. 箭头函数不能使用yield关键字

因此箭头函数不能用作Generator函数。

## 7. 箭头函数语法更加简洁

```js
// 普通函数
let fn = function(a, b) {
    return a + b
}

// 箭头函数
let fn = (a, b) => a + b
```