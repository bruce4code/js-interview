# 033题-各种遍历方法以及注意点

参考: https://es6.ruanyifeng.com/#docs/object

## 可枚举性

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: 123,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

描述对象的enumerable属性，称为"可枚举性"，如果该属性为false，就表示某些操作会忽略当前属性。

## 会忽略enumerable的操作

目前，有四个操作会忽略enumerable为false的属性：

1. **for...in循环**：只遍历对象自身的和继承的可枚举的属性
2. **Object.keys()**：返回对象自身的所有可枚举的属性的键名
3. **JSON.stringify()**：只串行化对象自身的可枚举的属性
4. **Object.assign()**：忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性

前三个是 ES5 就有的，最后一个Object.assign()是 ES6 新增。

## 建议

总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，**尽量不要用for...in循环，而用Object.keys()代替**。

## 遍历方法对比

| 方法 | 自身属性 | 继承属性 | 可枚举 | Symbol属性 |
|------|---------|---------|--------|-----------|
| for...in | ✓ | ✓ | ✓ | ✗ |
| Object.keys() | ✓ | ✗ | ✓ | ✗ |
| Object.getOwnPropertyNames() | ✓ | ✗ | 全部 | ✗ |
| Object.getOwnPropertySymbols() | ✓ | ✗ | 全部 | ✓ |
| Reflect.ownKeys() | ✓ | ✗ | 全部 | ✓ |