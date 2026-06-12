# 018题: this指向练习题

## 函数的调用方式

### 情况一: 在函数中去调用

```js
function get(){}
get()
// 它其实就是语法糖，这里等同于get.call(window)
// 这样就知道this的指向了吧，对的，就是window
// 非严格模式下，严格模式下就是undefined
get.call(window)
```

### 情况二: 函数作为对象的方法被调用

```js
var person = {
    name: 'walker',
    run: function(){
        console.log(`${this.name}在跑步`)
    }
}
person.run()  // this指向person对象
```

### 情况三: 通过call/apply/bind调用

```js
var name = '茶叶蛋'
var obj = {
    name: 'bruce'
}
function say(){
    console.log(this.name)
}
say()           // '茶叶蛋'
say.call(obj)   // 'bruce' - this指向obj
```

### 情况四: 构造函数调用（new）

```js
function Person(name){
    this.name = name
    this.say = function(){
        console.log(this.name)
    }
}
var p = new Person('bruce')
p.say()  // 'bruce' - this指向新创建的实例
```

### 情况五: 箭头函数

箭头函数本身没有this，它的this在定义时由外层作用域决定，且不能被改变。

```js
var name = 'window'
var obj = {
    name: 'obj',
    fn1: function(){
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

new调用 > call/apply/bind调用 > 对象方法调用 > 直接调用