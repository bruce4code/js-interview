## 数组扁平化的几种方式

> **English**: Array Flattening — Multiple ways to flatten nested arrays: `flat()`, reduce+concat, toString+split, and spread operator.

### 方式1：利用 toString + split

```js
let arr = [1, [2, [3, [4, 5]]], 6]
let res = arr.toString().split(",").map(Number)
```

### 方式2：递归

```js
function flatten(arr) {
  var res = []
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}
```

### 方式3：使用 reduce

```js
function flatten(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}
```

### 方式4：扩展运算符

```js
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
```

### 方式5：使用 flat

```js
let arr = [1, [2, [3, [4, 5]]], 6]
let res = arr.flat(Infinity)
```