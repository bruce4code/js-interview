## 解构赋值

> **English**: Destructuring — Array destructuring, object destructuring, default values, and nested destructuring patterns in ES6.

参考：<https://es6.ruanyifeng.com/#docs/destructuring>

### 数组解构

```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

上面最后一个表达式之所以会报错，是因为 `x` 用 `y` 做默认值时，`y` 还没有声明。

### 对象解构

```js
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```

### 默认值生效条件

默认值生效的条件是，对象的属性值严格等于 `undefined`。

```js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

上面代码中，属性 `x` 等于 `null`，因为 `null` 与 `undefined` 不严格相等，所以是个有效的赋值，导致默认值 `3` 不会生效。

### 注意点

1. 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
2. 解构失败变量的值等于 `undefined`
3. 如果解构模式是嵌套对象，且子对象所在的父属性不存在，将会报错