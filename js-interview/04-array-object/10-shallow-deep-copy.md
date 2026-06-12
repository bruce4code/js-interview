## 深浅拷贝方法及优缺点

> **English**: Shallow & Deep Copy — Methods for shallow copy (spread, `Object.assign`) and deep copy (`JSON.parse`, `structuredClone`, recursion).

<!-- zh -->
深浅拷贝主要是针对于引用类型而言的。

### 深拷贝

#### 1. JSON.parse(JSON.stringify(obj))

```js
const obj = { a: 1, b: { c: 2 } }
const clone = JSON.parse(JSON.stringify(obj))
```

**优点**：简单易用

**缺点**：
- 无法处理函数、undefined、Symbol（会被忽略）
- 无法处理正则表达式（变成空对象）
- 无法处理循环引用（会报错）
- Date 对象会变成字符串
- 会忽略不可遍历的属性

#### 2. lodash.deepClone

使用第三方库 lodash 的深拷贝方法，功能完善。

#### 3. 手写深拷贝

参考相关实现。

#### 4. structuredClone

现代浏览器原生支持的深拷贝 API。

```js
const original = { name: "MDN" }
original.itself = original

const clone = structuredClone(original)
```

**优点**：浏览器原生支持，可处理循环引用

**缺点**：不支持函数、DOM 节点等

### 浅拷贝

```js
let arr = [{ name: 'bruce' }, 1, 2, 3]

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
<!-- /zh -->

<!-- en -->
Shallow and deep copy mainly apply to reference types.

### Deep Copy

#### 1. JSON.parse(JSON.stringify(obj))

```js
const obj = { a: 1, b: { c: 2 } }
const clone = JSON.parse(JSON.stringify(obj))
```

**Advantages**: Simple and easy to use

**Disadvantages**:
- Cannot handle functions, undefined, or Symbol (they are ignored)
- Cannot handle regular expressions (become empty objects)
- Cannot handle circular references (throws an error)
- Date objects become strings
- Ignores non-enumerable properties

#### 2. lodash.deepClone

Uses the third-party library lodash's deep clone method, comprehensive in functionality.

#### 3. Manual Deep Clone

Refer to relevant implementations.

#### 4. structuredClone

A native deep copy API supported by modern browsers.

```js
const original = { name: "MDN" }
original.itself = original

const clone = structuredClone(original)
```

**Advantages**: Native browser support, handles circular references

**Disadvantages**: Does not support functions, DOM nodes, etc.

### Shallow Copy

```js
let arr = [{ name: 'bruce' }, 1, 2, 3]

// 1. slice
let newArr = arr.slice()
// Since array elements are reference objects, this is still a shallow copy

// 2. Spread operator
let newArr2 = [...arr]

// 3. Object.assign
let newObj = Object.assign({}, obj)

// 4. Array destructuring
let [...newArr3] = arr

// 5. concat
let newArr4 = [].concat(arr)
```

**Characteristics of Shallow Copy**: Only the first level of properties is copied; nested reference types still share the same memory address.
<!-- /en -->