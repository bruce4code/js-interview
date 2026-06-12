## 类数组转化为数组

> **English**: Array-like to Array — Converting array-like objects to arrays using `Array.from()`, `Array.prototype.slice()`, and spread operator.

<!-- zh -->
### 什么是类数组

类数组拥有 `length` 属性，其它属性（索引）为非负整数（对象中的索引会被当做字符串处理）；不具有数组所具有的方法；类数组是一个普通对象，而真实的数组是 `Array` 类型。

常见的类数组有：函数的参数 `arguments`、DOM 对象列表（如 `document.querySelectorAll` 返回的列表）。

### 转化为数组的方法

#### 方式1：Array.prototype.slice.call

```js
Array.prototype.slice.call(arguments, 1)
```

#### 方式2：Array.from

```js
Array.from(arguments)
```

#### 方式3：扩展运算符

```js
[...arguments]
```

#### 方式4：Array.prototype.concat.apply

```js
Array.prototype.concat.apply([], arguments)
```
<!-- /zh -->

<!-- en -->
### What is an Array-like Object

An array-like object has a `length` property, with other properties (indices) being non-negative integers (indices in an object are treated as strings); it does not have array methods; an array-like object is a plain object, whereas a real array is of type `Array`.

Common array-like objects include: the function arguments object `arguments`, DOM node lists (such as the list returned by `document.querySelectorAll`).

### Methods for Converting to Array

#### Method 1: Array.prototype.slice.call

```js
Array.prototype.slice.call(arguments, 1)
```

#### Method 2: Array.from

```js
Array.from(arguments)
```

#### Method 3: Spread Operator

```js
[...arguments]
```

#### Method 4: Array.prototype.concat.apply

```js
Array.prototype.concat.apply([], arguments)
```
<!-- /en -->