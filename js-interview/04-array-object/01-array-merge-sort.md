## 数组合并排序

> **English**: Array Merge & Sort — Merging arrays with `concat` and spread operator, then sorting with custom compare functions.

<!-- zh -->
将数组 `['A1','A2','B1','B2']` 和数组 `['A','B']` 合并排序为 `['A1','A2','A','B1','B2','B']`。

```js
const a = ['A1', 'A2', 'B1', 'B2']
const b = ['A', 'B']

// 把 b 组装
let b2 = b.map(i => i += 'Z')
// b2 = ['AZ', 'BZ']

var arr = a.concat(b2)
var res = arr.sort((a, b) => a.localeCompare(b))

res.map(item => {
  if (item.indexOf('Z') === 1) {
    item = item.replace(/Z/, '')
  }
  return item
})
```

参考： [MDN localeCompare](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
<!-- /zh -->

<!-- en -->
Merge the arrays `['A1','A2','B1','B2']` and `['A','B']` into a sorted result `['A1','A2','A','B1','B2','B']`.

```js
const a = ['A1', 'A2', 'B1', 'B2']
const b = ['A', 'B']

// Assemble b with a temporary suffix
let b2 = b.map(i => i += 'Z')
// b2 = ['AZ', 'BZ']

var arr = a.concat(b2)
var res = arr.sort((a, b) => a.localeCompare(b))

res.map(item => {
  if (item.indexOf('Z') === 1) {
    item = item.replace(/Z/, '')
  }
  return item
})
```

Reference: [MDN localeCompare](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
<!-- /en -->