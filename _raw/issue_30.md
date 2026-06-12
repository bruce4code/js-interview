# 030题-深浅拷贝各有哪些方法,优缺点

深浅拷贝主要是针对于引用类型而言的。

## 深拷贝

### 1. JSON.parse(JSON.stringify(obj))

```js
const obj = { a: 1, b: { c: 2 } }
const clone = JSON.parse(JSON.stringify(obj))
```

**优点**：简单易用

**缺点**：
- 无法处理函数、undefined、Symbol（会被忽略）
- 无法处理正则表达式（变成空对象）
- 无法处理循环引用（会报错）
- Date对象会变成字符串
- 会忽略不可遍历的属性

### 2. lodash.deepClone

使用第三方库lodash的深拷贝方法，功能完善。

### 3. 手写深拷贝

参考 [#24](https://github.com/bruce4code/js-interview/issues/24)

### 4. structuredClone

现代浏览器原生支持的深拷贝API。

```js
const original = { name: "MDN" };
original.itself = original;

const clone = structuredClone(original);
```

**优点**：浏览器原生支持，可处理循环引用

**缺点**：不支持函数、DOM节点等

## 浅拷贝

```js
let arr = [{name:'bruce'}, 1, 2, 3]

// 1. slice
let newArr = arr.slice()
// 由于数组内部属性值为引用对象，所以仍是浅拷贝

// 2. 扩展运算符
let newArr2 = [...arr]

// 3. Object.assign
let newObj = Object.assign({}, obj)

// 4. 数组解构
let [...newArr3] = arr

// 5. concat
let newArr4 = [].concat(arr)
```

**浅拷贝特点**：只复制第一层属性，嵌套的引用类型仍然共享同一内存地址。