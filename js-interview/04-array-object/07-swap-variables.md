## 对调两个变量的值的若干种方式

> **English**: Swap Variables — Swapping variable values using temp variable, destructuring, arithmetic, and bitwise XOR.

### 方式1：临时变量法

```js
let a = 3
let b = 5
let temp = a
a = b
b = temp
```

### 方式2：加减法

```js
let a = 3
let b = 5
a = a + b   // 3 + 5，此时 a 为原 a+b 的和
b = a - b   // 8 - 5，获得原 a 的值 3，赋值给 b
a = a - b   // 8 - 3，此时 b 已是原 a 的值，总和减 b 获得原 b 的值
```

### 方式3：数组解构赋值

```js
let a = 3
let b = 5
;[a, b] = [b, a]
```

### 方式4：异或运算

```js
let a = 3
let b = 5
a = a ^ b
b = a ^ b
a = a ^ b
```