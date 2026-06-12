# 003题：a=?， a==1&&a==2&&a==3 成立？ 有多少种方法？

## 考察==的隐形转换，数据的劫持

[视频详解传送小门（点我吧@.@）](https://www.bilibili.com/video/BV1aE411C7pt?p=18&t=201)

- ==进行比较的时候,如果左右两边的数据类型不一样,则先转换为一样的,然后相比较
- 1.{}=={} 两个obj 比较,比较的是堆内存的地址
- 2.null==undefined 相等的 // null === undefined 不等
- 3.NaN==NaN 自己都不相等,和谁都不等
- 4.[12]=='12' 先把对象toString 再比较
- 5.剩余情况,都是转换为数字来比较(类型不一样时)
- 对象转数字: 先转换为字符串,然后在转换为数字
- 字符串转数字: 只要出现非数字字符串,结果就是NaN
- 布尔转数字: true->1 false->0
- null转数字: 0
- undefined转数字: NaN

### 参考解法

```js
// 方法1 重写toString 
var a = {n:0}
let temp = 0
a.toString = function(){
    console.log('toString=>')
    return ++temp
}
// 方法2 重写valueOf 
a.valueOf = function(){
    console.log('valueOf')
    return ++temp
}
console.log(a)
console.log(a==1&&a==2&a==3)

// 方法3
Object.defineProperty(window,'a',{
    get: function(){
        let val = this.value
        val?++this.value:this.value=1
        return this.value
    }
})
console.log(a==1&&a==2&&a==3)

// 方法4
let a = [1,2,3]
a.toString = a.shift
console.log(a==1&&a==2&&a==3)
```

### 还有更多的解法欢迎交流~~