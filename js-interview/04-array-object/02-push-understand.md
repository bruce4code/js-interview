## Array.prototype.push 的理解

> **English**: Understanding push — How `push` works on arrays and array-like objects, and V8's optimization of the `length` property.

<!-- zh -->
### 经典面试题

```js
let obj = {
  2: 3,
  3: 4,
  length: 2,
  push: Array.prototype.push
}

obj.push(1)
obj.push(2)
console.log(obj)
```

### 理解 push

`Array.prototype.push` 将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

### push 的实现

```js
Array.prototype.push = function myPush(val) {
  this[this.length] = val
  // this.length 在原来的基础上加一
  return this.length
}
```

### 题目解析

```
obj.push(1) => myPush(1) => this: obj => obj[obj.length] = 1 => obj[2] = 1 => obj.length = 3
obj.push(2) => myPush(2) => this: obj => obj[obj.length] = 2 => obj[3] = 2 => obj.length = 4
```

### 打印结果

```js
console.log(obj)

// {2: 1, 3: 2, length: 4, push: ƒ}
```

参考： [Array.prototype.push - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
<!-- /zh -->

<!-- en -->
### Classic Interview Question

```js
let obj = {
  2: 3,
  3: 4,
  length: 2,
  push: Array.prototype.push
}

obj.push(1)
obj.push(2)
console.log(obj)
```

### Understanding push

`Array.prototype.push` adds one or more elements to the end of an array and returns the new length of the array.

### Implementation of push

```js
Array.prototype.push = function myPush(val) {
  this[this.length] = val
  // this.length increases by one from the original value
  return this.length
}
```

### Problem Analysis

```
obj.push(1) => myPush(1) => this: obj => obj[obj.length] = 1 => obj[2] = 1 => obj.length = 3
obj.push(2) => myPush(2) => this: obj => obj[obj.length] = 2 => obj[3] = 2 => obj.length = 4
```

### Console Output

```js
console.log(obj)

// {2: 1, 3: 2, length: 4, push: ƒ}
```

Reference: [Array.prototype.push - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
<!-- /en -->