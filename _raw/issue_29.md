# 029题-es6 数组新增哪些方法以及使用场景

参考: https://es6.ruanyifeng.com/#docs/array

## 1. 扩展运算符

```js
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]

[...'hello']
// ['h', 'e', 'l', 'l', 'o']
```

## 2. Array.from()

将类数组对象或可遍历对象转换为真正的数组。

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': { a : 'a'},
    length: 3
};

// ES5 的写法
var arr1 = [].slice.call(arrayLike);

// ES6 的写法
let arr2 = Array.from(arrayLike);
```

## 3. Array.of()

将一组值转换为数组，替代 `new Array()`。

```js
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

## 4. copyWithin()

浅复制数组的一部分到同一数组中的另一个位置。

```js
let arr = [1, 2, 3, { a : 4, b : 444}, 5]
arr.copyWithin(0, 3, 4)
// 将3号位复制到0号位
```

## 5. find() 与 findIndex()

找出第一个符合条件的数组成员/位置。

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2

// 可以发现NaN，弥补了indexOf的不足
[NaN].indexOf(NaN)  // -1
[NaN].findIndex(y => Object.is(NaN, y))  // 0
```

## 6. fill()

使用给定值填充数组。

```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

## 7. entries(), keys() 和 values()

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0  1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'  'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"  1 "b"
```

## 8. includes()

判断数组是否包含某个值。

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

## 9. flat() 与 flatMap()

数组扁平化。

```js
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

// flatMap相当于map + flat
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

## 10. at()

支持负索引。

```js
const arr = [5, 12, 8, 130, 44];
arr.at(2)     // 8
arr.at(-2)    // 130
arr.at()      // 5，默认第一个
arr.at(6)     // undefined，大于数组长度
```