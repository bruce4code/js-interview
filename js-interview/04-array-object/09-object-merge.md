## 合并对象的几种方法

> **English**: Object Merge — Merging objects with `Object.assign()`, spread operator, and custom deep merge functions.

### 扩展运算符

```js
let obj1 = { a: '111' }
let obj2 = { b: '222' }
let newObj = { ...obj1, ...obj2 }
console.log(newObj === obj1) // false
console.log(newObj === obj2) // false
```

### Object.assign

```js
let obj1 = { a: '111' }
let obj2 = { b: '222', a: 'foo' }
let newObj = Object.assign(obj1, obj2)
console.log(newObj === obj1) // true（obj1 被修改了）
console.log(newObj === obj2) // false
// 后面的对象属性会覆盖前面的对象属性
```

### _.merge（lodash 工具库）

```js
var object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
}

var other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
}

_.merge(object, other)
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
```

### 区别总结

| 方法 | 特点 |
|------|------|
| 扩展运算符 | 返回新对象，浅拷贝，后面的属性覆盖前面的 |
| Object.assign | 修改第一个对象并返回，浅拷贝 |
| _.merge | 深度合并，递归合并对象和数组 |

参考： [lodash merge](https://www.lodashjs.com/docs/lodash.merge)