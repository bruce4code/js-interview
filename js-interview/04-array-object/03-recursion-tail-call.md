## 递归与尾递归

> **English**: Recursion & Tail Call — Recursion fundamentals, stack overflow, and how tail call optimization (TCO) can solve it.

<!-- zh -->
### 递归

在数学与计算机科学中，递归是指在函数的定义中使用函数自身的方法。递归的关键字为：**传递**、**回归**、**边界**。每一次递归带着参数传递给下一轮处理，每次回归的过程都要进行边界判断，决定是否停止递归。

### 阶乘示例

```
1! = 1
2! = 1 × 2
3! = 1 × 2 × 3
4! = 1 × 2 × 3 × 4
5! = 1 × 2 × 3 × 4 × 5
```

```js
function fact(n) {
  if (n === 1) {
    return 1
  }
  return n * fact(n - 1)
}
```

### 栈溢出与尾递归

使用递归函数需要注意防止栈溢出。函数调用通过栈实现，每进入一个函数调用栈就会加一层栈帧，每返回就减一层。由于栈大小有限，递归调用过多会导致栈溢出。

解决递归调用栈溢出的方法是通过**尾递归优化**。尾递归是指函数返回时调用自身本身，且 return 语句不能包含表达式。这样编译器或解释器可以把尾递归优化为只占用一个栈帧，避免栈溢出。

### 细胞分裂问题

1 个细胞，1 小时分裂 1 次，生命周期是 3 小时，求 n 小时后容器内有多少细胞？

#### 分裂图

```
                      1
        2                          1
  3           1             2                   1
4   1       2   1       3      1             2      1
```

#### 函数实现

```js
// 第3代的数量
var third = function (n) {
  if (n === 0 || n === 1) { return 0 }
  return second(n - 1)
}

// 第2代的数量
var second = function (n) {
  if (n === 0) { return 0 }
  return first(n - 1)
}

// 第1代的数量
var first = function (n) {
  if (n === 0) { return 1 }
  return first(n - 1) + second(n - 1) + third(n - 1)
}

// 总数量
function total(n) {
  return third(n) + second(n) + first(n)
}

total(1) // 2
total(2) // 4
total(3) // 7
total(4) // 13
```

参考： [廖雪峰 - 递归](https://www.liaoxuefeng.com/wiki/1016959663602400/1017268131039072)
<!-- /zh -->

<!-- en -->
### Recursion

In mathematics and computer science, recursion is a method where a function calls itself within its own definition. The key concepts of recursion are: **passing**, **returning**, and **boundary**. Each recursive call passes parameters to the next round of processing, and each return performs a boundary check to determine whether to stop the recursion.

### Factorial Example

```
1! = 1
2! = 1 × 2
3! = 1 × 2 × 3
4! = 1 × 2 × 3 × 4
5! = 1 × 2 × 3 × 4 × 5
```

```js
function fact(n) {
  if (n === 1) {
    return 1
  }
  return n * fact(n - 1)
}
```

### Stack Overflow and Tail Call

When using recursive functions, care must be taken to prevent stack overflow. Function calls are implemented through a stack — each function call adds a stack frame, and each return removes one. Since the stack has a limited size, too many recursive calls can cause a stack overflow.

The solution to recursive stack overflow is **tail call optimization (TCO)**. Tail call means that when a function returns, it calls itself, and the return statement must not contain any expression. This allows the compiler or interpreter to optimize the tail recursion to use only a single stack frame, preventing stack overflow.

### Cell Division Problem

One cell divides once per hour and has a lifespan of 3 hours. How many cells are in the container after n hours?

#### Division Diagram

```
                      1
        2                          1
  3           1             2                   1
4   1       2   1       3      1             2      1
```

#### Function Implementation

```js
// Count of the 3rd generation
var third = function (n) {
  if (n === 0 || n === 1) { return 0 }
  return second(n - 1)
}

// Count of the 2nd generation
var second = function (n) {
  if (n === 0) { return 0 }
  return first(n - 1)
}

// Count of the 1st generation
var first = function (n) {
  if (n === 0) { return 1 }
  return first(n - 1) + second(n - 1) + third(n - 1)
}

// Total count
function total(n) {
  return third(n) + second(n) + first(n)
}

total(1) // 2
total(2) // 4
total(3) // 7
total(4) // 13
```

Reference: [Liao Xuefeng - Recursion](https://www.liaoxuefeng.com/wiki/1016959663602400/1017268131039072)
<!-- /en -->