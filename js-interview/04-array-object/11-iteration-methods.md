## 各种遍历方法及注意点

> **English**: Iteration Methods — Comprehensive comparison of iteration methods: `forEach`, `map`, `filter`, `reduce`, `for...of`, `for...in`, and their caveats.

<!-- zh -->
### 可枚举性

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。

```js
let obj = { foo: 123 }
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: 123,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

描述对象的 `enumerable` 属性称为"可枚举性"，如果该属性为 `false`，就表示某些操作会忽略当前属性。

### 会忽略 enumerable 的操作

目前，有四个操作会忽略 `enumerable` 为 `false` 的属性：

1. **for...in 循环**：只遍历对象自身的和继承的可枚举属性
2. **Object.keys()**：返回对象自身的所有可枚举属性的键名
3. **JSON.stringify()**：只串行化对象自身的可枚举属性
4. **Object.assign()**：忽略 `enumerable` 为 `false` 的属性，只拷贝对象自身的可枚举属性

前三个是 ES5 就有的，`Object.assign()` 是 ES6 新增。

### 建议

操作中引入继承的属性会让问题复杂化，大多数时候只关心对象自身的属性。所以，**尽量不要用 `for...in` 循环，而用 `Object.keys()` 代替**。

### 遍历方法对比

| 方法 | 自身属性 | 继承属性 | 可枚举 | Symbol 属性 |
|------|---------|---------|--------|-----------|
| for...in | ✓ | ✓ | ✓ | ✗ |
| Object.keys() | ✓ | ✗ | ✓ | ✗ |
| Object.getOwnPropertyNames() | ✓ | ✗ | 全部 | ✗ |
| Object.getOwnPropertySymbols() | ✓ | ✗ | 全部 | ✓ |
| Reflect.ownKeys() | ✓ | ✗ | 全部 | ✓ |

参考： [阮一峰 ES6 - 对象的扩展](https://es6.ruanyifeng.com/#docs/object)
<!-- /zh -->

<!-- en -->
### Enumerability

Each property of an object has a property descriptor that controls the behavior of that property.

```js
let obj = { foo: 123 }
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: 123,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

The `enumerable` attribute of the descriptor is called "enumerability". If this attribute is `false`, certain operations will ignore that property.

### Operations That Ignore enumerable

Currently, there are four operations that ignore properties with `enumerable` set to `false`:

1. **for...in loop**: Iterates over an object's own and inherited enumerable properties
2. **Object.keys()**: Returns the keys of an object's own enumerable properties
3. **JSON.stringify()**: Only serializes an object's own enumerable properties
4. **Object.assign()**: Ignores properties with `enumerable` set to `false`, only copies the object's own enumerable properties

The first three have existed since ES5, while `Object.assign()` was introduced in ES6.

### Recommendation

Including inherited properties in operations complicates matters, as most of the time we only care about an object's own properties. Therefore, **try to avoid using `for...in` loops and use `Object.keys()` instead**.

### Comparison of Iteration Methods

| Method | Own Properties | Inherited Properties | Enumerable | Symbol Properties |
|--------|---------------|---------------------|------------|------------------|
| for...in | ✓ | ✓ | ✓ | ✗ |
| Object.keys() | ✓ | ✗ | ✓ | ✗ |
| Object.getOwnPropertyNames() | ✓ | ✗ | All | ✗ |
| Object.getOwnPropertySymbols() | ✓ | ✗ | All | ✓ |
| Reflect.ownKeys() | ✓ | ✗ | All | ✓ |

Reference: [Ruan Yifeng ES6 - Object Extensions](https://es6.ruanyifeng.com/#docs/object)
<!-- /en -->