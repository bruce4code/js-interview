# 原型与类继承

> **English**: Prototype & Class Inheritance — Prototype chain inheritance, combination inheritance, parasitic combination inheritance, and ES6 class extends.

<!-- zh -->

## 组合继承

```js
function Parent(val) {
    this.val = val
}
Parent.prototype.getValue = function () {
    console.log(this.val)
}

function Child(val) {
    Parent.call(this, val) // 关键代码
}
Child.prototype = new Parent() // 关键代码

const child = new Child(1)
child.getValue()     // 1
child instanceof Parent // true
```

## 原型式继承

利用 Object.create 实现。

```js
function createObj(o) {
    function F() {}
    F.prototype = o
    return new F()
}
```

## 寄生组合式继承

```js
function Parent(val) {
    this.val = val
}
Parent.prototype.getValue = function () {
    console.log(this.val)
}

function Child(val) {
    Parent.call(this, val)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
```

## ES6 class 继承

```js
class Parent {
    constructor(val) {
        this.val = val
    }
    getValue() {
        console.log(this.val)
    }
}

class Child extends Parent {
    constructor(val, age) {
        super(val)
        this.age = age
    }
    getAge() {
        console.log(this.age)
    }
}

const child = new Child(1, 18)
child.getValue()  // 1
child.getAge()    // 18
```

class 继承的本质是语法糖，底层仍然是基于原型链的实现。extends 关键字会做两件事：
1. 调用 super() 相当于 Parent.call(this)
2. 设置 Child.prototype 的原型为 Parent.prototype

<!-- /zh -->

<!-- en -->

## Combination Inheritance

```js
function Parent(val) {
    this.val = val
}
Parent.prototype.getValue = function () {
    console.log(this.val)
}

function Child(val) {
    Parent.call(this, val) // Key code
}
Child.prototype = new Parent() // Key code

const child = new Child(1)
child.getValue()     // 1
child instanceof Parent // true
```

## Prototypal Inheritance

Implemented using Object.create.

```js
function createObj(o) {
    function F() {}
    F.prototype = o
    return new F()
}
```

## Parasitic Combination Inheritance

```js
function Parent(val) {
    this.val = val
}
Parent.prototype.getValue = function () {
    console.log(this.val)
}

function Child(val) {
    Parent.call(this, val)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
```

## ES6 Class Inheritance

```js
class Parent {
    constructor(val) {
        this.val = val
    }
    getValue() {
        console.log(this.val)
    }
}

class Child extends Parent {
    constructor(val, age) {
        super(val)
        this.age = age
    }
    getAge() {
        console.log(this.age)
    }
}

const child = new Child(1, 18)
child.getValue()  // 1
child.getAge()    // 18
```

The essence of class inheritance is syntactic sugar; the underlying implementation is still based on the prototype chain. The `extends` keyword does two things:
1. Calling `super()` is equivalent to `Parent.call(this)`
2. Sets the prototype of `Child.prototype` to `Parent.prototype`

<!-- /en -->