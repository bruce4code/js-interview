# this 关键字

> **English**: this Keyword — How `this` is determined by default binding, implicit binding, explicit binding, and arrow functions.

<!-- zh -->

## 函数的调用方式

### 情况一：在函数中去调用

```js
function get() {}
get()
// 它其实就是语法糖，这里等同于 get.call(window)
// 这样就知道 this 的指向了吧，对的，就是 window
// 非严格模式下，严格模式下就是 undefined
get.call(window)
```

### 情况二：函数作为对象的方法被调用

```js
var person = {
    name: 'walker',
    run: function () {
        console.log(`${this.name}在跑步`)
    }
}
person.run()  // this 指向 person 对象
```

### 情况三：通过 call/apply/bind 调用

```js
var name = '茶叶蛋'
var obj = {
    name: 'bruce'
}
function say() {
    console.log(this.name)
}
say()           // '茶叶蛋'
say.call(obj)   // 'bruce' - this 指向 obj
```

### 情况四：构造函数调用（new）

```js
function Person(name) {
    this.name = name
    this.say = function () {
        console.log(this.name)
    }
}
var p = new Person('bruce')
p.say()  // 'bruce' - this 指向新创建的实例
```

### 情况五：箭头函数

箭头函数本身没有 this，它的 this 在定义时由外层作用域决定，且不能被改变。

```js
var name = 'window'
var obj = {
    name: 'obj',
    fn1: function () {
        console.log(this.name)
    },
    fn2: () => {
        console.log(this.name)
    }
}
obj.fn1()  // 'obj'
obj.fn2()  // 'window'
```

## 优先级

new 调用 > call/apply/bind 调用 > 对象方法调用 > 直接调用

<!-- /zh -->

<!-- en -->

## Function Invocation Methods

### Case 1: Direct function call

```js
function get() {}
get()
// It is essentially syntactic sugar, equivalent to get.call(window)
// This tells you what `this` points to, right? Yes, it's window
// In non-strict mode; in strict mode it would be undefined
get.call(window)
```

### Case 2: Called as a method of an object

```js
var person = {
    name: 'walker',
    run: function () {
        console.log(`${this.name} is running`)
    }
}
person.run()  // `this` points to the person object
```

### Case 3: Called via call/apply/bind

```js
var name = 'tea egg'
var obj = {
    name: 'bruce'
}
function say() {
    console.log(this.name)
}
say()           // 'tea egg'
say.call(obj)   // 'bruce' - `this` points to obj
```

### Case 4: Constructor call (new)

```js
function Person(name) {
    this.name = name
    this.say = function () {
        console.log(this.name)
    }
}
var p = new Person('bruce')
p.say()  // 'bruce' - `this` points to the newly created instance
```

### Case 5: Arrow functions

Arrow functions themselves do not have their own `this`; their `this` is determined by the outer scope at definition time and cannot be changed.

```js
var name = 'window'
var obj = {
    name: 'obj',
    fn1: function () {
        console.log(this.name)
    },
    fn2: () => {
        console.log(this.name)
    }
}
obj.fn1()  // 'obj'
obj.fn2()  // 'window'
```

## Priority

new call > call/apply/bind call > object method call > direct call

<!-- /en -->