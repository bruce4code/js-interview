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