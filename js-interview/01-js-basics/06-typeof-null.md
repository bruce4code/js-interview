# typeof null 的由来

> **English**: Why typeof null === 'object' — The legacy JS bug rooted in binary type tagging from the early VM implementation.

<!-- zh -->

## 为什么 typeof null == 'object' 为 true？

在 JS 中，null 有属于自己的类型 Null，而不属于 Object 类型。typeof 之所以会判定为 Object 类型，是因为 JavaScript 数据类型在底层都是以二进制的形式表示的，二进制的前三位为 0 会被 typeof 判断为对象类型，而 null 的二进制位恰好都是 0，因此 null 被误判断为 Object 类型。

```
000 – 对象，数据是对象的应用
1   – 整型，数据是 31 位带符号整数
010 – 双精度类型，数据是双精度数字
100 – 字符串，数据是字符串
110 – 布尔类型，数据是布尔值
```

其实，我们可以通过另一种方法获取 null 的真实类型：

```js
Object.prototype.toString.call(null)       // [object Null]
Object.prototype.toString.call(undefined)  // [object Undefined]
```

通过 Object 原型上的 toString() 方法可以获取到 JavaScript 中对象的真实数据类型。

<!-- /zh -->

<!-- en -->

## Why is typeof null == 'object' true?

In JavaScript, `null` has its own type Null, and does not belong to the Object type. The reason `typeof` identifies it as Object type is that JavaScript data types are represented in binary at the low level. When the first three binary digits are 0, `typeof` judges it as an object type. Since all binary bits of `null` are 0, `null` is mistakenly identified as an Object type.

```
000 – object, data is a reference to an object
1   – integer, data is a 31-bit signed integer
010 – double, data is a double-precision number
100 – string, data is a string
110 – boolean, data is a boolean value
```

Actually, we can get the true type of `null` through another method:

```js
Object.prototype.toString.call(null)       // [object Null]
Object.prototype.toString.call(undefined)  // [object Undefined]
```

The `toString()` method on the Object prototype can obtain the true data type of objects in JavaScript.

<!-- /en -->