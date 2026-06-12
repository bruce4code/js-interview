# 作用域与变量提升

> **English**: Scope & Hoisting — Understanding scope chain, variable hoisting, function hoisting, and execution context in JavaScript.

<!-- zh -->

## 作用域

当函数执行的时候（执行前一刻），会创建一个执行期的上下文（AO）。全局预编译的时候会创建一个 GO。

AO 在函数上下文中，我们用活动对象（activation object, AO）来表示变量对象。

### 函数作用域的预编译（AO）

函数预编译四部曲：
1. 创建 AO 对象
2. 找变量声明和形参，将变量名、形参名当作 AO 对象的属性名，值为 undefined
3. 将实参形参相统一
4. 在函数里面找函数声明，值赋予函数体

```js
function foo() {
    console.log(a)
    var a = 10
    function a() {}
    console.log(a)
}
foo()
```

### 全局预编译（GO）

全局预编译三部曲：
1. 创建 GO 对象
2. 找变量声明，将变量名当作 GO 对象的属性名，值为 undefined
3. 在全局找函数声明，值赋予函数体

```js
console.log(a)  // ƒ a() {}
var a = 10
function a() {}
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
console.log(foo)  // ƒ foo() {}
function foo() {}
var foo = 10
console.log(foo)  // 10
```

<!-- /zh -->

<!-- en -->

## Scope

When a function executes (just before execution), an execution context (AO - Activation Object) is created. During global pre-compilation, a GO (Global Object) is created.

In the function context, we use the Activation Object (AO) to represent the variable object.

### Function Scope Pre-compilation (AO)

Four steps of function pre-compilation:
1. Create the AO object
2. Find variable declarations and parameters, use variable names and parameter names as property names of the AO object, with initial value of undefined
3. Unify actual parameters with formal parameters
4. Find function declarations inside the function and assign the function body as the value

```js
function foo() {
    console.log(a)
    var a = 10
    function a() {}
    console.log(a)
}
foo()
```

### Global Pre-compilation (GO)

Three steps of global pre-compilation:
1. Create the GO object
2. Find variable declarations, use variable names as property names of the GO object, with initial value of undefined
3. Find function declarations globally and assign the function body as the value

```js
console.log(a)  // ƒ a() {}
var a = 10
function a() {}
console.log(a)  // 10
```

## Variable Hoisting

- Variables declared with `var` are hoisted
- Variables declared with `let` and `const` are not hoisted and have a Temporal Dead Zone (TDZ)
- Function declarations are hoisted in their entirety; function expressions only hoist the variable name

## Priority

- Function declarations have higher priority than variable declarations
- If a variable name and function name are the same, the variable declaration is ignored (not overwritten), but the assignment operation will overwrite it

```js
console.log(foo)  // ƒ foo() {}
function foo() {}
var foo = 10
console.log(foo)  // 10
```

<!-- /en -->