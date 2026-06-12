## Object.defineProperty

### 题目

```js
(function () {
  var u = { a: 1, b: 2 };
  var r = {
    m: function (k) {
      return u[k];
    },
  };
  window.r = r;
})();

var R = window.r;
alert(r.m('a'));
```

1. `alert` 打印的是？
2. 能不能通过 `r.m` 获取到 `u`？

### 解答

```js
Object.defineProperty(Object.prototype, 'key1', {
  get: function () {
    return this;
  },
});

console.log(R.m('key1')); // 返回的是 u 对象
```

通过 `Object.defineProperty` 在 `Object.prototype` 上定义了一个 getter 属性 `key1`，当访问 `R.m('key1')` 时，`u['key1']` 会触发原型链上的 getter，返回 `this`（即 `u` 对象）。

### Object.defineProperty 的用法

```js
Object.defineProperty(obj, prop, descriptor);
```

#### descriptor 参数

- **value**：属性值
- **writable**：是否可写
- **enumerable**：是否可枚举
- **configurable**：是否可配置（删除或修改属性）
- **get**：getter 函数
- **set**：setter 函数

### 应用场景

1. 实现数据响应式（Vue 2.x 的核心）
2. 实现对象的代理和拦截
3. 定义只读属性
4. 实现计算属性