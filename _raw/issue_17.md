# 017题：作用域, 变量提升, 以及优先级, 预解析

## 作用域

当函数执行的时候（执行前一刻），会创建一个执行期的上下文（AO）。全局预编译的时候会创建一个GO。

AO 在函数上下文中，我们用活动对象（activation object, AO）来表示变量对象。

### 函数作用域的预编译（AO）

函数预编译四部曲：
1. 创建AO对象
2. 找变量声明和形参，将变量名、形参名当作AO对象的属性名，值为undefined
3. 将实参形参相统一
4. 在函数里面找函数声明，值赋予函数体

```js
function foo(){
    console.log(a)
    var a = 10
    function a(){}
    console.log(a)
}
foo()
```

### 全局预编译（GO）

全局预编译三部曲：
1. 创建GO对象
2. 找变量声明，将变量名当作GO对象的属性名，值为undefined
3. 在全局找函数声明，值赋予函数体

```js
console.log(a)  // ƒ a() {}
var a = 10
function a(){}
console.log(a)  // 10
```

## 变量提升

- var 声明的变量存在变量提升（hoisting）
- let 和 const 声明的变量不存在变量提升，存在暂时性死区（TDZ）
- 函数声明整体提升，函数表达式只提升变量名

## 优先级

- 函数声明优先级高于变量声明
- 如果变量名和函数名同名，变量声明会被忽略（不会被覆盖），但赋值操作会覆盖

```js
console.log(foo)  // ƒ foo(){}
function foo(){}
var foo = 10
console.log(foo)  // 10
```