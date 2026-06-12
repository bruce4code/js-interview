# 016题: 对调2个变量的值若干种方式

## 方式1 临时变量法

```js
let a = 3
let b = 5
let temp = a;
a = b;
b = temp
```

## 方式2 倒水加减法

```js
let a = 3
let b = 5
a = a + b   // 3 + 5 此时a为原a+b的和
b = a - b   // 8 - 5 求差，获得原a的值3，赋值给b
a = a - b   // 8 - 3 此时b已经是原a的值，总和减b获得原b的值
```

## 方式3 数组解构赋值

```js
let a = 3
let b = 5
[a, b] = [b, a]
```

## 方式4 异或运算

```js
let a = 3
let b = 5
a = a ^ b
b = a ^ b
a = a ^ b
```