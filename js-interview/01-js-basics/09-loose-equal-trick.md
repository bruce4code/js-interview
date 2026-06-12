# a==1&&a==2&&a==3 的原理

> **English**: How a==1&&a==2&&a==3 works — Exploiting `toString`/`valueOf`, `defineProperty` getters, or `Proxy` to make a variable equal multiple values.

<!-- zh -->

## 考察 == 的隐形转换，数据的劫持

- `==` 进行比较的时候，如果左右两边的数据类型不一样，则先转换为一样的，然后相比较
- `{} == {}` 两个 obj 比较，比较的是堆内存的地址
- `null == undefined` 相等（`null === undefined` 不等）
- `NaN == NaN` 自己都不相等，和谁都不等
- `[12] == '12'` 先把对象 toString 再比较
- 剩余情况，都是转换为数字来比较（类型不一样时）
  - 对象转数字：先转换为字符串，然后在转换为数字
  - 字符串转数字：只要出现非数字字符串，结果就是 NaN
  - 布尔转数字：true -> 1，false -> 0
  - null 转数字：0
  - undefined 转数字：NaN

### 参考解法

```js
// 方法1 重写 toString
var a = { n: 0 }
let temp = 0
a.toString = function () {
    console.log('toString=>')
    return ++temp
}

// 方法2 重写 valueOf
a.valueOf = function () {
    console.log('valueOf')
    return ++temp
}
console.log(a)
console.log(a == 1 && a == 2 && a == 3)

// 方法3 使用 Object.defineProperty
Object.defineProperty(window, 'a', {
    get: function () {
        let val = this.value
        val ? ++this.value : this.value = 1
        return this.value
    }
})
console.log(a == 1 && a == 2 && a == 3)

// 方法4 利用数组 shift
let a = [1, 2, 3]
a.toString = a.shift
console.log(a == 1 && a == 2 && a == 3)
```

<!-- /zh -->

<!-- en -->

## Examining the implicit conversion of == and data hijacking

- When using `==` for comparison, if the data types on both sides are different, they are first converted to the same type, then compared
- `{} == {}` compares two objects by their heap memory address
- `null == undefined` is equal (`null === undefined` is not equal)
- `NaN == NaN` — NaN is not equal to itself, nor to anything else
- `[12] == '12'` — first converts the object to string via toString, then compares
- For remaining cases, both are converted to numbers for comparison (when types differ)
  - Object to number: first converted to string, then to number
  - String to number: if any non-digit character appears, the result is NaN
  - Boolean to number: true -> 1, false -> 0
  - null to number: 0
  - undefined to number: NaN

### Reference Solutions

```js
// Method 1: Override toString
var a = { n: 0 }
let temp = 0
a.toString = function () {
    console.log('toString=>')
    return ++temp
}

// Method 2: Override valueOf
a.valueOf = function () {
    console.log('valueOf')
    return ++temp
}
console.log(a)
console.log(a == 1 && a == 2 && a == 3)

// Method 3: Using Object.defineProperty
Object.defineProperty(window, 'a', {
    get: function () {
        let val = this.value
        val ? ++this.value : this.value = 1
        return this.value
    }
})
console.log(a == 1 && a == 2 && a == 3)

// Method 4: Using array shift
let a = [1, 2, 3]
a.toString = a.shift
console.log(a == 1 && a == 2 && a == 3)
```

<!-- /en -->