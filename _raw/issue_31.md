# 031题-原生api的缺点 typeof, indexOf 等

## typeof 的缺点

### typeof null 的问题

```js
typeof null  // 'object'  （这是JavaScript的一个历史遗留bug）
```

JS在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息：
- 000：对象
- 010：浮点数
- 100：字符串
- 110：布尔
- 1：整型

null 的所有机器码均为0，所以被误判为对象类型。

### 正确的类型判断方式

```js
Object.prototype.toString.call(null)       // '[object Null]'
Object.prototype.toString.call(undefined)  // '[object Undefined]'
Object.prototype.toString.call([])         // '[object Array]'
Object.prototype.toString.call({})         // '[object Object]'
```

## indexOf 的缺点

```js
[NaN].indexOf(NaN)  // -1  无法检测NaN
```

indexOf 内部使用严格相等运算符（===）进行判断，而 NaN === NaN 为 false。

### 替代方案

```js
// 使用 includes
[NaN].includes(NaN)  // true

// 使用 findIndex
[NaN].findIndex(y => Object.is(NaN, y))  // 0

// 使用 find
[NaN].find(y => Object.is(NaN, y))  // NaN
```