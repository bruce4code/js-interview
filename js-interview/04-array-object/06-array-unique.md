## 数组去重的几种方式

> **English**: Array Deduplication — Various deduplication methods: `Set`, `filter`+`indexOf`, `Map`, and double loop.

<!-- zh -->
### 方式1：ES6 Set

```js
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}, Symbol(1), Symbol(1)]

function getUni(arr) {
  return Array.from(new Set(arr))
}

getUni(arr)
// [1, "1", 17, true, false, "true", "a", {…}, {…}, Symbol(1), Symbol(1)]
// 空 {} 对象没有去重（两个对象引用不一样），Symbol(1) 也不相等
```

**Set 方式能对对象去重吗？**

```js
const b = { a: 2 }
let arr1 = [{ a: 1 }, b, b, { a: 3 }]
let set1 = new Set(arr1)
let newArr1 = Array.from(set1)
console.log(newArr1) // [{a:1}, {a:2}, {a:3}]

// 无法对内容相同的不同对象去重：
let arr2 = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }]
let set2 = new Set(arr2)
let newArr2 = Array.from(set2)
console.log(newArr2) // [{a:1}, {a:2}, {a:2}, {a:3}]
```

#### 应用：过滤网页中不重复的 HTML 标签

```js
[...new Set([...document.querySelectorAll('*')].map(v => v.tagName))]
```

### 方式2：遍历 + filter

```js
const unique = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}
// 使用 includes / indexOf 的思路大致一样，都是判断是否存在，没有就添加
```

### 方式3：使用 Map + for 循环

```js
const unique1 = arr => {
  const map = new Map()
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true)
      res.push(arr[i])
    }
  }
  return res
}
```

> 请注意：为 Map 设置对象属性也是可以的，但可能引起混乱。

#### 错误的 Map 用法

```js
let wrongMap = new Map()
wrongMap['bla'] = 'blaa'
wrongMap['bla2'] = 'blaaa2'
console.log(wrongMap)  // Map { bla: 'blaa', bla2: 'blaaa2' }
wrongMap.has('bla')    // false
wrongMap.delete('bla') // false
```

#### 正确的 Map 用法

```js
let myMap = new Map()
myMap.set('bla', 'blaa')
myMap.set('bla2', 'blaaa2')
console.log(myMap)  // Map { 'bla' => 'blaa', 'bla2' => 'blaaa2' }
myMap.has('bla')    // true
myMap.delete('bla') // true
```

### 方式4：利用 hasOwnProperty

```js
const unique4 = (arr) => {
  let obj = {}
  return arr.filter((item, curIndex, arr) => {
    let tempFlag
    if (typeof(item) === 'symbol') {
      tempFlag = typeof(item) + typeof(item)
    } else if (typeof(item) === 'object') {
      tempFlag = typeof(item) + JSON.stringify(item)
    } else {
      tempFlag = typeof(item) + item
    }
    return obj.hasOwnProperty(tempFlag) ? false : (obj[tempFlag] = true)
  })
}
// 根据类型去重，相同类型的 Symbol(1) 和 Symbol(666) 或 {} 和 {} 只会保留一个
```

参考： [lodash unionWith](https://www.lodashjs.com/docs/lodash.unionWith)
<!-- /zh -->

<!-- en -->
### Method 1: ES6 Set

```js
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}, Symbol(1), Symbol(1)]

function getUni(arr) {
  return Array.from(new Set(arr))
}

getUni(arr)
// [1, "1", 17, true, false, "true", "a", {…}, {…}, Symbol(1), Symbol(1)]
// Empty {} objects are not deduplicated (different references), Symbol(1) values are also not equal
```

**Can Set deduplicate objects?**

```js
const b = { a: 2 }
let arr1 = [{ a: 1 }, b, b, { a: 3 }]
let set1 = new Set(arr1)
let newArr1 = Array.from(set1)
console.log(newArr1) // [{a:1}, {a:2}, {a:3}]

// Cannot deduplicate different objects with identical content:
let arr2 = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }]
let set2 = new Set(arr2)
let newArr2 = Array.from(set2)
console.log(newArr2) // [{a:1}, {a:2}, {a:2}, {a:3}]
```

#### Application: Filter unique HTML tags on a page

```js
[...new Set([...document.querySelectorAll('*')].map(v => v.tagName))]
```

### Method 2: Loop + filter

```js
const unique = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}
// Using includes / indexOf follows a similar idea — check if it exists, add if not
```

### Method 3: Using Map + for loop

```js
const unique1 = arr => {
  const map = new Map()
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true)
      res.push(arr[i])
    }
  }
  return res
}
```

> Note: Setting object properties on a Map is possible, but it can cause confusion.

#### Incorrect Map Usage

```js
let wrongMap = new Map()
wrongMap['bla'] = 'blaa'
wrongMap['bla2'] = 'blaaa2'
console.log(wrongMap)  // Map { bla: 'blaa', bla2: 'blaaa2' }
wrongMap.has('bla')    // false
wrongMap.delete('bla') // false
```

#### Correct Map Usage

```js
let myMap = new Map()
myMap.set('bla', 'blaa')
myMap.set('bla2', 'blaaa2')
console.log(myMap)  // Map { 'bla' => 'blaa', 'bla2' => 'blaaa2' }
myMap.has('bla')    // true
myMap.delete('bla') // true
```

### Method 4: Using hasOwnProperty

```js
const unique4 = (arr) => {
  let obj = {}
  return arr.filter((item, curIndex, arr) => {
    let tempFlag
    if (typeof(item) === 'symbol') {
      tempFlag = typeof(item) + typeof(item)
    } else if (typeof(item) === 'object') {
      tempFlag = typeof(item) + JSON.stringify(item)
    } else {
      tempFlag = typeof(item) + item
    }
    return obj.hasOwnProperty(tempFlag) ? false : (obj[tempFlag] = true)
  })
}
// Deduplicates by type — symbols of the same type like Symbol(1) and Symbol(666) or {} and {} will keep only one
```

Reference: [lodash unionWith](https://www.lodashjs.com/docs/lodash.unionWith)
<!-- /en -->